[![Sponsor][sponsor-badge]][sponsor]
[![GitHub release][badge-github-release]][airqmon-latest-release]
[![GitHub Actions][badge-gh-actions]][gh-actions]
[![License][badge-license]][license]

# <img src="https://user-images.githubusercontent.com/1029142/32918679-7336704a-cb23-11e7-92b2-d8a7f2588055.png" width="38px" alt="Airqmon icon" align="top" /> Airqmon

Airqmon is a macOS menu bar application that displays live air quality data from the nearest sensor station. It can also notify you when the air quality index changes or when a new, closer station is found.

<p align="center">
  <img width="492" align="center" alt="Airqmon window with measurement details" src="https://github.com/jsynowiec/airqmon/raw/gh-pages/assets/airqmon-overview%402x.png" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/1029142/36537429-674931ba-17d0-11e8-88ee-c246226c1053.png" width="378px" align="center" alt="Airqmon notification about air quality" />
</p>

## Supported data providers

- [Airly][airly] - over 20k sensor stations in many cities around the world in addition to data provided from third-party services like PurpleAir. Check the [Airly map][airly-map] for full coverage.

## Source code-only

Due to the reasons described in [this comment](https://github.com/jsynowiec/airqmon/issues/50#issuecomment-1008751034), I am no longer willing to cover the monthly costs associated with the Airqmon API and Google Geolocation.

I have removed all binaries from the current and previous releases as they will no longer work. You can host the Airqmon API on your own and clone the latest release to build your version of the app.

## Build & installation

1. Clone the [latest release][airqmon-latest-release].
2. Install the dependancies with `yarn install`.
3. Build the binary with `yarn run package`.
4. Drag the binary from the `out` directory to your `Applications` folder.

## Preferences

There are a few options available to customize on the preferences window that you can access by clicking on the button with a cog or by pressing the `⌘ + ,` shortcut.

## Airqmon API

Starting from version 2, Airqmon depends on the [Airqmon API][airqmon-api] to find the nearest station and fetch measurements from Airly.

## Geolocation

With version 2.1.1, Airqmon switched to the free ip-api.com reverse geolocation service. If you want to switch back to the Google Geolocation API, revert the changes from the [1fe51d](https://github.com/jsynowiec/airqmon/commit/1fe51d966f15caeeca1e6385d01b96c6e266210c) commit.

## Privacy

Airqmon does not track any data.

### Credits

My sincere thanks to the following individuals for helping me with beta testing and for donating 🙏

| [![Michał Pierzchała](https://github.com/thymikee.png?size=50)](https://github.com/thymikee) | [![Konrad Dzwinel](https://github.com/kdzwinel.png?size=50)](https://github.com/kdzwinel) |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Michał Pierzchała](https://github.com/thymikee)                                             | [Konrad Dzwinel](https://github.com/kdzwinel)                                             |

## License

This app is an open-source software licensed under the [Apache License, Version 2.0][license]

[license]: https://raw.githubusercontent.com/jsynowiec/airqmon/main/LICENSE
[airqmon-latest-release]: https://github.com/jsynowiec/airqmon/releases/latest
[airqmon-api]: https://github.com/jsynowiec/airqmon-api
[gh-actions]: https://actions-badge.atrox.dev/jsynowiec/airqmon/goto?ref=main
[badge-github-release]: https://img.shields.io/github/release/jsynowiec/airqmon.svg
[badge-license]: https://img.shields.io/github/license/jsynowiec/airqmon.svg
[badge-gh-actions]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fjsynowiec%2Fairqmon%2Fbadge%3Fref%3Dmain&style=flat
[airly]: https://airly.eu/
[airly-map]: https://airly.org/map/en/
[airly-pricing]: https://airly.org/en/pricing/airly-api/
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/jsynowiec
