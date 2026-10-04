from .calculator import Calculator
from .smiles import Smiles


def test_modules_import():
    assert Calculator and Smiles
