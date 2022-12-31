# Practice

1. Write the recursive function `int collatz(int n)`, printing the collatz sequence for positive integers `n`, which is defined as the following sequence
   - If `n` is even, the next term will be `n/2`
   - If `n` is odd, the next term is `3n + 1`
   - Terminate if `n == 1`

For example, if `n == 10`, the following sequence will be printed out:

```
10
5
16
8
4
2
1
```

```java
public class Main {
    static int collatz(int n) {
        System.out.println(n);
        if (n == 1) {
            return 1;
        }

        if (n % 2 == 0){
            return collatz(n / 2);
        } else {
            return collatz(3*n + 1);
        }
    }


    public static void main(String[] args) {
        collatz(10);
    }
}
```

2. Write the recursive function `gcd(a, b)`, where given 2 positive integers `a` and `b`, returns the greatest common divisor between `a` and `b`
   - If `a` evenly divides `b`, return `b`
   - Else, return `gcd(b, a % b)`

```java
public class Main {
    static int gcd(int a, int b) {
        if (a % b == 0) {
            return b;
        }

        return gcd(b, a % b);
    }


    public static void main(String[] args) {
        System.out.println(gcd(15, 25));
    }
}
```

3. Write a recursive function `palindrome(String s)` which tests whether `s` is a palindrome - Spelt the same backwards and forwards

```java
public class Main {
    static boolean isPalindrome(String s) {
        if (s == null || s.length() <= 1) {
            return true;
        }

        if (s.charAt(0) != s.charAt(s.length() - 1)) {
            return false;
        }

        return isPalindrome(s.substring(1, s.length() - 1));
    }


    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));
    }
}

```
