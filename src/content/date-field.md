## {{ field.name }}

`{{ field.name }}` is a `{{ field.type }}` field. Example query:

```
SELECT * FROM {{ table }} WHERE {{ field.name }} = '{{ field.sample }}'
```

### Date range
To get records within a date range, use less-than and greater-than operators.

```
SELECT * FROM {{ table }} WHERE {{ field.name }} >= '2017-01-01' AND {{ field.name }} < '2017-02-01'
```

### Current date
To compare records to the current date, use PostgreSQL's `current_date`
variable. For example, to get records from the past week:

```
SELECT * FROM {{ table }} WHERE {{ field.name }} >= current_date - 7
```
