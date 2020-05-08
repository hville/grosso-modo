<!-- markdownlint-disable MD022 MD024 MD026 MD032 MD041 -->

# Change Log

- based on [Keep a Changelog](http://keepachangelog.com/)
- adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
~~Removed, Changed, Deprecated, Added, Fixed, Security~~

## [3.1.1] - 2020-05-07
### Added
- more confidence tests

## [3.1.0] - 2020-03-14
### Added
- Weibull distribution

## [3.0.1] - 2019-07-03
### Fixed
- Removed duplicate requires of the same function

## [3.0.0] - 2019-07-03
### Changed
- Uses module `norm-dist/icdf` instead of `random-z` for faster random Z generation

## [2.1.0] - 2017-12-05
### Changed
- each function in own file
- updated dependencies
- JSDoc and types

## [2.0.0] - 2017-01-06
### Changed
- Negative inputs for the lognormal distribution now throw an error to avoid unexpected behaviour
- The documentation and code of the `step` function have been clarified with additional test cases

### Added
- `CHANGELOG.md`
- `.editorconfig`
- Additional test cases
- JSDoc comments

### Fixed
- minor simplifications

## [1.0.0] - 2016-10-14
### Added
- First publish
