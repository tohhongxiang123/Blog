# Multi-dimensional Arrays

```java
int[][] matrix = new int[5][10]
```

Creates a 2D matrix with 5 rows and 10 columns

## Uses of 2D arrays

-   Grid-based games like tic-tac toe
-   A set of distances between pairs of cities
-   Matrices in linear algebra
-   Tabular data

## Quirks

-   No requirement in Java that all rows of a 2D matrix have the same number of elements (columns)
-   Allow jagged arrays
-   Useful for storage saving

# Problem: Matrix

Create a class `Matrix` with a constructor and method:

-   `Matrix(int[][] matrix)` initialise an instance variable to reference the matrix passed in to the constructor as a parameter
-   `int sum()` computes the sum of all elements in the matrix
