# Computing Runtimes

To figure out how long a program runs, you may need to take into account

- How fast the computer is
- The compiler being used
- The computer architecture
- The program's language etc.

Figuring out accurate runtime is a huge mess, and in practice, you don't know any of these details. We need to measure runtime without knowing these details, and what the runtime is for **very large** inputs.

# Asymptotic Notation

All the minute details above, should only affect the runtime by a **constant**. So, we measure runtime in a way that ignores these constant multiples.

We will consider **asymptotic** runtimes - how runtimes **scale with input size**

$$
1 < \log n < \sqrt{n} < n < n \log n < n^2 < 2^n
$$

# Big-O Notation

> $f(n) = O(g(n))$ if there exists constants $N$ and $c$ such that for all $n \ge N$, $f(n) \le c g(n)$
>
> $f$ is bounded above by some constant multiple of $g$

For example,
$3n^2 + 5n + 2 = O(n^2)$, because if $n \ge 1$,

$3n^2 + 5n + 2 \le 3n^2 + 5n^2 + 2n^2 = 10n^2$

### Advantages of Big-O

- Big-O notation clearly shows how the runtime scales with input size
- It is easier to write $O(n^2)$ rather than $3n^2 + 5n + 2$, or $O(n)$ instead of $n + \log_2 n + \sin n$
  - Note, $\log_2 n, \log_3 n, \log_x n$ all differ by constant multiples, hence we don't need to specify which base the log is
- Don't need to worry about small details such as computer specifications etc.

### Disadvantages of Big-O

- Loses important information about constant multiples
  - 2 algorithms that scale equally with input size, however one runs 100x faster than the other
- Big-O is only asymptotic
  - Sometimes an algorithm is only more efficient than another at unmeasurably large input sizes

# Using Big-O Notation

- Multiplicative constants can be ignored
  - $\frac{\pi n^2}{e^{69}} = O(n^2)$
  - $10000000000 \log n = O(\log n)$
- $0 < a < b \implies n^a = O(n^b)$
  - $0 < a < b \implies 1 < n^a < n^b$, hence $\forall n > 0, n^a > 1*n^b$
  - $n = O(n^2)$
  - $\sqrt{n} = O(n) = O(n^2)$
- $a > 0, b > 1 \implies n^a = O(b^n)$ (Exponentials always grow faster than polynomials)
  - $n^5 = O(\sqrt{2}^n)$
  - $n^{10^{10}} = O(1.0001^n)$
- $a, b > 0 \implies (\log n)^a = O(n^b)$
  - $(\log n)^{69} = O(\sqrt{n})$
  - $n \log n = O(n^2)$

### Proof that $\lim_{n \to \infty} \frac{n^a}{b^n} = 0$

$$
\begin{aligned}
    0 \le \lim_{n \to \infty} \frac{n^a}{b^n} &= \lim_{n \to \infty} \frac{n^a}{(1+p)^n} &  \text{(Binomial theorem)} \\
    &= \lim_{n \to \infty} \frac{n^a}{\sum_{i=1}^{n} {n \choose i} p^i} \\
    &\le \lim_{n \to \infty} \frac{n^a}{{n \choose a+1} p^{a+1}} & \text{(Choosing the a+1 term)} \\
    &\le \lim_{n \to \infty} \frac{n^a}{(n-a)^{a+1} p^{a+1}} & ({n \choose a+1} = n(n-1)\cdots(n-a) \ge (n-a)^{a+1}) \\
    &= \lim_{n \to \infty} \left(\frac{n}{n-a}\right)^a \left(\frac{1}{(n-a)p^{a+1}}\right) \\
    &= \lim_{n \to \infty} \left(\frac{1}{1-a/n}\right)^a \left(\frac{1}{(n-a)p^{a+1}}\right) \\
    &= \lim_{n \to \infty} \frac{1}{(n-a)p^{a+1}} \\
    &= 0
\end{aligned}
$$

- Smaller terms can be omitted
  - $\frac{1}{100000}n^2 + 69^{420}n = O(n^2)$
  - $2^n + n^{10000} = O(2^n)$

Let us look at the fibonacci algorithm

```
create an array F[0, ..., n]
F[0] = 0
F[1] = 1
for i from 2 to n:
    F[i] = F[i-1] + F[i-2]
return F[n]
```

| Operation                    | Runtime                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| create an array F[0, ..., n] | $O(n)$                                                                                                  |
| F[0] = 0                     | $O(1)$                                                                                                  |
| F[1] = 1                     | $O(1)$                                                                                                  |
| for i from 2 to n            | Loop $O(n)$ times                                                                                       |
| F[i] = F[i-1] + F[i-2]       | $O(n)$ (Large numbers take a longer time to add, and as n increases, the number increases in magnitude) |
| return F[n]                  | $O(1)$                                                                                                  |
| Total                        | $O(n) + O(1) + O(1) + O(n) * O(n) + O(1) = O(n^2)$                                                      |

# Other Notation

For functions $f, g: \N \mapsto \R^+$, we say that

- $f(n) = \Omega(g(n))$ if for some $c, f(n) \ge cg(n)$ ($f$ grows no slower than $g$)
- $f(n) = \Theta(g(n))$ if $f = O(g)$ and $f = \Omega(g)$ ($f$ grows at the same rate as $g$)
- $f(n) = o(g(n))$ if $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$ ($f$ grows strictly slower than $g$)

# Example Questions

Order the functions by increasing growth rate:

$$
\begin{aligned}
f_1(n) &= 3^n \\
f_2(n) &= n \log_2 n \\
f_3(n) &= \log_4 n \\
f_4(n) &= n \\
f_5(n) &= 5^{\log_2 n} \\
f_6(n) &= n^2 \\
f_7(n) &= \sqrt{n} \\
f_8(n) &= 2^{2n}
\end{aligned}
$$

Solution:

We use the following property: $a^{\log_b c} = c^{\log_b a}$. The following proves the property:

$$
\begin{aligned}
\log_a a^{\log_b c} &= \log_a c^{\log_b a} \\
\log_b c &= (\log_a c) (\log_b a) \\
\frac{\log_b c}{\log_b a} &= \log_a c
\end{aligned}
$$

That is the change of base formula for logarithms.

Note that $5^{\log_2 n} = n^{\log_2 5} \approx n^{2.32}$

$2^{2n} = (2^2)^n = 4^n$

$\sqrt{n} = n^{0.5}$

Hence the order is $3, 7, 4, 2, 6, 5, 1, 8$
