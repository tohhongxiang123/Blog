# Casting

Expressions are built by combining

-   variables (x, y) and literals (3, 27, 'a') with
-   operators (+, - etc)

Usual mathematical precedence

-   Multiplication and division
-   Addition and subtraction
-   `double y = 5.0 / 1.0 + 2.0 * 3.0`, `y = 11.0`

What happens if we mix types? (Adding shorts to longs, doubles to ints). We have to _cast_, convert from one type to another. There are 2 types of casting

-   Upcast: from "narrower" to "wider" (more bits)
    -   short to int
    -   float to double
    -   int to double
-   Downcast: from "wider" to "narrower" (fewer bits)
    -   int to short
    -   double to float
    -   double to int

**Java is usually able to upcast automatically**, but not downcast. To manually cast, we have to do the following

```java
int a = 4;
long b = 5l;

b = a; // no error
a = b; // compiler error
a = (int)b; // casting
```

# Challenge

Write a program that divides `x` by `y` and stores it in `z` without losing precision (thanks to integer division)

```java
public class Practice {
     public static void main(String[] args) {
          int x = 6, y = 10;
          float z;

          /*** TODO: Write an expression that calculates x divided by y and stores the result
                     in z without losing precision ***/

          System.out.println("The result of " + x + " / " + y + " is " + z);
     }
}
```

Note:

```java
double a = (double) 5 / 2; // 5 / 2 = 5.0 / 2 (manual cast to double) = 5.0 / 2.0 (automatic upcast from int to double) = 2.5
double b = (double) (5/2); // 5 / 2 = 2 (integer division) = 2.0 (manual cast to double)
```
