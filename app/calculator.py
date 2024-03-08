class Calculator:
    def add(x, y):
        return x + y

    def subtract(x, y):
        return x - y

    def multiply(x, y):
        return x * y

    def divide(x, y):
        if y == 0:
            return "Cannot divide by 0"
        return x * 1.0 / y

    def sqrt(x, precision=0.0005):
        guess = 1
        while abs(x - (guess * guess)) >= precision:
            guess = 0.5 * (guess + (x / guess))
        return guess

    def pow(x, e):
        result = 1
        while e:
            if e & 1:
                result *= x
            x *= x
            e >>= 1
        return result

    def minus(x):
        return -x
