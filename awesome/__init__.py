def smile():
    return ":)"


def frown():
    return ":("


def fib(n):
    if n < 2:
        return 1
    return fib(n) + fib(n-1)
