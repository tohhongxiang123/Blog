# Recursion

- Allows for iteration
  - Can solve some problems using recursion just as you could with loops
  - Pros: Elegant
  - Cons: May run more slowly

# Stack
- Data structure
- Last in first out
- Inserting into top of stack: `push`
- Removing from top of stack: `pop`

## Call stack
- Abstracction
- Stores state of program at time of method call
- Pushing data to stack and popping data off stack requires time

# Why recursion?

- Some problems can only be solved using this concept
- Tree with branches
  - Each branch can be explored as a sub-tree
- Games that "look-ahead" rely on recursion (Chess, checkers, tic-tac-toe)

Examples of algorithms that require recursion:
- Binary search
- Merge sort
- Abstract multiple choice

# What is recursion?

- Self reference (Defining something in terms of itself)
- A method that can call itself (Fibonacci)
- Data structures can reference itself (LinkedList Node)

# Why recursion works
- Method does not always call itself
- Data structure does not always link to another copy of itself
- There is a "base case"
- Recursion works well for problems that can be split into
  - Base case
  - Recursive case

# Recursive Definitions

- `fibonacci(n)`
  - If `n <= 2`, then `f(n) = 1`
  - Else `f(n) = f(n-1) + f(n-2)`

```java
// returns the nth fibonacci number
int fibonacci(int n) {
    if (n <= 2) {
        return 1;
    }

    return fibonacci(n-1) + fibonacci(n-2);
}
```

- `factorial(n)`
  - `factorial(1) = 1`
  - `factorial(n) = n * factorial(n-1)`

```java
// returns n!
int factorial(n) {
    if (n <= 1) {
        return 1;
    }

    return n * factorial(n-1);
}
```

Notice that the argument for successive calls is smaller than the original call

# Keys to write recursive methods
- Break problem down into 
  - Basis case: What can be done without a recursive call
  - Recursive case: The same problem but "smaller"
- The parameters to the recursive case must be "smaller" in some sense (closer to the basis case)

# How recursion is implemented

- Stack is used to handle method calls
- When method is called, parameters and local variables are pushed onto the call stack
- When method is returned, method is pushed off call stack along with its parameters and variables
- Each recursive method call has its own copy of parameters and local variables

![Call stack for calling factorial](https://i.stack.imgur.com/PK6Ht.png)