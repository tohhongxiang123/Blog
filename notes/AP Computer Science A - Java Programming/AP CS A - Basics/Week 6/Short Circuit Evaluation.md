# Short Circuit Evaluation

Boolean operators `&&` and `||` abandon evaluation if the result is determined with certainty

- `true || (anything) == true`
- `false && (anything) == false`
- `(anything)` is not evaluated

A common use of short circuiting:

```java
p != null && p.isImportant()
```

If `p` was null and we tried to run `p.isImportant()`, it would fail because `p` is not defined (Null pointer exception). By using short circuiting, if `p` is null, the second part of the boolean expression is never run, hence we will not get the error. If `p` was not null, then the second part of the expression will be evaluated as per normal.

If you want to avoid lazy evaluation, then we use the bitwise version of the `&&` and `||` operators

- `&` instead of `&&`
- `|` instead of `||`

This forces java to evaluate both sides of the boolean expression regardless of values.

# Make sure to use comparison and not assignment

```java
boolean b = false;

if (b = true) {
    System.out.println("b is true!");
} else {
    System.out.println("b is false!");
}
```

`b is true` will be printed out to the console. We wrote the **assignment** operator instead of the comparison operator within the condition. Compiler does not complain because b is a boolean type.

If b was not boolean (such as integer) then java will throw an error

```java
int b = 3;

if (b = 5) { // throws error on compilation
    System.out.println("b is true!");
} else {
    System.out.println("b is false!");
}
```
