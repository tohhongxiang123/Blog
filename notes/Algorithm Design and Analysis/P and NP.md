# P and NP

- Hard problems are those that the best-known algorithm for the problem is expensive in running time
    - Usually not a problem that is hard to understand
    - Not a problem that is hard to code
    - However, it is a problem that takes exponential (or more) time to compute - Not practical to obtain a solution for a problem of a modest size n
- Important to know when a problem is hard
    - We should then focus on finding an efficient algorithm to obtain a "good enough" solution rather than the optimal solution

# Decision Problem

A decision problem is an algorithmic problem that has 2 possible answer: Yes or no. 
- Can we travel from city A to B within k hours?
- Can we travel from city A, visit every other city exactly once, and return to city A within k hours?
- Is there a subset of the n objects that fits in the knapsack of capacity weight C and returns a total profit of at least k?

# Optimisation Problem

An optimisation problem is a problem of finding the best solution from all feasible solutions
- What is the shortest path from city A to B?
- What is the shortest path from city A, which visits every other city exactly once, and returns to city A?
- What is the maximum profit if a subset of the n objects are put into a knapsack of capacity weight C?

In general, each decision problem has its corresponding optimisation problem. Each optimisation problem can be recast as a decision problem. If we can provide evidence that a decision problem is hard, we can also provide evidence that its related optimisation problem is hard
- Easy optimisation problem solution -> Easy decision problem solution
- Hard decision problem solution -> Hard optimisation problem solution

# Easy Problems - P problems

An algorithm is polynomially bounded if its worst case complexity is bounded by a polynomial function of the input size. A problem is said to be polynomially bounded if there is a polynomially bounded algorithm for it

The class P problems is a class of decision problems that are polynomially bounded

Examples of P problems:
1. Can we travel from city A to city B within k hours? (Path finding)
2. Is it possible to supply electricity to all homes in an area by a network of power lines less than k kilometers? (Minimum spanning tree)

# NP Problems

Non-deterministic polynomially bounded: The class of **decision problems** for which there is a polynomially bounded nondeterministic algorithm. 

A non-determininstic algorithm is an algorithm that solves a problem in 2 phases: Guess, then Verify. It then outputs a "yes" or "no". This non-deterministic algorithm can be considered as a machine that checks all possible solutions in parallel, and verifies which one is correct

Examples of NP problems:
1. Given a network of cities $G$ and a number $k$. Can you visit all cities exactly once, and return to the original city with a path that costs less than $k$?
2. Given the weights and profits of $n$ items, and a knapsack of capacity $C$, can we fit items into the knapsack such that the profits add up to more than $k$?

# NP Completeness

Before we tackle NP completeness, we must understand what a "problem reduction" is. When we reduce a known hard problem $X$ to another problem $Y$, we have shown that $Y$ is at least as hard as $X$. 
- If we have an algorithm to solve for $Y$, then this reduction shows us how to solve $X$ as well
- $X$ is also no harder than $Y$, or $Y$ is at least as hard as $X$

Consider the Hamiltonian path problem: Given a graph $G$, is there any path that passes through all the vertices of the graph exactly once?

We can transform this to the TSP problem, where each existing edge in $G$ is just a edge with weight 1 in a new graph $T$, and everything else is an edge of weight 2. Then the question is: Does $T$ have a travelling salesman tour that is no longer than $N + 1$, where $N$ is the number of vertices in $G$
- If the answer to the transformed problem is "yes", the answer to the hamiltonian path problem is "yes"
- Transformation done in polynomial time
- Hence, if TSP has a polynomial time algorithm, hamiltonian path will also have a polynomial time algorithm as well

> A problem $D$ is NP Complete if it is in NP and every problem $Q$ in NP is reducible to $D$ in polynomial time

E.g. CIRCUIT-SAT: Given a boolean circuit, are there any assignment of inputs that results in the whole circuit outputting "true"?
- Cook-levin theorem proves that CIRCUIT-SAT is NP complete

How do we solve NP complete problems?
- Use small problem sizes
- Solve for special instances of the problem
- Heuristic algorithms
    - Fast, polynomially bounded algorithms
    - However, not guaranteed to give the best solutions
    - Will give one close to optimal in many cases
    - However can still return a very bad solution
    - E.g. Greedy heuristic for TSP, or knapsack