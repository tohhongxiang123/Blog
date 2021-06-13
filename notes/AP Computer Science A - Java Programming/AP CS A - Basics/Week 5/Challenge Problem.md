# Challenge Problem

1. Let the user input 2 integers, `x` and `y`. If `x` > `y`, swap the values of `x` and `y`. Then print out the values of `x` and `y`

```java
public Class Swapper {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);

        System.out.println("Please provide 2 integers");
        int x = s.nextInt();
        int y = s.nextInt();

        System.out.println("x = " + x + ", y = " + y);

        if (y < x) {
            int temp = x;
            x = y;
            y = temp;
        }

        System.out.println("x = " + x + ", y = " + y);
    }
}
```

2. Write a program, where the user enters in an integer `test_score`, which ranges from 0-100, and returns the appropriate grade for the score

| Score (Inclusive) | Grade |
| ----------------- | ----- |
| 90-100            | A     |
| 80-89             | B     |
| 70-79             | C     |
| 60-69             | D     |
| 50-59             | E     |
| <= 49             | F     |

```java
class Grader {
    public static void main(String[] args) {
        int test_score = 70;
        char grade;

        if (test_score >= 90) {
            grade = 'A';
        } else if (test_score >= 80) {
            grade = 'B';
        } else if (test_score >= 70) {
            grade = 'C';
        } else if (test_score >= 60) {
            grade = 'D';
        } else if (test_score >= 50) {
            grade = 'E';
        } else {
            grade = 'F';
        }

        System.out.println("Grade is: " + grade);
    }
}
```

3. Write an if statement to serve as the header for the conditional block below. Execute the first block if the floating point outcome of c divided by d is  within the given TOLERANCE of b.
```java
public class Practice {
     public static void main(String[] args) {
          double b = 1.3333;
          int c = 4, d = 3;
          final double TOLERANCE = 0.001;

          /*** TODO: Write an if statement to serve as the header for the conditional block below.
                     Execute the first block if the floating point outcome of c divided by d is 
                      within the given TOLERANCE of b. ***/
          {
               System.out.println("Value within the tolerance level!");
          } else {
               System.out.println("Value outside the tolerance level!");
          }
     }
}
```

4. Write a program that tests whether a year is a leap year.

I. Design a class called `LeapYear` in a file called `LeapYear.java`. This class will hold the main method and the class method that we will write in this assignment.

II. Write an empty `public static void main(String[] args)` method. This method should appear inside the curly braces of the `LeapYear` class. 

III. Write one static class method (`isLeapYear`). The method `isLeapYear` should take one integer argument and will return a boolean. The method should compare the input (a year) with the qualifications for determining whether a given year is a leap year or not, and return the appropriate true or false value on completing these checks. The rule for leap years is as follows: 
- if the year is evenly divisible by 4, it is a leap year, except in the case where it is also evenly divisible by 100 but not evenly divisible by 400. 

Several example method calls appear below.

```java
LeapYear.isLeapYear(2016); // returns true, divisible evenly by 4 

LeapYear.isLeapYear(2015); // returns false, not divisible evenly by 4 

LeapYear.isLeapYear(1900); // returns false,

LeapYear.isLeapYear(2000); // returns true, divisible evenly by 4 and 100, but also by 400
```

IV. Complete the definition for main. Your program should create a new Scanner object, prompt the user to type in a year, and then collect an integer. The main method should then call the static method `isLeapYear` in order to determine whether or not the year in question fits the characteristics of a leap year. From this point, the results of the method call should be used to print a statement that expresses the results. For example, if the user enters 2015 as input: “The year 2015 is not a leap year.”
