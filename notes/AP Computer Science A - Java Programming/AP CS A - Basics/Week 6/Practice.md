# Practice

1. Write an if statement to serve as the header for the conditional block below. Execute the first block if the length of String s is greater than 0 AND if the last letter of s is the same as the first letter of s.

```java
public class Practice {
    public static void main(String[] args) {
        String s1 = "", s2 = "alacazam", s3 = "abracadabra";
        firstLastCheck(s1);
        firstLastCheck(s2);
        firstLastCheck(s3);
    }
    public static void firstLastCheck(String s) {
        /*** TODO: Write an if statement to serve as the header for the conditional block below.
         Execute the first block if the length of String s is greater than 0 AND
         if the last letter of s is the same as the first letter of s. ***/
        {
            System.out.println(s + ": Same start and finish letter!");
        }
    }
}
```

### Solution:

```java
if (s.length() > 0 && s.charAt(s.length() - 1) == s.charAt(0)) {
    // ...
}
```

2. Write a method that returns the name of a month given the month number (1 == "January")

```java
String monthToString(int month)
```

Write a method that returns the number of days in a given month from a given year

```java
int daysInMonth(int month, int year)
```

3. Append an "s" to the end of the word "pizza" if I have 0 pizzas, or more than 1 pizza.

```java
public class Practice {
     public static void main(String[] args) {
          howManyPizzas(1);
          howManyPizzas(10);
          howManyPizzas(0);
     }
     public static void howManyPizzas(int pizzas) {
          String plural = "";
          /*** TODO: Write a ternary statement that assigns the value 's' to plural if
                      the number of pizzas is not 1. **/
          System.out.println("I have " + pizzas + " pizza" + plural + ".");
     }
}
```
