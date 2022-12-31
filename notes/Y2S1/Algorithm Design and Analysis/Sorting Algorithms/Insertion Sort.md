# Insertion Sort

Insertion sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time (Incremental approach). The main idea is to repeatedly pick up an element `x` to insert into a sorted sub-array on the left side, by comparing `x` with its left neighbour. If they are out of order, swap them; otherwise, insert `x` there.

- Insertion sort is stable
  - Relative order of elements of equal value remain the same before and after sorting

## Procedure

1. The first element is assumed to be sorted (**9**, 5, 1, 4, 3)
2. We now look at the second element (9, **5**, 1, 4, 3)
   1. If secondElement < firstElement, we swap (since it is out of order) (**5, 9**, 1, 4, 3)
   2. Else, the first 2 elements in the array are sorted
3. We now look at the third element (5, 9, **1**, 4, 3)
   1. If thirdElement < secondElement, we swap (out of order) (5, **1, 9**, 4, 3)
   2. If secondElement < firstElement, we swap (out of order) (**1, 5**, 9, 4, 3)
   3. Now the first 3 elements in the array are sorted
   4. If at any point, the nextElement > previousElement, we can safely say that the array is sorted at that point already
4. Repeat until whole array is sorted.

In general, if at iteration $n$, we reach any point where $arr[i] > arr[i-1], 0 < i \leq n$, the first $n$ items in the array are sorted, and that $n^{th}$ element is now in place.

## Code

In pseudocode:

```
void insertionSort(T[] arr, int size) {
    for (int i = 1; i < n; i++) { // first element is already sorted, we look from second element onwards
        for (int j = i; j > 0; j--) { // we start from the ith element in the iteration, and keep moving downwards the array
            if (arr[j] < arr[j-1]) { // if nextElement < previousElement
                swap(arr, i, j); // swap positions
            } else {
                break; // we are done with the ith iteration
            }
        }
    }
}
```

In C:

```c
#include <stdio.h>

void printArr(int arr[], int size) {
    // print out the entire array
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void swap(int arr[], int i, int j) {
    // swap 2 elements in an array
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

void insertionSort(int arr[], int size) {
    // perform insertion sort on array
    for (int i = 1; i < size; i++){
        for (int j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(arr, j, j-1);
            } else {
                break;
            }
        }
    }
}

int main()
{
    int arr[] = { 9, 8, 7, 6, 2, 3, 4, 1 };
    insertionSort(arr, 8);
    printArr(arr, 8);
}
```

- Original unsorted array and final sorted array are both in the same memory location (No extra memory required)
- Since original array is directly mutated, swapping and shifting are essential
- While sorting, the left side is the "sorted" portion while the right side is the "unsorted" portion. Sorted portion grows while unsorted portion shrinks.
- We start looking at index 1 instead of 0, since we can assume that the first element of the array is already sorted (A list of 1 element is always sorted)

## Complexity Analysis

- $n-1$ iterations in the outer loop
- Best case: 1 comparison per iteration: $n - 1$ total comparisons, $O(n)$
  - Already sorted array (1, 2, 3, 4, 5)
- Worst case: $i$ comparisons for the $i^{th}$ iteration: $\sum_{i=1}^{n-1} i = \frac{n(n-1)}{2}$, $O(n^2)$
  - Reversed sorted array (5, 4, 3, 2, 1)
- Average case:
  - For the $i^{th}$ iteration, it may have $1, 2, ..., i$ comparisons
  - Each has a probability of $\frac{1}{i}$ of occurring
  - Hence the average number of comparisons for the $i^{th}$ iteration is $\frac{1}{i} \sum_{j=0}^{i} j$
  - In total, the average case has a runtime of
    $$
    \begin{aligned}
    \sum_{i=1}^{n - 1} \left(\frac{1}{i} \sum_{j=0}^{i} j \right) &= \sum_{i=1}^{n - 1}\frac{i+1}{2} \\
    &=  \frac{(n+2)(n-1)}{4} \\
    &= O(n^2)
    \end{aligned}
    $$

## Pros and Cons

Pros

- Good when list is almost sorted
- Need minimum time to verify if list is sorted
- Fast with linked list implementation (no movement of data)

Cons

- When entry is inserted, may still not be in the final position yet
- Every new insertion requires movement from some entries that are already sorted
- When each slot is large, movement of data is expensive
- Less suitable for contiguous storage implementation

### Read more about insertion sort

- https://www.programiz.com/dsa/insertion-sort
- https://en.wikipedia.org/wiki/Insertion_sort
- https://www.geeksforgeeks.org/insertion-sort/
