## {{ field.name }}

`{{ field.name }}` is a `geometry` field. Example query:

```
SELECT * FROM {{ table }} WHERE {{ field.name }} = '{{ field.sample }}'
```
 
### Output format
By default, geometry fields are output in Well-Known Binary (WKB) format. You
can request it in another format using [standard PostGIS
functions](http://postgis.net/docs/manual-2.0/reference.html#Geometry_Outputs)
such as `ST_AsGeoJSON` for GeoJSON and `ST_AsText` for Well-Known Text (WKT).
For example:

```
SELECT *, ST_AsText({{ field.name }}) AS {{ field.name }}_text
```

To return separate fields for the latitude and longitude (x/y), use `ST_X` and
`ST_Y`:

```
SELECT *, ST_Y({{ field.name }}) AS lat, ST_X({{ field.name }}) AS lng
```

Note that `ST_AsGeoJSON` returns a string of GeoJSON. If you're using this in an
application, you may prefer it output the GeoJSON as parsed JSON. To do this,
use `::json` to cast the field type to JSON.

```
SELECT *, ST_AsGeoJSON({{ field.name }})::json AS {{ field.name }}_geojson
```

