# Prim's Algorithm for Minimum Spanning Tree

A minimum spanning tree is a connected, acyclic subgraph containing all the vertices of a graph with a minimum weight. The weight of a tree refers to the sum of the weights of all the edges in the tree.

# Main Idea of Prim's Algorithm

- Works on undirected graph
- Builds upon a single partial minimum spanning tree; At each step adding an edge connecting the vertex nearest to, but not already in the current partial minimum spanning tree
- At first a vertex is chosen, this vertex will be the first node in the minmum spanning tree set, $T$
- Set $P$ is initialised, where $P$ is the set of vertices not in $T$ but are adjacent to some vertices in $T$
- In every iteration of Prim's algorithm, a new vertex $u$ from $P$ will be connected to the tree $T$. The vertex $u$ will be deleted from the set $P$. The vertices adjacent to $u$ that are not already in $P$ will be added to $P$
- When all vertices are connected to $T$, $P$ will be empty, which signals the end of the algorithm
- The new vertex in every iteration will be chosen greedily - Among all vertices adjacent to $T$ but themselves are not in $T$, we choose the one with the minimum cost

# Code

```c
#include <stdio.h>
#include <stdlib.h>

#define INFINITY 10000;

typedef struct _Graph {
    int numberOfVertices;
    int **adjMatrix;
} Graph;

void printArray(int *array, int size) {
    for (int i = 0; i < size; i++){
        printf("%d ", array[i]);
    }
    printf("\n");
}

void printGraph(Graph *g) {
    for (int i = 0; i < g->numberOfVertices; i++) {
        for (int j = 0; j < g->numberOfVertices; j++) {
            printf("%d ", g->adjMatrix[i][j]);
        }
        printf("\n");
    }
}

Graph *createGraph() {
    int numberOfVertices;
    printf("Enter number of vertices: ");
    scanf("%d", &numberOfVertices);
    
    int **adjMatrix = malloc(sizeof(int*) * numberOfVertices);
    for (int i = 0; i < numberOfVertices; i++) {
        adjMatrix[i] = malloc(sizeof(int) * numberOfVertices);
    }
    
    while (1) {
        int input;
        printf("Enter 1 to input edge, -1 to quit\n");
        scanf("%d", &input);
        
        if (input == -1) {
            break;
        }
        
        int vertex1;
        int vertex2;
        
        printf("Enter vertex 1\n");
        scanf("%d", &vertex1);
        printf("Enter vertex 2\n");
        scanf("%d", &vertex2);
        
        int weight;
        printf("Enter weight\n");
        scanf("%d", &weight);

        // undirected graph
        adjMatrix[vertex1][vertex2] = weight;
        adjMatrix[vertex2][vertex1] = weight;
    }
    
    Graph *g = malloc(sizeof(Graph));
    g->numberOfVertices = numberOfVertices;
    g->adjMatrix = adjMatrix;
    return g;
}

void printSolution(int *parents, Graph *g) {
    printf("Edge \tWeight\n");
    for (int i = 1; i < g->numberOfVertices; i++) {
        printf("%d - %d \t%d \n", parents[i], i, g->adjMatrix[parents[i]][i]);
    }
}

int minVertexNotInMinimumSpanningTreeSet(int *weights, int *inMinimumSpanningTreeSet, int numberOfVertices) {
    // returns node that isnt in MST, and has minimum weight
    int minWeight = INFINITY + 1;
    int minIndex = -1;
    
    for (int i =0; i < numberOfVertices; i++){
        if (inMinimumSpanningTreeSet[i] == 0 && weights[i] < minWeight) {
            minIndex = i;
            minWeight = weights[i];
        }
    }
    
    return minIndex;
}

void primMST(Graph *g) {
    int *parents = malloc(sizeof(int) * g->numberOfVertices); // used to reconstruct MST, parents[i] is the parent of vertex i
    int *weights = malloc(sizeof(int) * g->numberOfVertices); // used to pick minimum weight edge in cut
    int *minimumSpanningTreeSet = malloc(sizeof(int) * g->numberOfVertices); // represents set of vertices included inside MST
    
    for (int i = 0; i < g->numberOfVertices; i++) {
        parents[i] = -1; // each child does not have a parent initially
        weights[i] = INFINITY; // all weights are inifnity initially
        minimumSpanningTreeSet[i] = 0; // no vertex inside mst initially
    }
    
    // include first vertex in mst
    parents[0] = -1; // first vertex has no parents
    weights[0] = 0; // make sure the first vertex is picked first
    
    for (int count = 0; count < g->numberOfVertices - 1; count++) {
        int chosenVerticeIndex = minVertexNotInMinimumSpanningTreeSet(weights, minimumSpanningTreeSet, g->numberOfVertices); // pick minimum vertex that is not in MST
        minimumSpanningTreeSet[chosenVerticeIndex] = 1; // mark as inside MST
        
        for (int neighborIndex = 0; neighborIndex < g->numberOfVertices; neighborIndex++) {
            if (g->adjMatrix[chosenVerticeIndex][neighborIndex] == 0) {
                continue; // skip if no edge
            }
            
            if (g->adjMatrix[chosenVerticeIndex][neighborIndex] < weights[neighborIndex]) {
                parents[neighborIndex] = chosenVerticeIndex;
                weights[neighborIndex] = g->adjMatrix[chosenVerticeIndex][neighborIndex];
            }
        }
    }
    
    printSolution(parents, g);
}

int main()
{
    Graph *g = createGraph();
    printGraph(g);
    primMST(g);
    return 0;
}

```

# Minimum Spanning Tree Property

> Let $T$ be a spanning tree of $G$, where $G = (V, E, W)$ is a connected weighted graph. Suppose that for every edge $(u, v)$ of $G$ that is not in $T$. If $(u, v)$ is added to $T$ it creates a cycle such that $(u, v)$ is a maximum weight edge on that cycle. Then $T$ has the minimum spanning tree property.

This is saying that, for any minimum spanning tree $T$, if we added another edge $(u, v)$ not in $T$, and this edge creates a cycle such that $(u, v)$ is the edge with the maximum weight in that cycle, then $T$ is a minimum spanning tree.

## Lemma 1

> In a connected weighted graph $G = (V, E, W)$, if $T_1$ and $T_2$ are 2 spanning trees that have the MST proprty, then they have the same total weight

Proof by induction on $k$, the number of edges in $T_1$ but not in $T_2$ (there are also $k$ edges in $T_2$ but not in $T_1$)

Basis:

$k = 0$, which means that all edges in $T_1$ are in $T_2$. Therefore $T_1 = T_2$, they have the same weight

