# Kruskal's Algorithm

Kruskal's algorithm is a greedy algorithm used to find the minimum spanning tree in an undirected graph. Note that a minimum spanning tree

- Contains all vertices of the graph
- Has the minimum sum of weights of edges among all the trees that can be formed in the graph

# General Procedure

```
Sort edges from lowest to highest

Consider edge E with lowest weight
If E does not add a cycle to the graph,
    Add E to the spanning tree

Repeat until all edges are considered
```

# Finding Cycles in a tree

The most common way to find a cycle in a graph is called the union find. The Union-Find algorithm divides vertices into clusters and allows us to check whether vertices belong to the same cluster. If 2 vertices belong to the same cluster, adding a new edge between these 2 vertices will create a cycle

There are 2 components to the Union-Find algorithm
1. Find - Finds the root vertice of a cluster
2. Union - Unifies 2 different clusters together

To initialise, we create 2 arrays - `ids` and `sizes`. `ids[i]` is the root vertex for the cluster in which vertex `i` belongs to, while `sizes[i]` is the size of the cluster in which vertex `i` belongs to (if `i` is a root node). If `ids[i] == i`, it means that `i` is the root of the cluster

Initially, all vertices are in their own cluster, and all clusters only contain that 1 vertice

```
ids = [0, 1, 2, ..., n];
sizes = [1, 1, 1, ..., 1];
```

## Find

Given a vertex `v`, we want to find the root of the cluster that `v` belongs to.

1. `root = v`
2. If `ids[root] != root`, it means that we have not reached the root of the cluster. We have to continue the path up the `ids` array to find the actual root of the cluster. Hence,

```
while (root != ids[root]) {
    root = ids[root];
}
```

3. Now that we reached the root after traversing through multiple vertices, we can compress the path. This makes the path towards the root node shorter, such that the next time we try to travel along the same vertex path, we can reach the root faster.

We do this by first figuring out where to go after we set a new root (so we can continue travelling up the path). On the vertex we are currently on, we set its root to be the overall cluster's root. Then, we repeat this process up the path until we reach the final root vertex.

```
while (index != root) {
    int next = ids[index];
    ids[index] = root;
    index = next;
}
```

4. We return the root of the cluster

## Unify

Given 2 vertices `u` and `v`, we want to merge both of them into a single cluster

1. First we find the root of `u`, with `rootU = find(u)`
2. We find the root of `v`, with `rootV = find(v)`
3. If `rootU == rootV`, this means that `u` and `v` belong to the same cluster, and we do not need to continue
4. Else, we merge the smaller cluster **into** the bigger cluster. WLOG consider `rootV` to be the smallest cluster
5. We set the root of `v` to be the root of `u`, with `ids[v] = rootU`
6. Since the cluster size has now increased, we also update the size of the cluster, with `sizes[u] += sizes[v]`

## Size

We can find the size of the cluster in which `v` belongs to with `sizes[find(v)]`, because we cannot guarantee that `sizes[v]` is the most updated size of the cluster, unless `v` itself is a root node

# Kruskal Procedure

Now with union find, we can implement kruskal's algorithm

1. We initialise `ids` and `sizes` for union-find accordingly
2. We initialise `mstForest`, which is an array of edges that are in the MST
3. We sort the edges from the lowest weight to the highest weight
4. We start with the edge with lowest weight, for all edges:
    1. We look at the 2 vertices that are connected by the edge, `u` and `v`
    2. If `u` and `v` belong to the same cluster (`find(u) == find(v)`), this means that including this new edge in the MST will create a cycle, hence we ignore
    3. Else, we add this edge to the MST, and unify the 2 clusters of `u` and `v` together

# Code

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct _Edge {
    int u;
    int v;
    int weight;
} Edge;

Edge *createEdge(int u, int v, int weight) { 
    // create a graph edge that connects vertex u to vertex v, with weight
    Edge *e = malloc(sizeof(Edge));
    e->u = u;
    e->v = v;
    e->weight = weight;
    return e;
}

void printArray(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    
    printf("\n");
}

void printEdges(Edge **edges, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d -> %d, %d\n", edges[i]->u, edges[i]->v, edges[i]->weight);
    }
}

int find(int *ids, int *sizes, int index) {
    // find the root of the component
    int root = index;
    
    // find the root of the set
    while (root != ids[root]) {
        root = ids[root];
    }
    
    // compress the path leading back to the root
    while (index != root) {
        int next = ids[index];
        ids[index] = root;
        index = next;
    }
    
    return root;
}

int componentSize(int *ids, int *sizes, int index) {
    // return size of component
    return sizes[find(ids, sizes, index)];
}

void unify(int *ids, int *sizes, int p, int q) {
    // unify 2 components together
    int root1 = find(ids, sizes, p);
    int root2 = find(ids, sizes, q);
    
    // same group
    if (root1 == root2) {
        return;
    }
    
    // merge smaller group into larger group
    if (sizes[root1] > sizes[root2]) {
        sizes[root1] += sizes[root2];
        ids[root2] = root1;
    } else {
        sizes[root2] += sizes[root1];
        ids[root1] = root2;
    }
}

void sortEdges(Edge **edges, int size) {
    // sort edges with increasing weight
    int i, j;
    Edge *temp;
    
    for (i = 1; i < size; i++) {
        for (j = 0; j < size - 1; j++) {
            if (edges[j]->weight > edges[j + 1]->weight) {
                temp = edges[j];
                edges[j] = edges[j + 1];
                edges[j + 1] = temp;
            }
        }
    }
}

void kruskal(Edge **edges, int numberOfEdges, int numberOfVertices) {
    int *ids = malloc(sizeof(int) * numberOfVertices); // ids is the root of the component each vertex belongs to
    int *sizes = malloc(sizeof(int) * numberOfVertices); // size of the component each vertex belongs to
    Edge **mstForest = malloc(sizeof(Edge*) * numberOfEdges); // final MST forest of edges
    int mstForestCount = 0; // number of edges within MST forest
    
    for (int i = 0; i < numberOfVertices; i++) {
        ids[i] = i; // initially, each vertice is in its own component (unconnected)
        sizes[i] = 1; // each component consists of only vertex i
    }
    
    sortEdges(edges, numberOfEdges); // sort edges from smallest to largest
    
    for (int i = 0; i < numberOfEdges; i++) {
        Edge *currentEdge = edges[i]; // pick the smallest unpicked edge
        int vertex1Index = currentEdge->u;
        int vertex2Index = currentEdge->v;
        
        // if same group, adding an edge creates a cycle
        if (find(ids, sizes, vertex1Index) == find(ids, sizes, vertex2Index)) {
            continue;
        } else {
            // if different group, unify the 2 groups together and add the edge to the MST
            unify(ids, sizes, vertex1Index, vertex2Index);
            mstForest[mstForestCount] = currentEdge;
            mstForestCount++;
        }
    }
    
    printEdges(mstForest, mstForestCount);
}

int main()
{
    int numberOfEdges = 6;
    int numberOfVertices = 5;
    Edge **edges = malloc(sizeof(Edge*) * numberOfEdges);
    edges[0] = createEdge(0, 1, 1);
    edges[1] = createEdge(1, 2, 2);
    edges[2] = createEdge(2, 4, 1);
    edges[3] = createEdge(1, 4, 4);
    edges[4] = createEdge(3, 4, 7);
    edges[5] = createEdge(2, 3, 3);

    kruskal(edges, numberOfEdges, numberOfVertices);
    return 0;
}
```

# Proof of Correctness

> Lemma: Let $F$ be a forest; that is any undirected acyclic graph. Let $e = (v, w)$ be an edge that is not in $F$. There is a cycle consisting of $e$ and the edges in $F$ if and only if $v$ and $w$ are in the same connected component of $F$

> Theorem: Let $G = (V, E, W)$ be a weighted undirected graph, and let $F \subseteq E$. If $F$ is contained in a minimum spanning tree collection for $G$ and if $e$ is an edge of minimum weight in $E - F$ such that $F \cup \{ e \}$ has no cycles,

then $F \cup \{ e \}$ is contained in a minimum spanning tree collection for $G$

# Time Complexities

To find out what the time complexity is for kruskal's algorithm, first off we shall consider the time complexity for `find` and `unify` in the Union-Find algorithm

## Time Complexities of `find` and `unify`

> Lemma 1: If `union(t, u)` is implemented in such a way: the tree with root `u` is attached as a subtree of `t` if and only if the tree with root `u` has lesser nodes than the tree with root `t`. Then, after any sequence of union operations,any tree that has $k$ nodes has its height at most $\lfloor \log k \rfloor$

## Proof by Induction

Base case: $k = 1 \implies h = \log 1 = 0$

Inductive step: Assume all trees with $m$ nodes has height $h \leq \lfloor \log x \rfloor$ when $m < k$ (Strong induction)

Consider a tree formed by $k_1 + k_2 = k$ nodes from tree $T_1$ and $T_2$. $h_1$ is the height of $T_1$ and $h_2$ is the height of $T_2$

WLOG, let $h_2 \leq h_1$. We know that after the union, the new tree has height that is equal to

1. $h_1$
2. $h_2 + 1$

We know that 

$$
h_1 \leq \lfloor \log k_1 \rfloor \leq \lfloor \log k \rfloor
$$

, and

$$
\begin{aligned}
h_2 + 1 &\leq \lfloor \log k_2 \rfloor + 1 &(\text{Inductive step}) \\
&= \lfloor \log k_2 + 1 \rfloor \\
&= \lfloor \log k_2 + \log 2 \rfloor &(\log 2 = 1)  \\
&= \lfloor \log 2k_2 \rfloor \\
&\leq \lfloor \log( k_1 + k_2) \rfloor &(h_2 \leq h_1 \implies k_2 \leq k_1) \\
&= \lfloor \log k \rfloor &(k_1 + k_2 = k)
\end{aligned}
$$

Hence by induction, the tree with $k$ nodes will have height at most $\lfloor \log k \rfloor$

From this lemma, we can conclude that both `find` and `unify` on a tree of $n$ elements will run in $O(\log n)$ time.

## Time Complexity of Kruskal's Algorithm

On a graph $G = (V, E, W)$

1. We initialise `ids` and `sizes` for union-find accordingly - $O(V)$
2. We initialise `mstForest`, which is an array of edges that are in the MST 
3. We sort the edges from the lowest weight to the highest weight - $O(E \log E)$
4. We start with the edge with lowest weight, for all edges: - $O(E)$
    1. We look at the 2 vertices that are connected by the edge, `u` and `v`
    2. If `u` and `v` belong to the same cluster (`find(u) == find(v)`), this means that including this new edge in the MST will create a cycle, hence we ignore - $O(\log V)$
    3. Else, we add this edge to the MST, and unify the 2 clusters of `u` and `v` together - $O(\log V)$

Hence, the overall time complexity is $O(E\log V + E \log E)$

If the graph is dense, note that the time complexity is then $O(E \log E) = O(V^2 \log V)$, and if the graph is sparse ($E < V$), then the time complexity is $O(E \log V)$. 

Comparatively, on a dense graph, Prim's algorithm runs in $O(V^2)$ and on a sparse graph, Prim's algorithm runs in $O(E \log V)$.

Hence, on a dense graph, Prim's algorithm performs better ($O(V^2)$) and on a sparse graph, Kruskal's algorithm performs better ($O(E \log V)$)

# Resources

- https://www.youtube.com/watch?v=JZBQLXgSGfs
- https://www.youtube.com/watch?v=KbFlZYCpONw
- https://www.youtube.com/watch?v=0jNmHPfA_yE
- https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
- https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/
- https://www.programiz.com/dsa/kruskal-algorithm