import pytest
from app.random import hello_world


@pytest.mark.parametrize(
    "language, expected",
    [("english", "Hello, World"), ("portuguese", "Olá, Mundo"), ("japanese", None)],
)
def test_hello_world(language, expected):
    assert hello_world(language) == expected
