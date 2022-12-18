# Greatest Common Divisors

We want to reduce a fraction $\frac{a}{b}$ into its simplest form. We can do this by dividing both $a$ and $b$ by a number $d$, to get $\frac{a/d}{b/d}$

-   We need $d$ to divide both $a$ and $b$
-   We want $d$ to be as large as possible
-   For example, GCD(10, 4) = 2

> For integers $a$ and $b$, their **greatest common divisor**, gcd(a, b) is the largest integer $d$ that divides both $a$ and $b$

Goal: Compute GCD
Input: Integers $a, b \ge 0$
Output: `gcd(a, b)`

We should be able to run `gcd` on large numbers, such as `gcd(3918848, 1653264)` quickly

# Naive algorithm

```py
def gcd(a, b):
    best = 0
    for d in range(1, a+b+1):
        if a % d == 0 and b % d == 0:
            best = d
    return best
```

-   Runtime is approximately $O(a+b)$
-   Very slow for 20 digit numbers

# Efficient algorithm

The efficient algorithm is also known as the [euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm), which hinges on a very important lemma

Lemma: Let $a'$ be the remainder when $a$ is divided by $b$, then $gcd(a, b) = gcd(a', b) = gcd(b, a')$

Proof:

$a = a' + bq$ for some $q$

$d$ divides $a$ and $b$ iff it divides $a'$ and $b$

```py
def euclidGCD(a, b):
    if b == 0:
        return a
    return euclidGCD(b, a % b)
```

-   Each step reduces the size of numbers by about a factor of 2
-   Takes about $\log(ab)$ steps
