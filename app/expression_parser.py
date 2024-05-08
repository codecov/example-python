from typing import Optional

import click
from app.expression import (
    BaseNode,
    BinaryOperation,
    BinaryOpNode,
    UnaryOperation,
    Operation,
    Node,
    UnitaryOpNode,
)


class ParsingException(Exception):
    def __init__(
        self,
        *args,
        error_index: Optional[int] = None,
        stack_length: Optional[int] = None,
    ) -> None:
        super().__init__(*args)
        self.error_index = error_index
        self.stack_length = stack_length


def _is_operation(char: str) -> bool:
    return char in ["+", "-", "*", "^", "/", "√"]


def _symbol_to_op(symbol: str, is_unary: bool = False) -> Operation:
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


def _is_pushing_operation_with_higher_precedence(
    new_node: BaseNode | Operation, curr_stack_top: BaseNode
) -> bool:
    return (
        isinstance(new_node, Operation)
        and isinstance(curr_stack_top, BinaryOpNode)
        and new_node < curr_stack_top.op
    )


def _is_pushing_second_operand_of_existing_operation(
    new_node: BaseNode | Operation, curr_stack_top: BaseNode
) -> bool:
    return (
        not isinstance(new_node, Operation)
        and isinstance(curr_stack_top, BinaryOpNode)
        and curr_stack_top.rhs is None
    )


def _handle_operation_on_top(new_node: BaseNode, stack: list) -> None:
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


def _handle_push_operation_with_higher_precedence(
    new_node: Operation, node_stack: list
):
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


def _add_node_to_stack(new_node: BaseNode | Operation, stack: list) -> list:
    if isinstance(stack[-1], Operation):
        _handle_operation_on_top(new_node, stack)
    elif _is_pushing_operation_with_higher_precedence(new_node, stack[-1]):
        # Fix the stack to create nodes correctly
        _handle_push_operation_with_higher_precedence(new_node, stack)
    elif _is_pushing_second_operand_of_existing_operation(new_node, stack[-1]):
        # This happens if an operation of higher precedence came after one of lower precedence
        stack[-1].rhs = new_node
        # Now that this operation is complete we pop it from the stack
        # Because it is already saved as the rhs operand of the operation to the left of it
        stack.pop()
    else:
        stack.append(new_node)
    return stack


def parse_from_string(expression: str) -> Node:
    # Adding '\0' to the end of the expression
    # So that we can skip checking if the index has reached the end of it
    # When parsing numbers
    expression += "\0"
    # -----------
    # TODO: Add parenthesis
    # -----------
    # Adding None to the stack so that we can skip checking if it's empty
    # We just need to remove at the end
    nodes_stack = [None]
    idx = 0
    while idx < len(expression):
        char = expression[idx]  # TODO: Handle op symbols with more than 1 char
        if _is_operation(char):
            # If there's a number with no operation in the stack
            # It is the LHS of this operation.
            is_unary = not isinstance(nodes_stack[-1], BaseNode)
            current_op = _symbol_to_op(char, is_unary=is_unary)
            nodes_stack = _add_node_to_stack(current_op, nodes_stack)
        elif char.isdigit():
            number = ""
            while char.isdigit() or char in [".", ","]:
                number += char
                idx += 1
                char = expression[idx]
            idx -= 1
            nodes_stack = _add_node_to_stack(BaseNode(lhs=float(number)), nodes_stack)
        elif char == " " or char == "\0":
            pass
        else:
            raise ParsingException("Failed to parse expression", error_index=idx)
        idx += 1
    # Remove the None added to index 0 of the stack
    nodes_stack = nodes_stack[1:]
    if len(nodes_stack) != 1:
        raise ParsingException(
            "Failed to parse expression", stack_length=len(nodes_stack)
        )
    return nodes_stack[0]
