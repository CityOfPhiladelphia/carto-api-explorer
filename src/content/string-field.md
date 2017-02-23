## {{ field.name }}

`{{ field.name }}` is a `string` field. Example query:

```
SELECT * FROM {{ table }} WHERE {{ field.name }} = '{{ field.sample }}'
```
 
### Partial matches
Use `LIKE` and the `%` wildcard character inside a string to find partial matches.

```
SELECT * WHERE {{ field.name }} LIKE '{{ field.sample.substr(0, field.sample.length / 2) }}%'
```

