# Practice

1. Write a method `String reverse(String s)` to reverse a String.

```java
package com.company;

public class Main {
    static String reverse(String s) {
        String reversedString = "";
        for (int i = s.length() - 1; i >=0; i--) {
            reversedString += s.charAt(i);
        }
        return reversedString;
    }

    public static void main(String[] args) {
        System.out.println(reverse("Hello world"));
    }
}

```

There is also an alternative implementation for `reveerse` using `StringBuilder`
```java
public class Main {
    static String reverse(String s) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = s.length() - 1; i >=0; i--) {
            stringBuilder.append(s.charAt(i));
        }
        return stringBuilder.toString();
    }

    public static void main(String[] args) {
        System.out.println(reverse("Hello world"));
    }
}
```

2. Write a for loop that constructs a String using the ASCII characters 'P' through 'U'

```java
public class Practice {
    public static void main(String[] args) {
        String s = "";
        for (int i=80; i <= 85; i++) {
            s += (char)i;
        }

        System.out.println(s);
    }
}
```

3. Write the method `boolean isPalindrome(String s)` to check if `s` is a palindrome (Reads the same from left to right as right to left. "RACECAR" is a palindrome)

```java
package com.company;

public class Main {
    static boolean isPalindrome(String s) {
        for (int i = 0; i < s.length() / 2; i++) {
            if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("abba"));
    }
}
```
Note: You can also use the `reverse` method used before to check whether a string is a palindrome.

```java
static boolean isPalindrome(String s) {
    return s.equals(reverse(s));
}
```

4. Write a method `String convertToBinary(int n)` that converts a positive integer `n` to the binary equivalent, as a String of 0s and 1s

```java
package com.company;

public class Main {
    static String convertToBinary(int n) {
        String result = "";
        while (n > 0) {
            int remainder = n % 2;
            result = remainder + result;
            n = n / 2;
        }

        return result;
    }

    public static void main(String[] args) {
        for (int i = 0; i < 100; i++) {
            System.out.println(i + ": " + convertToBinary(i));
        }
    }
}
```

5. Approximating Logarithms.

```java
public class Practice {
     public static void main(String[] args) {
          float logApprox = 0, x;
          int n = 7;

          // To approximate a log for n, solve n = (1 + x)/(1 - x)
          // Then you can complete the series: 2*(x + x^3/3 + x^5/5 ...)

          x = (float)(n - 1) / (n + 1);

          /*** TODO: Write a for loop from i = 1 to 100, incrementing by 2
                     In each iteration, add the next term of the sequence
                     to approximate the log of x (shown below) ***/
          {
               logApprox += Math.pow(x,i);
          }
          logApprox *= 2;

          System.out.println("The approximate log(" + n + ") = " + logApprox);
     }
}
```

6. Print an n*n table, and print a * if i divides j or j divides i, else print a blank space. For n = 5 it should look like:

```
 *  *  *  *  * 
 *  *     *    
 *     *       
 *  *     *    
 *           * 
```

```java
package com.company;

public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i % j == 0 || j % i == 0) {
                    System.out.print(" * ");
                } else {
                    System.out.print("   ");
                }
            }
            System.out.println();
        }
    }
}
```

7. In this Java programming assignment, you will practice using repetition statements and the String data type to determine which letters appear in a given String and which do not.

I. Design a class called `Alphabet` in a file called `Alphabet.java`. This class will hold the `main` method, and the class methods that we will write in this assignment.

II. Write an empty `public static void main(String[] args)` method. This method should appear inside the curly braces of the `Alphabet` class.

III. Write at least one static class methods (`whatsMissing`). Note, that you may write additional methods to help you solve this problem. The method `whatsMissing` should take one String argument and return a String. The method should examine each character in the input String, and return a String that includes every letter in the alphabet that does not appear in the input String. Several example method calls appear below.

```java
Alphabet.whatsMissing("hello darkness my old friend"); // returns “bcgjpqtuvwxz” 
Alphabet.whatsMissing("abc"); // returns “defghijklmnopqrstuvwxyz”
```

IV. Complete the definition for `main`. Your program should create a new Scanner object, prompt the user to type in a sentence, and then convert every character in that sentence to lowercase. The main method should then call the static method `whatsMissing` in order to determine which letters do not appear in the original String. The results of the method call should be displayed for the user.

For example, if the user enters “hi mom” as input: “The missing letters are: abcdefgjklnpqrstuvwxyz.”