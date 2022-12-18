# Central Tendency

There are multiple ways of defining the "center" of a dataset

-   Mean (Minimum absolute difference)
-   Median (Minimum squared difference)
-   Mode

### Arithmetic Mean

The most common and well-known measure of central tendency. The mean of a population is $\mu$, while the mean of a sample is $M$

$$
\mu = \frac{1}{N} \sum X
$$

where $\sum X$ is the sum of all numbers in the population and $N$ is the number of numbers in the population

E.g. the mean of 1, 2, 3, 6, 8 is (1+2+3+6+8)/5 = 4

### Median

It is the midpoint of a distribution, the same number of scores are above it and below it. It is the **50th percentile**

If you scored 16th highest in a class of 31, you are in the 50th percentile because there are 15 students who scored higher, and 15 scored lower.

If there are an odd number of numbers, the median is exactly the middle number. The median of 2, 4, 5 is 4.

If there are an even number of numbers, the median is the mean of the 2 middle numbers. The median of 2, 4, 7, 12 is (4+7)/2 = 12

### Mode

The mode is the most frequently occurring value in a sample

E.g. The mode of 1, 2, 3, 3, 3, 3, 3, 5, 5, 88 is 3

To calculate the mode for continuous data, we use grouped frequency distributions (data binning)

### Trimean

A weighted average of the 25th, 50th and 75th percentile

$$
Trimean = \frac{P_{25} + 2P_{50} + P_{75}}{4}
$$

### Geometric Mean

Computed by multiplying all the numbers together, and taking the nth root

$$
G = \left(\Pi X\right)^{\frac{1}{N}}
$$

### Trimmed Mean

The mean computed after removing some of the higher and lower scores.

A mean trimmed 10% is the mean with 5% of the scores from the bottom and 5% of the scores removed from the top trimmed off. For example, for the solving of a 3x3 rubik's cube, a solver's score is the 40% trimmed mean of 5 solves. Of the 5 scores, the highest and lowest score is removed, and the mean for the remaining scores is used.

# Comparing Measures

In symmetric distributions, the mean, median, trimean and trimmed mean are equal. However, it is not equal for skewed distributions
