# Practice

1. Declare a new array, `myAry`, that can store 12 integers

```java
public class Practice {
     public static void main(String[] args) {

          /*** TODO: Declare a new array, myAry, that can store 12 integers ***/
          
          for (int i = 0; i < 12; i++) {
               myAry[i] = i % 6;
               System.out.println("myAry[" + i + "] stores " + myAry[i]);
          }
     }
}
```

2. Declare a new array, `monthAry`, that stores the exact values:`{"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"}`

```java
public class Practice {
     public static void main(String[] args) {

          /*** TODO: Declare a new array, monthAry, that stores the exact
                     values: {"Jan","Feb","Mar","Apr","May","Jun","Jul",
                              "Aug","Sep","Oct","Nov","Dec"} ***/
          
          for (int i = 0; i < 12; i++) {
               System.out.println(myAry[i]);
          }
     }
}
```

3. Create a `WordList` class, with a `computeHistogram` method in `WordList` that computes the number of words of each length given as a parameter to the program.

```java
int[] computeHistogram(String[] words) {
     // returns an array. The ith index represents the number of words with length i
}
```

4. Write the header for a for-each loop that iterates through distance using "d" as the temporary variable

```java
public class Practice {
     public static void main(String[] args) {
          double[] distance = {35.3, 17.8, 21.3, 104.0, 55.9, 59.7, 44.3};
          double totalDistance = 0;

          /*** TODO: Write the header for a for-each loop that iterates 
                     through distance using "d" as the temporary variable ***/
          {
               totalDistance += d;
          }

          System.out.println("The total distance was " + totalDistance);
     }
}
```

5. Get the minimum of an array

```java
int[] arr = { 3, 4, 1, 6, 3, 9, 4, 2};
int minimum = arr[0];

for (int value: arr) {
     if (value < minimum) {
          minimum = value;
     }
}
```