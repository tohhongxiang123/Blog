# Timsort

Timsort is a hybrid stable sorting algorithm, derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data. It was implemented by Tim Peters in 2002 for use in the Python programming language.

For smaller arrays, insertion sort performs the best. While for larger arrays, merge sort performs the best. We will now write some code to figure out quantitatively, at what size should we use merge sort over insertion sort.

```c
#include <stdio.h>
#include <time.h>
#include <stdlib.h>

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

void merge(int arr[], int startIndex, int middleIndex, int endIndex) {
    int temporaryArray[endIndex - startIndex + 1]; // create array to copy elements into

    int leftPointer = startIndex; // create a pointer to the start of the left array
    int rightPointer = middleIndex + 1; // create a pointer to the start of the right array
    int numberOfMergedElements = 0; // keep track of how many items in temporaryArray

    while (leftPointer <= middleIndex && rightPointer <= endIndex) { // traverse through left and right halves
        if (arr[leftPointer] < arr[rightPointer]) { // if element pointed to in the left half is smaller
            temporaryArray[numberOfMergedElements] = arr[leftPointer]; // copy to temp array
            leftPointer++;
        } else {
            temporaryArray[numberOfMergedElements] = arr[rightPointer]; // else copy right half element to temp array
            rightPointer++;
        }

        numberOfMergedElements++;
    }

    // add remaining elements in left half
    while (leftPointer <= middleIndex) {
        temporaryArray[numberOfMergedElements] = arr[leftPointer];
        numberOfMergedElements++;
        leftPointer++;
    }

    // add remaining elements in right half
    while (rightPointer <= endIndex) {
        temporaryArray[numberOfMergedElements] = arr[rightPointer];
        numberOfMergedElements++;
        rightPointer++;
    }

    for (int i = startIndex; i <= endIndex; i++) { // copy array
        arr[i] = temporaryArray[i - startIndex];
    }
}

void mergeSort(int arr[], int startIndex, int endIndex) {
    if (startIndex >= endIndex) {
        return;
    }

    int middleIndex = (endIndex + startIndex) / 2; // get the middle index of the array
    mergeSort(arr, startIndex, middleIndex); // mergeSort left half of array
    mergeSort(arr, middleIndex + 1, endIndex); // mergeSort right half of array
    merge(arr, startIndex, middleIndex, endIndex); // merge both halves together
}

void mergeSortUtil(int arr[], int size) {
    mergeSort(arr, 0, size - 1);
}

double timeFunction(void (*sortingAlg)(int[], int), int size) { // times how long sortingAlg runs to sort an array of size in milliseconds
    // intialise randomiser
    srand(time(NULL));

    // create array
    int *array = malloc(sizeof(int) * size);
    for (int i=0; i<size; i++) {
        array[i] = rand() % 1000; // random number from 0 to 999
    }

    clock_t start, end;
    double cpu_time_used;

    start = clock();
    sortingAlg(array, size);
    end = clock();
    cpu_time_used = ((double) (end - start)) / CLOCKS_PER_SEC;
    return cpu_time_used * 1000;
}

int main()
{
    int TIMES_TO_REPEAT = 10000;
    for (int i = 1; i < 50; i++) {
        double averageMergeSortTiming; // run TIMES_TO_REPEAT times
        double averageInsertionSortTiming;

        for (int j = 0; j < TIMES_TO_REPEAT; j++) {
            averageMergeSortTiming += timeFunction(mergeSortUtil, i);
            averageInsertionSortTiming += timeFunction(insertionSort, i);
        }

        printf("Merge sort: %.4f ms, ", averageMergeSortTiming);
        printf("Insertion sort: %.4f ms, ", averageInsertionSortTiming);
        if (averageMergeSortTiming > averageInsertionSortTiming) {
            printf("Insertion sort wins for array of size %d\n", i);
        } else {
            printf("Merge sort wins for array of size %d\n", i);
        }
    }
}
```

By runnning this code, we can see that around 30~40 is the size that merge sort beats insertion sort.

Now instead of using timings, let us use the number of comparisons instead to figure out which sort is better. Let us modify the functions to return the number of comparisons required to run the algorithm.

Hence to run the code,

```c
#include <stdio.h>
#include <time.h>
#include <stdlib.h>

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

int insertionSort(int arr[], int size) {
    // perform insertion sort on array
    int count = 0;
    for (int i = 1; i < size; i++){
        for (int j = i; j > 0; j--) {
            count++;
            if (arr[j] < arr[j - 1]) {
                swap(arr, j, j-1);
            } else {
                break;
            }
        }
    }

    return count;
}

int merge(int arr[], int startIndex, int middleIndex, int endIndex) {
    int count = 0;
    int temporaryArray[endIndex - startIndex + 1]; // create array to copy elements into

    int leftPointer = startIndex; // create a pointer to the start of the left array
    int rightPointer = middleIndex + 1; // create a pointer to the start of the right array
    int numberOfMergedElements = 0; // keep track of how many items in temporaryArray

    while (leftPointer <= middleIndex && rightPointer <= endIndex) { // traverse through left and right halves
        count++;
        if (arr[leftPointer] < arr[rightPointer]) { // if element pointed to in the left half is smaller
            temporaryArray[numberOfMergedElements] = arr[leftPointer]; // copy to temp array
            leftPointer++;
        } else {
            temporaryArray[numberOfMergedElements] = arr[rightPointer]; // else copy right half element to temp array
            rightPointer++;
        }

        numberOfMergedElements++;
    }

    // add remaining elements in left half
    while (leftPointer <= middleIndex) {
        count++;
        temporaryArray[numberOfMergedElements] = arr[leftPointer];
        numberOfMergedElements++;
        leftPointer++;
    }

    // add remaining elements in right half
    while (rightPointer <= endIndex) {
        count++;
        temporaryArray[numberOfMergedElements] = arr[rightPointer];
        numberOfMergedElements++;
        rightPointer++;
    }

    for (int i = startIndex; i <= endIndex; i++) { // copy array
        count++;
        arr[i] = temporaryArray[i - startIndex];
    }

    return count;
}

int mergeSort(int arr[], int startIndex, int endIndex) {
    int count = 0;
    if (startIndex >= endIndex) {
        return count + 1;
    }

    int middleIndex = (endIndex + startIndex) / 2; // get the middle index of the array
    count += mergeSort(arr, startIndex, middleIndex); // mergeSort left half of array
    count += mergeSort(arr, middleIndex + 1, endIndex); // mergeSort right half of array
    count += merge(arr, startIndex, middleIndex, endIndex); // merge both halves together
    return count;
}

int mergeSortUtil(int arr[], int size) {
    return mergeSort(arr, 0, size - 1);
}

int returnCountFromRandomArray(int (*sortingAlg)(int[], int), int size) { // counts comparison required to sort an array of size
    // intialise randomiser
    srand(time(NULL));

    // create array
    int *array = malloc(sizeof(int) * size);
    for (int i=0; i<size; i++) {
        array[i] = rand() % 1000; // random number from 0 to 999
    }

    return sortingAlg(array, size);
}

int main()
{
    int TIMES_TO_REPEAT = 1000;
    for (int i = 1; i < 100; i++) {
        double averageMergeSortCount;
        double averageInsertionSortCount;

        for (int j = 0; j < TIMES_TO_REPEAT; j++) {
            averageMergeSortCount += returnCountFromRandomArray(mergeSortUtil, i);
            averageInsertionSortCount += returnCountFromRandomArray(insertionSort, i);
        }

        averageMergeSortCount /= TIMES_TO_REPEAT;
        averageInsertionSortCount /= TIMES_TO_REPEAT;

        printf("Merge sort: %.4f, ", averageMergeSortCount);
        printf("Insertion sort: %.4f, ", averageInsertionSortCount);
        if (averageMergeSortCount > averageInsertionSortCount) {
            printf("Insertion sort wins for array of size %d\n", i);
        } else {
            printf("Merge sort wins for array of size %d\n", i);
        }
    }
}
```

It takes about 40-60 elements before merge sort uses less comparisons than insertion sort

Let us set $S = 40$ as the threshold from using merge to insertion sort.

```c
int timSort(int arr[], int startIndex, int endIndex) {
    int size = endIndex - startIndex + 1;
    int threshold = 40;
    if (size <= 1) return 1;
    if (size < threshold) {
        return insertionSort(arr, size); // insertion sort runs better
    } else {
        int count = 0;
        int middleIndex = (startIndex + endIndex) / 2;
        count += timSort(arr, startIndex, middleIndex);
        count += timSort(arr, middleIndex + 1, endIndex);
        count += merge(arr, startIndex, middleIndex, endIndex);
        return count;
    }
}

int timSortUtil(int arr[], int size) {
    timSort(arr, 0, size - 1);
}
```

Now, the final code. Used to compare time required to run the code, and number of comparisons too

```c
#include <stdio.h>
#include <time.h>
#include <stdlib.h>

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

int insertionSort(int arr[], int size) {
    // perform insertion sort on array
    int count = 0;
    for (int i = 1; i < size; i++){
        for (int j = i; j > 0; j--) {
            count++;
            if (arr[j] < arr[j - 1]) {
                swap(arr, j, j-1);
            } else {
                break;
            }
        }
    }

    return count;
}

int merge(int arr[], int startIndex, int middleIndex, int endIndex) {
    int count = 0;
    int temporaryArray[endIndex - startIndex + 1]; // create array to copy elements into

    int leftPointer = startIndex; // create a pointer to the start of the left array
    int rightPointer = middleIndex + 1; // create a pointer to the start of the right array
    int numberOfMergedElements = 0; // keep track of how many items in temporaryArray

    while (leftPointer <= middleIndex && rightPointer <= endIndex) { // traverse through left and right halves
        count++;
        if (arr[leftPointer] < arr[rightPointer]) { // if element pointed to in the left half is smaller
            temporaryArray[numberOfMergedElements] = arr[leftPointer]; // copy to temp array
            leftPointer++;
        } else {
            temporaryArray[numberOfMergedElements] = arr[rightPointer]; // else copy right half element to temp array
            rightPointer++;
        }

        numberOfMergedElements++;
    }

    // add remaining elements in left half
    while (leftPointer <= middleIndex) {
        count++;
        temporaryArray[numberOfMergedElements] = arr[leftPointer];
        numberOfMergedElements++;
        leftPointer++;
    }

    // add remaining elements in right half
    while (rightPointer <= endIndex) {
        count++;
        temporaryArray[numberOfMergedElements] = arr[rightPointer];
        numberOfMergedElements++;
        rightPointer++;
    }

    for (int i = startIndex; i <= endIndex; i++) { // copy array
        count++;
        arr[i] = temporaryArray[i - startIndex];
    }

    return count;
}

int mergeSort(int arr[], int startIndex, int endIndex) {
    int count = 0;
    if (startIndex >= endIndex) {
        return count + 1;
    }

    int middleIndex = (endIndex + startIndex) / 2; // get the middle index of the array
    count += mergeSort(arr, startIndex, middleIndex); // mergeSort left half of array
    count += mergeSort(arr, middleIndex + 1, endIndex); // mergeSort right half of array
    count += merge(arr, startIndex, middleIndex, endIndex); // merge both halves together
    return count;
}

int mergeSortUtil(int arr[], int size) {
    return mergeSort(arr, 0, size - 1);
}

int timSort(int arr[], int startIndex, int endIndex) {
    int size = endIndex - startIndex + 1;
    int threshold = 40;
    if (size <= 1) return 1;
    if (size < threshold) {
        return insertionSort(arr, size); // insertion sort runs better
    } else {
        int count = 0;
        int middleIndex = (startIndex + endIndex) / 2;
        count += timSort(arr, startIndex, middleIndex);
        count += timSort(arr, middleIndex + 1, endIndex);
        count += merge(arr, startIndex, middleIndex, endIndex);
        return count;
    }
}

int timSortUtil(int arr[], int size) {
    timSort(arr, 0, size - 1);
}

int returnCountFromRandomArray(int (*sortingAlg)(int[], int), int size) { // counts comparison required to sort an array of size
    // intialise randomiser
    srand(time(NULL));

    // create array
    int *array = malloc(sizeof(int) * size);
    for (int i=0; i<size; i++) {
        array[i] = rand() % 1000; // random number from 0 to 999
    }
    free(array);
    return sortingAlg(array, size);
}

double returnTimingFromRandomArray(int (*sortingAlg)(int[], int), int size) { // times how long sortingAlg runs to sort an array of size in milliseconds
    int MILLISECONDS_PER_SECOND = 1000;
    // intialise randomiser
    srand(time(NULL));

    // create array
    int *array = malloc(sizeof(int) * size);
    for (int i=0; i<size; i++) {
        array[i] = rand() % 1000; // random number from 0 to 999
    }

    clock_t start, end;
    double cpu_time_used;

    start = clock();
    sortingAlg(array, size);
    end = clock();
    cpu_time_used = ((double) (end - start)) / CLOCKS_PER_SEC;
    free(array);
    return cpu_time_used * MILLISECONDS_PER_SECOND;
}

int main()
{
    int TIMES_TO_REPEAT = 1000;
    for (int i = 1; i < 100; i++) {
        double averageMergeSortCount;
        double averageInsertionSortCount;
        double averageTimSortCount;

        double averageMergeSortTiming;
        double averageInsertionSortTiming;
        double averageTimSortTiming;

        for (int j = 0; j < TIMES_TO_REPEAT; j++) {
            averageMergeSortCount += returnCountFromRandomArray(mergeSortUtil, i);
            averageInsertionSortCount += returnCountFromRandomArray(insertionSort, i);
            averageTimSortCount += returnCountFromRandomArray(timSortUtil, i);

            averageMergeSortTiming += returnTimingFromRandomArray(mergeSortUtil, i);
            averageInsertionSortTiming += returnTimingFromRandomArray(insertionSort, i);
            averageTimSortTiming += returnTimingFromRandomArray(timSortUtil, i);
        }

        averageMergeSortCount /= TIMES_TO_REPEAT;
        averageInsertionSortCount /= TIMES_TO_REPEAT;
        averageTimSortCount /= TIMES_TO_REPEAT;

        averageMergeSortTiming /= TIMES_TO_REPEAT;
        averageInsertionSortTiming /= TIMES_TO_REPEAT;
        averageTimSortTiming /= TIMES_TO_REPEAT;

        printf("%d elements, ", i);
        printf("Merge sort: %.4f ms, %.4f comparisons, ", averageMergeSortTiming, averageMergeSortCount);
        printf("Insertion sort: %.4f ms, %.4f comparisons, ", averageInsertionSortTiming, averageInsertionSortCount);
        printf("Tim sort: %.4f ms, %.4f comparisons\n", averageTimSortTiming, averageTimSortCount);
    }
    printf("Done\n");
}
```

# Analysis

In the worst case, `hybridSort` runs in $O \left(nS + n \lg \frac{n}{s} \right)$

![](https://i.stack.imgur.com/4H8eH.jpg)

At the bottom of the tree, each list has a size $S$, and there are $\frac{n}{S}$ lists. The worst case for insertion sort is $O(n^2)$ for an array of size $n$.

Hence, at the bottom, the total time complexity is $\frac{n}{S} * S^2 = O(nS)$

There are $\log \frac{n}{S}$ levels, and in total, at each level, `merge` runs in $O(n)$ time.

Therefore, the total time complexity is $O\left(nS + n \log \frac{n}{S} \right)$

# Resources

- https://en.wikipedia.org/wiki/Timsort
