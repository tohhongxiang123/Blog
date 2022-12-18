# Maximum Pairwise Product

Given a sequence of non-negative integers $a_1, ..., a_n$, compute

$$
\max_{1 \le i \ne j \le n} a_i a_j
$$

Note that $i \ne j$, but it is possible that $a_i = a_j$

Input format: The first line contains an integer $n$, the second line contains $n$ non-negative integers $a_1, ..., a_n$ separated by spaces

Output format: The maximum pairwise product

Constraints: $2 \le n \le 2*10^5; 0 \le a_1, ..., a_n, 2*10^5$

### Input

```
3
1 2 3
```

### Output

```
6
```

# Walking through the solution

My first attempt was the following naive attempt

```py
def max_prod(numbers):
    max_product = 0
    for i in range(len(numbers)):
        for j in range(len(numbers)):
            if i == j:
                continue

            product = numbers[i] * numbers[j]
            if product > max_product:
                max_product = product

    return max_product
```

It runs in $O(n^2)$ time, which is bad because $n \le 2*10^5$. Consider my current computer, an i5-4460 that runs at 3.2 GHz, which means that my computer can produce $3.2*10^9$ cycles per second. If we assume that each iteration of the loop takes 1 cycle, there are $(2*10^5)^2 = 4*10^{10}$ cycles required. It would take $(4*10^{10})/(2*10^9) = 20$ seconds for the algorithm to run, which is not very good. We can do better

# Improving the algorithm

What we can do instead is

1. Find the biggest number in the array
2. Find the second biggest number in the array
3. Multiplying both together will give the maximum pairwise product

This iterates through the array twice, improving the runtime to $O(2n) = O(n)$

```py
def max_product(numbers):
    largest_number = max(numbers)
    numbers.remove(largest_number)

    second_largest_number = max(numbers)

    return largest_number * second_largest_number
```

> Do note that this actually mutates the original array

# Proof that this algorithm works

We will prove by induction that `max_product` gives the correct result for any array with at least length 2

For the base case, `len(numbers) == 2`, there is only 1 possible pairwise product. Hence, this pairwise product is the largest.

Assume that `max_product` is correct for arrays up to length `n`. Now we prove that, if `max_product` is correct for arrays up to length `n`, then it should be correct for arrays up to length `n+1`

Consider an `n+1` length array, and remove the last element. We know that, by our assumption, `max_product` works on the `n`-length array. We add the last number back in.

If the last number is less than the second_largest element of the `n`-length array, then the result is unchanged, and the algorithm is correct.

If the last number is between the second_largest and the largest of the `n`-length array, then the last number is the second largest element overall for the `n+1`-length array. The algorithm will multiply this new second largest number with the original largest number (which is still the largest number in the overall array). This means that the algorithm is still correct.

If the last number is the largest number in the `n+1` length array, then `largest_number` will be that number instead, and `second_largest_number` will be the largest number in the `n`-length array. Overall, the algorithm still multiplies the 2 largest elements in teh `n+1` length array. Hence, algorithm is correct.

From all this, we have proven that `max_product` is correct for all arrays of at least length `n`.

# Incorrect Algorithm and Proof of Incorrectness

Let's look at an incorrect algorithm and see that we can prove that it is wrong.

```py
def wrong_max_product(numbers):
    index1 = 0
    for i in range(1, n+1):
        if numbers[i] > numbers[index1]:
            index1 = i

    index2 = 0
    for i in range(1, n+1):
        if numbers[i] != numbers[index1] and numbers[i] > numbers[index2]:
            index2 = i

    return numbers[index1] * numbers[index2]
```

Lets prove by induction.

For an array of length 2, the first `for` loop will find the maximum integer in the array. However, the second loop will not find the second largest element in the array. For example, take `numbers = [3, 3]`. The correct results should be `index1 = 0, index2 = 1`. However, tracing through the code, `index1 = 0, index2 = 0`. `index2` was never updated. This shows that the algorithm is wrong. Let's now modify the algorithm to include that fix

```py
def wrong_max_product2(numbers):
    index1 = 0
    for i in range(1, n+1):
        if numbers[i] > numbers[index1]:
            index1 = i

    if index1 == 0:
        index2 = 1
    else:
        index2 = 0

    for i in range(1, n+1):
        if numbers[i] != numbers[index1] and numbers[i] > numbers[index2]:
            index2 = i

    return numbers[index1] * numbers[index2]
```

Let's try to prove that this algorithm is correct. For an array of length 2, the algorithm is correct.

Now assume, for sake of induction that our function is correct up to length `n`. Consider a length `n+1` array.

We know that the first loop will definitely choose the maximum element from an `n`-length array. If the last element is smaller than or equal to the maximum element from `n`-length array, then nothing changes, and `index1` is still correct. If the last element is bigger than the maximum element from the `n`-length array, then `index1 = n-1` and that is correct.

For the second loop, if the last element is smaller than the second-largest element in the `n`-length array, then nothing changes and the algorithm is still correct. If the last element is the overall largest element in the array, then `index2` will be the index of the largest element in the `n`-length array, and `index1 = n-1` which is correct. Now if the last element is **equal** to the largest element overall, then we have a problem. We can see that `0 <= index1 <= n-2`, because it will take the first occurrence of the largest element of the array. But because of the condition `numbers[i] != numbers[index1]`, the last index will not update to `n-1` correctly. Hence, we should change the algorithm to be:

```py
def wrong_max_product_fixed(numbers):
    index1 = 0
    for i in range(1, n+1):
        if numbers[i] > numbers[index1]:
            index1 = i

    if index1 == 0:
        index2 = 1
    else:
        index2 = 0

    for i in range(1, n+1):
        if i != index1 and numbers[i] > numbers[index2]:
            index2 = i

    return numbers[index1] * numbers[index2]
```
