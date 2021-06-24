# Practice

1. Write the declaration for a 4x6 2-dimensional array of integers, mtrx
```java
public class Practice {
     public static void main(String[] args) {
          /*** TODO: Write the declaration for a 4x6 2-dimensional array of integers, mtrx ***/

          mtrx[0][0] = 15;
          mtrx[3][5] = 45;

          System.out.println("The first row, first column entry is " + mtrx[0][0]);
          System.out.println("The last row, last column entry is " + mtrx[3][5]);
     }
}
```

2. Given a 2D array and a coordinate, find the number of neighbors of that coordinate. A neighbor is an element which is `true`
```java
public class Practice {
     public static void main(String[] args) {
          boolean[][] nbrs = {{true,false,false,true},
                             {false,false,true,true},
                             {true,true,false,true},
                             {false,true,false,false}};

          System.out.println(howManyNeighbors(nbrs,0,2)); // 3
          System.out.println(howManyNeighbors(nbrs,1,1)); // 4
          System.out.println(howManyNeighbors(nbrs,3,3)); // 1
     }

     public static int howManyNeighbors(boolean[][] n, int row, int col) {
          int startR, startC, endR, endC;
          int numNbrs = 0;

          /*** TODO: Set the values of startR, startC, endR, and endC to include the row 
                     above and below the given input row, and the column above and below
                     the given input col, checking and adjusting for invalid array indices ***/
          
          for (int r = startR; r <= endR; r++)
          {
               for (int c = startC; c <= endC; c++)
               {
                    /*** TODO: Check the current array position, and if it is (1) true, and
                               (2) not the input row and col, execute the following block ***/
                    {
                         numNbrs++;
                    }
               }
          }
          return numNbrs;
     }
}
```