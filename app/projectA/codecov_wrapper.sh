#/bin/bash

# `bazel coverage --run_under foo :bar` basically translates to:
#     foo pytest --cov bar/src/a.py bar/src/b.py
# We want to run that `pytest` command unmodified, as below:
"$@"

# codecov doesn't recognise pylcov.dat as a coverage report, renaming it to lcov.dat so codecov can acknowledge it  
mv $COVERAGE_DIR/pylcov.dat $COVERAGE_DIR/lcov.dat

# uploading coverage
codecovcli -v create-commit -t $CODECOV_TOKEN
codecovcli -v create-report -t $CODECOV_TOKEN
codecovcli -v do-upload -t $CODECOV_TOKEN -s $COVERAGE_DIR


