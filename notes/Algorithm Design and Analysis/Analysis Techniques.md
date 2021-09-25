# Analysis Techniques

Big-O, Big-Theta and Big-Omega are used to study how algorithms perform as the input sizes scale up

# Big-O

Let $f$ and $g$ be 2 functions such that $f: \N \mapsto \R^+$ and $g: \N \mapsto \R^+$

If there exists positive constants $c$ and $n_0$ such that

$$
f(n) \leq c g(n) \ \forall n > n_0
$$

Then 

$$
f(n) = O(g(n))
$$

Alternatively,

$$
f(n) = O(g(n)) \iff lim_{n \to \infty} \frac{f(n)}{g(n)} = c < \infty
$$

![](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200807150308/3363.png)

If $f(n) = O(g(n))$, then $g(n)$ is an asymptotic upper bound for $f(n)$

# Big-Omega

Let $f$ and $g$ be 2 functions such that $f: \N \mapsto \R^+$ and $g: \N \mapsto \R^+$. If there exists positive constants $c$ and $n_0$ such that

$$
f(n) \geq c g(n) \ \forall n > n_0
$$

Then $f(n) = \Omega(g(n))$

Alternatively,

$$
f(n) = \Omega(g(n)) \iff \lim_{n \to \infty} \frac{f(n)}{g(n)} > 0
$$

![](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200807150659/3611.png)

If $f(n) = \Omega(g(n))$ then $g$ is the asymptotic lower bound of $f$

# Big-Theta

Let $f$ and $g$ be 2 functions such that $f: \N \mapsto \R^+$ and $g: \N \mapsto \R^+$. If there exists positive constants $c$ and $n_0$ such that

$$
c_1 g(n) \leq f(n) \leq c_2 g(n) \ \forall n > n_0
$$

Then $f(n) = \Theta(g(n))$

Alternatively,

$$
f(n) = \Theta(g(n)) \iff 0 < \lim_{n \to \infty} \frac{f(n)}{g(n)} < \infty
$$

![](https://cdn.kastatic.org/ka-perseus-images/c14a48f24cae3fd563cb3627ee2a74f56c0bcef6.png)

If $f(n) = \Theta(g(n))$, $g(n)$ is an asymptotic tight bound.

# Recursive Algorithms and Recurrence Relations

A recurrence is an equation or inequality that describes a functions in terms of its values on smaller inputs. For example

$$
M(n) = 2M(n-1) + 1
$$

## Solving Recurrences with Master Theorem

Consider that we want to solve the following recurrence

$$
W(n) = aW \left( \frac{n}{b} \right) + f(n)
$$

The recurrence describes the computational cost of an algorithm that uses a divide and conquer approach

- $f(n)$ is the cost of dividing the problem and combining the results of the subproblems
- Problem is divided from $n$ to $a$ subproblems, each of size $\frac{n}{b}$

Examples of recurrence problems

| Recurrence               | Description                         |
| ------------------------ | ----------------------------------- |
| $W(n) = 2W(n/2) + 2$     | Finding max and min from a sequence |
| $W(n) = W(n/2) + 2$      | Binary Search                       |
| $W(n) = 2W(n/2) + n - 1$ | Merge sort                          |

![](https://media.geeksforgeeks.org/wp-content/uploads/AlgoAnalysis.png)

Let $a \geq 1, b > 1$, and $f(n)$ be an asymptotically positive function (For a positively large enough value of $n$, $f(n) > 0$) 

$$
T(n) = \begin{cases}
\Theta(n^{\log_b a}) & \text{if } \exists \epsilon \text{ st } f(n) = O(n^{\log_b a - \epsilon}) \\
\Theta(n^{\log_b a} \log^{k+1} n) & \text{if } f(n) = \Theta(n^{\log_b a} \log^k n) \land k \geq 0\\
\Theta(f(n)) & \text{if } \exists \epsilon \text{ st } f(n) = \Omega(n^{\log_b a + \epsilon})
\end{cases}
$$

*For case 2, when k < 0, check the [wiki page for master theorem](https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms))*

We know that each problem is split into $a$ cases, each with a smaller size $\frac{n}{b}$. Now we want to find the height of the recursion tree $H$. Since we keep dividing $n$ by $b$ until the size of the problem is $1$, then 

$$
\begin{aligned}
\frac{n}{b^H} &= 1 \\
H &= \log_b n
\end{aligned}
$$

Since each level splits into $a$ subproblems, at height $H$, then number of subproblems in the last level is

$$
a^H = a^{\log_b n} = n^{\log_b a}
$$

This equality can be shown by taking $\log_b$ on both sides. And since the problem size is now $1$, the time taken to solve each subproblem of size $1$ is $O(1)$

Let us look at each condition one by one

1. If the cost of solving the subproblems at each level increases by a certain factor, the value of $f(n)$ will become polynomially smaller than $n^{\log_b a}$. The time taken for solving the subproblem dominates the time taken to split/recombine the subproblems. (The recursion tree is leaf-heavy). Hence the overall cost is now $\Theta(n^{\log_b a})$

2. If the cost of solving the subproblems at each level is nearly equal to solving the subproblem, then $f(n) = \Theta(n^{\log_b a})$. Then the overall time complexity will be $f(n)$ times the number of layers, hence $\Theta(n^{\log_b a} \log n)$

    Notably, if $k = 0$,

$$
f(n) = \Theta(n^{\log_b a}) \implies T(n) = \Theta(n^{\log_b a} \log n)
$$

3. If the cost of solving each subproblem decreases per level, then $f(n)$ will become polynomially larger than $n^{\log_b a}$. The time taken to split/recombine the problems dominate the time taken to solve each subproblem. Thus the cost of the algorithm will be oppressed by $f(n)$ (The tree is root-heavy). Hence the overall cost is $\Theta(f(n))$

## Limitations of Master Theorem

The master theorem cannot be used if
- $T(n)$ is not monotone
    - A function $f$ is monotonic if it either entirely non-increasing, or entirely non-decreasing
    - For example, $f(n) = \sin n$ does not work
- $f(n)$ is not a polynomial
    - E.g. $f(n) = 2^n$ does not work
- $a$ is not a constant
    - E.g. $a = 2n$ does not work
- $a < 1$
    - $T(n) = 0.5T(\frac{n}{2}) + 5n$
    - Cannot have less than 1 subproblem

# Resources

- https://www.programiz.com/dsa/master-theorem
- https://math.stackexchange.com/questions/262733/can-we-prove-a-log-bn-n-log-ba