# Classes

# Variables

- Instance variables: non-static fields in a class declaration (`this.value`)
- Class variables: static fields in a class declaration (`static int count`)
- Local variables: variables in a method or block
- Parameters: variables in a method declaration (`float getChange(float givenAmount, float requiredAmount)`)

## Differences between Class and Instance Variables

```java
public class Customer {
    String name;
    static int count;

    public static void main(String[] args) {
        Customer c1 = new Customer();
        Customer c2 = new Customer();

        c1.name = "Alice";
        c2.name = "Bob";

        System.out.println(c1.name); // Alice
        System.out.println(c2.name); // Bob

        c1.count = 1;
        c2.count = 55;

        System.out.println(alice.count); // 55
    }
}
```

`name` is an instance variable. The value of `name` is based on which **instance** it belongs to. However, `count` is a static variable. All objects share this variable `count`, regardless of how many `Customer` objects we create.

# Methods

A parameterised block of code that may return a value. Every method exists inside of some class (cannot be by itself). Useful for:

- Reusability: Reduce redundancy in code
- Readability: Identify logical operation by name (abstraction)
- Modularity: Software developers can code and test independently

## Basic method Syntax

```java
return_type methodName(param_list) {
    statements;
    return_if_needed;
}
```

- `return_type`: type of value to be returned (`void` if no return value)
- `param_list`: list of parameters expected by method (includes types and local name)

## Parameters and Arguments

- Parameters allow a method to work on different data values
- Parameter: a variable local to a method (`sum(x, y)`, `x` and `y` are parameters)
- Argument: an expression that is passed to the corresponding parameter at time of method call (`sum(3, 65)`, `3` and `65` are arguments)
- Arguments values are copied into parameter variables
- Argument values to a method must match the number and types of parameters of the method

## Flow of Control for Method Calls

- Before call: argument values at calling site copied to parameter variables in called method
- Calling method "suspended"
- Called method begins at the top of method body, runs to completion (bottom or return)
- Calling method continues where it left off
- After call: Return value from called method becomes value at calling site

## Call by Value

- Parameter variables are distinct from variables pased in as arguments

```java
void changer(int x) {
    x = 123123;
}

// inside main
int y = 5;
changer(y);

System.out.println(y); // 5
```

Value for `y` is **copied** into `x`. That is why `y` does not change after `changer` is called. Let us look at some examples.

Consider the following code:

```java
public class ObjectReferences {
    int count;

    static void change(ObjectReferences o) {
        o.count = 69420;
    }

    public static void main(String[] args) {
        ObjectReferences a = new ObjectReferences();
        a.count = 55;
        System.out.println(a.count); // 55

        change(a);
        System.out.println(a.count); // 42069
    }
}
```

Firstly, a new object `a` is created, and its count is set to 55

```
a -----> count: 55
```

Then `change` is called. The value of the reference `a` is copied into the parameter `o`

```
a -----> count: 55
     /
o --/
```

Then `o.count = 42069` is called.

```
a -----> count: 42069
     /
o --/
```

So now if we print `a.count`, it is 42069.

For people that have programmed before, consider the following code:

```java
public class Main {
    static void change(String a) {
        a = "Goodbye";
    }

    public static void main(String[] args) {
        String msg = "Hello world";
        change(msg);
        System.out.println(msg);
    }
}
```

Initially:

```
msg ----> "Hello world"
```

When `change` is called, the parameter `a` is passed a copy of the reference from `msg`

```
msg -----> "Hello world"
       /
a ----/
```

When we run the line `a = "Goodbye";`:

```
msg -----> "Hello world"

a -------> "Goodbye"
```

That is why `msg` does not change. **Java does not pass by reference**. In java, **Object references are passed by value**.

# Constructors

- Not exactly a method, but similar
- Callable using `new` operator
- May take parameters
- May access all fields of class (including non-static)
- Main task: Initialise the object being allocated
- Does not explicitly return the value, but the new operator that started it returns a reference to the newly created object

# `this`

- Java reserved word (Variables cannot be named "this")
- used only within a non-static method or constructor
- A reference to the "current object"
- Used to access any field or method (member) of the current object

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
