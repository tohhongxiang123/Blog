# Object Class

```java
public class SomeClass {
    int x = 2;

    public static void main(String[] args) {
        SomeClass s1 = new SomeClass();
        System.out.println(s1.toString());
    }
}
```

But we never defined `toString`. Where does it come from?

This is because all classes extend the `Object` class. Every class has `Object` as a superclass. All objects including arrays implement the methods of this class.

-   Any class that does not extend another class implicitly extends the `Object` class.
-   A class can only extend one other class (but can implement multiple interfaces)
-   Java is a "single inheritance" system.

# Subclass Object

-   Contains its fields as well as all the fields defined in the superclasses

# Object Class Methods

-   `clone()` - makes a copy of the object
-   `equals(Object e)` - compares for equality
-   `toString()` - Return String representation of the object

# Practice

```java
/*** TODO: Write a header for the Pizza class which inherits from Object ***/
{
     private String[] toppings;

     public Pizza(String a, String b, String c) {
          toppings = new String[3];
          toppings[0] = a;
          toppings[1] = b;
          toppings[2] = c;
     }

     /*** TODO: Write the toString method header to override the Object class toString method ***/
     {
          String s = "Pizza with ";
          for (String t : toppings) {s = s + t + " ";}
          return s;
     }
}

public class Practice {
     public static void main(String[] args) {
          Pizza p = new Pizza("Pepperoni","Mushrooms","Sausage");
          System.out.println(p);
     }
}
```
