# Constructor Chaining

-   When constructing an object of a class, it is important that all constructors up the inheritance chain have an opportunity to initialise the object under construction, all the way up to the constructor in the Object class
-   Java enforces constructor chaining by inserting impllicit calls to superclass constructors
-   You can override this by inserting your own calls

# Implicit Chaining

If you do not provide any constructors in a class, Java provides one for you.

```java
public ClassName() {
    super();
}
```

-   The statement `super()` calls the 0-argument constructor in the superclass.

If you do provide a constructor,

-   By default Java inserts the statement `super()` at the beginning to enforce a chain.

# Explicit Chaining

-   You can explicitly call a superclass constructor yourself
-   Useful for passing arguments "up the line" to initialise the object with superclass constructors
-   `super(name, address)`
-   Invokes constructor in `Person` to initialise these fields

# Constructor Complications

-   If the base class has no 0-argument constructors, the derived class constructor **must make an explicit call** with `super(...)` to an available constructor in the base class.
-   If not syntax error will occur.

# Practice

```java
public class Wheel { // implicitly extends Object
    private double radius;

    public Wheel(double radius) {
        // implicit super() called for the Object superclass
        this.radius = radius;
    }
}

public class Tire extends Wheel {
    private double width;

    public Tire(double radius, double width) {
        super(radius); // explicit constructor for Wheel
        this.width = width;
    }
}
```

# Execution Order of Constructors

-   The extended clases constructors will be executed first
-   Member variables executed next
-   Local constructor executed last.
