# Variability

> Variability refers to how "spread out" a group of scores is

There are several measures of variability

- Range
- Interquartile range
- Variance
- Standard deviation

### Range

The difference between the maximum and minimum score

$$
Range = \max - \min
$$

### Interquartile Range

The range containing the middle 50% of the scores

$$
IQR = P_{75} - P_{25}
$$

It is also referred to as the H-spread

### Variance

The average squared difference of each score from the mean

The variance in a population, $\sigma^2$

$$
\sigma^2 = \frac{\sum (X-\mu)^2}{N}
$$

The variance estimated from a sample,

$$
s^2 = \frac{\sum (X-M)^2}{N-1}
$$

### Standard Deviation

The standard deviation is the square root of the variance. Population standard deviation is $\sigma$ and sample standard deviation is $s$

Standard deviation is very useful for **normal distributions**

- 68% of the data is within +- 1 SD from the mean
- 95% of the data is within +- 2 SD from the mean

# Skew and Kurtosis

Distributions can vary in

- Skew
- Kurtosis

### Skew

![Positive, Symmetrical and Negative skew distributions](https://en.wikipedia.org/wiki/Skewness#/media/File:Relationship_between_mean_and_median_under_different_skewness.png)

Positive skews have tails that extend to the right. The mean is larger than the median

### Third Moment

$$
\sum \frac{(X-\mu)^3}{N\sigma^3}
$$

### Pearson's Measure of Skew

$$
\frac{3(\text{Mean} - \text{Median})}{\sigma}
$$

### Estimating Skew from a sample

$$
\frac{n}{(n-1)(n-2)}\sum \frac{(X-M)^3}{s^3}
$$

### Kurtosis

$$
\sum \frac{(X-\mu)^4}{N\sigma^4} - 3
$$

### Estimating Kurtosis

$$
\frac{n(n+1)}{(n-1)(n-2)(n-3)} \sum \frac{(X-M)^4}{s^4} - \frac{3(n-1)^2}{(n-2)(n-3)}
$$
