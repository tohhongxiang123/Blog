# Types of Distribution

- Uniform
- Binomial
- Normal
- Poisson
- Hypergeometric

Do note the general formulas for finding the mean, and the standard deviation of any function:

$$
\begin{aligned}
\mu &= \sum_{\forall x, P(X=x) > 0} x P(X = x) & (\text{Discrete}) \\
&= \int_{-\infty}^{\infty} x P(X = x) dx & (\text{Continuous})
\end{aligned}
$$

$$
\begin{aligned}
Var(X) &= E[(X - \mu)^2] \\
&= \sum_{\forall x, P(X=x) > 0} (x - \mu)^2 P(X = x) \\
&= \int_{-\infty}^{\infty} (x - \mu)^2 P(X = x) dx
\end{aligned}
$$

# Uniform Distribution

A type of distribution where every value within the range is equally likely to occur. Values can be either discrete or continuous.

E.g. The result of a dice roll. Each integer 1-6 has an equal probability (1/6) of occuring

![Uniform Distribution Probabilities](https://en.wikipedia.org/wiki/Continuous_uniform_distribution#/media/File:Uniform_Distribution_PDF_SVG.svg)

$$
P(X = x) = \begin{cases}
\frac{1}{B-A} & A \le x \le B \\
0 & otherwise
\end{cases}
$$

Consider a continuous uniform distribution with minimum $A$ and maximum $B$. The mean, $\mu$, of this distribution is

$$
\begin{aligned}
\mu &= \int_{A}^{B} \frac{x}{B-A} dx \\
&= \frac{B+A}{2}
\end{aligned}
$$

The variance, $\sigma^2$ of this distribution is

$$
\begin{aligned}
\sigma^2 &= \int_{A}^{B} (x - \frac{A + B}{2})^2 \frac{1}{B - A} dx \\
&= \frac{(B - \frac{A + B}{2})^3 - (A - \frac{A + B}{2})^3}{3(B-A)} \\
&= \frac{(B-A)^2}{12}
\end{aligned}
$$

Note: It might be easier to derive using the formula $Var(X) = E(X^2) - E(X)^2$

# Binomial Distribution

The binomial distribution with parameters $n$ and $p$ is the **discrete** probability distribution of the number of successes of $n$ **independent** experiments, where the success rate of each experiment is $p$.

$$
P(Success) = p, P(Failure) = 1 - p
$$

![Binomial Distribution diagram](https://miro.medium.com/max/700/1*f_b70t4yL8HiGlkGc8F4pw.png)

For example, the probability of getting 5 heads in 50 coin flips.

The probability of getting exactly $k$ successes out of $n$ total trials is:

$$
P(X = k) = {n \choose k} p^k (1-p)^{n-k}
$$

The mean of a binomial distribution. $\mu$ is

$$
\begin{aligned}
\mu &= np \\

\\

\mu &= \sum_{k=0}^{n} k {n \choose k} p^k (1-p)^{n-k} \\
&= \sum_{k=1}^{n} k \frac{n!}{k!(n-k)!} p^k (1-p)^{n-k} & (\text{0 can be ignored}) \\
&= \sum_{k=1}^{n} k \frac{n(n-1)!}{k(k-1)!(n-k)!} p^k (1-p)^{n-k} \\
&= \sum_{k=1}^{n} \frac{n(n-1)!}{(k-1)!(n-k)!} p^k (1-p)^{n-k}  \\
&= np\sum_{j=0}^{m} \frac{m!}{j!(m-j)!} p^j (1-p)^{m-j} & (m = n-1, j=k-1) \\
&= np \sum_{j=1}^{m} {m \choose j} p^{j} (1-p)^{m - j} \\
&= np(p + (1-p))^m \\
&= np
\end{aligned}
$$

The variance of a binomial distribution, $\sigma^2$ 

$$
\begin{aligned}
\sigma^2 &= np(1-p) \\ \\

\sigma^2 &= E(X^2) - E(X)^2 \\ \\

E(X^2) &= \sum_{k=0}^{n} k^2 {n \choose k} p^k (1-p)^{n-k} \\
&= \sum_{k=1}^{n} k^2 \frac{n!}{k!(n-k)!} p^k (1-p)^{n-k} & (\text{0 can be ignored, formula for binomial}) \\
&= \sum_{k=1}^{n} k^2 \frac{n(n-1)!}{k(k-1)!(n-k)!} p p^{k-1} (1-p)^{n-k} \\
&= np \sum_{k=1}^{n} k \frac{(n-1)!}{(k-1)!(n-k)!} p^{k-1} (1-p)^{n-k} & (\text{Bring out np, k cancels out}) \\
&= np \sum_{j=0}^{m} (j+1) \frac{m!}{j!(m-j)!} p^{j} (1-p)^{m-j} & (j = k - 1, m = n - 1) \\
&= np \left( \sum_{j=0}^{m} j\frac{m!}{j!(m-j)!} p^{j} (1-p)^{m-j} + \sum_{j=0}^{m} j\frac{m!}{j!(m-j)!} p^{j} (1-p)^{m-j} \right) \\
&= np \left(mp + (p + (1-p))^m \right) \\
&= np ((n-1)p + 1) \\
&= n^2 p^2 - np^2 + np \\ \\

\sigma^2 &= E(X^2) - E(X)^2 \\ \\
&= n^2 p^2 - np^2 + np - n^2p^2 \\
&= np(1-p)

\end{aligned}
$$

# Poisson Distribution

The Poisson distribution is the discrete probability distribution of the number of events occurring in a given time period, given the average number of times the event occurs over that time period, $\lambda$

> Let $X$ be the discrete random variable that represents the number of events observed over a given time period. Let $\lambda$ be the expected value (average) of $X$. If $X$ follows a Poisson distribution, then the probability of observing $k$ events over the time period is

$$
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}
$$

### Derivation of Poisson formula

Consider a binomial distribution $X \sim B(n, p)$. In a certain period of time, we shall take $n$ samples and check the success rate of each sample. We know that $P(X = k) = {n \choose k} p^k (1-p)^{n-k}$

However, since time is continuous, we can keep taking more and more sample. That means that $n$ approaches infinity. What is $\lim_{n \to \infty} P(X = k)$?

Firstly, we let $\lambda = np$, since $\lambda$ is the expected value of $X$. Hence $p = \frac{\lambda}{n}$

$$
\begin{aligned}
\lim_{n \to \infty} P(X = k) &= \lim_{n \to \infty} {n \choose k} \left(\frac{\lambda}{n}\right)^k \left(1-\frac{\lambda}{n}\right)^{n-k} \\ \\

\lim_{n \to \infty} {n \choose k} \left(\frac{\lambda}{n}\right)^k &= \frac{n(n-1)(n-2)\cdots(n-k+1)}{k! n^k} \lambda^k \\
&= \frac{\lambda^k}{k!} \\ \\

\lim_{n \to \infty} \left(1-\frac{\lambda}{n}\right)^{n-k} &= \lim_{n \to \infty} \left(1-\frac{\lambda}{n}\right)^{n} \left(1-\frac{\lambda}{n}\right)^{-k} \\
&= e^{-\lambda} \\ \\

\lim_{n \to \infty} P(X = k) &= \frac{\lambda^k e^{-\lambda}}{k!}
\end{aligned}
$$