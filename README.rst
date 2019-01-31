[Codecov] Python Example
=========================

.. contents:: Topics

.. image:: https://codecov.io/gh/codecov/example-python/branch/master/graph/badge.svg
  :target: https://codecov.io/gh/codecov/example-python

Overview
--------


website: `Codecov <https://codecov.io/>`_.

.. code-block:: shell-session

   # 1) install codecov
   pip install codecov

   # 2) next call "codecov" at end of CI build
   # public repo using Travis, CircleCI or AppVeyor
   codecov

   # all other CI and private repositories
   codecov --token=<repo token>


You can alternatively use the environment variables:

+----------+-------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
| Argument |   Environment     |                                                                    Description                                                                     |
+==========+===================+====================================================================================================================================================+
| ``-t``   | ``CODECOV_TOKEN`` | Private repo token for uploading                                                                                                                   |
+----------+-------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-e``   | ``CODECOV_ENV``   | List of config vars to store for the build                                                                                                         |
+----------+-------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-F``   |                   | Flag this upload to group coverage reports. Ex. ``unittests`` or ``integration``. `Read the docs <http://docs.codecov.io/docs/flags>`_.            |
+----------+-------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+


How to generate coverage reports
================================

`coverage.py <https://github.com/nedbat/coveragepy>`_ is required to collect coverage metrics.

Below are some examples on how to include coverage tracking during your tests. Codecov will call `coverage xml -i` automatically to generate the coverage xml output, which will be archived and processed server side.

You may need to configure a ``.coveragerc`` file. Learn more `here <http://coverage.readthedocs.org/en/latest/config.html>`_. Start with this `generic .coveragerc <https://gist.github.com/codecov-io/bf15bde2c7db1a011b6e>`_ for example.

We highly suggest adding ``source`` to your ``.coveragerc``, which solves a number of issues collecting coverage.

.. code-block:: ini

   [run]
   source=your_package_name
   
If there are multiple sources, you instead should add ``include`` to your ``.coveragerc``

.. code-block:: ini

   [run]
   include=your_package_name/*

unittests
---------

.. code-block:: shell-session

   pip install coverage
   coverage run tests.py

pytest
------

.. code-block:: shell-session

   pip install pytest pytest-cov
   pytest --cov=./

nosetests
--------


.. code-block:: shell-session

   nosetests --with-coverage

See the `Offical Nose coverage docs <http://nose.readthedocs.org/en/latest/plugins/cover.html>`_ for more information.

Testing with ``tox``
====================

Codecov can be run from inside your ``tox.ini`` please make sure you pass all the necessary environment variables through:

.. code-block:: ini

   [testenv]
   passenv = CI TRAVIS TRAVIS_*
   deps = codecov
   commands = codecov

See all the environment variables for `other CI providers  <https://github.com/codecov/codecov-bash/blob/master/env>`_.


-------

Frequently Asked Questions
==========================

Whats the different between the codecov-bash and codecov-python uploader?
-------------------------------------------------------------------------

As far as python is concerned, *nothing*. You may choose to use either uploader. Codecov recommends **using the bash uploader when possible** as it supports more unique repository setups.

Learn more at `codecov/codecov-bash <https://github.com/codecov/codecov-bash>`_ and `codecov/codecov-python <https://github.com/codecov/codecov-python>`_.


Why am I seeing ``No data to report``?
--------------------------------------

This output is written by running the command ``coverage xml`` and states that there were no ``.coverage`` files found.

1. Make sure coverage is enabled. See Enabling Coverage
2. You may need to run ``coverage combine`` before running Codecov.
3. Using Docker? Please follow this step: `Testing with Docker <https://docs.codecov.io/docs/testing-with-docker>`_.

Can I upload my ``.coverage`` files?
------------------------------------

**No**, these files contain coverage data but are not properly mapped back to the source code. We rely on ``coveragepy`` to handle this by calling ``coverage xml`` in the uploader.

How can I integrate with CI/CD providers?
-----------------------------------------

Please see the documentation at our `Python repository <https://github.com/codecov/codecov-python/blob/master/README.md#ci-providers>`_


How do I link to badges?
------------------------

Details on the badges and graphs can be found under `settings/Badge  <https://codecov.io/gh/owner/repo/settings/badge>`_, for example the following RST can be used:

.. code-block::

   .. image:: https://codecov.io/gh/codecov/example-python/branch/master/graph/badge.svg
     :target: https://codecov.io/gh/codecov/example-python


Which will generate:

.. image:: https://codecov.io/gh/codecov/example-python/branch/master/graph/badge.svg
  :target: https://codecov.io/gh/codecov/example-python

Links
=======

* Main website: `Codecov <https://codecov.io/>`_.
* Twitter: `@codecov <https://twitter.com/codecov>`_.
* Email: `hello@codecov.io <hello@codecov.io>`_.

We are happy to help if you have any questions. Please contact email our Support at `support@codecov.io <mailto:support@codecov.io>`_.
