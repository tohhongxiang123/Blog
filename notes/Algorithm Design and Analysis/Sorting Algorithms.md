# Sorting Algorithms

Given an unordered array, we are to sort the array into increasing order. Here are a few sorting algorithms

1. Insertion Sort
2. Bubble Sort

# Insertion Sort

Insertion sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time (Incremental approach). The main idea is to repeatedly pick up an element `x` to insert into a sorted sub-array on the left side, by comparing `x` with its left neighbour. If they are out of order, swap them; otherwise, insert `x` there.


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

# Merge Sort

Merge sort is a divide-and-conquer algorithm. It divides the input array into 2 halves, calls itself on the 2 halves, and then merges the 2 sorted halves. It consists of 2 important functions
1. `mergeSort(int arr[], int lower, int higher)` - the main sorting algorithm
2. `merge(int arr[], int lower, int middle, int higher)` - a function that helps merge the 2 halves generated within `mergeSort`

`mergeSort` does the following:
1. If lower >= higher, the program is complete
2. Get the middle of the array
3. `mergeSort` the lower half of the array (`mergeSort(arr, lower, middle)`)
4. `mergeSort` the upper half of the array (`mergeSort(arr, middle + 1, upper)`)
5. Merge the 2 halves together (`merge(arr, lower, middle, upper)`)

`merge` does the following:
1. Create a temporary array to store all the elements required (`numberOfElements = higher - lower + 1`)
2. Create a pointer to the start of the lower array
3. Create a pointer to the start of the upper array
4. While both pointers have not reached the end of their respective arrays:
    1. If the element pointed to by the lower pointer is lower than the element pointed to by the upper pointer
        1. Insert lower element into temporary array
        2. Move lower pointer up by 1
    2. Else
        1. Insert upper element into temporary array
        2. Move upper pointer up by 1
5. Once complete, add the remaining elements of the lower array into the temporary array
6. Add the remaining elements of the upper array into the temporary array
7. Copy the temporary array back into the original array

```c
#include <stdio.h>

void printArr(int arr[], int size) { 
    // print out the entire array
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}


void merge(int arr[], int lower, int middle, int higher) {
    int temporaryArray[higher - lower + 1]; // create array to copy elements into

    int leftPointer = lower; // create a pointer to the start of the lower array
    int rightPointer = middle + 1; // create a pointer to the start of the upper array
    int numberOfMergedElements = 0; // keep track of how many items in temporaryArray

    while (leftPointer <= middle && rightPointer <= higher) { // traverse through left and right halves
        if (arr[leftPointer] < arr[rightPointer]) { // if element in lower half smaller
            temporaryArray[numberOfMergedElements] = arr[leftPointer]; // copy to temp array
            leftPointer++;
        } else {
            temporaryArray[numberOfMergedElements] = arr[rightPointer]; // else copy upper half element to temp array
            rightPointer++;
        }

        numberOfMergedElements++;
    }

    // add remaining elements in lower half
    while (leftPointer <= middle) {
        temporaryArray[numberOfMergedElements] = arr[leftPointer];
        numberOfMergedElements++;
        leftPointer++;
    }

    // add remaining elements in upper half
    while (rightPointer <= higher) {
        temporaryArray[numberOfMergedElements] = arr[rightPointer];
        numberOfMergedElements++;
        rightPointer++;
    }

    for (int i = lower; i <= higher; i++) { // copy array
        arr[i] = temporaryArray[i - lower];
    }
}

void mergeSort(int arr[], int lower, int higher) {
    if (lower >= higher) {
        return;
    }

    int middle = (higher + lower) / 2; // get the middle of the array
    mergeSort(arr, lower, middle); // mergeSort bottom half of array
    mergeSort(arr, middle + 1, higher); // mergeSort top half of array
    merge(arr, lower, middle, higher); // merge both halves together
}

int main()
{
    int arr[] = { 5, 4, 3, 7, 6 };
    int size = 5;
    printArr(arr, size);
    mergeSort(arr, 0, size);
    printArr(arr, size);
    return 0;
}
```

## Complexity Analysis of Merge Sort

- After each comparison of keys from the 2 sub lists, at least 1 element is moved into the new merged list and never compared to again
- After the last comparison of keys from the 2 sub lists, at least 2 elements are moved into the new merged list
- To merge the 2 lists together, we require at most $n-1$ comparisons

```c
void mergeSort(int arr[], int lower, int higher) {
    if (lower >= higher) {
        return; // W(1)
    }

    int middle = (higher + lower) / 2;
    mergeSort(arr, lower, middle); // W(n/2)
    mergeSort(arr, middle + 1, higher); // W(n/2)
    merge(arr, lower, middle, higher); // Worst case: n - 1
}
```

Worst/Best/Average Case (Assuming $n = 2^k$):

$$
\begin{aligned}
W(1) &= 0 \\
W(n) &= W\left(\frac{n}{2}\right) + W\left(\frac{n}{2}\right) + (n - 1) \\
&= n \log n - (n - 1) \\
&= O(n \log n)
\end{aligned}
$$

## Pros and Cons

Pros
- Simple and good runtime
- Easy to implement with linked list

Cons
- Difficult to implement for contiguous data storage (such as arrays) without auxiliary storage (requires data movements during merging)

## Read More about MergeSort
- https://en.wikipedia.org/wiki/Merge_sort
- https://www.programiz.com/dsa/merge-sort