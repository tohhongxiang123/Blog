# Number Types

The most common number type used in competitive programming is the 32-bit `int`, with values ranging from $[-2^{31}, 2^{31} - 1]$, which is roughly $[-2 \times 10^9, 2 \times 10^9]$

If `int` is not enough, we can use a 64-bit `long` which supports the range $[-2^{63}, 2^{63} - 1]$, which is roughly $[-9 \times 10^{18}, 9 \times 10^{18}]$

We can still go further and use a `long long` in C++, and we can define a `long long` variable as such

```c++
long long x = 123456789123456789LL;
```

# Modular Arithmetic

We denote $x \bmod m$ the remainder when $x$ is divided by $m$

For example, $17 \bmod 5 = 2$ since $17 = 3*5 + 2$

Sometimes when the answer is too big, the question usually states to submit the answer in terms of a modulo $m$, i.e. the remainder when the answer is divided by $m$ (such as $x \bmod 10^9 + 7$)

Note the following properties of the modulo

$$
\begin{aligned}
(a + b) \bmod m &\equiv (a \bmod m + b \bmod m) \bmod m \\
(a - b) \bmod m &\equiv (a \bmod m - b \bmod m) \bmod m \\
(a \times b) \bmod m &\equiv (a \bmod m \times b \bmod m) \bmod m \\
\end{aligned}
$$

# Working With Numbers

Each sum of the form

$$
\sum_{x = 1}^{n} x^k
$$

has a closed form polynomial solution of degree $k + 1$. For example,

$$
\begin{aligned}
\sum_{x = 1}^{n} x &= \frac{n(n + 1)}{2} \\
\sum_{x = 1}^{n} x^2 &= \frac{n(2n+1)(n+1)}{6}
\end{aligned}
$$

The general form of this equation is known as **Faulhaber's formula**

## Arithmetic Progression

An arithmetic progression is a sequence of numbers where the difference between 2 consecutive numbers is constant.

An example of an arithmetic progression is:

$$
5, 10, 15, 20, 25, ...
$$

The sum of an arithmetic progression is

$$
\begin{aligned}
\underbrace{a + \cdots + b}_{\text{n terms}} = \frac{n(a + b)}{2}
\end{aligned}
$$

where $a$ is the first number, $b$ is the last number, and there are $n$ total numbers

This formula is based on the fact that the sum consists of $n$ numbers, and the average of all the numbers is $\frac{a + b}{2}$ on average

## Geometric Progression

A geometric progression is a sequence of numbers where the ratio between 2 consecutive numbers are constant

An example of a geometric progression is

$$
1, 2, 4, 8, 16, 32, ...
$$

The formula for the sum of the geometric numbers is

$$
\begin{aligned}
S &= a + ak + ak^2 + ... + b \\
kS &= ak + ak^2 + ak^3 ... + bk \\
(k - 1)S &= bk - a \\
S &= \frac{bk - a}{k - 1}
\end{aligned}
$$

Note that $a$ is the first number, $b$ is the last number, and the ratio between consecutive numbers is $k$

## Harmonic Progression

A harmonic progression has the following terms

$$
\frac{1}{1}, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, ...
$$

A harmonic sum is defined as the sum of the terms in a harmonic progression

$$
\sum_{x = 1}^{n} \frac{1}{x} = 1 + \frac{1}{2} + \frac{1}{3} \cdots + \frac{1}{n}
$$

The upper bound for the sum of the first $n$ harmonic terms is $\log_2 n + 1$ because

$$
\begin{aligned}
&1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \frac{1}{5} + \frac{1}{6} + \frac{1}{7} + \frac{1}{8} + \cdots + \frac{1}{n} \leq \\
&1 + \frac{1}{2} + \frac{1}{2} + \frac{1}{4} + \frac{1}{4} + \frac{1}{4} + \frac{1}{4} + \frac{1}{8} + \cdots + \frac{1}{2^{\log_2 n}} \leq \\
&1 + 1 * \log_2 n
\end{aligned}
$$
