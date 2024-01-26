import pytest
from .calculator import Calculator


def test_add():
    assert Calculator.add(1, 2) == 3.0
    assert Calculator.add(1.0, 2.0) == 3.0
    assert Calculator.add(0, 2.0) == 2.0
    assert Calculator.add(2.0, 0) == 2.0
    assert Calculator.add(-4, 2.0) == -2.0

def test_subtract():
    assert Calculator.subtract(1, 2) == -1.0
    assert Calculator.subtract(2, 1) == 1.0
    assert Calculator.subtract(1.0, 2.0) == -1.0
    assert Calculator.subtract(0, 2.0) == -2.0
    assert Calculator.subtract(2.0, 0.0) == 2.0
    assert Calculator.subtract(-4, 2.0) == -6.0

def test_multiply():
    assert Calculator.multiply(1, 2) == 2.0
    assert Calculator.multiply(1.0, 2.0) == 2.0
    assert Calculator.multiply(0, 2.0) == 0.0
    assert Calculator.multiply(2.0, 0.0) == 0.0
    assert Calculator.multiply(-4, 2.0) == -8.0

def test_divide():
    # assert Calculator.divide(1, 2) == 0.5
    assert Calculator.divide(1.0, 2.0) == 0.5
    assert Calculator.divide(0, 2.0) == 0
    assert Calculator.divide(-4, 2.0) == -2.0
    # assert Calculator.divide(2.0, 0.0) == 'Cannot divide by 0'

def test_sqrt():
    assert Calculator.sqrt(100) == pytest.approx(10)
    assert Calculator.sqrt(4) == pytest.approx(2)
    assert Calculator.sqrt(2) == pytest.approx(1.4142, 1e-3)
    assert Calculator.sqrt(1) == pytest.approx(1)
    assert Calculator.sqrt(100, 0.0000001) == pytest.approx(10)
    assert Calculator.sqrt(2, 0.01) == pytest.approx(1.414, 1e-2)
    assert Calculator.sqrt(2, 0.0000001) == pytest.approx(1.41421356237, 1e-7)

def test_pow():
    assert Calculator.pow(2, 2) == 4
    assert Calculator.pow(1, 2) == 1
    assert Calculator.pow(4, 2) == 16
    assert Calculator.pow(3, 3) == 27
    assert Calculator.pow(10, 5) == 100000