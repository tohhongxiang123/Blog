# Assertion

Assertions are statements that check whether something is true or false

```java
int x = 2;
assert x == 2;
```

Java ignores assertions by default. To enable assertions, we run the command

```
javac ProgramName.java
java -ea ProgramName
```

When an assertion is `false`, an `AssertionError` is thrown.

# Comparing Real Values

Not all real numbers can be represented accurately, and comparisons may fail when they should not

```java
double x = 10 - 9.1;
System.out.println(x == 0.9); // false
```

There are 2 ways to avoid this

1. Check that the difference is smaller than some small $\epsilon$

```java
double x = 10 - 9.1;
double y = 0.9;
double epsilon = 0.000001;

if (Math.abs(x - y) < epsilon) {
    System.out.println("X and Y are equal");
} else {
    System.out.println("X and Y are not equal");
}
```

2. Replace floating point variables with integers (For money, perform calculations with cents instead of dollars)

If numbers are bigger than what primitive types can handle, use the `BigDecimal` class

# Enabling assertions in Intellij

- Assertions are not enabled by default in IntelliJ. To enable assertions, follow the instructions [here](https://se-education.org/guides/tutorials/intellijUsefulSettings.html)
