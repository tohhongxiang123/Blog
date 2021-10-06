# Maximum Subarray Sum

Given an array of n numbers, our task is to calculate the maximum subarray sum, i.e., the largest possible sum of a sequence of consecutive values in the array. The problem is interesting when there may be negative values in the array. For example, in the array

```
int arr[] = [−1, 2, 4, −3, 5, 2, −5, 2]
```

The maximum sum is 10 (2 + 4 - 3 + 5 + 2)

We assume that the empty array is valid, hence the maximum sum is at least 0

# Algorithm 1

This is a brute force algorithm, that loops through all possible starts/ends of the array, and returns the maximum sum

```cpp
int best = 0;

for (int a = 0; a < n; a++) {
    for (int b = a; b < n; b++) {
        int sum = 0;
        for (int k = a; k <= b; k++) {
            sum += array[k];
        }
        best = max(best,sum);
    }
}

cout << best << "\n";
```

The time complexity for this algorithm is $O(n^3)$

# Algorithm 2

We can actually remove 1 loop from algorithm 1, and we can do this because we just need to calculate the sum of the array everytime the right side moves. Hence

```cpp
int best = 0;

for (int a = 0; a < n; a++) {
    int sum = 0;
    for (int b = a; b < n; b++) {
        sum += array[b];
        best = max(best,sum);
    }
}
cout << best << "\n";
```

Now this algorithm runs in $O(n^2)$

# Algorithm 3

Surprisingly, this problem can be solved in linear time ($O(n)$). The idea is to calculate, for each array position, the maximum sum of a subarray that ends at that position. Then, the overall maximum sum is the maximum of these terms

Consider an array that ends at position `k`. There are 2 possibilities for the maximum sum

1. The subarray consists of only the element at position `k`
2. The subarray consists of the element at position `k`, and the subarray that ends at `k-1`

Since we want to find a subarray with maximum sum, the subarray that ends at `k-1` also should have the maximum sum. Hence, 

```cpp
int best = 0, sum = 0;

for (int k = 0; k < n; k++) {
    sum = max(array[k], sum + array[k]);
    best = max(best, sum);
}

cout << best << "\n";
```

This algorithm is [Kadane's Algorithm](https://medium.com/@rsinghal757/kadanes-algorithm-dynamic-programming-how-and-why-does-it-work-3fd8849ed73d)

# Resources

- https://www.youtube.com/watch?v=2MmGzdiKR9Y
- https://medium.com/@rsinghal757/kadanes-algorithm-dynamic-programming-how-and-why-does-it-work-3fd8849ed73d
- https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/