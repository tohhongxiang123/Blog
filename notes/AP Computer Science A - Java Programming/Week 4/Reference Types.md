# Reference Types

We have looked at primitive types already:
- byte
- short
- int
- long
- float
- double
- boolean
- char

Object (reference) types are different
- They are a collection of primitive data, with methods that can operate on that object
- Created using the `new` keyword and a special function called the **constructor**
- Variable will hold not the values, but a memory location where these values can be found, known as an address

> A primitive variable can be assigned a value, and that value can be stored directly in short-term memory. However, a reference type will never hold a specific value directly, instead holding the address of the information associated with the corresponding object in memory.

```java
Object x = new Object();
System.out.println(x); // java.lang.Object@e9e54c2
```

When the `new` operator is used, the program instructs the machine to establish the required amount of memory, and then provides the location of theis memory. As seen when printing out `x` above, we see the type (`java.lang.Object`) and the location (`e9e54c2`) in hexadecimal. 

Reference types are defined with a class declaration, and a set of values are created with the `new` operator. The set of operations we can perform on these values are defined by the methods we defined within the class.

# String

A pre-implemented type in the Java library

- A sequence of characters length 0 - 2 147 483 647
- Methods include
  - `concat()`
  - `toUpper()`
  - `length`
  - `Substring()`
  - etc.

# Reference Example: Car

```java
public class Car {
    double cost;

    public static void main(String[] args) {
        Car c = new Car();
        c.cost = 123456;
    }
}
```