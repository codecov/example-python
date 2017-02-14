import unittest

import awesome


class TestMethods(unittest.TestCase):
    def test_add(self):
        self.assertEqual(awesome.smile(), ":)")

    def test_new(self):
        self.assertEqual(awesome.test(), "test")

    def test_failure(self):
        self.assertEqual(awesome.covered_failure(), "success")


if __name__ == '__main__':
    unittest.main()
