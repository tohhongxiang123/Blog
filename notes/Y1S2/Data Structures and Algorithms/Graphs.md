# Graphs

1. Write a function adjM2adjL() to convert an adjacency matrix to an adjacency list. The structure of a graph is given below.

```c
enum GraphType { ADJ_MATRIX , ADJ_LIST }; // Types of Graph Representation
typedef struct _listnode
{
int vertex ;
struct _listnode * next ;
} ListNode ;
union GraphForm {
int ** matrix ;
ListNode ** list ;
};
typedef struct _graph {
int V;
int E;
enum GraphType type ;
union GraphForm adj ;
} Graph ;
```

The vertices are named from 1 to |V |.
The function prototype is given as follows:

```c
void adjM2adjL ( Graph *g );
```

2. Write a function adjL2adjM() to convert an adjacency list to an adjacency matrix. Please reuse the work down in Q1. The function prototype is given as follows:
```c
void adjL2adjM ( Graph *g );
```

3. The degree of a vertex v of a graph is the number of edges incident on v. Write a function calDegreeV() to compute vertex degrees using adjacent lists and using adjacency matrix. Please reuse the work done in Q1 and Q2.
```c
void calDegreeV ( Graph g , int * degreeV )
```

```c
#include <stdio.h>
#include <stdlib.h>

enum GraphType {ADJ_MATRIX, ADJ_LIST}; // Types of Graph Representation

typedef struct _listnode
{
    int vertex;
	struct _listnode *next;
} ListNode;

union GraphForm{
    int **matrix;
    ListNode **list;
};

typedef struct _graph{
    int V;
    int E;
    enum GraphType type;
    union GraphForm adj;
}Graph;

void printGraphMatrix(Graph );
void adjM2adjL(Graph *);
void adjL2adjM(Graph *);
void printGraphList(Graph );
void calDegreeV(Graph,int *);
void printDegreeV(int *,int );

void insertNode(ListNode **head, int vertex);

int main()
{
    Graph g;
    int i,j;

    int* degreeV;

    printf("Enter the number of vertices:\n");
    scanf("%d",&g.V);

    g.E = 0;
    g.adj.matrix = (int **)malloc(g.V*sizeof(int *));
    for(i=0;i<g.V;i++)
        g.adj.matrix[i] = (int *)malloc(g.V*sizeof(int));

    for(i=0;i<g.V;i++)
        for(j=0;j<g.V;j++)
            g.adj.matrix[i][j] = 0;
    g.type = ADJ_MATRIX;

    degreeV = (int *) malloc(g.V*sizeof(int));
    for(i=0;i<g.V;i++)
        degreeV[i]=0;

    int V1, V2;
    printf("Enter two vertices which are adjacent to each other:\n");
    while(scanf("%d %d",&V1,&V2)==2)
    {
        if(V1>0 && V1<=g.V && V2>0 && V2<=g.V)
        {
            g.adj.matrix[V1-1][V2-1] = 1;
            g.adj.matrix[V2-1][V1-1] = 1;
            g.E++;
        }
        else
            break;
        printf("Enter two vertices which are adjacent to each other:\n");
    }

    calDegreeV(g,degreeV);

    printGraphMatrix(g);
    printDegreeV(degreeV,g.V);

    adjM2adjL(&g);
    calDegreeV(g,degreeV);

    printGraphList(g);
    printDegreeV(degreeV,g.V);

    adjL2adjM(&g);
    printGraphMatrix(g);

    return 0;
}

void printGraphMatrix(Graph g)
{
    int i,j;
    if(g.type == ADJ_LIST) {printf("Error"); return;}

    for(i=0;i<g.V;i++){
        for(j=0;j<g.V;j++)
            printf("%d\t",g.adj.matrix[i][j]);
        printf("\n");
    }

}

void printDegreeV(int *degreeV,int V)
{
    int i;
    for(i=0;i<V;i++)
        printf("%d: %d degree\n",i+1,degreeV[i]);
}

void printGraphList(Graph g){
    int i;
    ListNode* temp;

    if(g.type == ADJ_MATRIX) {printf("Error"); return;}
    for(i=0;i<g.V;i++)
    {
        printf("%d:\t",i+1);
        temp = g.adj.list[i];
        while(temp!=NULL){
            printf("%d -> ",temp->vertex);
            temp = temp->next;
        }
        printf("\n");
    }
}

void adjM2adjL(Graph *g)
{
 // Question 1
 // Write your code here
 
    // malloc new matrix
    int **newMatrix = (int **)malloc(g->V*sizeof(int *));
    for(int i=0;i<g->V;i++) {
        newMatrix[i] = (int *)malloc(g->V*sizeof(int));
    }
        
    // copy values to new matrix
    for (int i=0; i<g->V; i++) {
        for (int j=0; j<g->V; j++) {
            newMatrix[i][j] = g->adj.matrix[i][j];
        }
    }
    
    // loop through new matrix, insert node into adjacency list if there exists an edge
    for (int i=0; i<g->V; i++) {
        g->adj.list[i] = NULL;
        for (int j=0; j<g->V; j++) {
            if (newMatrix[i][j]) {
                insertNode(&(g->adj.list[i]), j+1);
            }
        }
    }
    
    // free created matrix
    for (int i=0; i<g->V; i++) {
        free(newMatrix[i]);
    }
    free(newMatrix);
    
    // set type
    g->type = ADJ_LIST;
}

void adjL2adjM(Graph *g){
	// Question 2
    // Write your code here
    
    // create temporary new matrix
    int **newMatrix = (int **)malloc(g->V*sizeof(int *));
    for(int i=0;i<g->V;i++) {
        newMatrix[i] = (int *)malloc(g->V*sizeof(int));
    }
    
    // set all to zeroes
    for (int i=0; i<g->V; i++) {
        for (int j=0; j<g->V; j++) {
           newMatrix[i][j] = 0;
        }
    }
    
    // loop through adjacency list, and set new matrix if there is an edge
    for (int i=0; i<g->V; i++) {
        for (ListNode *currentNode = g->adj.list[i]; currentNode != NULL; currentNode = currentNode->next) {
            newMatrix[i][currentNode->vertex - 1] += 1;
        }
    }
    
    // free the existing adjacency list
    for (int i=0; i<g->V; i++) {
        for (ListNode *currentNode = g->adj.list[i]; currentNode != NULL; currentNode = currentNode->next) {
            free(currentNode);
        }
    }
    free(g->adj.list);
    
    // set type and matrix
    g->type = ADJ_MATRIX;
    g->adj.matrix = newMatrix;
}

void calDegreeV(Graph g, int *degreeV)
{
	// Question 3
    // Write your code here
    for(int i=0;i<g.V;i++)
        degreeV[i]=0;
        
    if (g.type == ADJ_MATRIX) {
        for (int i=0; i<g.V; i++) {
            for (int j=0; j<g.V; j++) {
                if (g.adj.matrix[i][j]) {
                    degreeV[i]++;
                }
            }
        }
        return;
    }
    
    for (int i=0; i<g.V; i++) {
        for (ListNode *currentNode = g.adj.list[i]; currentNode != NULL; currentNode = currentNode->next) {
            degreeV[i] += 1;
        }
    }
}

void insertNode(ListNode **head, int vertex) {
    ListNode *newNode = malloc(sizeof(ListNode));
    newNode->vertex = vertex;
    
    newNode->next = *head;
    *head = newNode;
    return;
}

```