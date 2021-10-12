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

Let `optCost(d, i, j)` be the optimal cost of multiplying $A_i, A_{i + 1}, ..., A_{j}$, where $d = \{ d_0, d_1, ..., d_{n+1} \}$, where $A_i \in \R^{d_i \times d_{i + 1}}$. We know a few things.

1. `optCost(d, i, j) = 0` if `j == i + 1`, because we are on a single matrix (Remember that the matrix $A_i$ has dimensions $d_i \times d_{i + 1}$)
2. `optCost(d, i, j) = min(optCost(d, i, k) + optCost(d, k, j) + d[i] * d[k] * d[j])` for all `i + 1 <= k <= j - 1`, where the matrix $A_1 \in \R^{d_0 \times d_1}$ and $A_2 \in \R^{d_1 \times d_2}$
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

We want to avoid recomputing smaller values. Hence, we create a table to keep the values of the previous results. `dp[i][j]` keeps the minimum cost for `optCost(d, i, j)`. 

To include a dp table, we modify `optCost` to now include a `dp` table for the function - `optCost(int[][] *dp, int[] d, int i, int j)`

Another thing we might want to do is to get the actual sequence that gives the minimum operations. Hence we will use a matrix called `last`, used to extract out the order of operations for multiplying the matrices.

Hence now the function we call is `optCost(int[][] *last, int[][] *dp, int[] d, int i, int j)`

```cpp
#include <iostream>
#include <climits>
#include <vector>

using namespace std;

int optCost(vector< vector<int> > *last, vector< vector<int> > *dp, vector<int> d, int i, int j) {
    if (j == i + 1) {
        (*dp)[i][j] = 0;
        return (*dp)[i][j];
    }
    
    if ((*dp)[i][j] != -1) {
        return (*dp)[i][j];
    }

    int min = INT_MAX;
    for (int k = i + 1; k < j; k++) {
        int leftCost, rightCost;
        if ((*dp)[i][k] != -1) {
            leftCost = (*dp)[i][k];
        } else {
            leftCost = optCost(last, dp, d, i, k);
            (*dp)[i][k] = leftCost;
        }
        
        if ((*dp)[k][j] != -1) {
            rightCost = (*dp)[k][j];
        } else {
            rightCost = optCost(last, dp, d, k, j);
            (*dp)[k][j] = rightCost;
        }
        
        int cost = (*dp)[i][k] + (*dp)[k][j] + d[i] * d[k] * d[j];
        
        if (cost < min) {
            min = cost;
            (*last)[i][j] = k;
        }
    }

    (*dp)[i][j] = min;
    return min;
}

void printOptimalOrder(vector< vector<int> > last, int i, int j, char *name) {
    if (i + 1 == j) {
        cout << *name;
        (*name)++;
        return;
    }

    cout << "(";
    printOptimalOrder(last, i, last[i][j], name);
    printOptimalOrder(last, last[i][j], j, name);
    cout << ")";
}

int main()
{
    vector<int> arr = { 30, 1, 40, 10, 25 };
    
    int n = arr.size();
    
    vector< vector<int> > dp;
    vector< vector<int> > last;
    
    for (int i = 0; i < n; i++) {
        vector<int> a;
        vector<int> b;
        for (int j = 0; j < n; j++) {
            a.push_back(-1);
            b.push_back(-1);
        }
        dp.push_back(a);
        last.push_back(b);
    }
 
    cout << "Minimum number of multiplications is " << optCost(&last, &dp, arr, 0, n - 1) << endl;

    char firstArray = 'A';
    printOptimalOrder(last, 0, n - 1, &firstArray);
    cout << endl;

    return 0;
}
```

# Time Complexity

In the worst case, chain matrix multiplication using dynamic programming runs in $O(n^3)$

# Resources

- https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/

