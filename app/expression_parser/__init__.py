from app.expression import BaseNode, Node
from app.expression_parser.exceptions import ParsingException
from app.expression_parser.helpers import add_node_to_stack, is_operation, symbol_to_op


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
        if is_operation(char):
            # If there's a number with no operation in the stack
            # It is the LHS of this operation.
            is_unary = not isinstance(nodes_stack[-1], BaseNode)
            current_op = symbol_to_op(char, is_unary=is_unary)
            nodes_stack = add_node_to_stack(current_op, nodes_stack)
        elif char.isdigit():
            number = ""
            while char.isdigit() or char in [".", ","]:
                number += char
                idx += 1
                char = expression[idx]
            idx -= 1
            nodes_stack = add_node_to_stack(BaseNode(lhs=float(number)), nodes_stack)
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
