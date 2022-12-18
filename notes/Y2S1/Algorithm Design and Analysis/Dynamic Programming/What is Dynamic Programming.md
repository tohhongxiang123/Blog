# What is Dynamic Programming

Dynamic Programming (DP) is a problem solving paradigm, similar to divide and conquer. The general procedure for dynamic programming is

-   Divide a problem into overlapping subproblems
-   Solve each subproblem recursively
-   Combine the solutions to the subproblems into a solution for the given problem
    -   Do not compute the answer to the same subproblem more than once

## E.g. Fibonacci Numbers

The fibonacci numbers are defined recursively as

$$
F_n = F_{n-1} + F_{n-2}, n \geq 2 \\
F_0 = 0, F_1 = 1
$$

In code, it is simply

```c
int fib(int n) {
    if (n == 0 || n == 1) return n;
    return fib(n-1) + fib(n-2);
}
```

However, when we look at the recursive tree for `fib`, we see that we recompute many of the smaller cases repeatedly. This causes the algorithm to be very slow, because the number of recursive calls for `fib(n)` is:

$$
2^{n/2 + 1} - 1 < R < 2^n - 1
$$

This means that `fib(n)` is an exponential time algorithm ($O(2^n)$)

The main feature of DP is to replace an exponential-time computation with a polynomial time computation. This is done by **memoizing** the solutions instead of recomputing. (Similar to how Depth-First Search on a graph only explores edges to undiscovered vertices, instead of always repeatedly looking at visited vertices)

This strategy may be applied to only solve unsolved subproblems, and checks and retrieves solutions to solved subproblems

```
if (previous solution exists)
    get previous solution
else
    solve current problem
```

# Top Down Dynamic Programming

1. Formulate the problem $P$ in terms of smaller versions of the problem recursively (say, $Q_1, Q_2, ...$)
2. Turn this formulation into a recursive function to solve problem $P$
3. Use a dictionary to store solutions to subproblems
4. In the recursive function to solve $P$
    - Before any recursive call, say on subproblem $Q_i$, check the dictionary to see if a solution for $Q_i$ exists
        - If no solution has been stored, make the recursive call
        - Otherwise, retrieve the stored solution
    - Just before returning the solution for $P$, store the solution in the dictionary: Memoisation

```c
#include <stdio.h>
#include <stdlib.h>

int fib(int n, int *sols) {
    if (n == 0 || n == 1) {
        sols[n] = n;
        return n;
    }

    if (sols[n] != -1) {
        return sols[n];
    }

    int f1;
    if (sols[n-1] == -1) {
        f1 = fib(n-1, sols);
    } else {
        f1 = sols[n-1];
    }

    int f2;
    if (sols[n-2] == -1) {
        f2 = fib(n-2, sols);
    } else {
        f2 = sols[n-2];
    }

    int result = f1 + f2;
    sols[n] = result;
    return result;
}

int main()
{
    int n = 50;
    int *sols = malloc(sizeof(int) * (n + 1));

    for (int i = 0; i < n + 1; i++) {
        sols[i] = -1;
    }

    printf("fib(%d): %d\n", n, fib(n, sols));
}
```

1. Before calling `fib`, the `sols` array has to be intialised. `-1` in `sols[n]` means that the answer for `fib(n)` has not been calculated yet
2. When entering the function, we check the base case
    - If it is the base case, then we immediately store the solution into the `sols` array, and return
3. Afterwards, we check whether `fib(n-1)` and `fib(n-2)` have been solved already
    - If solved, we can just retrieve the value from the `sols` array
    - If not, we solve it by recursing
4. Once we have both `fib(n-1)` and `fib(n-2)`, we store the solution into `sols[n]` and return the solution

# Bottom Up Dynamic Programming

Instead of solving from the top of the problem, we start from the smallest version of the problem, and build up from there.

1. Compute solutions of subproblems first
2. As we increase the problem size, we use the previous solutions and store the new solution back into the dictionary
3. The solution to P is computed based on the solutions to its subproblems

```c
#include <stdio.h>
#include <stdlib.h>

int fib(int n) {
    int *sols = malloc(sizeof(int) * (n + 1));
    sols[0] = 0;
    sols[1] = 1;
    for (int i = 2; i < n + 1; i++) {
        sols[i] = sols[i - 1] + sols[i - 2];
    }

    return sols[n];
}

int main()
{
    int n = 30;

    printf("fib(%d): %d\n", n, fib(n));
}
```
