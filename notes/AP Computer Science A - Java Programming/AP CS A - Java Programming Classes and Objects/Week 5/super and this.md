# `super()` and `this()`

- If specified explicitly, calls to `super(...)` or `this(...)` must be the **first** statement in a constructor to ensure proper initialisation by superclass constructors before subclass constructors continue.
- Recall that `this(...)` can be used to call another constructor in the **current** class.
- If you call `this(...)`, you will not call `super()`

```java
public class Mountain {
    private String name;
    private double height;
    private int numOfTrails;

    public Mountain(String name, double height) { // calls the constructor below, used to remove code duplication
        this(name,height,0);
    }

    public Mountain(String name, double height, int numOfTrails) {
        this.name = name;
        this.height = height;
        this.numOfTrails = numOfTrails;
    }

    // other methods not shown
}
```

# Practice

```java
public class A {
     private int a, b, c;

     public A() {
         /*** TODO: Call the parameterized constructor with the values a = 1, b = 2, c = 3 ***/
     }

     public A(int a, int b, int c) {
          this.a = a;
          this.b = b;
          this.c = c;
     }

     public String toString() {
          return "" + a + ", " + b + ", " + c;
     }
}

public class B extends A {
     private int d;

     public B(int a, int b, int c, int d) {
/*** TODO: Call the parameterized A constructor such that a, b, and c
                     are set appropriately ***/
this.d = d;

 }

 public String toString() {
 return super.toString() + ", " + d;
 }
}

public class Practice { public static void main(String[] args) {
 A a1 = new A();
 A a2 = new A(2,20,2018);
 B b = new B(2,4,6,8);
 System.out.println(a1);
 System.out.println(a2);
 System.out.println(b);
 } }
```
