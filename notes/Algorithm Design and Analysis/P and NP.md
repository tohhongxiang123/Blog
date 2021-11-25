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

Non-deterministic polynomially bounded: The class of **decision problems** for which there is a polynomially bounded nondeterministic algorithm. A non-determininstic algorithm can can be 