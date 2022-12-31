# AVL Trees

AVL Trees are Binary Trees that are

1. Sorted - Every node on the left is less than the root node, and every node on the right is bigger than the root node
2. Balanced - The height of the left and right subtree at every node differ by at most 1

This is the structure for a AVL Tree Node:

```c
typedef struct node {
    int value;
    struct node *left, *right;
} Node;
```

The `height` is the largest number of edges from the node to a leaf node.

Let us now define a function `createNode` which will create a new node.

```c
Node *createNode(int value) {
    Node *newNode = malloc(sizeof(Node));
    newNode->left = NULL;
    newNode->right = NULL;
    newNode->value = value;

    return newNode;
}
```

This `malloc`s a new node and sets the appropriate defaults.

# Insertion into AVL Trees

Every time we insert into the AVL Tree, we need to make sure that after each insertion, the tree remains balanced. That means that at every node, the left and right subtree's height differ by at most 1.

First, we define a function `getHeight` which will get the height of a node. The height of a `NULL` node is -1, and a node without children is 0.

```c
int getHeight(Node *node) {
    if (node == NULL) return -1;

    int leftHeight = getHeight(node->left);
    int rightHeight = getHeight(node->right);

    return leftHeight > rightHeight ? 1 + leftHeight : 1 + rightHeight;
}
```

This function will return -1 if the current node is null. If not, it will check the left and right node, and return `1 + max(leftHeight, rightHeight)`

Now let us define a function that will insert a node into the binary tree, without balancing.

```c
void insertNode(Node **root, int value) {
    if (*root == NULL) {
        *root = createNode(value);
    } else if (value < (*root)->value) {
        insertNode(&((*root)->left), value);
    } else if (value > (*root)->value) {
        insertNode(&((*root)->right), value);
    } else {
        printf("Value already exists in tree\n");
        return;
    }
}
```

It checks whether the passed node is `NULL`. If it is, then it will set that node to be the new node. If the value of the node to be created is less than the current value, we insert on the left, else we insert on the right. For simplicity, we do not insert anything if the value already exists in the tree.

Now every time we add a node, we want to check the **balance factor** of the node, which we will define as `leftHeight - rightHeight`

```c
int leftSubtreeHeight = getHeight((*root)->left);
int rightSubtreeHeight = getHeight((*root)->right);
int balanceFactor = leftSubtreeHeight - rightSubtreeHeight;
```

To rebalance an unbalanced tree, we need to do at least 1 rotation - either left or right rotate.

```
T1, T2 and T3 are subtrees of the tree
rooted with y (on the left side) or x (on
the right side)
     y                               x
    / \     Right Rotation          /  \
   x   T3   - - - - - - - >        T1   y
  / \       < - - - - - - -            / \
 T1  T2     Left Rotation            T2  T3

Keys in both of the above trees follow the following order
 keys(T1) < key(x) < keys(T2) < key(y) < keys(T3)
So BST property is not violated anywhere.
```

```c
Node *leftRotate(Node *x) {
    Node *y = x->right;
    Node *t2 = y->left;

    y->left = x;
    x->right = t2;
}

Node *rightRotate(Node *y) {
    Node *x = y->left;
    Node *t2 = x->right;

    x->right = y;
    y->left = t2;
}
```

We shall refer to the first unbalanced node as `z`.

If balanceFactor > 1, the tree is **left heavy**, which means there are too many nodes on the left. There are 2 possible cases for a left heavy tree

1. The node is inserted on the left (Left left insertion)
2. The node is inserted on the right (Left right insertion)

### Left Left

Left left occurs if `balanceFactor > 1 && value < currentNode->value`

```
T1, T2, T3 and T4 are subtrees.
         z                                      y
        / \                                   /   \
       y   T4      Right Rotate (z)          x      z
      / \          - - - - - - - - ->      /  \    /  \
     x   T3                               T1  T2  T3  T4
    / \
  T1   T2
```

### Left Right

Left right occurs if `balanceFactor > 1 && value > currentNode->value`

```
     z                               z                           x
    / \                            /   \                        /  \
   y   T4  Left Rotate (y)        x    T4  Right Rotate(z)    y      z
  / \      - - - - - - - - ->    /  \      - - - - - - - ->  / \    / \
T1   x                          y    T3                    T1  T2 T3  T4
    / \                        / \
  T2   T3                    T1   T2
```

If balanceFactor < -1, the tree is **right heavy**, which means there are too many nodes on the right. Similarly,

1. The node is inserted on the left (Right left insertion)
2. The node is inserted on the right (Right right insertion)

### Right Left

Right left occurs if `balanceFactor < -1 && value < currentNode->value`

```
   z                            z                            x
  / \                          / \                          /  \
T1   y   Right Rotate (y)    T1   x      Left Rotate(z)   z      y
    / \  - - - - - - - - ->     /  \   - - - - - - - ->  / \    / \
   x   T4                      T2   y                  T1  T2  T3  T4
  / \                              /  \
T2   T3                           T3   T4
```

### Right Right

Right right occurs if `balanceFactor < -1 && value > currentNode->value`

```
  z                                y
 /  \                            /   \
T1   y     Left Rotate(z)       z      x
    /  \   - - - - - - - ->    / \    / \
   T2   x                     T1  T2 T3  T4
       / \
     T3  T4
```

So now, the updated `insertNode` code looks like this:

```c
void insertNode(Node **root, int value) {
    if (*root == NULL) {
        *root = createNode(value);
    } else if (value < (*root)->value) {
        insertNode(&((*root)->left), value);
    } else if (value > (*root)->value) {
        insertNode(&((*root)->right), value);
    } else {
        printf("Value already exists in tree\n");
        return;
    }

    int leftSubtreeHeight = getHeight((*root)->left);
    int rightSubtreeHeight = getHeight((*root)->right);
    int balanceFactor = leftSubtreeHeight - rightSubtreeHeight;

    if (balanceFactor > 1 && value < (*root)->value) {
        *root = rightRotate(*root); // left left
    } else if (balanceFactor > 1 && value > (*root)->value) {
        (*root)->left = leftRotate((*root)->left); // left right
        *root = rightRotate(*root);
    } else if (balanceFactor < -1 && value > (*root)->value) {
        *root = leftRotate(*root); // right right
    } else if (balanceFactor < -1 && value < (*root)->value) {
        (*root)->right = rightRotate((*root)->right); // right left
        *root = leftRotate(*root);
    }
}
```

The full code:

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int value;
    struct node *left, *right;
} Node;

Node *createNode(int value) {
    Node *newNode = malloc(sizeof(Node));
    newNode->left = NULL;
    newNode->right = NULL;
    newNode->value = value;

    return newNode;
}

int getHeight(Node *node) {
    if (node == NULL) return -1;

    int leftHeight = getHeight(node->left);
    int rightHeight = getHeight(node->right);

    return leftHeight > rightHeight ? 1 + leftHeight : 1 + rightHeight;
}

Node *leftRotate(Node *x) {
    Node *y = x->right;
    Node *t2 = y->left;

    y->left = x;
    x->right = t2;
    return y;
}

Node *rightRotate(Node *y) {
    Node *x = y->left;
    Node *t2 = x->right;

    x->right = y;
    y->left = t2;
    return x;
}

void insertNode(Node **root, int value) {
    if (*root == NULL) {
        *root = createNode(value);
    } else if (value < (*root)->value) {
        insertNode(&((*root)->left), value);
    } else if (value > (*root)->value) {
        insertNode(&((*root)->right), value);
    } else {
        printf("Value already exists in tree\n");
        return;
    }

    int leftSubtreeHeight = getHeight((*root)->left);
    int rightSubtreeHeight = getHeight((*root)->right);
    int balanceFactor = leftSubtreeHeight - rightSubtreeHeight;

    if (balanceFactor > 1 && value < (*root)->value) {
        *root = rightRotate(*root); // left left
    } else if (balanceFactor > 1 && value > (*root)->value) {
        (*root)->left = leftRotate((*root)->left); // left right
        *root = rightRotate(*root);
    } else if (balanceFactor < -1 && value > (*root)->value) {
        *root = leftRotate(*root); // right right
    } else if (balanceFactor < -1 && value < (*root)->value) {
        (*root)->right = rightRotate((*root)->right); // right left
        *root = leftRotate(*root);
    }
}

void inorder(Node *root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d\n", root->value);
    inorder(root->right);
}

int main()
{
    Node *root = NULL;

    int numberOfNodes = 10000;
    for (int i=0; i<numberOfNodes; i++) {
        insertNode(&root, i);
    }

    printf("In order\n");
    inorder(root);

    printf("Height of tree: %d\n", getHeight(root));
    return 0;
}

```

# Optimisation to Insertion

Every time we insert, we are checking the height of the node. This is wasteful. Instead, we can store the height of the node into the node itself, and every time we insert to the tree, we update all the affected nodes.

Firstly, we add a `height` member to the node struct

```c
typedef struct node {
    int value;
    struct node *left, *right;
    int height;
} Node;
```

We also rewrite `createNode` to set the default height of a leaf node to 0

```c
Node *createNode(int value) {
    Node *newNode = malloc(sizeof(Node));
    newNode->left = NULL;
    newNode->right = NULL;
    newNode->value = value;
    newNode->height = 0;

    return newNode;
}
```

We now rewrite `getHeight` to use this node's property instead

```c
int getHeight(Node *node) {
    if (node == NULL) return -1;

    return node->height;
}
```

Now we will update `leftRotate` and `rightRotate` to also update the heights of the nodes. Note that the node's heights should be updated from the lowest nodes up, to ensure all the nodes heights are accurately updated.

```c
Node *leftRotate(Node *x) {
    Node *y = x->right;
    Node *t2 = y->left;

    y->left = x;
    x->right = t2;

    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;
    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
    return y;
}

Node *rightRotate(Node *y) {
    Node *x = y->left;
    Node *t2 = x->right;

    x->right = y;
    y->left = t2;

    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;

    return x;
}
```

Note: `max` is a function that returns the maximum of 2 integers

Now, `insertNode` is updated to update the `height` of the current node as well

```c
void insertNode(Node **root, int value) {
    // normal insertion
    if (*root == NULL) {
        *root = createNode(value);
    } else if (value < (*root)->value) {
        insertNode(&((*root)->left), value);
    } else if (value > (*root)->value) {
        insertNode(&((*root)->right), value);
    } else {
        printf("Value already exists in tree\n");
        return;
    }

    // check the height of the current node
    int leftSubtreeHeight = getHeight((*root)->left);
    int rightSubtreeHeight = getHeight((*root)->right);
    int balanceFactor = leftSubtreeHeight - rightSubtreeHeight;

    // rotate based on case
    if (balanceFactor > 1 && value < (*root)->value) {
        *root = rightRotate(*root); // left left
    } else if (balanceFactor > 1 && value > (*root)->value) {
        (*root)->left = leftRotate((*root)->left); // left right
        *root = rightRotate(*root);
    } else if (balanceFactor < -1 && value > (*root)->value) {
        *root = leftRotate(*root); // right right
    } else if (balanceFactor < -1 && value < (*root)->value) {
        (*root)->right = rightRotate((*root)->right); // right left
        *root = leftRotate(*root);
    }

    // after rotation, update the final height of the node
    leftSubtreeHeight = getHeight((*root)->left);
    rightSubtreeHeight = getHeight((*root)->right);
    (*root)->height = max(leftSubtreeHeight, rightSubtreeHeight) + 1;
}
```

The full code

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int value;
    struct node *left, *right;
    int height;
} Node;

Node *createNode(int value) {
    Node *newNode = malloc(sizeof(Node));
    newNode->left = NULL;
    newNode->right = NULL;
    newNode->value = value;
    newNode->height = 0;

    return newNode;
}

int getHeight(Node *node) {
    if (node == NULL) return -1;

    return node->height;
}

int max(int a, int b) {
    return a > b ? a : b;
}

Node *leftRotate(Node *x) {
    Node *y = x->right;
    Node *t2 = y->left;

    y->left = x;
    x->right = t2;

    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;
    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
    return y;
}

Node *rightRotate(Node *y) {
    Node *x = y->left;
    Node *t2 = x->right;

    x->right = y;
    y->left = t2;

    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;

    return x;
}

void insertNode(Node **root, int value) {
    // normal insertion
    if (*root == NULL) {
        *root = createNode(value);
    } else if (value < (*root)->value) {
        insertNode(&((*root)->left), value);
    } else if (value > (*root)->value) {
        insertNode(&((*root)->right), value);
    } else {
        printf("Value already exists in tree\n");
        return;
    }

    // check the height of the current node
    int leftSubtreeHeight = getHeight((*root)->left);
    int rightSubtreeHeight = getHeight((*root)->right);
    int balanceFactor = leftSubtreeHeight - rightSubtreeHeight;

    // rotate based on case
    if (balanceFactor > 1 && value < (*root)->value) {
        *root = rightRotate(*root); // left left
    } else if (balanceFactor > 1 && value > (*root)->value) {
        (*root)->left = leftRotate((*root)->left); // left right
        *root = rightRotate(*root);
    } else if (balanceFactor < -1 && value > (*root)->value) {
        *root = leftRotate(*root); // right right
    } else if (balanceFactor < -1 && value < (*root)->value) {
        (*root)->right = rightRotate((*root)->right); // right left
        *root = leftRotate(*root);
    }

    // after rotation, update the final height of the node
    leftSubtreeHeight = getHeight((*root)->left);
    rightSubtreeHeight = getHeight((*root)->right);
    (*root)->height = max(leftSubtreeHeight, rightSubtreeHeight) + 1;
}

void inorder(Node *root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d\n", root->value);
    inorder(root->right);
}

int main()
{
    Node *root = NULL;

    int numberOfNodes = 10000;
    for (int i=0; i<numberOfNodes; i++) {
        insertNode(&root, i);
    }

    printf("Height of tree: %d\n", getHeight(root));
    return 0;
}
```

# Deletion

Similar to insertion, when we delete a node, it is possible that the tree becomes unbalanced. If the tree becomes unbalanced, we will have to rebalance the tree.

There are 3 cases to take care of when deleting a node

1. When the node has 0 children
2. When the node has 1 child
3. When the node has 2 children

## 0 children

- Point the parent of the node to `NULL`
- `free` the target node

## 1 child

- Copy the child to the target node
- `free` the target node

## 2 children

- Get the smallest value node in the right subtree
- Copy that node into the target node
- `free` the target node

After deleting the target node, check for balance, and rebalance if necessary.

To get the smallest value node in a tree,

```c
Node *minValueNode(Node *root) {
    Node *target = root;
    while (target->left) {
        target = target->left;
    }

    return target;
}
```

```c
Node *deleteNode(Node *root, int value) {
    if (root == NULL) {
        return root;
    } else if (value < root->value) {
        root->left = deleteNode(root->left, value);
    } else if (value > root->value) {
        root->right = deleteNode(root->right, value);
    } else {
        if (!root->left && !root->right) {
            // no children
            Node *temp = root;
            root = NULL;
            free(temp); // free original node
        } else if (!!root->left ^ !!root->right) {
            // 1 child
            Node *temp = root;
            root = root->left ? root->left : root->right; // copy child contents
            free(temp); // free original node
        } else {
            Node *inOrderSuccessor = minValueNode(root->right);
            root->value = inOrderSuccessor->value;
            root->right = deleteNode(root->right, inOrderSuccessor->value);
        }
    }

    int leftSubtreeHeight = getHeight(root->left);
    int rightSubtreeHeight = getHeight(root->right);
    root->height = max(leftSubtreeHeight, rightSubtreeHeight) + 1; // update height

    return root;
}
```

However, after deletion, we need to check for the tree's balance, and update the tree accordingly. So

1. We check the balance factor
2. We check which of the 4 cases it belongs to, and then rebalance the tree accordingly.

```c
int balanceFactor = getBalanceFactor(root);

// rotate based on case
if (balanceFactor > 1 && getBalanceFactor(root->left) >= 0) {
    return rightRotate(root); // left left
} else if (balanceFactor > 1 && getBalanceFactor(root->left) < 0) {
    root->left = leftRotate(root->left); // left right
    return rightRotate(root);
} else if (balanceFactor < -1 && getBalanceFactor(root->right) <= 0) {
    return leftRotate(root); // right right
} else if (balanceFactor < -1 && getBalanceFactor(root->right) > 0) {
    root->right = rightRotate(root->right); // right left
    return leftRotate(root);
}
```

The overall deletion looks like:

```c
Node *deleteNode(Node *root, int value) {
    // normal insertion
    if (root == NULL) {
        return root;
    } else if (value < root->value) {
        root->left = deleteNode(root->left, value);
    } else if (value > root->value) {
        root->right = deleteNode(root->right, value);
    } else {
        if (!root->left && !root->right) {
            // no children
            Node *temp = root;
            root = NULL;
            free(temp); // free original node
        } else if (!!root->left ^ !!root->right) {
            // 1 child
            Node *temp = root;
            root = root->left ? root->left : root->right; // copy child contents
            free(temp); // free original node
        } else {
            Node *inOrderSuccessor = minValueNode(root->right);
            root->value = inOrderSuccessor->value;
            root->right = deleteNode(root->right, inOrderSuccessor->value);
        }
    }

    if (root == NULL) {
        return root;
    }

    int balanceFactor = getBalanceFactor(root);

    int leftSubtreeHeight = getHeight(root->left);
    int rightSubtreeHeight = getHeight(root->right);
    root->height = max(leftSubtreeHeight, rightSubtreeHeight) + 1;

    // rotate based on case
    if (balanceFactor > 1 && getBalanceFactor(root->left) >= 0) {
        return rightRotate(root); // left left
    } else if (balanceFactor > 1 && getBalanceFactor(root->left) < 0) {
        root->left = leftRotate(root->left); // left right
        return rightRotate(root);
    } else if (balanceFactor < -1 && getBalanceFactor(root->right) <= 0) {
        return leftRotate(root); // right right
    } else if (balanceFactor < -1 && getBalanceFactor(root->right) > 0) {
        root->right = rightRotate(root->right); // right left
        return leftRotate(root);
    }

    return root;
}
```

# Overall Code

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int value;
    struct node *left, *right;
    int height;
} Node;

Node *createNode(int value) {
    Node *newNode = malloc(sizeof(Node));
    newNode->left = NULL;
    newNode->right = NULL;
    newNode->value = value;
    newNode->height = 0;

    return newNode;
}

int getHeight(Node *node) {
    if (node == NULL) return -1;

    return node->height;
}

int getBalanceFactor(Node *root) {
    if (root == NULL) return 0;
    return getHeight(root->left) - getHeight(root->right);
}

int max(int a, int b) {
    return a > b ? a : b;
}

Node *leftRotate(Node *x) {
    Node *y = x->right;
    Node *t2 = y->left;

    y->left = x;
    x->right = t2;

    x->height = max(getHeight(x->left), getHeight(x->right)) + 1; // important that the lower node height is updated first
    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
    return y;
}

Node *rightRotate(Node *y) {
    Node *x = y->left;
    Node *t2 = x->right;

    x->right = y;
    y->left = t2;

    y->height = max(getHeight(y->left), getHeight(y->right)) + 1; // update lower node height first
    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;

    return x;
}

Node *insertNode(Node *root, int value) {
    // normal insertion
    if (root == NULL) {
        return createNode(value);
    } else if (value < root->value) {
        root->left = insertNode(root->left, value);
    } else if (value > root->value) {
        root->right = insertNode(root->right, value);
    } else {
        printf("Value already exists in tree\n");
        return root;
    }

    int balanceFactor = getBalanceFactor(root);

    int leftSubtreeHeight = getHeight(root->left);
    int rightSubtreeHeight = getHeight(root->right);
    root->height = max(leftSubtreeHeight, rightSubtreeHeight) + 1;

    // rotate based on case
    if (balanceFactor > 1 && value < root->left->value) {
        return rightRotate(root); // left left
    } else if (balanceFactor > 1 && value > root->left->value) {
        root->left = leftRotate(root->left); // left right
        return rightRotate(root);
    } else if (balanceFactor < -1 && value > root->right->value) {
        return leftRotate(root); // right right
    } else if (balanceFactor < -1 && value < root->right->value) {
        root->right = rightRotate(root->right); // right left
        return leftRotate(root);
    }

    return root;
}

Node *minValueNode(Node *root) {
    while (root->left) {
        root = root->left;
    }

    return root;
}

Node *deleteNode(Node *root, int value) {
    // normal insertion
    if (root == NULL) {
        return root;
    } else if (value < root->value) {
        root->left = deleteNode(root->left, value);
    } else if (value > root->value) {
        root->right = deleteNode(root->right, value);
    } else {
        if (!root->left && !root->right) {
            // no children
            Node *temp = root;
            root = NULL;
            free(temp); // free original node
        } else if (!!root->left ^ !!root->right) {
            // 1 child
            Node *temp = root;
            root = root->left ? root->left : root->right; // copy child contents
            free(temp); // free original node
        } else {
            Node *inOrderSuccessor = minValueNode(root->right);
            root->value = inOrderSuccessor->value;
            root->right = deleteNode(root->right, inOrderSuccessor->value);
        }
    }

    if (root == NULL) {
        return root;
    }

    int balanceFactor = getBalanceFactor(root);

    int leftSubtreeHeight = getHeight(root->left);
    int rightSubtreeHeight = getHeight(root->right);
    root->height = max(leftSubtreeHeight, rightSubtreeHeight) + 1;

    // rotate based on case
    if (balanceFactor > 1 && getBalanceFactor(root->left) >= 0) {
        return rightRotate(root); // left left
    } else if (balanceFactor > 1 && getBalanceFactor(root->left) < 0) {
        root->left = leftRotate(root->left); // left right
        return rightRotate(root);
    } else if (balanceFactor < -1 && getBalanceFactor(root->right) <= 0) {
        return leftRotate(root); // right right
    } else if (balanceFactor < -1 && getBalanceFactor(root->right) > 0) {
        root->right = rightRotate(root->right); // right left
        return leftRotate(root);
    }

    return root;
}

void inorder(Node *root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->value);
    inorder(root->right);
}

int main()
{
    Node *root = NULL;

    int numberOfNodes = 13;
    for (int i=0; i<=numberOfNodes; i++) {
        root = insertNode(root, i);
    }

    printf("Height of tree: %d\n", getHeight(root));
    inorder(root);
    printf("\n");

    for (int i=2; i<10; i++) {
        root = deleteNode(root, i);
    }

    inorder(root);
    printf("\n");

    return 0;
}
```
