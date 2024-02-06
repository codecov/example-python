import subprocess

if __name__=="__main__":
    p = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True)
    print("p")
    print(p)
    print("p.stdout")
    print(p.stdout)
    print("eof")
    p = subprocess.run(["git", "remote"], capture_output=True)
    print()
    print("p")
    print(p)
    print("p.stdout")
    print(p.stdout)
    print("eof")
