# Algorithm Analysis - Time and Space

Space refers to memory use
- Instruction space
- Data space
- Use of call stack

Best practices
- Minimal use of short-term memory
- Scope variables such that they are only in memory when needed
- Choose data structures best suited for the task at hand
- Write algorithms which aim to run in the minimum number of steps
- Limit the number of embedded method calls

Time refers to how long an algorithm takes to run
- Time measured in milliseconds or nanoseconds
- Best, average, worst case
- Measured considering how long a program will run based on a given input size `n`
- Big O notation is used to measure time complexity

# Big O

| Complexity | Description |
| ---------- | ----------- |
| O(1)       | constant    |
| O(log n)   | logarithmic |
| O(n)       | linear      |
| O(n log n) | n log n     |
| O(n^2)     | Quadratic   |
| O(n^3)     | Cubic       |
| O(2^n)     | Exponential |
| O(n!)      | Factorial   |

# Operations that Contribute to Time Complexity

- Comparisons
- Swaps
- Data movement
- Primitive operations (Assignments and arithmetic)

# Most Powerful Term

- $f(x) = 3x^2 + x = O(x^2)$
- $f(x) = x \log x + x! = O(x!)$

```
for (int i = 0; i < n; i++) {
    a += 1;
    b += a;
}
```

The code above runs in $O(n)$

```
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++)
        a += 1;
        b += a;
}
```

The code above runs in $O(n^2)$


