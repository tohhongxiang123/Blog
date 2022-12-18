# Assignment Statement

```java
int x = 5 + 2 * 3;
double y = Math.abs(-4);
y = y * 2;
```

An assignment statement take some outcome of execution on the right-hand side, and assigns it to a variable on the left-hand side.

How an assignment statement is evaluated:

1. All variables on the right side are replaced with their **current** values
2. The right hand side is entirely evaluated
3. The final value is stored in the variable on the left hand side

Examples of invalid assignment statements:

```java
int x;
3 = x + 1;
int x + 1 = 7;
```
