#/bin/bash

# `bazel coverage --run_under foo :bar` basically translates to:
#     foo pytest --cov bar/src/a.py bar/src/b.py
# We want to run that `pytest` command unmodified, as below:
"$@"
#COVERAGE_DIR="$CURR_DIR/bazel-out/_coverage"
# Now you can use $COVERAGE_DIR to access the coverage report files
# For example, if you want to print the coverage report path:
echo "Coverage report path: $COVERAGE_DIR"
# Assuming you are in the root of your workspace
mv $COVERAGE_DIR/pylcov.dat $COVERAGE_DIR/lcov.dat

# Get the root of the Git repository
GIT_DIR="$GIT_DIR"
codecovcli -v --url http://localhost:8000 create-commit -t dc93f68d-1a9e-4c37-a184-8ec34cd335a2
codecovcli -v --url http://localhost:8000 create-report -t dc93f68d-1a9e-4c37-a184-8ec34cd335a2
codecovcli -v --url http://localhost:8000 do-upload -t dc93f68d-1a9e-4c37-a184-8ec34cd335a2 --plugin gcov --plugin pycoverage -s $COVERAGE_DIR


