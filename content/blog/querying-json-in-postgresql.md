---
title: "Querying JSON in PostgreSQL"
description: "PostgreSQL is a powerful open-source relational database system that supports advanced data types, including **JSON** and **JSONB**. These types allow you to store and query semi-structured data efficiently, combining the"
date: 2024-11-25
tags: [postgresql]
draft: false
readingTime: 4 min
cover: /banner-test.jpg
---

PostgreSQL is a powerful open-source relational database system that supports advanced data types, including **JSON** and **JSONB**. These types allow you to store and query semi-structured data efficiently, combining the flexibility of NoSQL databases with the robust querying capabilities of SQL.

This tutorial will cover everything you need to know to query JSON data in PostgreSQL, from the basics to advanced querying techniques.

You can find [PostgreSQL documentation here](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING).

## **Understanding `JSON` vs `JSONB`**

- **JSON**: Stores data as text and validates JSON format but is less optimized for querying, does not support indexing.
- **JSONB**: Stores data in a binary format, optimized for queries and indexing.

## **When to Use JSON/JSONB?**

- Use JSONB when you frequently query and manipulate JSON fields.
- Use JSON when the primary purpose is to store and retrieve the original JSON data without querying it.

**Recommendation**: Use `JSONB` for better performance unless you need to preserve the exact input format of the JSON.

### **Creating a Table with JSON/JSONB Columns**

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    details JSONB -- or JSON
);
```

### **Inserting JSON Data**

```sql
INSERT INTO products (name, details)
VALUES
 ('Laptop', '{"price": 1200, "specifications": {"RAM": "16GB", "CPU": "Intel i7"}}'),
 ('Smartphone', '{"price": 800, "specifications": {"RAM": "8GB", "CPU": "Snapdragon 888"}}');
```

## **Querying JSON Data**

### **Selecting Specific Values Using `>`**

The `->` operator extracts a JSON object or array element as JSON.

```sql
SELECT name, details->'price' AS price
FROM products;
```

### **Extracting Values as Text with `>>`**

The `->>` operator extracts a value as plain text.

```sql
SELECT name, details->>'price' AS price
FROM products;
```

### **Querying Nested JSON Keys**

```sql
SELECT name, details->'specifications'->>'RAM' AS RAM
FROM products;
```

## **Filtering JSON Data**

### **Using Conditions**

```sql
SELECT *
FROM products
WHERE (details->>'price')::INTEGER > 1000;
```

### **Using the Containment Operator `@>`**

The `@>` operator checks if a JSON object contains a specific key-value pair.

```sql
SELECT *
FROM products
WHERE details @> '{"price": 1200}';
```

## **Indexing JSONB Columns**

PostgreSQL supports efficient indexing for JSONB using GIN (Generalized Inverted Index).

### **Creating a GIN Index**

```sql
CREATE INDEX idx_products_details ON products USING GIN (details);
```

### **Querying with Index Optimization**

```sql
SELECT *
FROM products
WHERE details @> '{"specifications": {"RAM": "16GB"}}';
```

## **Manipulating JSON Data**

### **Adding or Updating a Key**

```sql
UPDATE products
SET details = jsonb_set(details, '{color}', '"black"')
WHERE name = 'Laptop';
```

### **Removing a Key**

```sql
UPDATE products
SET details = details - 'color'
WHERE name = 'Laptop';
```

### **Adding Elements to a JSON Array**

```sql
UPDATE products
SET details = jsonb_set(details, '{extensions}', '[500, 1000]', true)
WHERE name = 'Laptop';
```

## **Handling JSON Stored as `TEXT`**

### **Verifying JSON Validity**

You can validate if a `TEXT` column contains valid JSON:

```sql
SELECT *
FROM products
WHERE json_valid(details::JSON);
```

### **Querying JSON in `TEXT` Columns**

To query JSON stored as `TEXT`, cast the column to `JSON` or `JSONB`:

```sql
SELECT name, (details::JSON)->>'price' AS price
FROM products;
```

### **Filtering with Conditions**

```sql
SELECT *
FROM products
WHERE (details::JSON)->>'price'::INTEGER > 1000;
```

### **Using Text Functions for Simpler Queries**

You can manipulate the `TEXT` column with string functions if casting is not an option:

- **Using `LIKE` to search for keys**:

```sql
SELECT *
FROM products
WHERE details LIKE '%"price": 1200%';
```

- **Extracting values with `regexp_replace`**:

```sql
SELECT
    name,
    regexp_replace(details, '.*"price":\s*([0-9]+).*', '\1')::INTEGER AS price
FROM products
WHERE details LIKE '%"price":%';
```

## **Migrating a `TEXT` Column to `JSONB`**

If you need to transition from `TEXT` to `JSONB`, follow these steps:

### **Add a New JSONB Column**

```sql
ALTER TABLE products ADD COLUMN details_jsonb JSONB;
```

### **Copy Data into the New Column**

```sql
UPDATE products
SET details_jsonb = details::JSONB;
```

### **Remove the Old Column and Rename the New One**

```sql
ALTER TABLE products DROP COLUMN details;
ALTER TABLE products RENAME COLUMN details_jsonb TO details;
```

## **Advanced JSON Queries**

### **Listing Keys or Values**

- **Listing keys**:

```sql
SELECT jsonb_object_keys(details) AS keys
FROM products;
```

- **Extracting values**:

```sql
SELECT details->'specifications'->'CPU' AS CPU
FROM products;
```

### **Converting JSON Arrays into Rows**

```sql
SELECT name, jsonb_array_elements(details->'extensions') AS extension
FROM products;
```

### **Querying and Transforming JSON Data**

```sql
SELECT name, (details->>'price')::INTEGER * 0.8 AS discounted_price
FROM products
WHERE (details->>'price')::INTEGER > 500;
```

## **Conclusion**

PostgreSQL offers powerful tools for working with JSON data, from querying nested keys to optimizing searches with indexes. While working with JSON stored in a `TEXT` column is possible, transitioning to `JSONB` is highly recommended for better performance and functionality. Use this guide as a reference to fully leverage PostgreSQL’s JSON capabilities.

By mastering these techniques, you'll harness the full potential of PostgreSQL's JSON capabilities for flexible, efficient data management.
