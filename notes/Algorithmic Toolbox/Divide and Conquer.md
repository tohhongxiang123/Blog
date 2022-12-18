# Divide and Conquer

Divide the problem into smaller, non-overlapping subproblems of the same type. Solve each subproblem independently, and combine them together to solve the original problem.

# Linear Search

Input: An array $A$ with $n$ elements, and a key $k$

Output: An index $i$, where $A[i] = k$. If there is no such $i$, return NOT_FOUND

```python
def linearSearch(A, low, high, key):
    if high < low:
        return NOT_FOUND
    if A[low] == key:
        return low

    return linearSearch(A, low + 1, high, key)
```

Recurrence defining worst-case time:

$$
T(n) = T(n-1) + c, T(0) = c
$$

The total runtime for size $n$ is $\sum_{i=0}^{n} c  = \Theta(n)$

# Binary Search

Searching through an ordered list

Input: A sorted array $A[low, ..., high]$. ($\forall low \le i < high: A[i] \le A[i+1]$). A key $k$

Output: An index $i (low \le i \le high)$ where $A[i] = k$. Otherwise the greatest index $i$ where $A[i] < k$. Otherwise, ($k < A[low]$), the result is $low - 1$

```python
def binarySearch(A, low, high, key):
    if high < low:
        return low - 1

    mid = floor(low + (high - low)/2)
    if key == A[mid]:
        return mid
    else if key < A[mid]:
        return binarySearch(A, low, mid - 1, key)
    else:
        return binarySearch(A, mid + 1, high, key)
```

Recurrence defining worst-case time:

$$
T(n) = T\left(\lfloor{\frac{n}{2}}\rfloor\right) + c, T(0) = c
$$

Total: $\sum_{i=0}^{\log_2 n} c = \Theta(\log_2 n)$

### Iterative Version of Binary Search

```python
def binarySearch(A, low, high, key):
    while low <= high:
        mid = floor(low + (high - low)/2)
        if key == A[mid]:
            return mid
        elif key <= A[mid]:
            high = mid - 1
        else:
            low = mid + 1
    return low - 1
```

# Polynomial Multiplication

Uses of multiplying polynomials

-   Error-correcting codes
-   Large-integer multiplication
-   Generating functions
-   Convolution in signal processing

Example:

$$
\begin{aligned}
A(x) &= 3x^2 + 2x + 5 \\
B(x) &= 5x^2 + x + 2 \\
A(x)B(x) &= 15x^4 + 13x^3 + 33x^2 + 9x + 10
\end{aligned}
$$

### Problem Definition

Input: Two $n-1$ degree polynomials: $\sum_{i=0}^{n-1} a_i x^i, \sum_{i=0}^{n-1} b_i x^i$

Output: The product polynomial $\sum_{i=0}^{2n-2} c_i x^i$

Example: n=3, A=(3, 2, 5), B=(5, 1, 2). Output is C=(15, 13, 33, 9, 10)

### Naive Solution

```
multPoly(A, B, n)

product = Array[2n-1]
for i from 0 to 2n-2:
    product[i] = 0
for i from 0 to n-1:
    for j from 0 to n-1:
        product[i+j] = product[i+j] + A[i]*B[i]

return product
```

Runtime: $O(n^2)$

### Naive Divide and Conquer Algorithm

Let $A(x) = D_1(x) x^{\frac{n}{2}} + D_0(x)$ where

$D_1(x) = a_{n-1}x^{\frac{n}{2} - 1} + a_{n-2}x^{\frac{n}{2} - 2} + \cdots + a_{\frac{n}{2}}$

$D_0(x) = a_{\frac{n}{2} - 1}x^{\frac{n}{2} - 1} + a_{\frac{n}{2} - 2}x^{\frac{n}{2} - 2} + \cdots + a_0$

Let $B(x) = E_1(x) x^{\frac{n}{2}} + E_0(x)$, where

$E_1(x) = b_{n-1}x^{\frac{n}{2} - 1} + b_{n-2}x^{\frac{n}{2} - 2} + \cdots + b_{\frac{n}{2}}$

$E_0(x) = b_{\frac{n}{2} - 1}x^{\frac{n}{2} - 1} + b_{\frac{n}{2} - 2}x^{\frac{n}{2} - 2} + \cdots + b_0$

Then $AB = (D_1 x^{\frac{n}{2}} + D_0)(E_1 x^{\frac{n}{2}} + E_0) = (D_1 E_1)x^n + (D_1 E_0 + D_0 E_1) x^{\frac{n}{2}} + D_0 E_0$

Calculate $D_1 E_1, D_1 E_0, D_0 E_1,  D_0 E_0$

Recurrence: $T(n) = 4T\left(\frac{n}{2}\right) + kn$

```
Function Mult2(A, B, n, a, b)

R = array[0, ..., 2n-1]
if n = 1:
    R[0] = A[a] * B[b]
    return R
R[0, ..., n-2] = Mult2(A, B, n/2, a, b)
R[n, ..., 2n-2] = Mult2(A, B, n/2, a + n/2, b+n/2)

d0e1 = Mult2(A, B, n/2, a, b + n/2)
d1e0 = Mult2(A, B, n/2, a+n/2, b)
R[n/2, ... n+n/2-2] += d1e0 + d0e1
return R
```

Total: $\sum_{i=0}^{\log_2 n} 4^i k \frac{n}{2^i} = \Theta(n^2)$

### Karatsuba approach

$$
\begin{aligned}
A(x) &= a_1x + a_0 \\
B(x) &= b_1x + b_0 \\
C(x) &= a_1b_1x^2 + ((a_1 + a_0)(b_1 + b_0) - a_1b_1 - a_0b_0)x + a_0b_0
\end{aligned}
$$

Total: $\sum_{i=0}^{\log_2 n} 3^i k \frac{n}{2^i} = \Theta(n^{\log_2 3}) = \Theta(n^{1.58})$
