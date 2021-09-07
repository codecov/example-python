import unittest

import awesome


class TestSmile(unittest.TestCase):
    def test_smile(self):
        self.assertEqual(awesome.smile(), ":)")
