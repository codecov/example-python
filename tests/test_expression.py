import pytest
from app.expression import (
    evaluate_expression,
    BinaryOperation,
    UnitaryOpNode,
    UnaryOperation,
    BinaryOpNode,
    BaseNode,
)


class TestBinaryOperationOperators(object):
    def test_equality(self):
        bin_op = BinaryOperation.SUBTRACT
        assert type(bin_op) == BinaryOperation
        assert (bin_op == 1) == False
        assert (bin_op == "bin_op") == False
        assert (bin_op == True) == False
        assert (bin_op == UnaryOperation.MINUS) == False
        assert (bin_op == BinaryOperation.ADD) == False
        assert (bin_op == BinaryOperation.SUBTRACT) == True

    def test_lt(self):
        subtract = BinaryOperation.SUBTRACT
        add = BinaryOperation.ADD
        mult = BinaryOperation.MULTIPLY
        pow = BinaryOperation.POW
        assert (subtract < add) == False
        assert (add < subtract) == False
        assert (subtract < mult) == False
        assert (mult < subtract) == True
        assert (pow < mult) == True
        assert (pow < add) == True
        assert (pow < UnaryOperation.MINUS) == False

    def test_error(self):
        add = BinaryOperation.ADD
        with pytest.raises(TypeError) as err:
            add < "add"
        assert str(err.value) == "can't compare BinaryOperation with <class 'str'>"


class TestUnaryOperationOperators(object):
    def test_equality(self):
        unary_op = UnaryOperation.MINUS
        assert (unary_op == 1) == False
        assert (unary_op == "unary_op") == False
        assert (unary_op == BinaryOperation.SUBTRACT) == False
        assert (unary_op == UnaryOperation.SQRT) == False
        assert (unary_op == UnaryOperation.MINUS) == True

    def test_lt(self):
        unary_op = UnaryOperation.MINUS
        assert (unary_op < BinaryOperation.SUBTRACT) == True
        assert (unary_op < BinaryOperation.POW) == True
        assert (unary_op < UnaryOperation.SQRT) == False

    def test_error(self):
        unary_op = UnaryOperation.MINUS
        with pytest.raises(TypeError) as err:
            unary_op < "unary_op"
        assert str(err.value) == "can't compare UnaryOperation with <class 'str'>"


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
