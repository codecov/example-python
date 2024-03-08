import pytest
from app.expression import (
    BaseNode,
    BinaryOpNode,
    BinaryOperation,
    Operation,
    UnaryOperation,
    UnitaryOpNode,
)

from app.expression_parser import (
    _add_node_to_stack,
    _is_operation,
    _symbol_to_op,
    parse_from_string,
)


@pytest.mark.parametrize(
    "symbol,outcome",
    [
        ("+", True),
        ("-", True),
        ("^", True),
        ("/", True),
        ("*", True),
        ("√", True),
        (".", False),
        (" ", False),
        (",", False),
        ("1", False),
    ],
)
def test_is_operation(symbol, outcome):
    assert _is_operation(symbol) == outcome


@pytest.mark.parametrize(
    "symbol,outcome",
    [
        ("+", BinaryOperation.ADD),
        ("-", BinaryOperation.SUBTRACT),
        ("^", BinaryOperation.POW),
        ("/", BinaryOperation.DIVIDE),
        ("*", BinaryOperation.MULTIPLY),
    ],
)
def test_get_op_from_symbol_binary_ops(symbol, outcome):
    result = _symbol_to_op(symbol)
    assert isinstance(result, Operation)
    assert result == outcome


@pytest.mark.parametrize(
    "symbol,is_unary,outcome",
    [
        ("√", True, UnaryOperation.SQRT),
        ("-", True, UnaryOperation.MINUS),
        ("-", False, BinaryOperation.SUBTRACT),
    ],
)
def test_get_op_from_symbol_unary_ops(symbol, is_unary, outcome):
    result = _symbol_to_op(symbol, is_unary=is_unary)
    assert isinstance(result, Operation)
    assert result == outcome


@pytest.mark.parametrize(
    "current_stack,new_node,expected",
    [
        ([None], BaseNode(lhs=2), [None, BaseNode(lhs=2)]),
        (
            [None, BaseNode(lhs=2), BinaryOperation.ADD],
            BaseNode(lhs=2),
            [
                None,
                BinaryOpNode(
                    op=BinaryOperation.ADD, lhs=BaseNode(lhs=2), rhs=BaseNode(lhs=2)
                ),
            ],
        ),
        (
            [None, UnaryOperation.MINUS],
            BaseNode(lhs=2),
            [None, UnitaryOpNode(lhs=BaseNode(lhs=2), op=UnaryOperation.MINUS)],
        ),
    ],
)
def test_add_node_to_stack(current_stack, new_node, expected):
    new_stack = _add_node_to_stack(new_node, current_stack)
    assert new_stack == expected


@pytest.mark.parametrize(
    "expression, expected",
    [
        ("1", BaseNode(lhs=1)),
        (
            "1+2",
            BinaryOpNode(
                lhs=BaseNode(lhs=1), op=BinaryOperation.ADD, rhs=BaseNode(lhs=2)
            ),
        ),
        (
            "1+2*4",
            BinaryOpNode(
                lhs=BinaryOpNode(
                    lhs=BaseNode(lhs=1), op=BinaryOperation.ADD, rhs=BaseNode(lhs=2)
                ),
                op=BinaryOperation.MULTIPLY,
                rhs=BaseNode(lhs=4),
            ),
        ),  # This is actually incorrect, but program doesn't handle operation precedence yet
    ],
)
def test_parse_expression(expression, expected):
    parsed_expression = parse_from_string(expression)
    assert parsed_expression == expected
