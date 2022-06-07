import unittest

import awesome


class TestMethods(unittest.TestCase):
    def test_add(self):
        self.assertEqual(awesome.smile(), ":)")

    def test_add_again(self):
        self.assertEqual(awesome.smile(), ":)")

    def test_if(self):
        self.assertTrue(awesome.test_if(1))


if __name__ == '__main__':
    unittest.main()
