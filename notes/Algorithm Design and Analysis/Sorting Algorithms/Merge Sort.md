# Merge Sort

Merge sort is a divide-and-conquer algorithm. It divides the input array into 2 halves, calls itself on the 2 halves, and then merges the 2 sorted halves. It consists of 2 important functions

1. `mergeSort(int arr[], int lower, int higher)` - the main sorting algorithm
2. `merge(int arr[], int lower, int middle, int higher)` - a function that helps merge the 2 halves generated within `mergeSort`

Merge sort is stable
- Relative order of elements of the same value remain the same before and after the sorting

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