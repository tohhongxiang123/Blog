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
4. `mergeSort` the upper half of the array (`mergeSort(arr, middle + 1, higher)`)
5. Merge the 2 halves together (`merge(arr, lower, middle, higher)`)

```
void mergeSort(int arr[], int lower, int higher) {
    if (lower >= higher) return;
    int middle = (lower + higher) / 2;
    mergeSort(arr, lower, middle);
    mergeSort(arr, middle + 1, higher);
    merge(arr, lower, middle, higher);
}
```

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

# Quicksort

- Fastest general purpose in-memory sorting algorithm in average case
- A divide and conquer algorithm
- Implemented in unix as `qsort()`
- In general, we find a **pivot**, then we place all elements less than the pivot on the left, and all elements greater than or equal to the pivot on the right, and then we recurse `quickSort` on both the left and right sides of the pivot
- Consists of 2 main methods
    - `quickSort(int arr[], int lower, int higher)`, the main method that sorts the array
    - `partition(int arr[], int lower, int higher)`, a method used to find the pivot and place all elements that are less than the pivot on the left, and all elements greater than or equal to the pivot on the right
- No merging required because the pivot found during partitioning will be in its final position

## Procedure

1. Select one element in an array as a **pivot** (`int pivot_position = partition(arr, lower, higher)`)
   - The pivot is a value within the partitioning space that I want to find a position for
2. Partition list into 2 sublists with respect to the pivot such that all elements on the left sublist are **less than** the pivot, while all elements on the right sublist are **greater than or equal to** the pivot
3. Recursively partition the left and right sublists until input list has one or zero elements (`quickSort(arr, lower, partition - 1), quickSort(arr, partition + 1, higher)`)

## Finding the pivot

1. We first let the final pivot be the rightmost element of the array (`arr[higher - 1]`)
2. We set up 2 variables, `i` and `j`
    - `i = lower - 1` is used to keep track of the number of elements less than the pivot. `i` is the last item less than the pivot. `i` represents the boundary between elements less than, or greater than the pivot
    - Every item with index less than `i` (inclusive) will be **less than** the pivot, while every item with index greater than `i` (exclusive) will be **greater than or equal to** the pivot
    - `j` is used to scan through the entire array from the lower boundary (`lower`) to just before the upper boundary (`higher - 1`)
    - Once `j` reaches the upper boundary, we do a final swap between `arr[i + 1]` and the pivot, so now the pivot is in the middle of both the left and right sublists
3. We compare the element `arr[j]` with the pivot
    - If `arr[j] >= pivot`, we do not swap. We let `j` continue up through the array
    - If `arr[j] < pivot`, we swap `arr[i]` with `arr[j]`, and advance `i` up by 1
4. We continue doing this until `j` reaches `higher - 1`, the rightmost element to check
5. Finally, we swap the pivot with `arr[i + 1]` (Remember that `arr[i]` is still less than the pivot). Now all the elements less than the pivot are on the left, and all the elements 

## Code

```c
#include <stdio.h>

void printArr(int arr[], int size) { 
    // print out the entire array
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void swap(int *a, int *b) {
    // swaps values in a and b
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int lower, int upper) {
    int pivot = arr[upper]; // final element to be pivot
    int i = lower - 1; // the last element which is less than the pivot

    for (int j = lower; j <= upper - 1; j++) { // go from the lower boundary to the upper boundary
        if (arr[j] < pivot) { // if current element < pivot
            i++; // increment i
            swap(&arr[i], &arr[j]); // swap i with current element
        }
    }

    swap(&arr[i+1], &arr[upper]); // once done, place pivot in between 2 sublists
    return i + 1; // return pivot position
}

void quickSort(int arr[], int lower, int upper) {
    if (lower >= upper) return; // done
    
    int pivot_position = partition(arr, lower, upper); // get pivot position
    quickSort(arr, lower, pivot_position - 1); // quicksort lower partition
    quickSort(arr, pivot_position + 1, upper); // quicksort upper partition
}

int main()
{
    int a[] = { 5, 4, 3, 2, 1 };
    int size = sizeof(a) / sizeof(int);
    printArr(a, size);
    quickSort(a, 0, size - 1);
    printArr(a, size);

    return 0;
}
```

## Anaylsis

- Best case occurs when the pivot is the median of the array
    - After the first partition, `quickSort` will be called on $n/2$ items on the left, and $n/2$ items on the right
    - After each partition, the size of each sublist is reduced by **1/2**
    - The first run of `quickSort` requires $n - 1$ comparisons (n items)
    - The second run of `quickSort` requires $n / 2 - 1$ comparisons, and this is called twice ($2 * n / 2$)
    - The $i^{th}$ run of `quickSort` requires $n / 2^i - 1$ comparisons, and is called $2^i$ times
    - In total, there are $\log_2 n$ levels, so the total runtime is $\sum_{i = 1}^{\log n - 1} 2^i (\frac{n}{2^i} - 1) = n \log n - n + 1 = O(n \log n)$
- Worst case occurs when the pivot is the greatest/least element in the array
    - After the first partition side of `quickSort` is called on 0 items, while the other side of `quickSort` is called with `n-1` items
        - The partition with 0 items does not run because there is nothing to sort, while the partition with `n-1` items requires `n-1` comparisons
    - The second partition will again split `quickSort` into a side with 0 items, and a side with `n-2` items
    - This repeats all the way until there are no items left to sort
    - Hence the time complexity is $(n - 1) + (n - 2) + \cdots + 2 + 1 = O(n^2))$

## Advantages of Quicksort

- Fast on average ($O(n \lg n$)
- No merging required
- Best case occurs when pivot always splits array into equal halves

## Disadvantages

- Poor performance if pivot does not split evenly
- Quicksort performs badly if list size is small
- If more work is done to select a pivot, bad effects can be mitigated

## Read more about Quicksort
- https://www.youtube.com/watch?v=uXBnyYuwPe8
- https://www.programiz.com/dsa/quick-sort