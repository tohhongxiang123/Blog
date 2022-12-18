# Searching

1. Given an array of n elements. Find two elements in the array such that their sum is equal to K. The two elements can be the same element. Once a pair of elements is found, the program can be terminated.

The function prototype is given below:

```c
void dualSearch (int A [] , int size , int K , int dualIndex [])
```

```c
#include <stdio.h>
#include <stdlib.h>

void dualSearch (int[],int, int, int[]);

int main()
{
    int i,size,K;
    int* A;
    int index[2] = {-1,-1};

    //Search key
    scanf("%d",&K);

    //create an array
    scanf("%d",&size);
    A=(int *)malloc(sizeof(int)*size);
    for(i=0; i<size; i++)
    {
        scanf("%d",&A[i]);
    }

    dualSearch(A,size,K,index);

    if(index[0]!=-1)
        printf("%d %d\n",index[0], index[1]);
    else
        printf("Not found");

    free(A);
    return 0;
}

void dualSearch(int A[], int size, int K, int dualIndex[])
{
   // Write your code here
    for (int i=0; i<size; i++) {
        for (int j=0; j<size; j++) {
            if (i != j && A[i] + A[j] == K) {
                dualIndex[0] = i;
                dualIndex[1] = j;
                return;
            }
        }
    }
}

```

2. Given a sorted array of n elements. Find two elements in the array such that their sum is equal to K. The two elements can be the same element. Once a pair of elements are found, the program can be terminated. The results may be different from the results of Question 1.
   The function prototype is given below:

```c
void dualSearch (int A [] , int size , int K , int dualIndex [])
```

```c
#include <stdio.h>
#include <stdlib.h>

void quickSort(int A[], int low, int high);
int partition (int A[], int low, int high);

void dualSortedSearch (int[],int, int, int[]);

int main()
{
    int i,size,K;
    int* A;
    int index[2] = {-1,-1};

    //Search key
    scanf("%d",&K);

    //create an array
    scanf("%d",&size);
    A=(int *)malloc(sizeof(int)*size);
    for(i=0; i<size; i++)
    {
        scanf("%d",&A[i]);
    }

    quickSort(A,0,size-1);
    dualSortedSearch(A,size,K,index);

    if(index[0]!=-1)
        printf("%d %d\n",index[0], index[1]);
    else
        printf("Not found");

    free(A);
    return 0;
}

void dualSortedSearch(int A[], int size, int K, int dualIndex[])
{
   // Write your code here
   int bottomIndex = 0;
   int topIndex = size - 1;

   while (bottomIndex < topIndex) {
       if (A[bottomIndex] + A[topIndex] < K) {
           bottomIndex++;
       } else if (A[bottomIndex] + A[topIndex] > K) {
           topIndex--;
       } else {
           break;
       }
   }

   if (A[bottomIndex] + A[topIndex] == K) {
       dualIndex[0] = bottomIndex;
       dualIndex[1] = topIndex;
   }
}

int partition (int A[], int low, int high)
{
    int pivot = A[high];
    int i = (low - 1);

    int temp;
    for (int j = low; j <= high- 1; j++)
    {
        if (A[j] < pivot)
        {
            i++;

            temp = A[i];
            A[i] = A[j];
            A[j] = temp;
        }
    }

    temp = A[i+1];
    A[i+1]= A[high];
    A[high] = temp;
    return (i + 1);
}

void quickSort(int A[], int low, int high)
{
    if (low < high)
    {
        int pivot = partition(A, low, high);

        quickSort(A, low, pivot - 1);
        quickSort(A, pivot + 1, high);
    }
}

```

3. Implement a closed addressing hash table to perform insertion and key searching. The insertion may not have to insert at the end of the link-list. The function prototype is given below:

```c
ListNode * HashSearch ( HashTable *, int) ;
int HashInsert ( HashTable * , int );
```

```c
#include <stdio.h>
#include <stdlib.h>

#define LOAD_FACTOR 3

typedef struct _listnode{
    int key;
    struct _listnode *next;
} ListNode;

typedef struct _linkedlist{
   int size;
   ListNode *head;
} HashTableNode;

typedef struct _hashTable{
   int hSize;
   int nSize;
   HashTableNode *Table;
} HashTable;

int Hash(int,int);

ListNode* HashSearch(HashTable, int);
int HashInsert(HashTable *, int);

//In Practice, we will not do it
void HashPrint(HashTable);

int main()
{
    int opt;
    int size;

    int i;
    int key;

    //Create a HashTable
    HashTable Q3Hash;
    Q3Hash.hSize = 0;
    Q3Hash.nSize = 0;
    Q3Hash.Table = NULL;

    printf("============= Hash Table ============\n");
    printf("|1. Create a hash table             |\n");
    printf("|2. Insert a key to the hash table  |\n");
    printf("|3. Search a key in the hash table  |\n");
    printf("|4. Print the hash table            |\n");
    printf("|5. Quit                            |\n");
    printf("=====================================\n");

    printf("Enter selection: ");
    scanf("%d",&opt);
    while(opt>=1 && opt <=4){
        switch(opt){
        case 1:
            printf("Enter number of data to be inserted:\n");
            scanf("%d",&size);

            Q3Hash.hSize = (int)size/ LOAD_FACTOR;
            Q3Hash.nSize = 0;

            Q3Hash.Table = (HashTableNode *) malloc(sizeof(HashTableNode)*(Q3Hash.hSize));

            for(i=0;i<Q3Hash.hSize;i++){
               Q3Hash.Table[i].head = NULL;
               Q3Hash.Table[i].size = 0;
            }
            printf("HashTable is created.\n");
            break;
        case 2: //Insertion
            printf("Enter a key to be inserted:\n");
            scanf("%d",&key);

            if(HashInsert(&Q3Hash,key))
                printf("%d is inserted.\n",key);
            else
                printf("%d is a duplicate. No key is inserted.\n",key);
            break;
        case 3: //Search
            printf("Enter a key for searching in the HashTable:\n");
            scanf("%d",&key);
            ListNode* node = HashSearch(Q3Hash, key);

            if(node!=NULL)
                printf("%d is found.\n",key);
            else
                printf("%d is not found.\n",key);
            break;
        case 4:
            HashPrint(Q3Hash);
            break;
        }

    printf("Enter selection: ");
    scanf("%d",&opt);
    }

    for(i=0;i<Q3Hash.hSize;i++)
    {
        while(Q3Hash.Table[i].head)
        {
            ListNode *temp;
            temp = Q3Hash.Table[i].head;
            Q3Hash.Table[i].head = Q3Hash.Table[i].head->next;
            free(temp);
        }
    }
    free(Q3Hash.Table);

    return 0;

}

int Hash(int key,int hSize)
{
    return key%hSize;
}

ListNode* HashSearch(HashTable Q3Hash, int key)
{
 // Write your code here
    if (Q3Hash.hSize == 0) {
        return NULL;
    }
    int slot = Hash(key, Q3Hash.hSize);
    ListNode *currentNode = Q3Hash.Table[slot].head;

    while (currentNode != NULL) {
        if (currentNode->key == key) {
            return currentNode;
        }

        currentNode = currentNode->next;
    }

    return currentNode;
}

int HashInsert(HashTable* Q3HashPtr, int key)
{
 // Write your code here
    if (Q3HashPtr->hSize == 0) {
        return 0;
    }

    if (HashSearch(*Q3HashPtr, key)) {
        return 0;
    }

    int slot = Hash(key, Q3HashPtr->hSize);

    ListNode *newNode = malloc(sizeof(ListNode));
    if (!newNode) {
        return 0;
    }
    newNode->key = key;
    newNode->next = Q3HashPtr->Table[slot].head;
    Q3HashPtr->Table[slot].head = newNode;
    Q3HashPtr->Table[slot].size++;
    Q3HashPtr->nSize++;

    return 1;
}

void HashPrint(HashTable Q3Hash)
{
    int i;
    ListNode *temp;
    for(i=0;i<Q3Hash.hSize;i++)
    {
        temp =Q3Hash.Table[i].head;
        printf("%d:  ",i);
        while(temp !=NULL)
        {
            printf("%d -> ", temp->key);
            temp = temp->next;
        }
        printf("\n");
    }
}
```
