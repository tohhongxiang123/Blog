# 0/1 Knapsack

> We have a knapsack of capacity $C$, where $C$ is a positive integer, and $n$ objects with weights $w_1, w_2, ..., w_n$ and profits $p_1, p_2, ... , p_n$, where all $w_i$ and $p_i$ are positive integers. Find the largest total profit of any subset of the objects that fit in the knapsack

- We have to take whole objects
- There are $2^n$ subsets of $n$ objects, brute force will take $O(2^n)$ time

# Procedure

1. Formulate the 0/1 Knapsack Problem in terms of smaller versions of the same problem
    - Consider the last of $n$ objects with weights $w_1, w_2, ..., w_n$
    - If we include it in the knapsack, the available weight of the knapsack is reduced by $w_n$
    - Our profits would be $p_n$, plus the maximum we can get from solving the subproblem of $n-1$ objects with capacity $C - w_n$
    - If we do not include the $n^{th}$ object in our knapsack, it is the same as solving the problem of filling a knapsack with capacity $C$ and $n-1$ objects
    - The dynamic programming selection rule: When given a number of possibilities, compute all the possibilities, and take the best
2. Turn the formulation into a recursive formula
    - From the above formulation, we can write the recursive formula,

$$
    P(C, n) = \begin{cases}
        P(C, 0) = P(0, j) = 0 \\
        P(C, n) = \max (p_n + P(C - w_n, n - 1), P(C, n - 1))
    \end{cases}
$$

3. Draw subproblem graph and find dependencies among subproblems
    - For this, we know that $P(C, n)$ depends on $P(C - w_n, n-1)$ and $P(C, n-1)$

4. Create the dynamic programming table
    - We shall create a dictionary `profits[C + 1][n + 1]`
    - Going down each column means increasing the capacity $C$ of the knapsack, while going rightwards for each row means increasing the number of objects to consider

# Code

```cpp
#include <iostream>

using namespace std;
int knapsack(int[], int[], int, int);

int main() {
    int w[] = { 1,2,3 };
    int p[] = { 1,4,6 };
    int n = 3;
    int c = 3;

    cout << knapsack(w, p, n, c) << endl;
}

// returns the maximum profits given an array of weights and profits for a specific capacity
int knapsack(int weights[], int profits[], int numberOfElements, int capacity) {
    // dp table
    int overallProfits[capacity + 1][numberOfElements + 1];

    for (int i = 0; i < capacity + 1; i++) {
        overallProfits[i][0] = 0; // when there are 0 objects, profit is 0 regardless of capacity
    }

    for (int i = 0; i < numberOfElements + 1; i++) {
        overallProfits[0][i] = 0; // when capacity is 0, profit is 0 regardless of number of objects
    }

    for (int currentCapacity = 1; currentCapacity <= capacity; currentCapacity++) {
        for (int currentNumberOfElements = 1; currentNumberOfElements <= numberOfElements; currentNumberOfElements++) {
            overallProfits[currentCapacity][currentNumberOfElements] = overallProfits[currentCapacity][currentNumberOfElements - 1];

            if (weights[currentNumberOfElements - 1] <= currentCapacity) { // if we can fit a new item
                // we check the profit if we include the item
                int profitsIncludingNewElement = profits[currentNumberOfElements - 1] + 
                    overallProfits[currentCapacity - weights[currentNumberOfElements - 1]][currentNumberOfElements - 1];
                // if profits for including item > profits without including item
                if (profitsIncludingNewElement > overallProfits[currentCapacity][currentNumberOfElements]) {
                    // set that as the new overall profit
                    overallProfits[currentCapacity][currentNumberOfElements] = profitsIncludingNewElement;
                }
            }
        }
    }

    return overallProfits[capacity][numberOfElements];
}
```

# Showing the items that go into the Knapsack

1. From the profits table, we start at the last element `overallProfits[capacity][numberOfElements]`
2. Let `c = capacity` and `i = numberOfElements - 1`. We are current considering the `i`th item at a capacity of `c`. If `overallProfits[c][i] != overallProfits[c][i - 1]`, this means that the current element we are looking at was included in the knapsack. We will print out the current item, then we move to `c = c - weights[i]` and consider the remaining `i-1` elements
3. Repeat until all the items are considered, or the capacity reaches 0

```cpp
#include <iostream>

using namespace std;
int knapsack(int[], int[], int, int);

int main() {
    int p[] = {10, 40, 30, 50};
    int w[] = {5, 4, 6, 3};
    int n = 4;
    int c = 10;

    cout << knapsack(w, p, n, c) << endl;
}

// returns the maximum profits given an array of weights and profits for a specific capacity
int knapsack(int weights[], int profits[], int numberOfElements, int capacity) {
    // dp table
    int overallProfits[capacity + 1][numberOfElements + 1];

    for (int i = 0; i < capacity + 1; i++) {
        overallProfits[i][0] = 0; // when there are 0 objects, profit is 0 regardless of capacity
    }

    for (int i = 0; i < numberOfElements + 1; i++) {
        overallProfits[0][i] = 0; // when capacity is 0, profit is 0 regardless of number of objects
    }

    for (int currentCapacity = 1; currentCapacity <= capacity; currentCapacity++) {
        for (int currentNumberOfElements = 1; currentNumberOfElements <= numberOfElements; currentNumberOfElements++) {
            overallProfits[currentCapacity][currentNumberOfElements] = overallProfits[currentCapacity][currentNumberOfElements - 1];

            if (weights[currentNumberOfElements - 1] <= currentCapacity) { // if we can fit a new item
                // we check the profit if we include the item
                int profitsIncludingNewElement = profits[currentNumberOfElements - 1] + 
                    overallProfits[currentCapacity - weights[currentNumberOfElements - 1]][currentNumberOfElements - 1];
                // if profits for including item > profits without including item
                if (profitsIncludingNewElement > overallProfits[currentCapacity][currentNumberOfElements]) {
                    // set that as the new overall profit
                    overallProfits[currentCapacity][currentNumberOfElements] = profitsIncludingNewElement;
                }
            }
        }
    }
    
    // print out the contents of the knapsack
    int remainingWeight = capacity;
    cout << "Contents: " << endl;
    for (int i = numberOfElements; i > 0; i--) {
        if (remainingWeight <= 0) {
            break;
        }
        
        if (overallProfits[remainingWeight][i] != overallProfits[remainingWeight][i - 1]) {
            cout << "Weight: " << weights[i - 1] << ", Profit: " << profits[i - 1] << endl;
            remainingWeight -= weights[i - 1];
        }
    }
    cout << endl;

    return overallProfits[capacity][numberOfElements];
}
```

# Time Complexity

The time complexity of 0/1 knapsack is $O(nC)$, where $n$ is the number of objects, and $C$ is the capacity

This algorithm runs in **pseudo-polynomial** time
- The runtime is a polynomial function of the **value** of the input
- For this case, the runtime depends on the capacity $C$ of the knapsack

# Variation to 0/1 Knapsack: Unbounded Knapsack

Instead of either having 0 or 1 of each item, assume that we have an infinite supply of each item. The code is now as follows:

1. Create a DP table: `overallProfits[capacity + 1]`
2. We also create another table `itemKept` to keep track of the index of the last item we kept in the knapsack
3. We initially let all entries of `overallProfits` be 0, and `itemKept` be -1
4. When capacity is 0, we know that the overall profit is 0
5. Loop from `c = 1` to `capacity` (inclusive)
    1. Introduce a `indexOfWeightKept` to see which was the index of the new item we chose to add to the knapsack at capacity `c`. Initially, we set `indexOfWeightKept = -1`, assuming that we did not choose any new item to add to the knapsack.
    2. For each `c`, loop through each item `i` = 0 to n
        1. `currentProfit = overallProfits[c]`
        2. `newProfit = overallProfits[c - weights[i]] + profits[i]`
        3. `overallProfits[c] = max(currentProfit, newProfit)`
        4. `indexOfWeightKept = i`
    3. If `indexOfWeightKept != -1`, we set `itemKept[c] = indexOfWeightKept`
6. To print out the items we chose to keep in the knapsack,
    1. We set `c = capacity`
    2. While `c > 0`
        1. If `overallProfits[c] == overallProfits[c - 1]`, this means that no new item was added to the knapsack. We will set `c--` and `continue`
        2. If not, this means that a new item was kept in the knapsack. This item has `index = itemKept[c]`
        3. We print out this item's profit (`profit[c]`) and then set `c = c - weights[itemsKept[c]]`. We want reduce the capacity by the weight of the item, and continue from there
7. Return `overallProfits[capacity]`

To print each item, 

```py
def knapsack(profits, weights, capacity):
    overallProfits = [0 for i in range(capacity + 1)]
    itemKept = [-1 for i in range(capacity + 1)]
    
    for i in range(1, capacity + 1):
        indexOfWeightKept = -1
        for j in range(len(profits)):
            if (weights[j] <= i):
                currentProfit = overallProfits[i]
                newProfit = profits[j] + overallProfits[i - weights[j]]
                if currentProfit < newProfit:
                    overallProfits[i] = newProfit
                    indexOfWeightKept = j
                    
        itemKept[i] = indexOfWeightKept
    
    currentCapacity = capacity
    while currentCapacity > 0:
        if overallProfits[currentCapacity] != overallProfits[currentCapacity-1]:
            print("Weight used: ", profits[itemKept[currentCapacity]])
            currentCapacity -= weights[itemKept[currentCapacity]]
            continue
            
        currentCapacity -= 1
    return overallProfits[capacity]
```