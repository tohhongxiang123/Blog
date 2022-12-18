# Java Program Structure

```java
public class Example {
 // code
}
```

Each java file has a single class, and the file name must be the same name as the class name. The example above must be saved as `Example.java`.

Inside a class, we write **methods**, sequences of statements that are run when the method is called upon. To begin, we write our code in the `main` method, which is called automatically to start our java program.

```java
public class Example {
    public static void main(String[] args) {
        // code
    }
}
```

# Blocks and Statements

-   Statement

```java
int x = 10;
int y = x + 8;
System.out.print("Print me!");
```

-   Block

```java
if (x > 10) {
    y = x - 10;
}
```

There are certain keywords in java, which cannot be used to name variables. A few keywords include:

-   abstract
-   assert
-   boolean
-   public
-   throw
-   import

# Comment

A comment looks like this

```java
// single line comment

/* A comment
which spans
multiple lines */
```

They are used to annotate code.

# Whitespace

Whitespace is ignored in Java
