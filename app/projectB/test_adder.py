import unittest

from app.projectB.adder import Adder


class TestAdder(unittest.TestCase):
    def test_adder(self):
        assert 2 + 3 == Adder().add(2, 3)

if __name__ == "__main__":
    unittest.main()