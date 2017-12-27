import unittest

import awesome


class TestMethods(unittest.TestCase):
    def test_add(self):
        self.assertEqual(awesome.smile(), ":)")
        self.assertEqual(awesome.cry(), ":'(")
        self.assertEqual(awesome.bigsmile(), ":D")


if __name__ == '__main__':
    unittest.main()
