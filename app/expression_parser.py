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
        stack_length: Optional[int] = None
    ) -> None:
        super().__init__(*args)
        self.error_index = error_index
        self.stack_length = stack_length


def _is_operation(char: str) -> bool:
    return char in ["+", "-", "*", "^", "/", "√"]


def _symbol_to_op(symbol: str, is_unary: bool = False) -> Operation:
    lookup = {
        "+": BinaryOperation.ADD,
        "-": BinaryOperation.SUBTRACT if not is_unary else UnaryOperation.MINUS,
        "/": BinaryOperation.DIVIDE,
        "*": BinaryOperation.MULTIPLY,
        "^": BinaryOperation.POW,
        # TODO: Support sqrt with precision
        "√": UnaryOperation.SQRT,
    }
    return lookup[symbol]


def _add_node_to_stack(new_node: BaseNode, stack: list) -> list:
    if isinstance(stack[-1], Operation):
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
    # FIXME: Currently this doesn't handle precedence of operations
    # That is 1 + 2 * 3 is evaluated to 9, but the correct value is 7
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
            is_unary = isinstance(nodes_stack[-1], BaseNode)
            current_op = _symbol_to_op(char, is_unary=is_unary)
            nodes_stack.append(current_op)
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
        click.echo(nodes_stack)
        raise ParsingException(
            "Failed to parse expression", stack_length=len(nodes_stack)
        )
    return nodes_stack[0]
