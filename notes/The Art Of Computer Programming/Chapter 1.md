# 1.1 Basic Concepts

An **algorithm** is a routine/recipe/process/method etc. An algorithm has 5 important features

1. Finiteness - An algorithm must always terminate after a finite number of steps
2. Definiteness - Each step of an algorithm must be **precisely defined** (No ambiguity, such as "a pinch of salt")
3. Input - An algorithm has 0 or more inputs: quantities given to it initially before an algorithm begins
4. Output - An algorithm has 1 or more outputs: quantities that have a specified relation to the input
5. Effectiveness - An algorithm is generally expected to be effective, in the sense that its operations must all be simple: that they can in principle be done exactly and in a finite length of time by someone using pencil and paper.
    1. An example of a non-effective step is "If 4 is the largest integer $n$ for which there is a solution to the equation $w^n + x^n + y^n = z^n$ for positive integers $w, x, y, z$, go to step 4"

# Euclid's Algorithm

Given 2 positive integers $m$ and $n$, find their **greatest common divisor**, that is the largest positive integer that evenly divides both $m$ and $n$

1. [Find remainder]. Divide $m$ by $n$, and let $r$ be the remainder (Note that $0 \leq r < n$)
2. [Is it zero?]. If $r = 0$, the algorithm terminates, and the answer is $n$
3. [Reduce]. Set $m = n, n = r$, and go back to 1

```python
def gcd(m, n):
    r = m % n
    if r == 0:
        return n

    return gcd(n, r)
```

We can see that after step 1, we have

$$
m = qn + r
$$

for some integer $q$.

If $r=0$, then $m$ is a multiple of $n$, and therefore $n$ is the greatest common divisor of $m$ and $n$. If $r \neq 0$, notice that any number that divides **both** $m$ and $n$ must divide $m-qn = r$, and any number that divides both $n$ and $r$ must divide $qn + r = m$. Hence, the set of divisors of $\{m, n\}$ are the same as the set of divisors of $\{n, r\}$. Thus the GCD of $\{m, n\}$ is also the GCD of $\{n, r\}$

# Mathematical definition of an algorithm

Define a _computational method_ to be a quadruple $(Q, I, \Omega, f)$, in which

-   $Q$ is a set containing subsets $I$ and $\Omega$
-   $f$ is a function from $Q$ into itself ($f: Q \mapsto Q$).
    -   Furthermore $f$ should leave $\Omega$ pointwise fixed, that is $f(q) = q,  \forall q \in \Omega$
    -   This means that, if the final state is passed into the algorithm, it returns the same thing (because the algorithm has already terminated)

The 4 quantities are intended to represent respectively

-   $Q$ - the states of the computation
-   $I$ - the input
-   $\Omega$ - the output
-   $f$ - the computational rule

Each input $x$ in the set $I$ defines a computational sequence $x_1, x_2, ...$ as follows:

$$
x_0 = x, x_{k+1} = f(x_k) \text{ for } k \geq 0
$$

The computational sequence is said to _terminate in $k$ steps_ if $k$ is the smallest integer for which $x_k \in \Omega$, and in this case it is said to produce the output $x_k$ from $x$.

To formalise Euclid's algorithm:

Let $Q$ be the set of all singletons $(n)$, all ordered pairs $(m, n)$ and all ordered quadruples $(m, n, r, 1), (m, n, r, 2), (m, n, p, 3)$ where $m, n, p$ are all positive integers, and $r$ is a non-negative integer. (Note that we use a different variable $p$ because the algorithm terminates when $r = 0$). You can think of the 4th element in the quadruple as the "step number", which the example below will make clear

Let $I$ be the subset of all pairs $(m, n)$

Let $\Omega$ be the subset of all singletons $(n)$.

Let $f$ be defined as follows:

$$
\begin{aligned}
f((m, n)) &= (m, n, 0, 1); f((n)) = n; \\
f((m, n, r, 1)) &= (m, n, \text{remainder of $m$ divided by $n$}, 2) \\
f((m, n, r, 2)) &= (n) \text{ if } r = 0, (m, n, r, 3) \text{ otherwise}; \\
f((m, n, p, 3)) &= (n, p, p, 1) \\
\end{aligned}
$$

Follow in order. For example, let $(m, n) = (5, 3)$

$$
\begin{aligned}
f((5, 3)) &= (5, 3, 0, 1) \\
f((5, 3, 0, 1)) &= (5, 3, 2, 2) \\
f((5, 3, 2, 2)) &= (5, 3, 2, 3) \\
f((5, 3, 2, 3)) &= (3, 2, 2, 1) \\ \\

f((3, 2, 2, 1)) &= (3, 2, 1, 2) \\
f((3, 2, 1, 2)) &= (3, 2, 1, 3) \\
f((3, 2, 1, 3)) &= (2, 1, 1, 1) \\ \\

f((2, 1, 1, 1)) &= (2, 1, 0, 2) \\
f((2, 1, 0, 2)) &= (1)
\end{aligned}
$$

And sure enough, $gcd((5, 3)) = (1)$

# Exercises

1. Show how the values of 4 variables $(a, b, c, d)$ can be rearranged to $(b, c, d, a)$ by a sequence of replacements. In other words, the new value of $a$ is the original value of $b$, etc. Try to use the minimum number of replacements
2. For euclid's algorithm, prove that $m > n$ at the beginning of step 1, except possibly the first time this step occurs
3. What is $T_5$, the average number of times step 1 is performed when $n = 5$?
4. Suppose that $m$ is known, and $n$ is allowed to range over all positive integers; Let $U_m$ be the average number of times that step 1 is executed in Euclid's algorithm. Show that $U_m$ is well defined. Is $U_m$ in any way related to $T_m$?
