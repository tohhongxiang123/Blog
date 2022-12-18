# De Morgan's Law

```
!(x || y) == !x && !y
!(x && y) == !x || !y
```

Truth table:

| `x` | `y` | `!(x |     | y)` | `!x && !y` |
| --- | --- | ---- | --- | --- | ---------- |
| 0   | 0   | 1    | 1   |
| 0   | 1   | 0    | 0   |
| 1   | 0   | 0    | 0   |
| 1   | 1   | 0    | 0   |

| `x` | `y` | `!(x && y)` | `!x |     | !y` |
| --- | --- | ----------- | --- | --- | --- |
| 0   | 0   | 1           | 1   |
| 0   | 1   | 1           | 1   |
| 1   | 0   | 1           | 1   |
| 1   | 1   | 0           | 0   |

# Some rules regarding boolean operators

-   Precedence: NOT, AND, OR
-   if-else if statements will only execute the block associated with the **first** true boolean expression
-   Short circuiting complicated boolean expressions by putting the most common cases first
-   Always double-check end behavior
