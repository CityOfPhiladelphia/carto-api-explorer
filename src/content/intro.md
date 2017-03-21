# {{ table }}

This dataset is published to [carto](https://carto.com), which allows you to
query the data using SQL (specifically the PostgreSQL flavor with the PostGIS
extension). Rather than executing the queries in a database program, you execute
them through HTTP (ie. the web browser) via Carto's [SQL
API](https://carto.com/docs/carto-engine/sql-api), passing your query as the `q`
parameter. For example:

```
{{ endpoint }}?q=SELECT * FROM {{ table }}
```

You can do just about everyting you'd expect from a PostgreSQL+PostGIS database -
even joins between tables.

## Fields
