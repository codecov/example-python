class Calculator:
    def power(self, x,y):
        if y >1:
            return x * Calculator.power(self,x,y-1)
        return x
    
    def add(x, y):
        return x + y

    def subtract(x, y):
        return x - y

    def multiply(x, y):
        return x * y

    def divide(x, y):
        if y == 0:
            return 'Cannot divide by 0'
        return x * 1.0 / y


def main():
	cal = Calculator()
	print(cal.power(2,3))

if __name__ == "__main__":
	main()
