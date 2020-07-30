
`(
  SELECT array_to_json(array_agg(row_to_json(nested_query))) 
  FROM (
    SELECT FROM nested_table
    WHERE nested_table.parent_id = parent_table.id
  )
  AS nested_query
) AS property_name`
