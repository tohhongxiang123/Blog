# Binary Search

[Check explanations](https://leetcode.com/problems/koko-eating-bananas/solutions/769702/python-clear-explanation-powerful-ultimate-binary-search-template-solved-many-problems/)

Minimize `k` , s.t. `condition(k)` is True

```python
def condition(value) -> bool:
    # some condition
    pass

def binary_search(array) -> int:
    left, right = 0, len(array)
    while left < right:
        mid = left + (right - left) // 2
        if condition(mid):
            right = mid
        else:
            left = mid + 1
    return left # the minimal k satisfying condition(k)
```
