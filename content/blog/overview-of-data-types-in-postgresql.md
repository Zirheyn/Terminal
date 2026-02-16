---
title: "Overview of data types in PostgreSQL"
description: "PostgreSQL is a powerful and extensible relational database management system (RDBMS). It supports a wide range of data types that allow precise modeling of diverse information. Below is a detailed overview of PostgreSQL"
date: 2024-12-04
tags: [postgresql]
draft: false
readingTime: 5 min
cover: /banner-test.jpg
---

PostgreSQL is a powerful and extensible relational database management system (RDBMS). It supports a wide range of data types that allow precise modeling of diverse information. Below is a detailed overview of PostgreSQL data types, their purpose, limitations, storage sizes, and common use cases.

## **1. Numeric Types**

### **bigint** *(Alias: int8)*

- **Description**: Signed 8-byte integer.
- **Usage**: Used to store very large integers (e.g., IDs, financial data).
- **Range**: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807.
- **Size**: 8 bytes.

```sql
CREATE TABLE transactions (id BIGINT PRIMARY KEY, amount BIGINT);
```

### **bigserial** *(Alias: serial8)*

- **Description**: Auto-incrementing 8-byte integer.
- **Usage**: Suitable for unique identifier columns (e.g., primary keys).
- **Range**: Same as `bigint`.
- **Size**: 8 bytes.

```sql
CREATE TABLE orders (id BIGSERIAL PRIMARY KEY, amount BIGINT);
```

### **integer** *(Alias: int, int4)*

- **Description**: Signed 4-byte integer.
- **Usage**: Stores standard integer values, like quantities.
- **Range**: -2,147,483,648 to 2,147,483,647.
- **Size**: 4 bytes.

```sql
CREATE TABLE products (id INTEGER PRIMARY KEY, stock INTEGER);
```

### **smallint** *(Alias: int2)*

- **Description**: Signed 2-byte integer.
- **Usage**: Suitable for small numbers (e.g., status codes).
- **Range**: -32,768 to 32,767.
- **Size**: 2 bytes.

```sql
CREATE TABLE status_codes (id SMALLINT, description TEXT);
```

---

## **2. Floating-Point and Precision Numeric Types**

### **real** *(Alias: float4)*

- **Description**: Single-precision floating-point number (4 bytes).
- **Usage**: For approximate data such as scientific measurements.
- **Range**: Approximately ±3.4e38.
- **Size**: 4 bytes.

```sql
CREATE TABLE measurements (value REAL);
```

### **double precision** *(Alias: float8)*

- **Description**: Double-precision floating-point number (8 bytes).
- **Usage**: For scientific calculations requiring high precision.
- **Size**: 8 bytes.

```sql
CREATE TABLE precise_measurements (value DOUBLE PRECISION);
```

### **numeric** *(Alias: decimal)*

- **Description**: Exact numeric type with user-defined precision, used for financial data.
- **Usage**: Suitable for calculations requiring exact precision (e.g., financial data).

```sql
CREATE TABLE salaries (amount NUMERIC(10, 2));
```

---

## **3. Character and Text Types**

### **character** *(Alias: char)*

- **Description**: Fixed-length character string.
- **Usage**: For storing fixed-length codes (e.g., country codes).

```sql
CREATE TABLE countries (code CHAR(3), name TEXT);
```

### **character varying** *(Alias: varchar)*

- **Description**: Variable-length character string.
- **Usage**: Suitable for storing text with varying lengths, such as names.

```sql
CREATE TABLE users (username VARCHAR(50));
```

### **text**

- **Description**: Variable-length text with no defined limit.
- **Usage**: Ideal for storing long text data, such as descriptions or articles.

```sql
CREATE TABLE articles (content TEXT);
```

---

## **4. Date and Time Types**

### **date**

- **Description**: Calendar date in the format (YYYY-MM-DD).
- **Usage**: For storing simple dates.

```sql
CREATE TABLE events (event_date DATE);
```

### **timestamp**

- **Description**: Date and time without a time zone.
- **Usage**: For recording timestamps.

```sql
CREATE TABLE logs (created_at TIMESTAMP);
```

### **timestamptz**

- **Description**: Date and time with a time zone.

```sql
CREATE TABLE global_logs (created_at TIMESTAMPTZ);
```

---

## **5. JSON and Binary Data Types**

### **json**

- **Description**: Stores JSON data as text.

```sql
CREATE TABLE configurations (data JSON);
```

### **jsonb**

- **Description**: Stores JSON data in a binary format, optimized for querying.

```sql
CREATE TABLE products (attributes JSONB);
```

---

## **6. Geometric Types**

PostgreSQL supports geometric data types useful for representing objects on a two-dimensional plane.

### **point**

- **Description**: A geometric point defined by (x, y) coordinates.
- **Usage**: Useful for storing positions in a 2D space (e.g., mapping or charts).

```sql
CREATE TABLE locations (id SERIAL PRIMARY KEY, coord POINT);
INSERT INTO locations (coord) VALUES (POINT(1.5, 2.5));
```

### **line**

- **Description**: An infinite line defined by an equation.
- **Usage**: Theoretical geometric representations and mathematical calculations.

```sql
CREATE TABLE lines (l LINE);
INSERT INTO lines VALUES ('{1, -1, 0}'); -- Represents x - y + 0 = 0
```

### **lseg** *(Line Segment)*

- **Description**: A line segment defined by two points (x1, y1) and (x2, y2).

```sql
CREATE TABLE segments (s LSEG);
INSERT INTO segments VALUES ('[(0,0),(3,3)]');
```

### **box**

- **Description**: A rectangle defined by two opposite points.
- **Usage**: To delimit areas on maps or charts.

```sql
CREATE TABLE boxes (b BOX);
INSERT INTO boxes VALUES ('((1,1),(4,4))');
```

### **circle**

- **Description**: A circle defined by a center point and a radius.

```sql
CREATE TABLE circles (c CIRCLE);
INSERT INTO circles VALUES ('<(1,1),5>');
```

### **path**

- **Description**: A series of points forming a path.

```sql
CREATE TABLE paths (p PATH);
INSERT INTO paths VALUES ('[(1,1),(2,2),(3,3)]');
```

### **polygon**

- **Description**: A polygon defined by several points forming a closed shape.

```sql
CREATE TABLE polygons (poly POLYGON);
INSERT INTO polygons VALUES ('((0,0),(1,1),(2,2),(0,0))');
```

---

## **7. Network Types**

These types are used to store IP addresses and networks.

### **inet**

- **Description**: IP address (IPv4 or IPv6), with optional network mask.
- **Usage**: Storing user IP addresses.

```sql
CREATE TABLE devices (ip INET);
INSERT INTO devices VALUES ('192.168.1.1/24');
```

### **cidr**

- **Description**: An IP range (IPv4 or IPv6 network).
- **Usage**: Used for subnets.

```sql
CREATE TABLE networks (net CIDR);
INSERT INTO networks VALUES ('192.168.1.0/24');
```

### **macaddr**

- **Description**: Media Access Control (MAC) address (48-bit).

```sql
CREATE TABLE mac_addresses (mac MACADDR);
INSERT INTO mac_addresses VALUES ('08:00:2b:01:02:03');
```

### **macaddr8**

- **Description**: Extended MAC address in EUI-64 format.

```sql
CREATE TABLE mac_addresses_8 (mac MACADDR8);
INSERT INTO mac_addresses_8 VALUES ('08:00:2b:01:02:03:04:05');
```

---

## **8. Specialized Data Types**

### **uuid**

- **Description**: Universally Unique Identifier (UUID).
- **Usage**: Ideal for globally unique keys.

```sql
CREATE TABLE users (id UUID PRIMARY KEY);
INSERT INTO users VALUES (gen_random_uuid());
```

### **json/jsonb**

- **Description**: JSON data stored as text (`json`) or as a binary-optimized format (`jsonb`).
- **Usage**: Storing semi-structured data.

```sql
CREATE TABLE products (attributes JSONB);
```

### **xml**

- **Description**: XML data.
- **Usage**: Storing XML documents.

```sql
CREATE TABLE documents (content XML);
```

PostgreSQL provides a wide range of data types, catering to diverse needs—from simple integers to complex structures like JSON data, geometric types, and network addresses. Each type is optimized for specific use cases, enabling efficient data management while ensuring accuracy and integrity.

Choosing the right data type is crucial for maintaining performance, scalability, and readability in a database. Whether you're handling financial data that requires exact precision, semi-structured JSON documents, or complex geographical information, PostgreSQL offers the tools needed to meet your requirements.

By mastering the available data types and using them effectively, you can design robust, flexible, and high-performance databases tailored to the demands of modern applications.
