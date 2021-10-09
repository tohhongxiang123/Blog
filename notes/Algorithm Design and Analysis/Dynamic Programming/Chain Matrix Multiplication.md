# Chain Matrix Multiplication

Consider 4 matrices $A_1, A_2, A_3, A_4$, where

- $A_1 = \R^{30 \times 1}$
- $A_2 = \R^{1 \times 40}$
- $A_3 = \R^{40 \times 10}$
- $A_4 = \R^{10 \times 25}$
 
If we multiply the matrices in different orders, we will get a different number of required operations

- $((A_1 A_2)A_3)A_4 = (30)(1)(40) + (30)(40)(10) + (30)(10)(25) = 20700$
- $A_1((A_2 A_3) A_4) = (1)(40)(10) + (1)(10)(25) + (30)(1)(25) = 1400$

# Problem Statement

> Given matrices $A_1, A_2, ..., A_n$ where dimensions of $A_i$ are $d_{i - 1} \times d_i$ for 1 \leq i \leq n, what order should the matrix multiplications be computed in order to incur minimum cost? The cost refers to the number of multiplications required

There are $(n-1)!$ ways to multiply the $n$ matrices. Since matrix multiplication is associative, the order of multiplication does not affect the result. However, it affects how many operations are required. 

Let `optCost(i, j)` be the optimal cost of multiplying $A_i, A_{i + 1}, ..., A_{j}$. We know a few things.

1. `optCost(i, j) = 0` if `j == i + 1`, because we are on a single matrix (Remember that the matrix $A_i$ has dimensions $d_i \times d_{i + 1}$)
2. `optCost(i, j) = min(optCost(i, k) + optCost(k, j) + d[i] * d[k] * d[j])` for all `i + 1 <= k <= j - 1`, where the matrix $A_1 \in \R^{d_0 \times d_1}$ and $A_2 \in \R^{d_1 \times d_2}$
3. We want to find `optCost(0, n)`

## Recursive Code

```cpp
#include <iostream>
#include <climits>

using namespace std;

int optCost(int d[], int i, int j) {
    if (j == i + 1) {
        return 0;
    }

    int min = INT_MAX;
    for (int k = i + 1; k < j; k++) {
        int cost = optCost(d, i, k) + optCost(d, k, j) + d[i] * d[k] * d[j];
        if (cost < min) {
            min = cost;
        }
    }

    return min;
}

int main()
{
     int arr[] = { 30,1,40,10,25 };
    int n = sizeof(arr) / sizeof(arr[0]);
 
    cout << "Minimum number of multiplications is " << optCost(arr, 0, n - 1);

    return 0;
}
```

## Optimisation

We want to avoid recomputing smaller values. Hence, we create a table to keep the values of the previous results. `dp[i][j]` keeps the minimum cost for `optCost(d, i, j)`

# Resources

- https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/

