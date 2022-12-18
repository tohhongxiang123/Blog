# Binary Search Trees

1. Write a function `insertBSTNode()` that adds an item to a Binary Search Tree.

```c
void insertBSTNode(BTNode **node, int value);
```

BST nodes should be created dynamically using a malloc() call.

2. Write a function `printBSTInOrder()` that prints a sorted list of items stored in Binary Search Tree using an in-order traversal pattern.

```c
void printBSTInOrder(BTNode *node);
```

3. Write a function `isBST()` that determines whether a given Binary Tree is also a Binary Search Tree. The function should return 1 if the BT is a BST, and 0 otherwise.
4. Write a function `removeBSTNode()` that removes a given item from a Binary Search Tree. The function should return 0 if the item was found and successfully removed and 1 otherwise.

```c
//////////////////////////////////////////////////////////////////////

#include <stdio.h>
#include <stdlib.h>

///////////////////////////////////////////////////////////////////////

typedef struct _btnode{
int item;
struct _btnode *left;
struct _btnode *right;
} BTNode;

///////////////////////////////////////////////////////////////////////

void insertBSTNode(BTNode **node, int value);
void printBSTInOrder(BTNode *node);
int isBST(BTNode *node, int min, int max);
BTNode *removeBSTNode(BTNode *node, int value);
BTNode *findMin(BTNode *p);

///////////////////////////////////////////////////////////////////////

int main(){
	int i=0;

	BTNode *root=NULL;

	//question 1
	do{
		printf("input a value you want to insert(-1 to quit):");

		scanf("%d",&i);
		if (i!=-1)
			insertBSTNode(&root,i);
	}while(i!=-1);

	//question 2
	printf("\n");
	printBSTInOrder(root);

	//question 3
	if ( isBST(root,-1000000, 1000000)==1)
		printf("It is a BST!\n");
	else
		printf("It is not a BST!\n");

// 	//question 4
	do{
		printf("\ninput a value you want to remove(-1 to quit):");
		scanf("%d",&i);
		if (i!=-1)
		{
			root=removeBSTNode(root,i);
			printBSTInOrder(root);
		}
	}while(i!=-1);


	return 0;
}

//////////////////////////////////////////////////////////////////////

void insertBSTNode(BTNode **node, int value)
{
	// write your code here
	if (*node == NULL) {
    	BTNode *newNode = malloc(sizeof(BTNode));
    	newNode->item = value;
    	newNode->left = NULL;
    	newNode->right = NULL;
    	*node = newNode;
    	return;
	}

	if (value < (*node)->item) {
	    insertBSTNode(&((*node)->left), value);
	} else if (value > (*node)->item) {
	    insertBSTNode(&((*node)->right), value);
	} else {
	    printf("Value already exists within tree\n");
	    return;
	}
}

//////////////////////////////////////////////////////////////////////

void printBSTInOrder(BTNode *node)
{
	// write your code here
	if (node == NULL) {
	    return;
	}

	printBSTInOrder(node->left);
	printf("%d ", node->item);
	printBSTInOrder(node->right);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

int isBST(BTNode *node, int min, int max) // the item stored in node has to be smaller than max and larger than min
{
	// write your code here
	if (node == NULL) return 1;

	if (node->item < min || node->item > max) {
	    return 0;
	}

	return isBST(node->left, min, node->item) && isBST(node->right, node->item, max);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

BTNode *removeBSTNode(BTNode *node, int value)
{
	// write your code here
	if (node == NULL) {
	    return node;
	}

	if (value < node->item) {
	    node->left = removeBSTNode(node->left, value);
	} else if (value > node->item) {
	    node->right = removeBSTNode(node->right, value);
	} else {
	    if (!node->left && !node->right) {
	        // no children
	        BTNode *temp = node;
	        node = NULL;
	        free(temp);
	    } else if (!!node->left ^ !!node->right) {
	        // 1 child
	        BTNode *temp = node->left ? node->left : node->right;
	        free(node);
	        return temp;
	    } else {
	        // 2 children
	        BTNode *inOrderSuccessor = findMin(node->right);
	        node->item = inOrderSuccessor->item;
	        node->right = removeBSTNode(node->right, inOrderSuccessor->item);
	    }
	}

	return node;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

BTNode *findMin(BTNode *p)
{
	// write your code here
	if (p == NULL) {
	    return p;
	}

	while (p->left) {
	    p = p->left;
	}

	return p;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```
