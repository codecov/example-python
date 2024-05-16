from app.expression import (
    BaseNode,
    BinaryOperation,
    BinaryOpNode,
    UnaryOperation,
    Operation,
    Node,
    UnitaryOpNode,
)


def is_operation(char: str) -> bool:
    return char in ["+", "-", "*", "^", "/", "√"]


def symbol_to_op(symbol: str, is_unary: bool = False) -> Operation:
    lookup = {
        "+": BinaryOperation.ADD,
        "-": BinaryOperation.SUBTRACT if (is_unary == False) else UnaryOperation.MINUS,
        "/": BinaryOperation.DIVIDE,
        "*": BinaryOperation.MULTIPLY,
        "^": BinaryOperation.POW,
        # TODO: Support sqrt with precision
        "√": UnaryOperation.SQRT,
    }
    return lookup[symbol]


def is_pushing_operation_with_higher_precedence(
    new_node: BaseNode | Operation, curr_stack_top: BaseNode
) -> bool:
    return (
        isinstance(new_node, Operation)
        and isinstance(curr_stack_top, BinaryOpNode)
        and new_node < curr_stack_top.op
    )


def is_pushing_second_operand_of_existing_operation(
    new_node: BaseNode | Operation, curr_stack_top: BaseNode
) -> bool:
    return (
        not isinstance(new_node, Operation)
        and isinstance(curr_stack_top, BinaryOpNode)
        and curr_stack_top.rhs is None
    )


def handle_operation_on_top(new_node: BaseNode, stack: list) -> None:
    # The current node is one of the operands in the operation
    op = stack.pop()
    if isinstance(stack[-1], Node):
        # We have a Node and an operation on the stack
        # So it has to be BinaryOperation
        lhs = stack.pop()
        node_to_add = BinaryOpNode(op=op, lhs=lhs, rhs=new_node)
    else:
        # In this case there was an operation and some other node below it
        # Probably a unary operation
        node_to_add = UnitaryOpNode(op=op, lhs=new_node)
    stack.append(node_to_add)


def handle_push_operation_with_higher_precedence(new_node: Operation, node_stack: list):
    rightmost_op_node = node_stack[-1]
    node_to_add = BinaryOpNode(op=new_node, lhs=None, rhs=None)
    # We need to scan the subtree from the 'root' node to find the
    # rightmost operand that was wrongfully assigned to a lower-precedence operation
    while isinstance(rightmost_op_node.rhs, BinaryOpNode):
        rightmost_op_node = rightmost_op_node.rhs
    rightmost_operand = rightmost_op_node.rhs
    rightmost_op_node.rhs = node_to_add
    node_to_add.lhs = rightmost_operand
    node_stack.append(node_to_add)


def add_node_to_stack(new_node: BaseNode | Operation, stack: list) -> list:
    if isinstance(stack[-1], Operation):
        handle_operation_on_top(new_node, stack)
    elif is_pushing_operation_with_higher_precedence(new_node, stack[-1]):
        # Fix the stack to create nodes correctly
        handle_push_operation_with_higher_precedence(new_node, stack)
    elif is_pushing_second_operand_of_existing_operation(new_node, stack[-1]):
        # This happens if an operation of higher precedence came after one of lower precedence
        stack[-1].rhs = new_node
        # Now that this operation is complete we pop it from the stack
        # Because it is already saved as the rhs operand of the operation to the left of it
        stack.pop()
    else:
        stack.append(new_node)
    return stack
