---
title: I/O - Files, Paths, NIO.2
description: Learn Java NIO.2 for file read/write, path handling, directory traversal, and buffered I/O patterns.
date: 2025-01-06
tags: [java, io, nio2, files]
draft: false
readingTime: 13 min
---

## Why this step matters

Backend systems constantly read and write files: imports, logs, exports, and config.
NIO.2 (`java.nio.file`) is the modern, safe API for this.

## `Path` and `Files`

Use `Path` to represent file system locations and `Files` for operations.

```java
Path report = Path.of("data", "report.txt");
Files.createDirectories(report.getParent());
Files.writeString(report, "hello\n");
String content = Files.readString(report);
```

## Read and write patterns

For small files:

- `Files.readString(...)`
- `Files.writeString(...)`

For larger content, use buffered streams/readers:

```java
try (BufferedReader reader = Files.newBufferedReader(report)) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
```

## Directory traversal

```java
Path root = Path.of("logs");
try (Stream<Path> stream = Files.walk(root)) {
    stream
        .filter(Files::isRegularFile)
        .forEach(System.out::println);
}
```

Use `Files.list(...)` for one level and `Files.walk(...)` for recursive traversal.

## Useful options

```java
Files.writeString(
    report,
    "new line\n",
    StandardOpenOption.CREATE,
    StandardOpenOption.APPEND
);
```

Common options:

- `CREATE`
- `TRUNCATE_EXISTING`
- `APPEND`

## Error handling and safety

I/O throws checked exceptions (`IOException`). Handle failures explicitly.

Also:

- validate paths from user input
- avoid path traversal vulnerabilities
- prefer UTF-8 explicitly when needed

## Common mistakes

- forgetting try-with-resources
- loading very large files entirely in memory
- using string concatenation for paths instead of `Path.of(...)`
- writing files without creating parent directories

## Takeaway

1. Use `Path` + `Files` as default file API
2. Choose buffered APIs for larger files
3. Traverse directories with `Files.list`/`Files.walk`
4. Handle `IOException` and validate file paths
