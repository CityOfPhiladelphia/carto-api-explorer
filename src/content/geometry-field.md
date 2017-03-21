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

### Radius search
To query records that fall within the radius of a particular point, you can
use PostGIS' [`ST_DWithin`](http://postgis.net/docs/ST_DWithin.html) function.
`ST_DWithin` expects `geography` types as parameters rather than `geometry`
types, so you'll need to (a) cast the location field (`{{ field.name }}`) to a
`geography`, and (b) create a `geography` from the particular point you're
querying. The final parameter is the radius in meters.

```
SELECT * FROM {{ table }} WHERE ST_DWithin({{ field.name }}::geography,
ST_GeographyFromText('POINT(-75.1652 39.9526)'), 50)
```
