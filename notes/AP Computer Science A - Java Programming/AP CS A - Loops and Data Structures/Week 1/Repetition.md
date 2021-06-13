# Repetition

Repetition can be used to
- Perform the same operation on different data
- Accumulate information over a set of data

Repetition is broken down into 2 parts
1. Body of the code that gets repeatedly executed
2. Condition (boolean) to determine when to stop

How do we construct the body so that it does something different/useful each time it is run?

There are 2 forms of iterations
1. Indefinite: loop until "done"; no advance knowledge of how many iterations will be required
2. Definite: loop a given number of times; used when the iteration are controlled by a counter/size/limit

Java Repetition Constructs
- `while`
- `do-while`
- `for`

# `while` loop

```java
while (condition) {
    // statements;
}
```

1. Test boolean expression first
2. If true, do statements in body
3. Repeat from 1

# `do-while` loop

```java
do {
    // statements;
} while (condition)
```

1. Do the statements in body
2. Test boolean expression
3. If true, repeat from 1. Else, exit loop

Statements are executed **at least once**.

# `for` loop

```java
for (initialConditon; conditionToCheck; increment) {
    // statements
}
```

1. Evaluate expression `initialCondition` (once only)
2. Evaluate `condition`. If true, execute statements. Else, exit loop
3. Evaluate `increment` expression
4. Return to 2

# Example Programs

> Write a program that reads integers from standard input; for each integer print a message indicating "even" or "odd". Stop reading when no more integers.

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

Note that the `Scanner` is initialised outside the loop. Because we do not need to keep recreating the scanner.

> Write a program that reads a sequence of integers from the standard input and compute their sum. Also count the number of values read

```java
public class Main {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int sum = 0;
        int count = 0;

        while (s.hasNextInt()) {
            int input = s.nextInt();
            sum += input;
            count++;
        }

        System.out.println("Sum: " + sum);
        System.out.println("Count: " + count);
    }
}
```

Note how `sum` and `count` are initialised outside the loop, and how we keep accumulate it inside the loop using `sum += input` and `count++`

> Write a program that prompts the user for an even number. Continue prompting until an even number is provided, then end

```java
public class Main {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int input;

        do {
            input = s.nextInt();
        } while (input % 2 != 0);

        System.out.println("Input: " + input);
    }
}
```

> Write a program that prints "Hello" 100 times

```java
public class Main {
    public static void main(String[] args) {
        for (int i=0; i<100; i++) {
            System.out.println("Hello");
        }
    }
}
```
