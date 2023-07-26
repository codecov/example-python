import unittest

from app.projectB.adder import Adder



class TestAdder(unittest.TestCase):
    def test_adder(self, x, y):
        assert x + y == Adder.add(x, y)