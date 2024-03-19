from typing import Tuple
import click

from app.expression import evaluate_expression
from app.expression_parser import parse_from_string


@click.command()
@click.argument("expression", nargs=-1, type=str)
def calculator(expression: Tuple[str]):
    """Evaluates an arithmetic expression.
    (doesn't take into consideration operation precedence)
    """
    # TODO: Let the expression be parsed without having to build
    # the entire expression from the args (that is, in a streaming fashion)
    full_expression = ""
    for arg in expression:
        full_expression += arg

    # TODO: Handle exceptions
    expression_root = parse_from_string(full_expression)
    result = evaluate_expression(expression_root)
    click.echo(f"Expression result: {result}")


if __name__ == "__main__":
    calculator()
