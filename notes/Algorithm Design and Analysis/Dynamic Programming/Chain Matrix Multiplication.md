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

Let `optCost(dimensions, i, j)` be the optimal cost of multiplying $A_i, A_{i + 1}, ..., A_{j}$, where $dimensions = \{ d_0, d_1, ..., d_{n+1} \}$, where $A_i \in \R^{d_i \times d_{i + 1}}$. We know a few things.

1. `optCost(dimensions, i, j) = 0` if `j == i + 1`, because we are on a single matrix (Remember that the matrix $A_i$ has dimensions $d_i \times d_{i + 1}$)
2. `optCost(dimensions, i, j) = min(optCost(dimensions, i, k) + optCost(dimensions, k, j) + dimensions[i] * dimensions[k] * dimensions[j])` for all `i + 1 <= k <= j - 1`, where the matrix $A_1 \in \R^{d_0 \times d_1}$ and $A_2 \in \R^{d_1 \times d_2}$
3. We want to find `optCost(0, n)`

## Recursive Code

```cpp
#include <iostream>
#include <climits>

using namespace std;

int optCost(int dimensions[], int i, int j) {
    if (j == i + 1) {
        return 0;
    }

    int min = INT_MAX;
    for (int k = i + 1; k < j; k++) {
        int cost = optCost(dimensions, i, k) + optCost(dimensions, k, j) + dimensions[i] * dimensions[k] * dimensions[j];
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

We want to avoid recomputing smaller values. Hence, we create a table to keep the values of the previous results. `costs[i][j]` keeps the minimum cost for `optCost(dimensions, i, j)`. 

To include a costs table, we modify `optCost` to now include a `costs` table for the function - `optCost(int[][] *costs, int[] dimensions, int i, int j)`

Another thing we might want to do is to get the actual sequence that gives the minimum operations. Hence we will use a matrix called `last`, used to extract out the order of operations for multiplying the matrices.

Hence now the function we call is `optCost(int[][] *last, int[][] *costs, int[] dimensions, int i, int j)`

### Top-down Approach

```cpp
#include <iostream>
#include <climits>
#include <vector>

using namespace std;

int optCost(vector< vector<int> > *last, vector< vector<int> > *costs, vector<int> dimensions, int i, int j) {
    if (j == i + 1) {
        (*costs)[i][j] = 0;
        return (*costs)[i][j];
    }
    
    if ((*costs)[i][j] != -1) {
        return (*costs)[i][j];
    }

    int min = INT_MAX;
    for (int k = i + 1; k < j; k++) {
        int leftCost, rightCost;
        if ((*costs)[i][k] != -1) {
            leftCost = (*costs)[i][k];
        } else {
            leftCost = optCost(last, costs, dimensions, i, k);
            (*costs)[i][k] = leftCost;
        }
        
        if ((*costs)[k][j] != -1) {
            rightCost = (*costs)[k][j];
        } else {
            rightCost = optCost(last, costs, dimensions, k, j);
            (*costs)[k][j] = rightCost;
        }
        
        int cost = (*costs)[i][k] + (*costs)[k][j] + dimensions[i] * dimensions[k] * dimensions[j];
        
        if (cost < min) {
            min = cost;
            (*last)[i][j] = k;
        }
    }

    (*costs)[i][j] = min;
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
    
    vector< vector<int> > costs;
    vector< vector<int> > last;
    
    for (int i = 0; i < n; i++) {
        vector<int> a;
        vector<int> b;
        for (int j = 0; j < n; j++) {
            a.push_back(-1);
            b.push_back(-1);
        }
        costs.push_back(a);
        last.push_back(b);
    }
 
    cout << "Minimum number of multiplications is " << optCost(&last, &costs, arr, 0, n - 1) << endl;

    char firstArray = 'A';
    printOptimalOrder(last, 0, n - 1, &firstArray);
    cout << endl;

    return 0;
}
```

### Bottom-Up Approach

```cpp
#include <iostream>
#include <climits>
#include <vector>

using namespace std;

void printOptimalOrder(vector<vector<int>> last, int i, int j, char *name) {
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

int optCost(int dimensions[], int size) {
    // intialise cost matrix (dp table) and last matrix
    vector<vector<int>> cost;
    vector<vector<int>> last;
    for (int i = 0; i < size; i++) {
        vector<int> a;
        vector<int> b;
        for (int j = 0; j < size; j++) {
            a.push_back(-1);
            b.push_back(-1);
        }
        
        cost.push_back(a);
        last.push_back(b);
    }
    
    for (int i = 0; i < size; i++) {
        cost[i][i + 1] = 0;
    }
    
    for (int length = 2; length < size; length++) { // start from the 3rd dimension because this will include at least 2 matrices
        for (int startIndex = 0; startIndex < size - length; startIndex++) {
            int endIndex = startIndex + length;
            cost[startIndex][endIndex] = INT_MAX;
            
            for (int partitionIndex = startIndex + 1; partitionIndex < endIndex; partitionIndex++) {
                int costToMultiply = dimensions[startIndex] * dimensions[partitionIndex] * dimensions[endIndex];
                int costBeforeMultiplying = cost[startIndex][partitionIndex] + cost[partitionIndex][endIndex];
                int currentCost = costBeforeMultiplying + costToMultiply;
                
                if (currentCost < cost[startIndex][endIndex]) {
                    cost[startIndex][endIndex] = currentCost;
                    last[startIndex][endIndex] = partitionIndex;
                }
            }
        }
    }
    
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            cout << last[i][j] << " ";
        }
        cout << endl;
    }
    
    // print 
    char firstArrayName = 'A';
    printOptimalOrder(last, 0, size - 1, &firstArrayName);
    cout << endl;
    
    return cost[0][size - 1];
}

int main() {
    int d[] = { 5, 4, 6, 2, 7 };
    int size = sizeof(d) / sizeof(int);
    
    int minCost = optCost(d, size);
    cout << minCost << endl;
    return 0;
}
```


# Time Complexity

In the worst case, chain matrix multiplication using dynamic programming runs in $O(n^3)$

# Resources

- https://www.geeksforgeeks.org/matrix-chain-multiplication-costs-8/
- https://www.youtube.com/watch?v=prx1psByp7U
- https://www.youtube.com/watch?v=eKkXU3uu2zk

