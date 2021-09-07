import unittest

import awesome


class TestSmile(unittest.TestCase):
    def test_frown(self):
        self.assertEqual(awesome.frown(), ":(")
