# More Recursion

# Tower of Hanoi

[Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi) is a mathematical game/puzzle that can be solved with recursion. We have 3 pegs (1, 2, 3) and $n$ disks of different sizes. The top disk is the smallest and the bottom disk is the largest. We must move all the disks from peg 1 to peg 3 with the following constraints

- We can only move 1 disk at a time
- We can only place a smaller disk on top of a larger disk

## Solving the Problem Recursively

- Suppose I have to move 7 disks from 1 to 3
- Pretend I can move 6 disks wherever I want by magic
  - Magic: Move 6 disks from 1 to 2
  - Move 7th disk from 1 to 3
  - Magic: Move 6 disks from 2 to 3
- This "magic" is actually recursion

In code, 

```java
public static void moveDisks(int n, char from, char using, char to) {
    if (n == 1) {
        System.out.println("Move disk from peg " + from + " to " + to);
    } else {
        moveDisks(n-1, from , to, using)
        moveDisks(1, from, using, to)
        moveDisks(n-1, using, from, to) 
    }
}
```

# Backtracking

- Problem solving by trial and error
- Problem must be decomposable into a series of steps
  - Try step
  - Is it still valid? Move on recursively
  - Failure? Backtrack, undo step
- Each recursive instace "remembers" what step was taken and how to undo it if things do not work out
- Examples of backtracking problems
  - N-queens
  - Sudoku
  - Maze solving

