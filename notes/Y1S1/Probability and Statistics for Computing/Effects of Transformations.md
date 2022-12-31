# Effects of Transformations

| City                   | Fahrenheit | Centigrade |
| ---------------------- | ---------- | ---------- |
| Houston                | 54         | 12.22      |
| Chicago                | 37         | 2.78       |
| Minneapolis            | 31         | -0.56      |
| Mianmi                 | 78         | 24.56      |
| Phoenix                | 70         | 21.11      |
| **Mean**               | 54         | 12.22      |
| **Median**             | 54         | 12.22      |
| **Variance**           | 330        | 101.852    |
| **Standard Deviation** | 18.166     | 10.092     |

Converting from celsius to fahrenheit

$$
C = 0.5556F - 17.7778
$$

Standard deviation in C = Standard Deviation in F \* 0.5556

Variance = SD^2

Hence,

Variance in C = 0.5556^2 Variance in F

In general, if $X$ has

- Mean $m$
- Standard deviation $s$
- Variance $s^2$

A new variable $Y = bX + A$ has

- Mean $bm + A$
- Standard deviation $bs$
- Variance $b^2s^2$

# Variance of multiple variables

- Consider 2 **independent** populations X and Y. If I were to take $n$ observations of $X \pm Y$, where the readings are independent of one another, the variance of $X \pm Y$ is

$$
\sigma^2_{X \pm Y} = \sigma^2_X + \sigma^2_Y
$$

- If 2 **correlated** populations $X$ and $Y$, with correlation $\rho$,

$$
\sigma^2_{X \pm Y} = \sigma^2_X + \sigma^2_Y \pm 2 Cov(X, Y)
$$
