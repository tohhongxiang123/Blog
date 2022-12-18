# What are Greedy Algorithms?

A greedy algorithm is one who makes the best local choice at any step.

-   Given a state, the algorithm chooses the step that gives the most reward
-   Each individual choice made is always the best choice at that time, within the knowledge of the algorithm at that time
-   Each individual choice is not expensive to compute
-   However, a choice cannot be undone, even if it was found to not be the best choice
-   The best choice at the current time may not result in the best choice overall
-   Greedy algorithms do not always guarantee the best solution

Examples of greedy algorithms

-   Djikstra's algorithm to find shortest path in a graph
-   Prim's algorithm to find a minimum spanning tree
