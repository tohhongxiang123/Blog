# Greedy Algorithms

General process for solving problems with a greedy algorithm:

- Start at A

For example

> Given $n$ digits, $x_1 \le x_2 \le \cdots \le x_n$, find the largest number that can be formed with these digits

```py
def findLargest(numbers):
    if len(numbers) == 1:
        return str(numbers[0])

    maxDigit = max(numbers)
    numbers.remove(maxDigit)
    return str(maxDigit) + findLargest(numbers)

print(findLargest([1, 2, 3, 9, 9, 4]))
```

# Celebration Party Problem

> Many children came to a celebration. Orgasnize them into the minimum possible number of groups such that the age of any two children in the same group differ by at most one year

### Naive algorithm

```
m = len(children)
for each partition into groups C = g1 u g2 ... u gk:
    good = true
    for each group,
        if max_age(group) - min_age(group) > 1:
            good = false

    if good:
        m = min(m, k)

return m
```

Lemma: The number of operations in naive algorithm is at least $2^n$, where $n$ is the number of children in C

Proof:

Consider just partitions in 2 groups

$C = G_1 \cup G_2$

There are $2^n$ possible combinations of children split into 2 groups. Thus at least $2^n$ operations

Naive algorithm works in $\Omega (2^n)$

### Efficient Algorithm

Before covering efficient algorithm, let us look at covering points by segments

> Input: Set of $n$ points $x_1, ..., x_n \in \R$
> Output: The minimum number of segments of unit length needed to cover all the points

Safe move: Cover the leftmost point with a unit segment with left end in this point

Now we can solve a smaller subproblem: Using the minimum number of unit segments to cover the remaining uncovered points

Assume $x_1 \le x_2 \le ... \le x_n$

```
pointsCoverSorted(x1, ..., xn):
    R = {}
    i = 1
    while i <= n:
        [l, r] = [xi, xi + 1]
        R = R u {l, r}   # Union
        i = i+1
        while i <= n and xi <= r:
            i = i+1
    return R
```

Lemma: `pointsCoverSorted` runs in $O(n)$

Proof:

- $i$ changes from 1 to $n$
- For each $i$, at most 1 new segment
- Overall running time is $O(n)$

What if points were not sorted? Then `pointsCover` runs in $O(n \log n)$
