[Codecov][1] Python Example
===========================

```sh
# 1) install codecov
pip install codecov

# 2) next call "codecov" at end of CI build
# public repo using Travis, CircleCI or AppVeyor
codecov

# all other CI and private repositories
codecov --token=<repo token>
```

You can alternatively use the environment variables: 

| Argument |   Environment   |                                                                    Description                                                                     |
| -------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-t`     | `CODECOV_TOKEN` | Private repo token for uploading                                                                                                                    |
| `-e`     | `CODECOV_ENV`   | List of config vars to store for the build  |
| `-F`     |      | Flag this upload to group coverage reports. Ex. `unittests` or `integration`. [Read the docs](http://docs.codecov.io/docs/flags)  |

# How to generate coverage reports

[coverage.py](https://bitbucket.org/ned/coveragepy) is required to collect coverage metrics. Below are some examples on how to include coverage tracking during your tests. Codecov will call `coverage xml -i` automatically to generate the coverage xml output, which will be archived and processed server side.

> You may need to configure a `.coveragerc` file. Learn more here: http://coverage.readthedocs.org/en/latest/config.html. Start with this [generic `.coveragerc`](https://gist.github.com/codecov-io/bf15bde2c7db1a011b6e) for example.

We highly suggest adding `source` to your `.coveragerc` which solves a number of issues collecting coverage.

```
[run]
source=your_package_name
```

#### unittests

```sh
pip install coverage
coverage run tests.py
```

#### pytest

```sh
pip install pytest-cov
py.test --cov=./
```

#### nosetests
> http://nose.readthedocs.org/en/latest/plugins/cover.html

```sh
nosetest --with-coverage
```

# Testing with `tox`

Codecov can be run from inside your `tox.ini` please make sure you pass all the necessary environment variables through:

```ini
[testenv]
passenv = CI TRAVIS TRAVIS_*
deps = codecov
commands = codecov
```
> See all the environment variable for other CI providers [here](https://github.com/codecov/codecov-bash/blob/master/env). 


-------

# Frequently Asked Questions

####❔Whats the different between the codecov-bash and codecov-python uploader?

As far as python is concerned, **nothing**. You may choose to use either uploader. Codecov recommends using the bash uploader when possible as it supports more unique repository setups.

Learn more at [codecov/codecov-bash](https://github.com/codecov/codecov-bash) and [codecov/codecov-python](https://github.com/codecov/codecov-python)


####❔Why am I seeing `No data to report.`
This output is written by running the command `coverage xml` and states that there were no `.coverage` files found.

1. Make sure coverage is enabled. See [Enabling Coverage](#enabling-coverage)
2. You may need to run `coverage combine` before running Codecov
3. Using Docker? Please follow this step: [Testing with Docker: Codecov Inside Docker](https://github.com/codecov/support/wiki/Testing-with-Docker#codecov-inside-docker)

####❔Can I upload my `.coverage` files? 

**No**, these files contain coverage data but are not properly mapped back to the source code. We rely on `coveragepy` to handle this by calling `coverage xml` in the uploader.

####? How can I integrate with CICD providers? 

Please see the documentation at our [Python repository](https://github.com/codecov/codecov-python/blob/master/README.md#ci-providers)

[1]: https://codecov.io/
[2]: https://twitter.com/codecov
[3]: mailto:hello@codecov.io
[4]: https://codecov.io/github/codecov/example-python
