# Union Find

A disjoint-set data structure is defined as a data structure that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets.

A union-find algorithm is an algorithm that performs two useful operations on such a disjoint-set:

-   Find: Determine which subset a particular element is in. This can be used for determining if two elements are in the same subset.
-   Union: Join two subsets into a single subset. Here first we have to check if the two subsets belong to same set. If no, then we cannot perform union.

We will use a dictionary to represent the disjoint set. The disjoint set has the following properties:

-   Key:Value represents element:parent
-   Initially all elements have itself as a parent

> Note that you could also use an array to represent it (index being the key)

```python
class DisjointSet:
    uf = {}
    def __init__(self, n):
        self.uf = {a:a for a in range(n)}

    def find(self, key):
        """
        Returns the underlying parent of `key`
        Will always be able to return if we initialised the dictionary properly
        """
        if self.uf[key] == key:
            return key

        return self.find(self.uf[key])

    def union(self, v1, v2):
        self.uf[self.find(v2)] = self.find(v1)
```

We can now play with the disjoint set

```python
a = DisjointSet(10)

a.union(1, 2)
a.union(2, 3)
a.union(5, 3)
a.union(4, 1)

a.union(9, 0)
a.union(7, 0)
a.union(0, 8)

print(a.uf)
for i in range(10):
    print(f"{i}: {a.find(i)}")
```

You will see that elements `1, 2, 3, 4, 5` belong to the same group, `6` belongs in its own group, and `7, 8, 9, 0` belong in its own group. The print outputs the following:

```
0: 7
1: 4
2: 4
3: 4
4: 4
5: 4
6: 6
7: 7
8: 7
9: 7
```

# Resources

-   https://www.hackerearth.com/practice/notes/disjoint-set-union-union-find/
-   https://www.youtube.com/watch?v=ayW5B2W9hfo
