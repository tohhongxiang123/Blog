# Example Program

We will write a class with methods, and see how it behaves in an object-oriented matter. In this tutorial, we will write a `Robot` class.

We want the robots to `speak`

```java
public class Robot {
    void speak() {
        System.out.println("The robot is speaking");
    }
}
```

Remember methods are formatted as follows:

```
<ReturnType> <FunctionName>(<Arguments>) {
    // code
}
```

So for our method `speak`, it returns `void` and has 0 arguments

To make our robot actually speak, we need to

1. Instantiate a `Robot` object
2. Call the `speak` method on that specific robot

We shall create a `main` method in which we will do those steps

```java
public class Robot {
    void speak() {
        System.out.println("The robot is speaking");
    }

    public static void main(String[] args) {
        Robot r = new Robot(); // instantiate robot object
        r.speak(); // call method
    }
}
```

# The `static` keyword

`static` is used when the actions that occur in the method is **independent** of the data associated with an instance of the containing class.

# Arguments in methods

Now we would like the robot to not say the same thing everytime we call `speak`. We shall pass what we want the robot to say as an *argument* to the method. It should look like

```java
r.speak("Today is a good day");
```

So, we need to change the method declaration to accept an argument

```java
public class Robot {
    void speak(String message) {
        System.out.println("The robot said: " + message);
    }

    public static void main(String[] args) {
        Robot r = new Robot(); // instantiate robot object
        r.speak("Hello world"); // call method
        r.speak("I am a robot"); // call method
    }
}
```

So, we can see that methods are defined as:

```
<ReturnType> <FunctionName>(<ParameterType> <ParameterName>) {
    // code
}
```

We can also accept multiple parameters, and it would look something like this

```java
int exampleFunction(int x, int y, String z) {
    // code
}
```

# Class Variables

Now we want each to be given a name, and everytime it speaks, it should include the name as well. To give the `Robot` class a variable, we can do the following:

```java
public class Robot {
    String name;

    void speak(String message) {
        System.out.println("The robot said: " + message);
    }
    
    // rest of the code
}
```

Now, we shall edit the `speak` method to include the name of the robot as well

```java
void speak(String message){
    System.out.println(name + ": " + message);
}
```

And now, in `main`, we set the name of the robot

```java
public class Robot {
    String name;
    void speak(String message){
        System.out.println(name + ": " + message);
    }

    public static void main(String[] args) {
        Robot r = new Robot(); // instantiate robot object
        r.name = "John";
        r.speak("Hello world"); // call method
        r.speak("I am a robot"); // call method
    }
}
```

# Constructors

Instead of instantiating the object, and then setting the variable, we can set the variable immediately. We specify the constructor by writing a method with the same name as the class itself. We also do not include the return type.

```java
public class Robot {
    String name;

    Robot() {
        // constructor
    }

    void speak(String message){
        System.out.println(name + ": " + message);
    }

    public static void main(String[] args) {
        Robot r = new Robot(); // instantiate robot object
        r.name = "John";
        r.speak("Hello world"); // call method
        r.speak("I am a robot"); // call method
    }
}
```

The constructor is called everytime we instantiate with `new`. Let us pass the name of the robot through the constructor.

```java
public class Robot {
    String name;

    Robot(String n) {
        // constructor
        name = n;
    }

    void speak(String message){
        System.out.println(name + ": " + message);
    }

    public static void main(String[] args) {
        Robot r = new Robot("John"); // instantiate robot object
        r.speak("Hello world"); // call method
        r.speak("I am a robot"); // call method
    }
}
```

But what if we would like to name the parameter the exact same as the variable? To refer to the variable defined in the class, we use `this.name`

```java
public class Robot {
    String name;

    Robot(String name) {
        // constructor
        this.name = name;
    }

    void speak(String message){
        System.out.println(name + ": " + message);
    }

    public static void main(String[] args) {
        Robot r = new Robot("John"); // instantiate robot object
        r.speak("Hello world"); // call method
        r.speak("I am a robot"); // call method
    }
}
```

`this.<variable>` refers to the variable defined within the class itself. Now let us see multiple robots saying different things:

```java
public class Robot {
    String name;

    Robot(String name) {
        // constructor
        this.name = name;
    }

    void speak(String message){
        System.out.println(name + ": " + message);
    }

    public static void main(String[] args) {
        Robot r = new Robot("John"); // instantiate robot object
        Robot r2 = new Robot("Caitlyn"); // instantiate second robot object
        r.speak("Hello world"); // call method
        r2.speak("Hello it's me");
    }
}
```