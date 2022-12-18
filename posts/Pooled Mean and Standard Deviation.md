# Population vs Sample, and how to calculate statistics when combining datasets

It is important to distinguish **population** vs **sample**. A **population** is defined as **all members of a specified group**, while a **sample** is **part of a population**

> The **sample mean** is the average and is the sum of all observed outcomes from the sample divided by the total number of samples. The sample mean is denoted by $\bar{X}$

$$
\bar{X} = \frac{1}{n}\sum_{i=1}^{n} x_i
$$

The **population mean**, $\mu$ is the average of the entire population

> The **variance** is a statistical measurement of the spread between numbers in the dataset. The population variance, $\sigma^2$ and the sample variance $\hat{\sigma}^2$ are given by

$$
\sigma^2 = \frac{1}{N} \sum_{i=1}^{N}(x_i - \bar{X})^2 = \frac{1}{N} \left( \sum_{i=1}^{N}x_i^2 - \frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N} \right)
$$

$$
\hat{\sigma}^2 = \frac{1}{N-1} \sum_{i=1}^{N}(x_i - \bar{X})^2 = \frac{1}{N-1} \left( \sum_{i=1}^{N}x_i^2 - \frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N} \right)
$$

> The standard deviation is the square root of the variance

$$
\sigma = \sqrt{\frac{1}{N} \sum_{i=1}^{N}(x_i - \bar{X})^2}
$$

$$
\hat{\sigma} = \sqrt{\frac{1}{N-1} \sum_{i=1}^{N}(x_i - \bar{X})^2}
$$

# Effects of Transformations on the Mean and Variance

If a random variable $X$ has a mean $\mu$ and standard deviation $\sigma$, and we let $Y = AX + B$, then

$$
\begin{aligned}
\mu_Y &= A\mu + B \\
\sigma_Y &= A^2 \sigma^2
\end{aligned}
$$

# Deriving the Mean and Variance of the Sample Mean

Let $X_1, X_2, ..., X_n$ be $n$ independently drawn (with replacement) observations from a distribution with mean $\mu$ and variance $\sigma^2$. If they were not drawn with replacement, each observation would not be independent anymore.

$$
E(X_i) = \mu, Var(X_i) = \sigma^2
$$

Let $\bar{X}$ be the mean of the $n$ independent observations

$$
\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i
$$

From here, the expected value of $\bar{X}$ is:

$$
\begin{aligned}
E(\bar{X}) &= E\left(\frac{1}{n}\sum_{i=1}^{n} X_i\right) \\
&= \left(\frac{1}{n}\right) E\left(\sum_{i=1}^{n} X_i\right) \\
&= \left(\frac{1}{n}\right) \sum_{i=1}^{n} E\left(X_i\right) \\
&=  \left(\frac{1}{n}\right) \sum_{i=1}^{n} \mu \\
&= \left(\frac{1}{n}\right) n \mu \\
&= \mu
\end{aligned}
$$

From this, we can conclude that the **expected mean of the sample is the population mean**

Similarly, the variance of $\bar{X}$,

$$
\begin{aligned}
Var(\bar{X}) &= Var\left(\frac{1}{n}\sum_{i=1}^{n} X_i \right) \\
&= \frac{1}{n^2} Var\left(\sum_{i=1}^{n} X_i \right) \\
&= \frac{1}{n^2} \sum_{i=1}^{n} Var\left(X_i \right) \\
&= \frac{1}{n^2} \sum_{i=1}^{n} \sigma^2 \\
&= \frac{1}{n^2} n\sigma^2 \\
&= \frac{\sigma^2}{n}
\end{aligned}
$$

In conclusion, the sampling distribution of $\bar{X}$ has

-   Mean $\mu$
-   Standard deviation $\frac{\sigma}{\sqrt{n}}$

# Why is the sample variance divided by $N-1$?

We will now prove that

$$
E(S^2) = E\left[\frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2\right] = \sigma^2
$$

This will show why we divide the sample variance by $n-1$ and not $n$

Let $X_1, X_2, ..., X_n$ be $n$ independently drawn (with replacement) observations from a distribution with mean $\mu$ and variance $\sigma^2$. This means that $E(X) = \mu, Var(X) = \sigma^2$.

We know that

$$
\begin{aligned}
Var(X) &= E(X^2) - [E(X)]^2 \\
\sigma^2 &= E(X^2) - \mu^2 \\
E(X^2) &= \sigma^2 + \mu^2
\end{aligned}
$$

Similarly,

$$
E(\bar{X}^2) = \frac{\sigma^2}{n} + \mu
$$

As explained in the previous section, the sampling distribution of $\bar{X}$ has mean $\mu$ and variance $\frac{\sigma^2}{n}$

We will now compute $E\left[\sum_{i=1}^{n}(X_i - \bar{X})^2\right]$

$$
\begin{aligned}
E\left[\sum_{i=1}^{n}(X_i - \bar{X})^2\right] &= E\left[\sum_{i=1}^{n}(X_i^2 - 2X_i\bar{X} + \bar{X}^2)\right] & \text{Expand} \\
&= E\left[\sum_{i=1}^{n}X_i^2 - \sum_{i=1}^{n} 2X_i\bar{X} + \sum_{i=1}^{n} \bar{X}^2\right] & \text{Split summations} \\
&= E\left[\sum_{i=1}^{n}X_i^2 - 2\bar{X} \sum_{i=1}^{n} X_i + n \bar{X}^2\right] & \sum_{i=1}^{n} \bar{X}^2 = n \bar{X}^2 \\
&= E\left[\sum_{i=1}^{n}X_i^2 - 2\bar{X} n\bar{X} + n \bar{X}^2\right] & \frac{\sum_{i=1}^{n} X_i}{n} = \bar{X} \\
&= E\left[\sum_{i=1}^{n}X_i^2 - n\bar{X}^2\right] \\
&= \sum_{i=1}^{n}E\left[X_i^2\right] - nE\left[\bar{X}^2\right] \\
&= \sum_{i=1}^{n} (\sigma^2 + \mu^2) - n(\frac{\sigma^2}{n} + \mu) & E\left[X_i^2\right] = \sigma^2 + \mu^2, E(\bar{X}^2) = \frac{\sigma^2}{n} + \mu  \\
&= n(\sigma^2 + \mu^2) - n(\frac{\sigma^2}{n} + \mu) \\
&= (n-1) \sigma^2
\end{aligned}
$$

Now,

$$
\begin{aligned}
E(S^2) &= E\left[\frac{1}{n-1} \sum_{i=1}^{n}(X_i - \bar{X})^2\right] \\
&= \frac{1}{n-1}  E\left[\sum_{i=1}^{n}(X_i - \bar{X})^2\right] \\
&= \frac{1}{n-1} (n-1)\sigma^2 \\
&= \sigma^2
\end{aligned}
$$

Also, another way to look at this:

If we take a sample of size $n$ from $X$, then

$$
\sigma_X^2 = \frac{1}{n} \sum_{i=1}^{n} (X_i - \bar{X})^2
$$

According to the above, the random variable $X$ deviates from the sample mean $\bar{X}$ with variance $\sigma_X^2$. The sample mean $\bar{X}$ deviates from $\mu$ with a variance $\frac{\sigma^2}{n}$, explained above.

Therefore, $X$ should deviate from $\mu$ with variance $\sigma^2 = \sigma_X^2 + \frac{\sigma^2}{n}$. Hence $\sigma^2 = \frac{n}{n-1} \sigma_X^2$, and by replacing $\sigma_X^2$ with $\sigma^2$,

$$
\sigma^2 = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - \bar{X})^2
$$

# Combining multiple datasets

Consider 2 independent, non-overlapping datasets:

1. $X = \{X_1, X_2, ..., X_m\}$ with mean $\mu_1$ and standard deviation $\sigma_1$
2. $Y = \{Y_1, Y_2, ..., Y_n\}$ with mean $\mu_2$ and standard deviation $\sigma_2$

If we combine the 2 datasets together,

$$
\begin{aligned}
\mu_3 &= \frac{\mu_1 m + \mu_2 n}{m + n} \\
\sigma_3 &= \sqrt{\frac{m \sigma_1^2 + n \sigma_2^2 + m(\mu_1 - \mu_3)^2 + n(\mu_2 - \mu_3)^2}{m + n}}
\end{aligned}
$$

Or, for sample instead of population standard deviation,

$$
\sigma_3 = \sqrt{\frac{(m-1) \sigma_1^2 + (n-1) \sigma_2^2 + m(\mu_1 - \mu_3)^2 + n(\mu_2 - \mu_3)^2}{m + n - 1}}
$$

### Derivation

The mean of the combination of the 2 datasets

$$
\begin{aligned}
\mu_3 &= \frac{\sum_{z_i \in X \cup Y} z_i}{|X| + |Y|} & \text{Definition of mean} \\
&= \frac{(X_1 + \cdots + X_m) + (Y_1 + \cdots + Y_n)}{m + n} \\
&= \frac{m \mu_1 + n \mu_2}{m + n} & \mu_1 = \frac{\sum_{i=1}^{m} X_i}{m}, \therefore \sum_{i=1}^{m} X_i = m \mu_1
\end{aligned}
$$

The variance of the combination of the 2 datasets

$$
\begin{aligned}
\sigma_3^2 &= \frac{\sum_{z_i \in X \cup Y} (z_i - \bar{z})^2}{|X| + |Y|} \\
&= \frac{\sum_{z_i \in X \cup Y} z_i^2 - 2\bar{z}\sum_{z_i \in X \cup Y} z_i + \sum_{z_i \in X \cup Y} \bar{z}^2}{m + n} \\
\end{aligned}
$$

$$
\begin{aligned}
\sigma_1^2 &= \frac{\sum X_i^2}{m} - \mu_1^2 \\
\therefore \sum X_i^2 &= m(\sigma_1^2 + \mu_1^2) \\
\\
\sum_{z_i \in X \cup Y} z_i^2 &= \sum_{X_i \in X} X_i^2 + \sum_{Y_i \in X} Y_i^2 \\
&= m(\sigma_1^2 + \mu_1^2) + n(\sigma_2^2 + \mu_2^2) \\
\\
2\bar{z}\sum_{z_i \in X \cup Y} z_i  &= 2\mu_3\left(\sum_{X_i \in X} X_i + \sum_{Y_i \in Y} Y_i\right) \\
&= 2\mu_3(m \mu_1 + n \mu_2) \\
\\
\sum_{z_i \in X \cup Y} \bar{z}^2 &= (m + n)\mu_3^2 \\
\\
\therefore \sigma_3^2 &= \frac{m(\sigma_1^2 + \mu_1^2) + n(\sigma_2^2 + \mu_2^2) - 2\mu_3(m \mu_1 + n \mu_2) + (m + n)\mu_3^2}{m + n} \\
&= \frac{m\sigma_1^2 + n\sigma_2^2 + (m\mu_1^2 - 2\mu_3 m \mu_1  + m \mu_3^2) + (n\mu_2^2  - 2\mu_3 n \mu_2 + n \mu_3^2)}{m + n} \\
&= \frac{m \sigma_1^2 + n \sigma_2^2 + m(\mu_1 - \mu_3)^2 + n(\mu_2 - \mu_3)^2}{m+n}
\end{aligned}
$$

### Sources

-   [Deriving the Mean and Variance of the Sample Mean](https://www.youtube.com/watch?v=7mYDHbrLEQo)
-   [Proof that the Sample Variance is an Unbiased Estimator of the Population Variance](https://www.youtube.com/watch?v=D1hgiAla3KI)
-   https://stats.stackexchange.com/questions/55999/is-it-possible-to-find-the-combined-standard-deviation
-   https://stats.stackexchange.com/questions/3931/intuitive-explanation-for-dividing-by-n-1-when-calculating-standard-deviation
