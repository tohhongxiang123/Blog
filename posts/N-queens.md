# N-Queens

Problem: Given an NxN sized chessboard, generate all possible configurations where N queens are placed on the board, and all of them do not attack each other

The N-queens problem will take very long to run, if we were to check all possible permutations of the chessboard. The total number of possible permutations are given by

$$
T(N) = {N^2 \choose N}
$$

For a standard chessboard $N = 8$, there are a total of 4,426,165,368 combinations, but only 92 solutions.

Instead of generating all possible permutations, we can constrain which permutations we generate. By constraining to have only 1 queen per row, we reduce the total possible permuations to

$$
T(N) = N^N
$$

For $N = 8$, we reduced the number of permutations to 16,777,216 (0.379% of the original). We can also further restrict that at most 1 queen can exist per diagonal, reducing it to $N!$ ($T(8) = 40320$).

We can use backtracking to solve the problem. The pseudocode is as follows:

1. Start from (0, 0)
2. For a specific row
   1. For all columns in the row
      1. Place the queen in that column
      2. If the board is still valid
         1. Recurse with the next row, starting again from the first column
      3. If all the queens are placed, and the board is valid
         1. Print the board
      4. Remove the queen from the space

```python
def n_queens(board, row, col):
    if row > len(board)-1 or col > len(board)-1:
        return

    for i in range(len(board)):
        # Try to add queen on the column
        board[row][i] = 1

        # If adding the queen is valid, recurse
        if isValidBoard(board):
            n_queens(board, row+1, col)

        # If all queens placed, and is valid
        if sum([sum(row) for row in board]) == n and isValidBoard(board):
            print('===')
            printBoard(board)

        # Remove the queen
        board[row][i] = 0

def printBoard(board):
    for i in range(len(board)):
        print(board[i])

def isValidBoard(board):
    # at most 1 queen per row
    for i in range(len(board)):
        if sum(board[i]) > 1:
            # print("Row is not valid")
            # printBoard(board)
            return 0

    # at most 1 queen per col
    for i in range(len(board)):
        if sum([row[i] for row in board]) > 1:
            # print("Column is not valid")
            # printBoard(board)
            return 0

    # Generating diagonals https://stackoverflow.com/questions/23069388/listing-elements-in-a-nested-lists-diagonally/23069625#23069625
    # at most 1 queen per diagonal
    h = len(board)
    w = len(board)
    for diagonal in [[board[h-1-q][p-q]
        for q in range(min(p, h-1), max(0, p-w+1)-1, -1)]
       for p in range(h+w-1)]:
          if sum(diagonal) > 1:
              return 0

    #  at most 1 queen per antidiagonal
    for antiDiagonal in [[board[p - q][q]
        for q in range(max(p-h+1,0), min(p+1, w))]
        for p in range(h + w - 1)]:
        if sum(antiDiagonal) > 1:
          return 0

    return 1

n = 12
board = [[0 for i in range(n)] for i in range(n)]
n_queens(board, 0, 0)
```

# Algorithm Analysis

Let $T(N)$ be the runtime for the n-queens algorithm of size $N$. From the code, we can express the runtime complexity recursively

$$
T(N) \approx N*(T(N-1) + O(N^2))
$$

At size $N$, we loop $N$ times, and we then call `n_queens` on the row afterwards, reducing the remaining number of rows to $N-1$. The last term $O(N^2)$ comes from the fact that `isValidBoard` runs in $O(N^2)$ time, checking all $N$ rows and $N$ columns.

Solving the recursive expression,

$$
T(N) = O(N!)
$$
