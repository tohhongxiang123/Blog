# Bivariate Data

> Bivariate data consists of data on 2 variables. We are interested in the relationship of the 2 variables

We can use a scatter plot to visually see the relationship between the 2 variables

# Pearson Product-Moment Correlation

> The Pearson Product-Moment Correlation, $\rho$, is the strength of the **linear** relationship between 2 variables
>
> $$
> \rho = \frac{\sum xy}{\sqrt{\sum x^2 \sum y^2}} = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2} \sqrt{\sum (y_i - \bar{y})^2}} = \frac{cov(x, y)}{\sigma_x \sigma_y}
> $$

$cov(x, y)$ is the covariance of x and y, and is given by

$$
cov(X, Y) = E[(X - \mu_X)(Y - \mu_Y)]
$$

![Bivariate plots with different pearson correlations](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient#/media/File:Correlation_examples2.svg)

### Properties of Pearson Product

- Ranges from $[-1, 1]$
- -1 means the 2 variables are perfectly negatively correlated
- +1 means the 2 variables are perfectly positively correlated
- 0 means the 2 variables have no correlation with each other
- Symmetric - The correlation of X with Y is the same as the correlation of Y with X
- Unafffected by linear transformations - The correlation of X with Y is the same as the correlation of aX + b to Y

# Variance Sum Laws

If X and Y are independent,

$$
\sigma^2_{X \pm Y} = \sigma^2_X + \sigma^2_Y
$$

If X and Y are correlated,

$$
\sigma^2_{X \pm Y} = \sigma^2_X + \sigma^2_Y \pm 2 \rho \sigma_X \sigma_Y
$$
