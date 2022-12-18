# Practice

1. Write a `while` loop that runs until `x` is 6

```java
public class Practice {
     public static void main(String[] args) {
          int x = 0, howMuch = 0;

          /*** TODO: Write a while loop that runs until x is 6 ***/
          {
               howMuch = howMuch + x;
               x++;
          }
          System.out.println("The final value of x is " + x + " and howMuch is " + howMuch);
     }
}
```

2. Write a program that reads integers from standard input; for each integer print a message indicating "even" or "odd". Stop reading when no more integers (hint: `hasNextInt()` from `Scanner` class)

```java
public class Main {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);

        while (s.hasNextInt()) {
            int input = s.nextInt();
            if (input % 2 == 0) {
                System.out.println("Even");
            } else {
                System.out.println("Odd");
            }
        }

        System.out.println("End");
    }
}
```

3. We'll say that a String is xy-balanced if for all the 'x' chars in the string, there exists a 'y' char somewhere later in the string. So "xxy" is balanced, but "xyx" is not. One 'y' can balance multiple 'x's. Return true if the given string is xy-balanced.

```java
xyBalance("aaxbby") == true
xyBalance("aaxbb") == false
xyBalance("yaaxbb") == false
```

4. In this Java programming assignment, you will practice using repetition structures in order to determine whether a given number is prime, or composite.

I. Design a class called `Prime` in a file called `Prime.java`. This class will hold the main method, and the class method that we will write in this assignment.

II. Write an empty `public static void main(String[] args)` method. This method should appear inside the curly braces of the `Prime` class.

III. Write one static class method (`isPrime`). The method `isPrime` should take one integer argument and will return a boolean. The method should loop through all possible factors of the input, and test each to see if an integer is indeed a factor of the input. If a number divides the input evenly, the function should return false. If it checks every possible factor and does not find one that divides it evenly, the function should return true. Several example method calls appear below.

```java
Prime.isPrime(5); // returns true
Prime.isPrime(12); // return false
Prime.isPrime(43); // return true
```

IV. Complete the definition for `main`. Your program should create a new `Scanner` object, prompt the user to type in a positive integer, and then collect a value. The main method should then call the static method `isPrime` in order to determine whether or not the number in question is prime or composite. From this point, the results of the method call should be used to print a statement that expresses the results. For example, if the user enters 81 as input:

“The number 81 is not prime.”
