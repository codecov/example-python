# [Codecov][0] Python Example
## Guide
### Travis Setup

Add the following to your `.travis.yml`:
```yml
language:
  python
after_success:
  - bash <(curl -s https://codecov.io/bash)
```
### Produce Coverage Reports
`coverage.py <https://bitbucket.org/ned/coveragepy>`_ is required to collect coverage metrics.

Below are some examples on how to include coverage tracking during your tests. Codecov will call `coveragexml -i` automatically to generate the coverage xml output, which will be archived and processed server side.

You may need to configure a ``.coveragerc`` file. Learn more `here <http://coverage.readthedocs.org/en/latest/config.html>`_. Start with this `generic .coveragerc <https://gist.github.com/codecov-io/bf15bde2c7db1a011b6e>`_ for example.

We highly suggest adding `source` to your ``.coveragerc`` which solves a number of issues collecting coverage.

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
ptest --cov=./
```
#### nosetests
```
nosetest --with-coverage
```
See the `Offical Nose coverage docs <http://nose.readthedocs.org/en/latest/plugins/cover.html>`_ for more information.

### Testing with ``tox``

Codecov can be run from inside your ``tox.ini`` please make sure you pass all the necessary environment variables through:
```ini
[testenv]
passenv = CI TRAVIS TRAVIS_*
deps = codecov
commands = codecov
```
## Caveats
#### Private Repo
You will need to add the following your `.travis.yml`:
```yml
env:
  global:
    - CODECOV_TOKEN=:uuid-repo-token
```

## Support

### FAQ
- Q:  Whats the different between the codecov-bash and codecov-python uploader?<br/>A: As far as python is concerned, *nothing*. You may choose to use either uploader. Codecov recommends **using the bash uploader when possible** as it supports more unique repository setups. Learn more at `codecov/codecov-bash <https://github.com/codecov/codecov-bash>`_ and `codecov/codecov-python <https://github.com/codecov/codecov-python>`_.
- Q:  Why am I seeing `No data to report`?<br/>A: This output is written by running the command ``coverage xml`` and states that there were no ``.coverage`` files found.
	1. Make sure coverage is enabled. See Enabling Coverage
	2. You may need to run `coverage combine` before running Codecov.
	3. Using Docker? Please follow this step: `Testing with Docker: Codecov Inside Docker <https://github.com/codecov/support/wiki/Testing-with-Docker#codecov-inside-docker>`_.
- Q: Can I upload my ``.coverage`` files?<br/> A: **No**, these files contain coverage data but are not properly mapped back to the source code. We rely on ``coveragepy`` to handle this by calling ``coverage xml`` in the uploader.
### Contact
- Intercom (in-app messanger)
- Email: support@codecov.io
- Slack: slack.codecov.io
- [gh/codecov/support](https://github.com/codecov/support)

1. More documentation at https://docs.codecov.io
2. Configure codecov through the `codecov.yml`  https://docs.codecov.io/docs/codecov-yaml
3. View source and learn more about [Codecov Global Uploader](https://github.com/codecov/codecov-bash)

[0]: https://codecov.io/
