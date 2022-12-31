# Switch Case

```java
switch(expression) {
    case value1: statements; break;
    case value2: statements; break;
    // ...
    default: statements; break;
}
```

If `expression` matches `value1`, then the statements within `value1` will run. If `expression` matches `value2`, statements within `value2` will run.

If `expression` does not match any values, statements within `default` will run.

Note the `break` within each case. If the `break` is not written in `value1` and `expression` matches `value1`, then execution will continue to `value2` as well, even though the expression value does not match. **Execution flows through remaining cases unless interrupted by `break`**

Also, it is illegal to have 2 cases for the same value

## Valid types

A switch case only works with

- byte
- short
- char
- int
- Their corresponding wrapper classes
- String (Java 7)
- Enumerated types

# When to use If or Switch

- Readability
- An if-else statement can test expressions based on ranges of values, whereas a switch statement tests expressions based only on a single integer, enumerated value or string object
