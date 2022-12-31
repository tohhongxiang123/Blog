# Quicksort

- Fastest general purpose in-memory sorting algorithm in average case
- A divide and conquer algorithm
- Implemented in unix as `qsort()`
- In general, we find a **pivot**, then we place all elements less than the pivot on the left, and all elements greater than or equal to the pivot on the right, and then we recurse `quickSort` on both the left and right sides of the pivot
- Consists of 2 main methods
  - `quickSort(int arr[], int lower, int higher)`, the main method that sorts the array
  - `partition(int arr[], int lower, int higher)`, a method used to find the pivot and place all elements that are less than the pivot on the left, and all elements greater than or equal to the pivot on the right
- No merging required because the pivot found during partitioning will be in its final position
- Quicksort is **unstable**
  - Relative order of equal items are not preserved

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

## Runtime Analysis

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
- Average case for quicksort is $O(n \log n)$

# Space Complexity

- The space complexity for quicksort is $O(\log n)$ because
  - In-place partitioning used requires $O(1)$ space
  - After partitioning, partition with fewest elements is recursively sorted first. Calls to recursive functions add at most $\log n$ to the height of the call stack, hence the height of the call stack is bounded by $O(\log n)$

## Advantages of Quicksort

- Fast on average ($O(n \lg n$)
- No merging required
- Best case occurs when pivot always splits array into equal halves

## Disadvantages

- Poor performance if pivot does not split evenly
- Quicksort performs badly if list size is small
- If more work is done to select a pivot, bad effects can be mitigated

# Improving Quicksort

- Instead of always choosing the rightmost element as the pivot, we can randomise which element we choose, and use that as a partition. We choose a random element, move it to the right of the array, and continue as before.
- To further improve it, we can choose 3 random elements in the array (instead of random, you could also choose the first, middle and last element in the array), then use the median of these 3 elements to be the pivot. Similarly, we move the chosen pivot to the right of the array, and continue as before.

## Read more about Quicksort

- https://www.youtube.com/watch?v=uXBnyYuwPe8
- https://www.programiz.com/dsa/quick-sort
- https://www.khanacademy.org/computing/computer-science/algorithms/quick-sort/a/analysis-of-quicksort
- https://en.wikipedia.org/wiki/Quicksort
