import unittest

import awesome


class TestMethods(unittest.TestCase):
    def test_add(self):
        self.assertEqual(awesome.smile(), ":)")

    def test_frown(self):
        self.assertEqual(awesome.frown(), ":(")

    def test_dumb(self):
        self.assertEqual("apple", "apple")

if __name__ == '__main__':
    unittest.main()
