from dataclasses import dataclass
from enum import Enum
from typing import Union
from app.calculator import Calculator


class BinaryOperation(Enum):
    ADD = Calculator.add
    SUBTRACT = Calculator.subtract
    MULTIPLY = Calculator.multiply
    DIVIDE = Calculator.divide
    POW = Calculator.pow
    SQRT = Calculator.sqrt


class UnaryOperation(Enum):
    SQRT = Calculator.sqrt
    MINUS = Calculator.minus


@dataclass
class BaseNode:
    lhs: float
    op = None


@dataclass
class UnitaryOpNode:
    op: UnaryOperation
    lhs: "Node"
    rhs = None


@dataclass
class BinaryOpNode:
    op: BinaryOperation
    lhs: "Node"
    rhs: "Node"


Node = Union[BaseNode, BinaryOpNode, UnitaryOpNode]


def evaluate_expression(root: Node):
    if root.op is None:
        # BaseNode (no operation)
        return root.lhs
    evaluated_lhs = evaluate_expression(root.lhs)
    if root.rhs is None:
        # UnitaryOpNode (operation receives a single argument)
        return root.op(evaluated_lhs)
    # BinaryOpNode (operation received 2 arguments)
    evaluated_rhs = evaluate_expression(root.rhs)
    return root.op(evaluated_lhs, evaluated_rhs)
