# Introduction to Statistics

> Statistics is the practice or science of collecting and analysing numerical data in large quantities, for the purpose of inferring proportions in a whole from those in a representative sample

# Descriptive vs Inferential Statistics

**Descriptive** statistics summarise the characteristics of a data set

**Inferential** statistics is when you take data from **samples** and make generalisations about a population

# Independent vs. Dependent, Qualitative vs Quantitative, Discrete vs. Continuous variables

**Independent** variable is the variable you change

**Dependent** variable is the variable which changes **depending** on the independent variable

For example, to find the effects of noise levels on the hours of sleep. The independent variable is noise levels, the dependent variable is the hours of sleep.

**Qualitative** variables are non-measurement variables. The gender of a person, the brand of a car etc.

**Quantitative** variables are variables whose values result from counting/measuring something. The height of a person, the temperature of the room etc.

**Discrete** variables can only take certain values. For example, the number of people in a room, the number of hairs on your head (can only be integer)

**Continuous** variables can take any value. Height, weight, temperature, length etc.

# Percentiles

There is no universally accepted definition for percentile. The following definitions are correct:

> The $p^{th}$ percentile is the lowest score that is greater than $p$% of the scores

> The $p^{th}$ percentile is the lowest score that is greater than or equal to $p$% of the scores

Consider a set of $n$ values. To calculate the $p^{th}$ percentile,

1. Order the values in increasing order
2. Calculate the **rank**, $R = \frac{p}{100} (n + 1)$
3. Round $R$ to the closest integer
4. Either find
    1. The lowest score **greater than** $p$% of the scores
    2. The lowest score **greater than or equal to** $p$% of the scores
    3. Use a **weighted mean** of the first 2 definitions

E.g. Consider the following: [30, 33, 43, 53, 56, 67, 68, 72]. We want to find the 25th percentile

1. Order the values in increasing order (Done)
2. Calculate the rank: $\frac{25}{100} * (8+1) = 2.25$
3. Round $R$ to the closest integer - $R \approx 2$
4. Using each and every definition
    1. The lowest score **greater than** 25% of the scores: 43
    2. The lowest score **greater than or equal to** 25% of the scores: 33
    3. Weighted mean of the first 2 definitions: $33 + (43 - 33) * 0.25 = 35.5$

# Nominal, Ordinal, Interval, Ratio

Nominal data is named categorical data with no order

-   Gender
-   Car brand
-   Type of drink

Ordinal data is named and ordered data. The interval between each category may not be equal

-   Extremely dissatisfied, dissatisfied, neutral, satisfied, extremely satisfied
-   Unhappy, Neutral, Happy
-   Grades A, B, C, D

Interval data is named, ordered and proportionate interval between variables. They do not have a absolute zero because negative values may exist as well

-   Celsius/Fahrenheit scale

Ratio is named,ordered, proportionate interval between variables and can accommodate absolute zero as well

-   The amount of money in your bank account
-   The amount of rainfall in a day

# Presenting Data

### Frequency Table

| Previous Ownership | Frequency | Relative Frequency |
| ------------------ | --------- | ------------------ |
| None               | 85        | 0.17               |
| Windows            | 60        | 0.12               |
| Macintosh          | 355       | 0.71               |
| Total              | 500       | 1.00               |

### Bar Chart

![Bar chart](/public/bar-chart.png)

### Pie Chart

![Pie chart](/public/pie-chart.png)

### Stem and Leaf

21, 21, 22, 23, 24, 24, 24, 30, 30, 30, 31, 32, 34, 41, 43, 43, 48

2 | 1 1 2 3 4 4 4

3 | 0 0 0 1 2 4

4 | 1 3 3 8
