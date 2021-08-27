# Divide and Conquer Sorts

# Merge Sort

- Recursively divide data set in half until atomic elements, forming a tree
- Merge sorted left and right sets
    - Pointers to lowest element in each set
    - Copy lower element to final set and advance pointer
    - If no more elements in a set, copy all remaining elements from other set
- $O(n \log n)$

# Quick Sort

- Select a pivot element, and swap it to the end
- Create 2 partitions, moving all elements less than pivot to the left partition, and the rest on the right
- Repeat this process recursively
- Elements move using
    - Pointers to first and last eleemt, moving inward until an element that belongs on the other side is discovered
- $O(n \log n)$ average, $O(n^2)$ worst