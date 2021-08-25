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
        int smallestIndex = -1; // index of child who is smaller than parent

        // check if any child is smaller than the parent
        if (leftChildIndex < b->currentSize && b->heap[currentIndex] > b->heap[leftChildIndex]) {
            smallestIndex = leftChildIndex;
        } else if (rightChildIndex < b->currentSize && b->heap[currentIndex] > b->heap[rightChildIndex]) {
            smallestIndex = rightChildIndex;
        }
        
        // if no child is smaller than the parent
        if (smallestIndex == -1) {
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

## Overall Code for Binary Heap

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
        int smallestIndex = -1; // index of child who is smaller than parent

        // check if any child is smaller than the parent
        if (leftChildIndex < b->currentSize && b->heap[currentIndex] > b->heap[leftChildIndex]) {
            smallestIndex = leftChildIndex;
        } else if (rightChildIndex < b->currentSize && b->heap[currentIndex] > b->heap[rightChildIndex]) {
            smallestIndex = rightChildIndex;
        }
        
        // if no child is smaller than the parent
        if (smallestIndex == -1) {
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