
from app.calculator import Calculator

import unittest



class TestMethods(unittest.TestCase):
    def test_add(self):
        self.assertEqual(True, True)
    
    def test_add(self):
        self.assertEqual(Calculator.add(1, 2), 3.0)
        self.assertEqual(Calculator.add(1.0, 2.0), 3.0)
        self.assertEqual(Calculator.add(0, 2.0), 2.0)
        self.assertEqual(Calculator.add(2.0, 0), 2.0)
        self.assertEqual(Calculator.add(-4, 2.0), -2.0)

    def test_subtract(self):
        self.assertEqual(Calculator.subtract(1, 2) , -1.0)
        self.assertEqual(Calculator.subtract(2, 1) , 1.0)
        self.assertEqual(Calculator.subtract(1.0, 2.0) , -1.0)
        self.assertEqual(Calculator.subtract(0, 2.0) , -2.0)
        self.assertEqual(Calculator.subtract(2.0, 0.0) , 2.0)
        self.assertEqual(Calculator.subtract(-4, 2.0) , -6.0)

    def test_multiply(self):
        self.assertEqual(Calculator.multiply(1, 2) , 2.0)
        self.assertEqual(Calculator.multiply(1.0, 2.0) , 2.0)
        self.assertEqual(Calculator.multiply(0, 2.0) , 0.0)
        self.assertEqual(Calculator.multiply(2.0, 0.0) , 0.0)
        self.assertEqual(Calculator.multiply(-4, 2.0) , -8.0)

    def test_divide(self):
        self.assertEqual(Calculator.divide(1.0, 2.0) , 0.5)
        self.assertEqual(Calculator.divide(0, 2.0) , 0)
        self.assertEqual(Calculator.divide(-4, 2.0) , -2.0)

if __name__ == "__main__":
    unittest.main()
