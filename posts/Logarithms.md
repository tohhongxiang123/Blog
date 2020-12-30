# Logarithms

Suppose you want to solve $10^x = 100$. We can see that $10*10 = 10^2 = 100$, hence $x=2$. However, what if we wanted a general function that solves for $x$:

$$
a^x = b
$$

This is where we define the **logarithm** function, where $x = \log_a b$. The logarithm answers the question: How many times do I have to multiply $a$ by itself to get $b$?

From this definition, we can derive a few properties of the logarithm function

## $\log_a a = 1$

We can multiply $a$ by itself exactly 1 time to get a ($a^1 = a$). Hence $\log_a a = 1$

---

## $\log_a x + \log_a y = \log_a xy$

We can let $p = a^x, q = a^y$. $pq = a^x a^y = a^{x+y}$.

$$
\begin{aligned}
    p &= a^x \implies \log_a p = x \log_a a = x \\
    q &= a^y \implies \log_a q = y \\
    pq &= a^{x+y} \implies \log_a pq = x + y = \log_a p + \log_a q
\end{aligned}
$$

Similarly, $\log_a x - \log_a y = \log_a \frac{x}{y}$

---

## $\log_a x^y = y \log_a x$

Since $\log_a x + \log_a x = 2\log_a x = \log_a x^2$, we can generalise that $y \log_a x = \log_a x  + \cdots + \log_a x = \log_a (x\cdots x) = \log_a x^y$

---

## $\log_a b = \frac{\log_c b}{\log_c a}$

$$
\begin{aligned}
x &= \log_a b \\
a^x &= b \\
\log_c a^x &= \log_c b & \text{(Take $\log_c$ both sides)} \\
x \log_c a &= \log_c b & (\log_a x^y = y \log_a x) \\
x &= \frac{\log_c b}{\log_c a} \\
\log_a b &= \frac{\log_c b}{\log_c a}
\end{aligned}
$$

