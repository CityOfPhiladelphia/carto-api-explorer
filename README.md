# Carto API Explorer

Generates API documentation for a dataset hosted on [carto](https://carto.com).
Inspired by Socrata's [API
Foundry](https://dev.socrata.com/foundry/data.phila.gov/sspu-uyfa), this
application queries Carto's API to get field names, types, and example values,
then generates a page with usage examples and basic documentation.

**Work in progress.** [View the
demo](http://carto-api-explorer.surge.sh/#timwis.carto.com/crimes_2015_to_oct_2016).

Also note this is my (@timwis) first time using [MobX](https://mobx.js.org/) so
please let us know if there are any suggestions!

## Usage

1. Install dependencies via `npm install` or `yarn install`
2. Copy `.env.sample` to `.env` and modify configuration as necessary
3. Run a development server using `npm start` or `yarn start`
