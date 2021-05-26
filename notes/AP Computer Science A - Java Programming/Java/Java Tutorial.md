# Java Tutorial

All referenced from [Java Tutorial for Beginners [2020]](https://www.youtube.com/watch?v=eIrMbAQSU34)

Variables are ways to store data. They follow the syntax `<type> <name>`

```java
int age = 5;
System.out.println(age);
```

# Primitives

Primitives are a type of variable used to store simple values. References are used to store complex objects. 

| Type    | Bytes |
| ------- | ----- |
| byte    | 1     |
| short   | 2     |
| int     | 4     |
| long    | 8     |
| float   | 4     |
| double  | 8     |
| char    | 2     |
| boolean | 1     |

So, we can replace `int age` with `byte age` since the age is not very big. 

## Long

If we try something like

```java
int viewCount = 123_456_789 // NUMBERS CAN BE PADDED WITH UNDERSCORES
```

And we tried to increase viewCount to 3 billion

```java
int viewCount = 3_123_456_789
```

Java will show an `Integer number too large` error. To change it, you have to do 2 things

1. Change the type of `viewCount` from `int` to `long`
2. End the number with `L` to signify it is a long

## Float

If we tried the following code:

```java
float price = 10.98;
```

We would encounter an incompatible types error, as java sees the number `10.98` as a double rather than a float. By adding `F` behind the number, we convert it into a float

```java
float price = 10.98F;
```

## Char

A char is a single letter

```java
char letter = 'A';
char anotherLetter = 'b';
```

A string is made up of many characters.

```java
string phrase = "Hello world";
string greeting = "Good day";
```

`char`s should be surrounded by single quotes, while `string`s should be surrounded in double quotes

## Booleans

A boolean is either the value `true` or `false`

```java
boolean isEligible = false;
boolean hasError = true;
```

# Reference

Every other type in java is a reference type. For example,

```java
package com.company;

import java.util.Date;

public class Main {

    public static void main(String[] args) {
        Date now = new Date();
        System.out.println(now);
    }
}
```

The `Date` object is a reference, and comes from the `java.util.Date` package, hence we need to import it.

# Primitives vs Reference

We know that primitives are used to store simple values, while references are used to store complex values. However, thanks to properties of primitives vs references, the following codes behave differently

```java
package com.company;

public class Main {

    public static void main(String[] args) {
        byte x = 1;
        byte y = x;

        x = 5;
        System.out.println(y);
    }
}
```

Java allocates 2 separate spots in memory to store these primitives. So, the console logs `5`

```java 
package com.company;

import java.awt.*;

public class Main {

    public static void main(String[] args) {
        Point p1 = new Point(1, 2);
        Point p2 = p1;

        p1.x = 5;
        p1.y = 99;

        System.out.println(p2);
    }
}
```

For `p1`, java first allocates memory for `p1` (let us say, in address 100), and p1 will hold the *address* for that newly created point. And when we write `Point p2 = p1`, we are not copying the actual point, but the address into `p2`. That is why we call these reference types, because they hold a reference to a part of memory.

Hence the console logs `java.awt.Point[x=5,y=99]`

# Strings

```java
String message = new String("Hello world");
```

We don't have to import `java.lang` because it is automatically imported. However, we also get the warning that `new String is redundant`, because there is a faster way to instantiate a string, using 

```java
String message = "Hello world";
```

Although it looks like a primitive type, strings are references.

We can concatenate strings with `+`

```java
String message = "Hello world" + "!";
```

We can view the available methods on strings by typing `message.` and IntelliJ (or your code editor) will show you those methods. For example

```java
String message = "Hello world" + "!";
System.out.println(message.endsWith("!!"));
```

Will return `false`, because the message does not end with `!`.

Other methods include `message.length()` or `message.indexOf(target)`

To include special characters in strings, we use `\`

```java
String msg = "Hello \"world\"";
System.out.println(msg);
```

Will print `Hello "world"`

# Arrays

A list of items.

```java
package com.company;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        int[] numbers = new int[5];
        numbers[0] = 4;
        numbers[1] = 55;
        System.out.println(Arrays.toString(numbers));
    }
}
```

We can initialise the entire array immediately instead using

```java
int[] numbers = { 2, 3, 1, 5, 43 };
```

To access an element of the array, we can use `numbers[0]`, replace 0 with the index of the item you want. Try and see what happens if the index is out of bounds (Trying to get index 100 for an array with only 5 items)

# Multi-dimensional Array

We can create a multi-dimensional array using multiple square brackets

```java
int[][] numbers = new int[2][3];
```

This creates a 2 by 3 array of integers. To access each individual item in the array, we use `numbers[0][0]`, replacing `0` with whatever number you would want.

```java
package com.company;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        int[][] numbers = new int[2][3];
        numbers[1][1] = 55;
        System.out.println(Arrays.deepToString(numbers));
    }
}
```

Note that `deepToString` is used instead of `toString`.

To use the curly braces to instantiate the array, we can do the following:

```java
int[][] numbers = { { 1, 2, 3 }, { 4, 5, 6 } };
```

# Constants

If you do not want a variable to change its value once it is instantiated, we use a constant. We make a constant using the keyword `final`

```java
final float PI = 3.14F;
```

Now, if we tried `PI = 2.71F`, we will get an error

# Arithmetic

```java
int result = 10 + 3 * 5;
```

For division, the division of 2 integers will give an integer. For example,

```java
int result = 10/3;
System.out.println(result); // 3
```

To make the result an actual double, we can do:

```java
double result = (double) 10 / (double) 3;
System.out.println(result); // 3.33333
```

This is called **type-casting**, converts a type from one to another.

To increment, we can use `x++` or `++x`. To decrement, we can use `--x` or `x--`. We can also use `x += 4`

# Challenge

Mortgage calculator

Take in the following inputs from the user

- Principal
- Annual interest rate
- Period (Years)

The mortgage is defined by 

$$
M = P \frac{r (1+r)^N}{(1+r)^N - 1}
$$

Where $P$ is the principal amount, $r$ is the monthly interest rate, $N$ is the number of monthly payments


```java
package com.company;

import java.text.NumberFormat;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        final byte NUMBER_OF_MONTHS = 12;
        final byte PERCENT = 100;
        
        Scanner s = new Scanner(System.in);
        System.out.print("Principal: ");
        int principal = s.nextInt();

        System.out.print("Annual Interest Rate (%): ");
        float monthlyInterestRate = s.nextFloat() / PERCENT / NUMBER_OF_MONTHS;

        System.out.print("Period (Years): ");
        int period = s.nextInt() * 12;

        float mortgage = principal *
                (monthlyInterestRate * (float)Math.pow(1 + monthlyInterestRate, period)) /
                ((float)Math.pow(1 + monthlyInterestRate, period) - 1);
        System.out.println("Mortgage: " + NumberFormat.getCurrencyInstance().format(mortgage));
    }
}
```

# Comparison Operators

To test for equality, we use `==`

```java
int x = 1;
int y = 2;

System.out.println(x == y);
```

We have many comparison operators, such as `>`, `<`, `>=`, `<=` and `==`

# Logical Operators

And uses `&&` and or uses `||`

```java
int temperature = 22;
boolean isWarm = temperature > 20 && temperature < 30;
```

The negation operator is `!`

```java
boolean isWarm = true;
boolean isNotWarm = !isWarm;
```

# If else statements

```java
package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);

        System.out.print("Temperature: ");
        int temp = s.nextInt();
        if (temp > 30) {
            System.out.println("It's a hot day");
        } else if (temp > 20) {
            System.out.println("It's a warm day");
        } else {
            System.out.println("It's a cold day");
        }
    }
}
```

# Ternary 

```java
String className = income > 100 ? "First" : "Second";
```

# Switch

```java
String role = "moderator";

switch (role) {
    case "admin":
        System.out.println("You are an admin");
        break;
    case "moderator":
        System.out.println("You are a moderator");
        break;
    default:
        System.out.println("You are a guest.");
}
```

# Challenge 2: Fizzbuzz

Enter a number. 
- If the number is divisible by 3, print "Fizz"
- If the number is divisible by 5, print "Buzz"
- If the number is divisible by 3 and 5, print "FizzBuzz"
- Else print the number

```java
package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        System.out.println("Enter a number");
        int number = s.nextInt();

        if (number % 3 == 0 && number % 5 != 0) {
            System.out.println("Fizz");
        } else if (number % 5 == 0 && number % 3 != 0) {
            System.out.println("Buzz");
        } else if (number % 5 == 0 && number % 3 == 0) {
            System.out.println("Fizzbuzz");
        } else {
            System.out.println(number);
        }
    }
}

```

# Loops

## For loop

```java
for (int i=0; i<100; i++) {
    System.out.println("The value of i is: " + i);
}
```

# While loops

```java
int i = 10;
while (i > 0) {
    System.out.println("The value of i is: " + i);
    i--;
}
```

```java
package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        String input = "";

        while (!input.equals("quit")) {
            System.out.print("Enter your input: ");
            input = s.nextLine().trim().toLowerCase();
            System.out.println("Input: " + input);
        }
    }
}
```

Usually, we use a for loop if we know how many times we want to loop, and we use a while otherwise.

Note the use of `input.equals(string)` instead. Because a `String` is a reference type, hence saying `input == "quit"` will always evaluate to false, because the 2 strings are stored in different memory locations.

We can also write the top in a do-while loop

```java
package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        String input = "";

        do {
            System.out.print("Enter your input: ");
            input = s.nextLine().trim().toLowerCase();
            System.out.println("Input: " + input);
        } while (!input.equals("quit"));
    }
}
```

A do-while loop executes the loop body once first, before checking the condition to continue

# Breaks and Continues

For the above program, we want to modify it such that the program doesn't echo "quit" after we type in "quit". We can use a `break` to do that. A `break` will immediately exit the loop.

```java
package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        String input = "";

        do {
            System.out.print("Enter your input: ");
            input = s.nextLine().trim().toLowerCase();

            if (input.equals("quit"))
                break;

            System.out.println("Input: " + input);
        } while (!input.equals("quit"));
    }
}
```

The `continue` keyword moves skips the remaining part of the loop, and starts the next iteration of the loop

```java
package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        String input = "";

        do {
            System.out.print("Enter your input: ");
            input = s.nextLine().trim().toLowerCase();

            if (input.equals("pass"))
                continue;

            if (input.equals("quit"))
                break;

            System.out.println("Input: " + input);
        } while (!input.equals("quit"));
    }
}
```

We can further improve the code by seeing that the condition in the while loop is always evaluated to true, hence we can replace the while loop with:

```java
package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        String input = "";

        while (true) {
            System.out.print("Enter your input: ");
            input = s.nextLine().trim().toLowerCase();

            if (input.equals("pass"))
                continue;

            if (input.equals("quit"))
                break;

            System.out.println("Input: " + input);
        }
    }
}
```

# For Each Loop

```java
String[] fruits = { "Apple", "Mango", "Orange" };

for (String fruit : fruits) {
    System.out.println("The current fruit: " + fruit);
}
```