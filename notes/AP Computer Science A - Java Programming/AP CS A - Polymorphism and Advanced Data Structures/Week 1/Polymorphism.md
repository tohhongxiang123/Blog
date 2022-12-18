# Polymorphism

-   Many forms
-   Animals can take on many forms, yet implement consistent behaviors
-   Java allows a superclass variable contain a reference to a subclass object
-   `account.withdraw(amount)` could be `SavingsAccount`, `CheckingAccount`, `MoneyMarketAccount`
    -   When we invoke a withdrawal, 2 things happen
    -   Compiler checks whether `withdraw` is a method declared inside the superclass inside the `account` class at compile time
    -   JVM chooses the subclass implementation of any overridden methods at run time
    -   "Dynamic call" or "virtual method call"

# Why Polymorphism?

-   Allows generic treatment of objects
-   An array of `Animal`s
    -   Some are `Dog`s
    -   Some are `Cat`s
    -   Some are new animal classes defined after the referencing code is written
-   Programmer must be disciplined: the overridden methods should implement "consistent" or "expected" behavior
-   Example: In Java, all GUI widgets are a subclass of `Component`; allows uniform treatment by GUI code

# Polymorphism Examples

```java
public class Parent {
    public void f() {
        System.out.println("in parent f()");
    }

    public static void main(String[] args) {
        Parent p = new Derived(); // type can be of any superclass
        p.f();
    }
}

public Derived extends Parent {
    public void f() {
        System.out.println("In derived f()");
    }

    public void g() {
        System.out.println("In derived g()");
    }
}
```

Will the `f` in `Parent` or the `f` in `Derived` be executed?

# Dynamic Binding

-   Methods are selected at runtime based on the **class of the object referenced**, not the class of the variable that holds the object reference.

```java
Parent p = new Derived();
p.f()
```

-   This calls `f()` in `Derived`, even though variable is of type `Parent`. Hence it will output `"In derived f()"`

Note that `g` is in `Derived` but not `Parent`. Will `p.g()` give an error?

-   `p.g()` will give an error. Although dynamic binding will tell us that `p.f()` will be run from the `Derived` class
-   If a superclass variable holds a subclass object reference, you still cannot reference the subclass methods not declared in the superclass

```java
Parent p = new Derived();
```

-   `p` is a `Parent` variable which holds a reference to the subclass `Derived`. But JVM will still statically analyse `p` with class `Parent` and since `g` is not defined within `Parent`, it will give an error.
-   We must **cast** to the subclass first, then reference
-   Cast will give an error if the object is not of the right class

```java
Parent p = new Derived();
((Derived) p).g();
```

# Glitch: Inheritance

-   Reminder: private methods are not inherited
-   Hence, private methods cannot be overridden
-   Polymorphism only invokes subclass methods that are overridden

Consider the following:

```java
class Parent {
    private void f() {
        System.out.println("In parent f");
    }

    public static void main(String[] args) {
        Parent p = new Derived();
        p.f();
    }
}

class Derived extends Parent {
    void f() {
        System.out.println("In derived f");
    }

    void g() {
        System.out.println("In derived g");
    }
}
```

Will this compile and run?And if it does run, what does it display?

-   It will compile and run, because we are still inside the same class `Parent`, hence we still have access to `f` (), hence `p.f()` will still run
-   However, this time it will run `f` from the `Parent` class instead, because the derived class is not overriding `f`.
-   The derived class cannot see the private method `f` of `Parent` to override it
-   `f` inside `Parent` and `f` inside `Derived` are **2 different methods**

Consider the following code

```java
public class Main {
    public static void main(String[] args) {
        Object o = "I would like to take a nap.";
        System.out.println(o.substring(17));
    }
}
```

`String` is a subclass of `Object`. But since `Object` does not have a `substring` method, this will cause a compile time error.

# Practice - Polymorphism

```java
public class A {
     private int x;
     private char c;

     public A(int x, char c) {
          this.x = x;
          this.c = c;
     }

     public int getX() {return x;}
     public char getC() {return c;}

     public String toString() {return "Parent Class, " + x;}
}

public class B extends A {
     public B(int x) {super(x + x,'B');}

     public String toString() {
          return "Child Class " + getC() + ", " + getX();
     }
}

public class C extends A {
     public C() {super(3,'C');}

     public String toString() {
          return "Different Child Class " + getC() + ", 3";
     }
}

public class Practice {
     public static void main(String[] args) {
          /*** TODO: Create a new A object with inputs 1 and 'A'
                     and store it in an A reference, aa ***/
          /*** TODO: Create a new B object with input 2
                     and store it in an A reference, ab ***/
          /*** TODO: Create a new B object with input 2
                     and store it in a B reference, bb ***/
          /*** TODO: Create a new C object and store it in an A
                     reference, ac ***/
          System.out.println(aa);
          System.out.println(ab);
          System.out.println(bb);
          System.out.println(ac);
     }
}
```
