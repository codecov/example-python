from dataclasses import dataclass
from enum import Enum
from typing import Union
from app.calculator import Calculator

from functools import partial


# Why wrap the function of the enum in partial?
# https://stackoverflow.com/a/40339397
class BinaryOperation(Enum):
    """Represents a Calculator operation along with its precedence over other operations.
    Formatted as (function, precedence_value)
    smaller precedence_value should be executed first
    """

    ADD = (partial(Calculator.add), 3)
    SUBTRACT = (partial(Calculator.subtract), 3)
    MULTIPLY = (partial(Calculator.multiply), 2)
    DIVIDE = (partial(Calculator.divide), 2)
    POW = (partial(Calculator.pow), 1)
    SQRT = (partial(Calculator.sqrt), 1)

    def __call__(self, *args):
        op, _ = self.value
        return op(*args)

    def __eq__(self, value: object) -> bool:
        if type(value) != BinaryOperation:
            return False
        return value.value == self.value

    def __lt__(self, value: object) -> bool:
        if type(value) not in [BinaryOperation, UnaryOperation]:
            raise TypeError(f"can't compare BinaryOperation with {type(value)}")
        if type(value) == UnaryOperation:
            # UnaryOperation always has precedence over binary ones
            return False
        _, precedence_value = self.value
        _, other_precedence_value = value.value
        return precedence_value < other_precedence_value

    def __repr__(self) -> str:
        return f"{self.name}"


class UnaryOperation(Enum):
    # TODO: Support Unary +
    SQRT = partial(Calculator.sqrt)
    MINUS = partial(Calculator.minus)

    def __repr__(self) -> str:
        return f"{self.name}"

    def __call__(self, *args):
        return self.value(*args)

    def __eq__(self, value: object) -> bool:
        if type(value) != UnaryOperation:
            return False
        return value.value == self.value

    def __lt__(self, value: object) -> bool:
        if type(value) not in [BinaryOperation, UnaryOperation]:
            raise TypeError(f"can't compare UnaryOperation with {type(value)}")
        if type(value) == BinaryOperation:
            # UnaryOperation has precedence over BinaryOperation
            return True
        # All UnaryOperations have the same level of precedence among themselves
        return False


@dataclass
class BaseNode:
    lhs: float
    op = None

    def __repr__(self) -> str:
        return "[{}]".format(self.lhs)


@dataclass
class UnitaryOpNode(BaseNode):
    op: UnaryOperation
    lhs: "Node"
    rhs = None

    def __repr__(self) -> str:
        return f"{self.op.name}({self.lhs})"


@dataclass
class BinaryOpNode(BaseNode):
    op: BinaryOperation
    lhs: "Node"
    rhs: "Node" = None

    def __repr__(self) -> str:
        return f"{self.op.name}({self.lhs}, {self.rhs})"


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
