# Dijkstra's Algorithm

A single source shortest path algorithm for graphs with **non-negative edge weights**. Typically, Dijkstra's algorithm runs in $O(E \log V)$ where $E$ is the number of edges and $V$ is the number of vertices

-   The graph must only contain non-negative edges, to ensure that once a node has been visited, its optimal distance cannot be improved
-   This allows Dijkstra's algorithm to act in a greedy manner by always selecting the next most promising node

# Algorithm

Let the node we are starting at be the initial node. Let the distance of node Y be the distance from the initial node to Y.

1. Mark all nodes in the graph unvisited. Create a set of unvisited nodes called the unvisited set
2. Assign all nodes a tentative initial distance - 0 for initial node, infinity for every other node
3. Set the initial node as the current node
4. For the current node, consider all unvisited neighbors. For each unvisited neighbor
    1. Calculate their tentative distance through the current node
    2. Compare this newly calculated tentative distance with its current assigned value, and set it to the smaller of the 2
    3. E.g. if the current node has a distance 6 from the initial node, and the distance between the current node and a visited neighbor N is 2, then the tentative distance for N will be 6 + 2 = 8. If B was marked with a distance initially larger than 8, then set it to 8.
5. After considering all unvisited neighbors, mark the current node as visited, remove it from the unvisited set. A node that has been visited will not be visited again.
6. If the destination node is marked visited (reached destination node) or if the smallest tentative distance among all nodes in the unvisited set is infinity (no connection between initial node and destination node), then the algorithm has finished
7. Otherwise select the unvisited node marked with the shortest tentative distance, set it as the new current node, and go back to step 4.

```c
#include <stdio.h>
#include <stdlib.h>

#define INFINITY 100000

typedef struct _graph {
    int numberOfVertices;
    int **adjMatrix;
} Graph;

Graph *initialiseGraph(int numberOfVertices, int **adjMatrix) {
    Graph *g = malloc(sizeof(Graph));
    g->numberOfVertices = numberOfVertices;
    g->adjMatrix = adjMatrix;
    return g;
}

void printAdjMatrix(Graph *g) {
    for (int i = 0; i < g->numberOfVertices; i++) {
        for (int j = 0; j < g->numberOfVertices; j++) {
            printf("%d ", g->adjMatrix[i][j]);
        }
        printf("\n");
    }
}

void printList(int *list, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", list[i]);
    }
    printf("\n");
}

void printPath(int *predecessor, int startNodeIndex, int endNodeIndex) {
    // given predecessor array, show the path
    int currentNodeIndex = endNodeIndex;
    while (currentNodeIndex != startNodeIndex) {
        printf("%d <- ", currentNodeIndex);
        currentNodeIndex = predecessor[currentNodeIndex];
    }
    printf("%d \n", startNodeIndex);
}

int areAllNodesVisited(int *visitedList, int size) {
    // given a visitedList, check whether all the nodes have already been visited
    for (int i=0; i<size; i++) {
        if (visitedList[i] == 0) {
            return 0;
        }
    }

    return 1;
}

int getMinimumUnvisitedNode(int *visitedList, int *distances, int size) {
    // given the visited list, and a set of distances, find the first unvisited node with the smallest
    // distance from the start node
    int minimumDistance = INFINITY + 1;
    int minimumIndex = -1;

    for (int i=0; i<size; i++) {
        if (visitedList[i] == 0 && distances[i] < minimumDistance) {
            minimumDistance = distances[i];
            minimumIndex = i;
        }
    }

    return minimumIndex;
}

void findShortestPath(Graph *g, int startNodeIndex, int endNodeIndex) {
    int *distances = malloc(sizeof(int) * g->numberOfVertices); // distance from start node to node[i]
    int *predecessor = malloc(sizeof(int) * g->numberOfVertices); // node that leads up to vertex i in the shortest path
    int *visited = malloc(sizeof(int) * g->numberOfVertices); // whether vertex i is visited

    for (int i = 0; i < g->numberOfVertices; i++) {
        distances[i] = INFINITY; // distances from start node to node[i] is initially infinity
        predecessor[i] = -1; // initially the node is unreachable, thus has no parent
        visited[i] = 0; // initially all nodes are not visited
    }

    distances[startNodeIndex] = 0; // distance from start node to itself is 0

    for (int count = 0; count < g->numberOfVertices; count++) { // go through all the nodes
        int currentNodeIndex = getMinimumUnvisitedNode(visited, distances, g->numberOfVertices); // get first unvisited node with the shortest distance from the start (greedy approach)
        visited[currentNodeIndex] = 1; // mark as visited

        // check all neighbors
        for (int neighborIndex = 0; neighborIndex < g->numberOfVertices; neighborIndex++) {
            if (visited[neighborIndex]) { // if visited already, skip
                continue;
            }

            int distanceBetweenCurrentAndNeighbor = g->adjMatrix[currentNodeIndex][neighborIndex]; // distance between neighbor and current
            if (distanceBetweenCurrentAndNeighbor == 0) { // if current node and neighbor node are not connected, skip
                continue;
            }

            int newDistanceFromNeighborToStartNode = distances[currentNodeIndex] + distanceBetweenCurrentAndNeighbor;
            if (newDistanceFromNeighborToStartNode < distances[neighborIndex]) { // if new path is shorter than existing path to node
                distances[neighborIndex] = newDistanceFromNeighborToStartNode; // set distance to new path distance
                predecessor[neighborIndex] = currentNodeIndex; // set new predecessor
            }
        }
    }

    if (distances[endNodeIndex] != INFINITY) {
        printf("Shortest distance: %d\n", distances[endNodeIndex]);
        printPath(predecessor, startNodeIndex, endNodeIndex);
    } else {
        printf("No path found\n"); // endNode unreachable from start
    }
}

int main()
{
    int numberOfVertices;
    printf("Enter number of vertices\n");
    scanf("%d", &numberOfVertices);

    int **adjMatrix = malloc(sizeof(int*) * numberOfVertices);
    for (int i = 0; i < numberOfVertices; i++) {
        adjMatrix[i] = malloc(sizeof(int));
    }

    while (1) {
        int input;
        printf("Enter 1 to add an entry, enter -1 to quit\n");
        scanf("%d", &input);

        if (input == -1) {
            break;
        }

        int firstVerticeIndex;
        int secondVerticeIndex;
        int weight;

        printf("Enter vertice 1\n");
        scanf("%d", &firstVerticeIndex);

        printf("Enter vertice 2\n");
        scanf("%d", &secondVerticeIndex);

        printf("Enter weight of vertice\n");
        scanf("%d", &weight);

        adjMatrix[firstVerticeIndex][secondVerticeIndex] = weight;
    }

    int startNodeIndex;
    int endNodeIndex;
    printf("Enter start node index\n");
    scanf("%d", &startNodeIndex);
    printf("Enter end node index\n");
    scanf("%d", &endNodeIndex);

    Graph *g = initialiseGraph(numberOfVertices, adjMatrix);
    printAdjMatrix(g);
    findShortestPath(g, startNodeIndex, endNodeIndex);
    return 0;
}
```

# Time Complexity

Consider the following pseudocode for dijkstra's algorithm:

```
PriorityQueue unvisitedSet;

for vertex v in graph: // O(|V|)
    distance[v] = INFINITY; // O(1)
    prev[v] = UNDEFINED; // O(1)
    add v to Q; // O(1)

while unvisitedSet is not empty: // O(|V|)
    currentNode = vertex in unvisitedSet with minimum distance; // O(1) for min-heap, O(|V|) for array

    remove currentNode from unvisitedSet; // O(log|V|) for min-heap, O(|V|) for array, O(1) for linked list

    for each neighbor of currentNode: // O(|N|) (Number of neighbors)
        alternativeDistance = distance[currentNode] + length(currentNode, neighborNode); // O(1)
        if alternativeDistance < distance[neighborNode]:
            distance[neighborNode] = alternativeDistance; // min-heap requires O(log|V|) because you have to fix heap, O(1) for array
            prev[neighborNode] = currentNode;

return distance[], prev[]
```

Note that $|V||N| = |E|$ (Number of nodes \* number of neighbors per node = number of edges)
Time complexity:

For a min-heap:

$$
O(|V|) + O(|V|(\log |V| + |N|\log|V|)) = O((|E| + |V|)\log|V|)
$$

For a simple array:

$$
O(|V|) + O(|V|(|V| + |V| + |N|)) = O(|V|^2 + |E|)
$$

# Proof of Correctness

1. Property of shortest path

> Lemma 1: In a weighted graph $G$, suppose that a shortest path from $x$ to $z$ consists of a path $P$ from $x$ to $y$, followed by a path $Q$ from $y$ to $z$. Then $P$ is the shortest path from $x$ to $y$ and $Q$ is a shortest path from $y$ to $z$

x -- P --> y -- Q --> z

Proof by contradiction:

Assume $P$ is not the shortest path from $x$ to $y$. Then there exists another path from $x$ to $y$, $P'$ which is shorter than $P$. As a result, the path $P'Q$ is shorter than the path $PQ$.

However, we have already known that $PQ$ should be the shortest path. This is a contradiction. Therefore, $P$ is the shortest path from $x$ to $y$. (Similarly for $Q$)

2. Proof that the greedy choice is optimal

> Theorem D1: Let $G = (V, E, W)$ be a weighted graph with nonnegative weights .Let $S$ be a subset of $V$ and let $s$ be a member of $S$. Assume that $d[y]$ is the shortest distance in $G$ from $s$ to $y$, for each $y$ in $S$. Let $z$ be the next vertex chosen to go into $S$. If the edge $(y, z)$ is chosen to minimise $d[y] + W(y, z)$ over all edges with one vertex in $S$ and one vertex in $V - S$, then the path consisting of a shortest path from $s$ to $y$ followed by the edge $(y, z)$ is the shortest path from $s$ to $z$

Proof: We will show that there is no other path from $s$ to $z$ that is shorter

$$
\begin{aligned}
P&: s \rightarrow y \rightarrow z (\text{Shortest path for $z$}) \\
W(P) &= d[y] + W(y, z) \\ \\
P' &: s \rightarrow y \rightarrow u \rightarrow \cdots \rightarrow z (\text{An alternative shortest path}) \\
W(P') &= d[y] + W(y, u) + \text{distance from $u$ to $z$} \\ \\
\end{aligned}
$$

We note that $W(y, u) \geq W(y, z)$ because we chose $(y, z)$ such that we minimised $d[y] + W(y, z)$
However, since $d[y] + W(y, u) \geq d[y] + W(y, z)$, and the distance from $u$ to $z$ is nonnegative, therefore $W(P) \leq W(P')$

3. Proof by induction

> Given a directed weighted graph $G$ with nonnegative weights a source vertex $s$, Dikstra's algorithm computes the shortest distance from $s$ to each vertex of $G$ reachable from $s$

Basis:

The algorithm assigns $d[s] = 0$ when the source vertex $s$ is added to $S$. Since all distances are nonnegative, $d[s]$ is the shortest distance from $s$ to $s$ when $S$ has the first vertex in it

Inductive hypothesis:

Assume the theorem is true when $S$ has $k$ vertices. That is, assume $v_0, v_1, ..., v_{k-1}$ are added, where $d[v_i]$ is the shortest distance to vertex $v_i$.

When $v_k$ is chosen by Dijkstra's algorithm, it means that the edge $(v_i, v_k)$, where $i \in \{\0, 1, 2, ..., k-1}$ is chosen to minimise $d[v_i] + W(v_i, v_k)$ among all edges with one vertex in $S$ and one vertex not in $S$

By theorem d1, $d[v_k]$ is the shortest distance from source to $v_k$, hence the theorem is true when $S$ has $k + 1$ vertices

# Resources

-   https://stackoverflow.com/questions/26547816/understanding-time-complexity-calculation-for-dijkstra-algorithm
-   https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
