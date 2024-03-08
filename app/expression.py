from dataclasses import dataclass
from enum import Enum
from typing import Union
from app.calculator import Calculator

from functools import partial

# Why wrap the function of the enum in partial?
# https://stackoverflow.com/a/40339397
class BinaryOperation(Enum):
    ADD = partial(Calculator.add)
    SUBTRACT = partial(Calculator.subtract)
    MULTIPLY = partial(Calculator.multiply)
    DIVIDE = partial(Calculator.divide)
    POW = partial(Calculator.pow)
    SQRT = partial(Calculator.sqrt)

    def __call__(self, *args):
        return self.value(*args)


class UnaryOperation(Enum):
    # TODO: Support Unary +
    SQRT = partial(Calculator.sqrt)
    MINUS = partial(Calculator.minus)

    def __call__(self, *args):
        return self.value(*args)


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
Operation = Union[UnaryOperation, BinaryOperation]


def evaluate_expression(root: Node) -> float:
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
