# Searches

# Linear Search

- Precondition: None
- Start at first position in the set and compare to the desired value
    - If equal, return position
    - Otherwise advance position by 1
- If not found, return -1
- $O(n)$

# Binary Search

- Precondition: Sorted data
- Select the middle element
    - If equal, return position
    - If middle greater than element, recursively search left elements
    - If middle smaller than element, recursively search right elements
- If not found, return -1
- $O(\log n)$