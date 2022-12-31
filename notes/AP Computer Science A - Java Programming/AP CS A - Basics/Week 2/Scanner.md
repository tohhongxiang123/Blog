# Scanner

The Scanner class is used to collect input from the keyboard (and can be used to read other streams of data, such as files). To instantiate the Scanner class,

```java
Scanner s = new Scanner(System.in);

int i = s.nextInt(); // reads an integer
double d = s.nextDouble(); // reads a double
String t = s.nextLine(); // reads a line as a string
```

# Example Program - Wheel

We want the user to give us the radius of a wheel, and we will print back the circumference and area of the wheel to the user.

```java
import java.util.Scanner;

public class Wheel {
    double radius;

    Wheel(double radius) {
        this.radius = radius;
    }

    double getCircumference() {
        return 2 * Math.PI * radius;
    }

    double getArea() {
        return radius * radius * Math.PI;
    }

    public static void main(String[] args) {
        System.out.println("Enter a real number");
        Scanner s = new Scanner(System.in);

        double radius = s.nextDouble();
        Wheel w = new Wheel(radius);

        System.out.println("The circumference of the wheel is: " + w.getCircumference());
        System.out.println("The area of the wheel is: " + w.getArea());
    }
}
```

# Project 1: All About Me

Practise developing your own class with the following challenge

1. Design a class called `AboutMe` in a file called `AboutMe.java`. This class will hold the main method, and class methods that we will write
2. Write an empty `public static void main(String[] args)` method within the class
3. Write 3 class methods: `myName`, `mySchool`, `myAge`. Each method should return the appropriate type of information
4. Complete the definition for main. Your program should
   1. Greet the user
   2. Create an `AboutMe` object
   3. Print out the following statement, replacing the bolded words with the values returned from the methods you wrote for `myName`, `mySchool`, `myAge`.

"My name is **Phil**, and I attend **Some University**. I am **5** years old."
