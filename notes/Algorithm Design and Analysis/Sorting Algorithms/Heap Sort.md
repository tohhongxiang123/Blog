# Heap Sort

Heap sort is a efficient sorting algorithm that uses a binary heap to sort an array

# Binary Heap

A binary heap is a binary tree with the following properties

1. The tree is complete
2. A binary heap is either a min or a max heap. For a min heap, the **key at the root is the minimum** among all keys, while for a max heap, the **key at the root is the maximum**. For a min heap, a node is always smaller than its children, and for a max heap, a node is always larger than its children.

A binary heap should implement the following methods:

- `void insert(T item)`, which inserts an item into the tree
- `void remove()`, which removes the root node of the tree

Note that for both of these methods, the property that the parent node is smaller than its children for min heap, and larger than its children for the max heap must still be maintained throughout.

## `void insert(T item)`

The following shows the procedure for inserting into a min binary heap