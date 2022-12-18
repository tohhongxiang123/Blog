# Sorts

# Bubble Sort

-   Compare neighbors
-   If left element greater than right element, swap

```
temp = arr[x];
arr[x] = arr[x+1];
arr[x+1] = temp;
```

-   Advance counter to next pair
-   One pass (from start to end) is n - 1 comparisons
-   Repeat for n passes
-   $O(n^2)$

# Insertion Sort

-   2 sets
    -   Sorted on the left
    -   Unsorted on the right
-   Leftmost unsorted bubbles through sorted until in correct position
-   $O(n^2)$

# Selection Sort

-   Select the minimum element from all unsorted elements
-   Swap the minimum element with the first unsorted element
-   $O(n^2)$
