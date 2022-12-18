# Linear Regression

Given a set of observations, linear regression aims to find a best fit line that minimises the sum of residuals between the line and the observations

Residuals: The squared distance between the line and the actual observation

Let us have a line $f(x) = mx + b$, our initial estimate. The sum of residuals, $J(m, b)$ is

$$
J(m, b) = \sum_{i=1}^{n} (y_i - f(x_i))^2 = \sum_{i=1}^{n} (y_i - mx_i - b)^2
$$

Where $(x_i, y_i)$ is the $i$th observation. Note that the sum of residuals is affected by the gradient of the line, $m$, and the intercept of the line $b$

To get the values of $b$ that minimise $J$, we take its **partial derivative**

$$
\frac{\partial J}{\partial b} = \sum_{i=1}^{n} -2(y_i - mx_i - b) = 0
$$

Solving for $b$,

$$
b = \frac{\sum_{i=1}^{n} y_i - \sum_{i=1}^{n} x_i}{n} = \bar{Y} - m\bar{X}
$$

Where $\bar{Y}$ and $\bar{X}$ is the mean of $Y$ and $X$ respectively

Similarly for $m$,

$$
\frac{\partial J}{\partial m} = \sum_{i=1}^{n} -2 x_i (y_i - mx_i - b) = 0
$$

Substituting $b = \bar{Y} - m\bar{X}$ and rearranging, we get

$$
m = \frac{\sum_{i=1}^{n} (x_i y_i - \bar{Y} x_i)}{\sum_{i=1}^{n}{(x_i^2 - \bar{X} x_i)}}
$$
