# Fibonacci Numbers

The fibonacci numbers are defined recursively

$$
f_n = \begin{cases}
    0 & n = 0 \\
    1 & n = 1 \\
    f_{n-1} + f_{n-2} & n \ge 2
\end{cases}
$$

In code,

```py
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```

What is the runtime for `fib`? Let $T(n)$ represent the number of lines of code ran by `fib`

For $n < 2$, we can see that the `if` and the first `return` statement runs, so 2 lines of code.

If $n \ge 2$, then the first 3 lines of code runs, and the number of lines required by `fib(n-1)` and `fib(n-2)`. Hence, we can express $T(n)$:

$$
T(n) = \begin{cases}
2 & n \le 1 \\
3 + T(n-1) + T(n-2) & n > 1
\end{cases}
$$

We can conclude that $T(n) \ge f_n$

Consider $T(100) \approx 1.77*10^{21}$. A computer running at 1 GHz will take $1.77*10^{21} / (1*10^9 * 60 * 60 * 24 * 365) \approx 56000$ years to calculate.

# Why is the algorithm inefficient?
We recalculate from scratch everytime.

# Making the algorithm efficient
Everytime we make compute $f_n$, we store the result in a list, so we can use it.

```py
def fib(n):
    if n <= 1:
        return n
    results = [0, 1]
    
    for i in range(2, n+1):
        results[n] = results[n-1] + results[n-2]

    return results[n]
```

$T(n) = 2(n-1) + 4$ (The loop contributes $2(n-1)$ lines, while there are 4 remaining lines of code)

This technique is called **memoisation**.