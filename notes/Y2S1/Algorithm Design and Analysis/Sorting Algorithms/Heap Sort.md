# Heap Sort

Heap sort is a efficient sorting algorithm that uses a binary heap to sort an array

# Binary Heap

A binary heap is a binary tree with the following properties

1. The tree is complete
2. A binary heap is either a min or a max heap. For a min heap, the **key at the root is the minimum** among all keys, while for a max heap, the **key at the root is the maximum**. For a min heap, a node is always smaller than its children, and for a max heap, a node is always larger than its children.

A binary heap should implement the following methods:

- `void insert(T item)`, which inserts an item into the tree
- `void delete()`, which deletes the root node of the tree
- `T peek()`, which returns the minimum element in the heap (the root node)

Note that for both of these methods, the property that the parent node is smaller than its children for min heap, and larger than its children for the max heap must still be maintained throughout.

## Implementation of Binary Heap

A binary heap's underlying representation is an array. The first element will be the root of the tree, and each element afterwards corresponds to the next layer.

```c
typedef struct _BinaryHeap {
    int *heap;
    int currentSize;
    int maxSize;
} BinaryHeap;

int main()
{
    BinaryHeap *b = malloc(sizeof(BinaryHeap));
    b->heap = malloc(sizeof(int) * SIZE);
    b->currentSize = 0;
    b->maxSize = 8;
}
```

![Array to Binary Tree mapping](http://opendatastructures.org/versions/edition-0.1d/ods-java/img1156.png)

## `void insert(T item)`

The following shows the procedure for inserting into a min binary heap

1. Insert the item into the leftmost open slot
2. Compare the added element with its parent
    1. If the element is smaller than its parent, swap the element and the parent
    2. Now that the element is swapped, compare the element again with its new parent, and repeat step 2
    3. If the element is larger than its parent, we are done

Steps 2 and 3, which restore the heap property by swapping the child and its parent, are also known as a up-heap operation. The runtime of `insert` depends on how many levels the newly added element has to bubble up. In the worst case, it has to bubble up the entire tree, with heigh $\log n$. Hence the worst case scenario is $O(\log n)$. Best case for `insert` is $O(1)$

```c
void insert(BinaryHeap *b, int item) { // insert into min heap
    if (b->currentSize >= b->maxSize) return; // if binary heap is full, do not insert
    
    b->heap[b->currentSize] = item; // insert into leftmost open space in the tree
    
    int parentIndex = (b->currentSize - 1) / 2; // index of parent of current element
    int currentIndex = b->currentSize; // index of current element in array
    while (b->heap[parentIndex] > b->heap[currentIndex]) { // if parent is larger than element, min heap property is broken
        swap(&b->heap[parentIndex], &b->heap[currentIndex]); // swap parent and element
        currentIndex = parentIndex; // now change to look at element and new parent
        parentIndex = (parentIndex - 1) / 2;
    }

    b->currentSize++; // increase size of heap
}
```

## `void delete()`

`delete` removes the minimum item in the binary heap (the root), and then restores the heap. The procedure for deleting is as follows

1. Swap the root element with the last element inserted into the heap
2. Delete the element from the heap
3. Check that the new root of the heap is smaller than both the children
    1. If it is not, swap the new root with the child that is smaller
    2. Now, compare the newly swapped root, with its new children again. Repeat step 3 until the parent is smaller than its children

Step 2 and 3, which restore the heap's property by swapping the node with its child, is also known as a down-heap. Worst case scenario occurs if the new root has to move all the way back down $\log n$ levels, hence worst case scenario is $O(\log n)$, while the best case occurs if the root does not have to move at all $O(1)$

```c
void delete(BinaryHeap *b) {
    swap(&(b->heap[b->currentSize - 1]), &(b->heap[0])); // swap root with last element
    b->heap[b->currentSize - 1] = 0; // delete last element
    b->currentSize--; // decrease size
    
    int currentIndex = 0; // start comparing from the root
    int leftChildIndex = 2 * currentIndex + 1; // index of left child of current element
    int rightChildIndex = 2 * currentIndex + 2; // index of right child of current element
    
    while (1) {
        int smallestIndex = currentIndex; // index of child who is smaller than parent

        // check if any child is smaller than the parent
        if (leftChildIndex < b->currentSize && b->heap[smallestIndex] > b->heap[leftChildIndex]) {
            smallestIndex = leftChildIndex;
        } else if (rightChildIndex < b->currentSize && b->heap[smallestIndex] > b->heap[rightChildIndex]) {
            smallestIndex = rightChildIndex;
        }
        
        // if no child is smaller than the parent
        if (smallestIndex == currentIndex) {
            // done
            break;
        } else {
            swap(&(b->heap[smallestIndex]), &(b->heap[currentIndex])); // swap child and parent
            currentIndex = smallestIndex; // set up for next loop
            leftChildIndex = 2 * currentIndex + 1;
            rightChildIndex = 2 * currentIndex + 2;
        }
    }
}
```

## `T peek()`

Returns the minimum element of the min heap. Since the heap has a property that the smallest element is the root of the tree, this method just returns the root of the binary tree. This operation requires $O(1)$ time.

```c
int peek(BinaryHeap *b) {
    return b->heap[0];
}
```

## Overall Code for Implementation of Binary Heap

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct _BinaryHeap {
    int *heap;
    int currentSize;
    int maxSize;
} BinaryHeap;

void swap(int *a, int *b) { // swaps 2 elements
    int temp = *a;
    *a = *b;
    *b = temp;
}

void printHeap(BinaryHeap *b) { // prints out the heap from top to bottom, left to right
    for (int i = 0; i < b->currentSize; i++) {
        printf("%d ", b->heap[i]);
    }
    printf("\n");
}

void insert(BinaryHeap *b, int item) { // insert into min heap
    if (b->currentSize >= b->maxSize) return; // if binary heap is full, do not insert
    
    b->heap[b->currentSize] = item; // insert into leftmost open space in the tree
    
    int parentIndex = (b->currentSize - 1) / 2; // index of parent of current element
    int currentIndex = b->currentSize; // index of current element in array
    
    while (b->heap[parentIndex] > b->heap[currentIndex]) { // if parent is larger than element, min heap property is broken
        swap(&b->heap[parentIndex], &b->heap[currentIndex]); // swap parent and element
        currentIndex = parentIndex; // now change to look at element and new parent
        parentIndex = (parentIndex - 1) / 2;
    }

    b->currentSize++; // increase size of heap
}

void delete(BinaryHeap *b) {
    swap(&(b->heap[b->currentSize - 1]), &(b->heap[0])); // swap root with last element
    b->heap[b->currentSize - 1] = 0; // delete last element
    b->currentSize--; // decrease size
    
    int currentIndex = 0; // start comparing from the root
    int leftChildIndex = 2 * currentIndex + 1; // index of left child of current element
    int rightChildIndex = 2 * currentIndex + 2; // index of right child of current element
    
    while (1) {
        int smallestIndex = currentIndex; // index of child who is smaller than parent

        // check if any child is smaller than the parent
        if (leftChildIndex < b->currentSize && b->heap[smallestIndex] > b->heap[leftChildIndex]) {
            smallestIndex = leftChildIndex;
        } else if (rightChildIndex < b->currentSize && b->heap[smallestIndex] > b->heap[rightChildIndex]) {
            smallestIndex = rightChildIndex;
        }
        
        // if no child is smaller than the parent
        if (smallestIndex == currentIndex) {
            // done
            break;
        } else {
            swap(&(b->heap[smallestIndex]), &(b->heap[currentIndex])); // swap child and parent
            currentIndex = smallestIndex; // set up for next loop
            leftChildIndex = 2 * currentIndex + 1;
            rightChildIndex = 2 * currentIndex + 2;
        }
    }
}

int peek(BinaryHeap *b) {
    return b->heap[0];
}

int main()
{
    int SIZE = 8;
    BinaryHeap *b = malloc(sizeof(BinaryHeap));
    b->heap = malloc(sizeof(int) * SIZE);
    b->currentSize = 0;
    b->maxSize = SIZE;
    
    insert(b, 10);
    insert(b, 4);
    insert(b, 15);
    delete(b);
    insert(b, 20);
    insert(b, 0);
    insert(b, 30);
    delete(b);
    printHeap(b);
    delete(b);
    printHeap(b);
    insert(b, 2);
    insert(b, 4);
    insert(b, -1);
    insert(b, -3);
    printHeap(b);
    insert(b, -5);
    printHeap(b);
    printf("%d\n", peek(b));
    return 0;
}
```

# Heap Sort

Heap sort uses a heap to sort an array. It converts the array into a max heap first, and then uses the max heap to sort out the final array.

The procedure of the heap sort is as follows:

1. From the unsorted array, build a max heap
2. Swap the root of the max heap (which is the max element) with the final element in the heap
3. Remove the final element from the heap
4. Restore the heap from the root element again
5. Repeat until all items in the heap is sorted

## How to "Heapify" a tree

Starting from a complete binary tree, we can convert it into a max heap by running `heapify` on all non-leaf elements of the heap

```
heapify(array, currentElement) {
    largestElement = largest(currentElement, leftChild, rightChild)

    if largestElement != currentElement:
        swap(currentElement, largestElement)
        heapify(array, largestElement)

}
```

```c
void heapify(int heap[], int heapSize, int rootIndex) {
    // converts the heap into a max heap
    int leftChildIndex = 2 * rootIndex + 1;
    int rightChildIndex = 2 * rootIndex + 2;
    
    // search for the largest element's index
    int largestElementIndex = rootIndex;
    if (leftChildIndex < heapSize && heap[leftChildIndex] > heap[largestElementIndex]) {
        largestElementIndex = leftChildIndex;
    }
    if (rightChildIndex < heapSize && heap[rightChildIndex] > heap[largestElementIndex]) {
        largestElementIndex= rightChildIndex;
    }
    
    // if the largest element is not the root, swap and continue heapifying the swapped element
    if (largestElementIndex != rootIndex) {
        swap(&heap[rootIndex], &heap[largestElementIndex]);
        heapify(heap, heapSize, largestElementIndex);
    }
}
```

## Building a max-heap from any tree

To build a max-heap from any tree, we can start heapifying each sub-tree from the bottom up, and end up with a max heap once we reach the root element. For a complete tree, the index of the first non-leaf node is `n/2-1`. We do not need to heapify leaf-nodes because they have no children. Hence,

```
// build max heap
for (int i = n/2-1; i >= 0; i--) {
    heapify(arr, n, i);
}
```

```c
void buildMaxHeap(int heap[], int heapSize) {
    // heapify from the first non-leaf node
    for (int i = heapSize / 2 - 1; i >= 0; i--) {
        heapify(heap, heapSize, i);
    }
}
```

## Sorting the Array

Now to sort the array,

1. We swap the root element (largest element) with the last element of the array
2. We reduce the heap size by 1
3. We re-heapify the root element again so we have the highest element at the root
4. Repeat until list is sorted

```c
void heapSort(int arr[], int size) {
    buildMaxHeap(arr, size); // build a max heap from the array
    
    // actually sort the heap
    for (int i = size - 1; i > 0; i--) {
        swap(&arr[i], &arr[0]); // swap the last element with the root since it is the largest
        heapify(arr, i, 0); // now heapify the remaining elements (excluding the largest one we just swapped)
    }
}
```

## Overall Code for HeapSort

```c
#include <stdio.h>

void printArray(int a[], int size) {
    for (int i = 0; i < size; i++){
        printf("%d ", a[i]);
    }
    printf("\n");
}

void swap(int *a, int *b){
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int heap[], int heapSize, int rootIndex) {
    // converts the heap into a max heap
    int leftChildIndex = 2 * rootIndex + 1;
    int rightChildIndex = 2 * rootIndex + 2;
    
    // search for the largest element's index
    int largestElementIndex = rootIndex;
    if (leftChildIndex < heapSize && heap[leftChildIndex] > heap[largestElementIndex]) {
        largestElementIndex = leftChildIndex;
    }
    if (rightChildIndex < heapSize && heap[rightChildIndex] > heap[largestElementIndex]) {
        largestElementIndex= rightChildIndex;
    }
    
    // if the largest element is not the root, swap and continue heapifying the swapped element
    if (largestElementIndex != rootIndex) {
        swap(&heap[rootIndex], &heap[largestElementIndex]);
        heapify(heap, heapSize, largestElementIndex);
    }
}

void buildMaxHeap(int heap[], int heapSize) {
    // heapify from the first non-leaf node
    for (int i = heapSize / 2 - 1; i >= 0; i--) {
        heapify(heap, heapSize, i);
    }
}

void heapSort(int arr[], int size) {
    buildMaxHeap(arr, size); // build a max heap from the array
    
    for (int i = size - 1; i > 0; i--) {
        swap(&arr[i], &arr[0]); // swap the last element with the root since it is the largest
        heapify(arr, i, 0); // now heapify the remaining elements (excluding the largest one we just swapped)
    }
}

int main()
{
    int a[] = { 1, 12, 9, 5, 6, 10 };
    int size = 6;
    printArray(a, size);
    heapSort(a, size);
    printArray(a, size);
    

    return 0;
}
```

## Time Complexity Analysis of HeapSort

The best, worst and average time complexity for heap sort is $O(n \log n)$.

Heapsort consists of 2 major parts - Building the max heap, and then extracting the max elements out of the max heap. Considering the worst case:

For building a max heap, the worst case is when all elements have to be pushed from the root to the bottom of the tree. Each element has to be pushed down the entire height of the tree ($\log n$). When we `buildMaxHeap`, note that we only had to heapify `n/2` elements, because we are only heapifying non-leaf nodes. 

Consider a single node, and its 2 children. To find the largest node, we have to make 2 comparisons (3 nodes requires 2 comparisons to figure out which node is the largest). Then, we swap the root node with its largest child, and repeat the process. This means, for every swap we do, we take 2 comparisons. And the number of swaps for a single node, is the number of layers the node traverses down.

Let us consider a complete binary tree with $n = 2^k$ nodes. For the $i^{th}$ layer (with the top layer being the $0^{th}$ layer), we have $2^i$ nodes. Since we have k levels, any node on the $i^{th}$ level will have to move down $k-i$ levels. Hence for a single node, the worst case requires $2(k-i)$ comparisons, and in total, the number of comparisons required is

$$
\sum_{i=1}^{k} i 2^{k - i} = O(n)
$$

More regarding the math above can be found from [this analysis of heapsort](http://www.cs.umd.edu/~meesh/351/mount/lectures/lect14-heapsort-analysis-part.pdf) and [how to calculate an arithmetic-geometric progression](https://brilliant.org/wiki/arithmetic-geometric-progression/). Hence `buildMaxHeap` runs in $O(n)$ time

For sorting, we exchange the root element, and then we heapify the root element. For the $i^{th}$ element, the worst case is $\log i$ time. At the $i^{th}$ element (from the bottom, note how heapsort always swaps the root with the last element, and then bubbles the last element back down), we have $i$ elements in the tree, hence the tree's height is $\log i$. Each time before we swap, we do 2 comparisons to find the max node. Since we do this for $n$ elements, the overall runtime for this step is

$$
\sum_{i=0}^{n} 2 \log i = O(n \log n)
$$

Note how this is similar to $\log n!$, which can be approximated with [Stirling's approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation)
Hence, the total runtime for heap sort is $n + n \log n = O(n \log n)$ runtime

# Resources
- https://www.programiz.com/dsa/heap-sort
- https://www.youtube.com/watch?v=k72DtCnY4MU
- http://www.cs.umd.edu/~meesh/351/mount/lectures/lect14-heapsort-analysis-part.pdf
- https://en.wikipedia.org/wiki/Stirling%27s_approximation