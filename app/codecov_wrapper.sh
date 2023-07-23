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
codecovcli -v create-commit -t 02d15256-c911-4a8e-a642-1685b111da77
codecovcli -v create-report -t 02d15256-c911-4a8e-a642-1685b111da77
codecovcli -v do-upload -t 02d15256-c911-4a8e-a642-1685b111da77 --plugin gcov --plugin pycoverage -s $COVERAGE_DIR


