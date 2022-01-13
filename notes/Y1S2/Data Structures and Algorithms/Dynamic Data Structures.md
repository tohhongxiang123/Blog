# Dynamic Data Structures

Consider the following problem

> Write a program that asks the user how many integers will be entered, then asks for each integer

```c
int size;

scanf("%d", &size);

int arr[size];

for (int i = 0; i < size; i++){
    scanf("%d", &arr[i]);
}

for (int i=0; i<size; i++) {
    printf("%d ", arr[i]);
}
```

This will cause an error because the size of array variables in C have to be known at compile time. (Some dialects of C have variable-length arrays, which might not give you an error.)

We can try to fix this problem by setting the array size to some very large number

```c
#define SIZE 1000000
int arr[SIZE];
int size;

scanf("%d", &size);

for (int i=0; i<size; i++) {
    scanf("%d", &arr[i]);
}

for (int i=0; i<size; i++) {
    printf("%d ", arr[i]);
}
```

However, this solution is bad because it wastes memory. If the user only wants an array of size 3, he leaves 1000000 - 3 = 999997 slots in the array empty. Each `int` takes 4 bytes of memory, and `arr` itself takes up 4*1000000 = 4 MB of memory, which is a lot of memory. And also, what if the user wanted to enter more than 1000000 integers?

# Static vs Dynamic Memory
- Static elements are allocated on the **stack**
- Dynamic elements are allocated on the **heap**

### Stack
- Elements are nicely stacked on top of one another **contiguously**

### Heap
- Memory space for elements allocated anywhere
- Use `malloc` to perform memory allocation on the heap

# `void *malloc(size_t size)`
- Reserves `size` bytes of memory for your variable/struct
- Returns the address where the reserved space starts, `NULL` if memory allocation fails
- `malloc` comes from `stdlib.h`, so to use `malloc`, you should `#include <stdlib.h>`
- Everytime `malloc(size)` is called, the OS looks for a space in the heap with `size` contiguous bytes of memory
  - `malloc` can fail if your memory is fragmented. Many small blocks of memory are free, but none are large enough to fit `size` bytes

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int size;

    scanf("%d", &size);
    
    int *arr = malloc(sizeof(int) * size);

    if (arr == NULL) {
        printf("Failed to allocate memory\n");
        return 1;
    }
    
    for (int i = 0; i < size; i++){
        scanf("%d", &arr[i]);
    }
    
    for (int i=0; i<size; i++) {
        printf("%d ", arr[i]);
    }
}
```

Note: `sizeof(int)` returns 4 bytes

# Memory De-allocation
- Free up memory by using `free`
- Memory de-allocation is important because any memory we `malloc` and do not use will not be automatically freed up (unlike languages with automatic garbage-collection such as python)

```c
#include <stdlib.h>

int main() {
    int *ptr;
    for (int i=0; i<100000000; i++) {
        ptr = malloc(sizeof(int));
    }
}
```

We allocate memory and point to it using `ptr`, and then we allocate another block to it. The previous block of allocated memory is now **inaccessible**, and this is called a **memory leak**

### `void free(void *ptr)`
- Frees memory allocated at `ptr`

```c
#include <stdlib.h>
int main() {
    int *arr = malloc(5*sizeof(int));

    for (int i=0; i<10000; i++) {
        arr[i] = i;
    }

    for (int i=0; i<10000; i++) {
        printf("%d ", arr[i]);
    }
}
```

Memory for 5 integers was allocated, but we inserted 10000 integers in to the array. 
- This is called a **buffer overflow**, where we write more memory than we were allocated
- This causes parts of memory that were not allocated to us to be overwritten
- Other variables, other program instructions etc.
- Sometimes this will work (if lucky), most of the time it will crash the program

### Buffer overflow
Consider the following program:

```c
int main() {
    int s[4], t[4];

    for (int i=0; i<=4; i++)
    {
        s[i] = i;
        t[i] = i;
    }
    printf("s:t\n");
    for (int i=0; i<=4; i++)
        printf("%d:%d\n", s[i], t[i]);
}
```

And the following was outputted to the console
```
s:t
0:4
1:1
2:2
3:3
4:4
```

`t[0]` should be `0`. This is due to C writing past the memory we allocated for it.

`s[0] s[1] s[2] s[3] t[0] t[1] t[2] t[3]`

When C reaches the line where `s[4] = 4`, it writes into `t[0]` instead, because there is no `s[4]`