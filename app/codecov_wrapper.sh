#/bin/bash

# `bazel coverage --run_under foo :bar` basically translates to:
#     foo pytest --cov bar/src/a.py bar/src/b.py
# We want to run that `pytest` command unmodified, as below:
"$@"
source venv/bin/activate
pip install codecov-cli
# Now we want to run `codecovcli`
# CODECOV_TOKEN=<hardcoded per project :(> codecovcli create-commit
# CODECOV_TOKEN=<hardcoded per project :(> codecovcli create-report
# CODECOV_TOKEN=<hardcoded per project :(> codecovcli do-upload
