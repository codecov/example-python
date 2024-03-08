import pytest
from app.expression import (
    evaluate_expression,
    BinaryOperation,
    UnitaryOpNode,
    UnaryOperation,
    BinaryOpNode,
    BaseNode,
)


@pytest.mark.parametrize(
    "expression,expected_result",
    [
        (BaseNode(lhs=1), 1),
        (
            BinaryOpNode(
                op=BinaryOperation.ADD, lhs=BaseNode(lhs=1), rhs=BaseNode(lhs=1)
            ),
            2,
        ),
        (
            BinaryOpNode(
                op=BinaryOperation.ADD,
                lhs=BinaryOpNode(
                    op=BinaryOperation.MULTIPLY,
                    lhs=BaseNode(lhs=2),
                    rhs=BaseNode(lhs=2),
                ),
                rhs=BaseNode(lhs=2),
            ),
            6,
        ),
        (
            BinaryOpNode(
                op=BinaryOperation.POW, lhs=BaseNode(lhs=3), rhs=BaseNode(lhs=2)
            ),
            9,
        ),
        (UnitaryOpNode(op=UnaryOperation.MINUS, lhs=BaseNode(lhs=1)), -1),
    ],
)
def test_expressions(expression, expected_result):
    assert evaluate_expression(expression) == expected_result


@pytest.mark.parametrize(
    "expression,expected_result,expected_precision",
    [
        (UnitaryOpNode(op=UnaryOperation.SQRT, lhs=BaseNode(lhs=2)), 1.4142, 1e-3),
        (
            BinaryOpNode(
                op=BinaryOperation.SQRT,
                lhs=BaseNode(lhs=2),
                rhs=BaseNode(lhs=0.0000001),
            ),
            1.41421356237,
            1e-7,
        ),
    ],
)
def test_sqrt_expressions(expression, expected_result, expected_precision):
    assert evaluate_expression(expression) == pytest.approx(
        expected_result, expected_precision
    )
