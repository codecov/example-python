# [Codecov](https://codecov.io) Python Example
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fexample-python.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fexample-python?ref=badge_shield)


## Guide

### GitHub Actions
A minimal configuration for public repos:

```yml
steps:
  # (Other steps go here)
  - name: "Upload coverage to Codecov"
    uses: codecov/codecov-action@v1
    with:
      fail_ci_if_error: true
```

See [codecov/codecov-action](https://github.com/codecov/codecov-action) for
more information, a [detailed example](https://github.com/codecov/codecov-action#example-workflowyml-with-codecov-action),
and other options.

### Travis Setup

Add the following to your `.travis.yml`:
```yml
language:
  python
after_success:
  - bash <(curl -s https://codecov.io/bash)
```

### Produce Coverage Reports
[coverage.py](https://github.com/nedbat/coveragepy) is required to collect coverage metrics.

Below are some examples on how to include coverage tracking during your tests. Codecov will call `coveragexml -i` automatically to generate the coverage xml output, which will be archived and processed server side.

You may need to configure a `.coveragerc` file. Learn more [here](http://coverage.readthedocs.org/en/latest/config.html). Start with this [generic .coveragerc](https://gist.github.com/codecov-io/bf15bde2c7db1a011b6e) for example.

We highly suggest adding `source` to your `.coveragerc` which solves a number of issues collecting coverage.

```ini
[run]
source=your_package_name
```
#### unittests
```
pip install coverage
coverage run tests.py
```
#### pytest
```
pip install pytest-cov
pytest --cov=./
```
#### nosetests
```
nosetest --with-coverage
```
See the [Offical Nose coverage docs](http://nose.readthedocs.org/en/latest/plugins/cover.html) for more information.

### Testing with ``tox``

Codecov can be run from inside your `tox.ini` please make sure you pass all the necessary environment variables through:
```ini
[testenv]
passenv = CI TRAVIS TRAVIS_*
deps = codecov
commands = codecov
```

### FAQ
- Q:  What's the difference between the codecov-bash and codecov-python uploader?  
  A: As far as python is concerned, *nothing*. You may choose to use either uploader. Codecov recommends **using the bash uploader when possible** as it supports more unique repository setups. Learn more at [codecov/codecov-bash](https://github.com/codecov/codecov-bash) and [codecov/codecov-python](https://github.com/codecov/codecov-python).
- Q:  Why am I seeing `No data to report`?  
  A: This output is written by running the command `coverage xml` and states that there were no `.coverage` files found.
	1. Make sure coverage is enabled. See Enabling Coverage
	2. You may need to run `coverage combine` before running Codecov.
	3. Using Docker? Please follow this step: [Testing with Docker: Codecov Inside Docker](https://docs.codecov.io/docs/testing-with-docker#codecov-inside-docker).
- Q: Can I upload my `.coverage` files?  
  A: **No**, these files contain coverage data but are not properly mapped back to the source code. We rely on `coveragepy` to handle this by calling `coverage xml` in the uploader.

## Caveats
### Private Repo
Repository tokens are required for (a) all private repos, (b) public repos not using the GitHub Actions, Travis CI, CircleCI or AppVeyor.

Find your repository token at Codecov and provide via appending `-t <your upload token>` to you where you upload reports.

### Cobertura Reports
Cobertura reports can expire - Codecov will reject reports that are older than 12 hours. The logs contain details if a report expired.

## Links
- [Community Boards](https://community.codecov.io)
- [Support](https://codecov.io/support)
- [Documentation](https://docs.codecov.io)



## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fexample-python.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fexample-python?ref=badge_large)
