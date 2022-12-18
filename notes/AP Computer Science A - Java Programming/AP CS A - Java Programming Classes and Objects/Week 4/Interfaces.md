# Interfaces

-   We want to model a supermarket cart
-   Bought bananas, eggs, water

-   Each has price
-   Each modeled as a class

-   We need a `getTotal` method. What is its argument type?
-   We shouldn't have 3 different argument types because it will not scale. If there are 50 types of items, it is very tedious to write them all.

An interface is

-   A point where 2 systems interact
-   Typically asymmetric: one system "defines" the interface, the other system uses it
-   Examples
    -   Graphical User Interface (GUI): User -> Computer
    -   Application Programming Interface (API): Application program -> library of related methods

# Java Class

-   Java class provides one form of an interface
-   Public members (methods) define the interface to "clients" (users) of that class
-   Class interfaces consists of
    -   Public method signatures (What the method expects)
    -   Method return types (What the method returns)
-   Java abstracts this idea one step further

A java interface can be used as a type!

-   Defines a "contract" between
    -   Class that implements the interface
    -   Class that uses the interface
-   Any class that implements the interface must probide implementations for all the method bodies given in the interface definition

# Interface Syntax

-   A class like declaration
    -   `interface Doable {...}`
    -   Exists in own file
    -   Includes method declarations
-   But

    -   No method bodies
    -   No fields (Except constants)
    -   No static methods

-   Classes may declare that they "implement" an interface
-   Given interface `Doable` and a class `Henway` can implement it:

```
public class Henway implements Doable {
    ...
}
```

-   All methods declared in `Doable` must appear in `Henway`
-   `Henway` may also implement methods that are not found in `Doable`, but must **at least implement all methods declared within `Doable`**

# Interface Variables

-   It is possible and useful to declare variables of an interface type `Doable b;`
-   Interface variables can hold a reference to any object that implements the interface

```java
interface Doable {
    int compute(int x);
    void doit(int y);
}

class Henway implements Doable {
    public int compute(int x) {
        return x + 1;
    }

    public void doit(int y) {
        System.out.println(y);
    }
}
```

-   Sometimes the class does not need to implement all methods in the interface, so we can leave the method body in the class blank. This counts as an implementation of the method.

```java
interface Doable {
    int compute(int x);
    void doit(int y);
}

class Henway implements Doable {
    public int compute(int x) {
        return x + 1;
    }

    public void doit(int y) {}
}
```

# Example - priceable

We have a supermarket cart with the following items

-   Bananas
-   Eggs
-   Water

Each type of item is implemented as a different class. The pricing calculated for each item is different too.

```java
interface Priceable {
    double getPrice();
}

public class Eggs implements Priceable {
    public static final double PRICE_PER_DOZEN_LARGE = 1.5;
    public static final double PRICE_PER_DOZEN_EXTRA_LARGE = 1.75;
    private int dozens;
    private boolean extraLarge;

    public Eggs(int dozens, boolean extraLarge) {...}

    public double getPrice() {
        if (extraLarge) {
            return dozens * PRICE_PER_DOZEN_EXTRA_LARGE;
        } else {
            return dozens * PRICE_PER_DOZEN_LARGE;
        }
    }
}

public class Bananas implements Priceable {
    public static final double PRICE_PER_POUND = 0.49;
    private double weight;

    public Bananas(double weight) {
        this.weight = weight;
    }

    public double getPrice() {
        return weight * PRICE_PER_POUND;
    }
}

public class Water implements Priceable {
    public static final double PRICE_PER_GALLON = 0.99;
    private int gallons;

    public Water(int gallons) {
        this.gallons = gallons;
    }

    public double getPrice() {
        rreturn gallons * PRICE_PER_GALLON;
    }
}

public class Register {
    public double getTotal(Priceable[] cart) {
        double total = 0.0;
        for (int i = 0; i < cart.length; i++) {
            total += cart[i].getPrice();
        }

        return total;
    }

    public static void main(String[] args) {
        Priceable[] mycart = new Priceable[3];
        mycart[0] = new Bananas(5);
        mycart[1] = new Eggs(1, false);
        mycart[2] = new Water(4);

        Register r = new Register();
        System.out.println(r.getTotal(mycart))
    }
}
```

By having the cart items all implement `Priceable`, this means that they all are guaranteed to be able to call `getPrice` on them, even though all classes may have a different implementation of `getPrice`.

### Note

`Priceable[] mycart = new Priceable[3]` does not create objects. It just creates an array which allows `Priceable` items to be stored

`Priceable p;` is also allowed, but `Priceable p = new Priceable()` is not allowed. **We cannot instantiate interfaces**. We cannot create objects through interfaces.

# Fields in Interfaces

-   An interface may include fields as well
-   Fields are implicitly declared as `public static final`
-   Fields in interfaces are constants and must be declared with initialiser (=)
-   Methods are implicitly declared public

```java
interface Constants {
    double X = 1234.56; // we do not have to explictly write "public static final", it is implicitly included
    int Y = -1;
    String Z = "HEllo world";
}

public class Booyah implements Constants {
    public static void main(String[] args) {
        System.out.println(X);
        System.out.println(Y);
        System.out.println(Z);
    }
}
```

Note how we did not have to write down `public static final`. They are implicitly there.

Another note: If we were to change the value of one of the constants within the interface, and then compile, java will recompile all classes that implement the interface

# Implementing Multiple Interfaces

-   A class can implement multiple interfaces
-   The methods implemented are the **union** of the methods specified in the interfaces

```
class SoapOpera implements Cryable {...}
class SitCom implements Laughable {...}
class Movie implements Laughable, Cryable {...}
```

-   `SoapOpera` has to implement all methods in `Cryable`
-   `Sitcom` has to implement all methods in `Laughable`
-   `Movie` has to implement all methods in `Laughable` and `Cryable`

What happens if a class implements 2 interfaces that contain the same signature but different return types?

```java
interface A {
    double doSomething(int a);
}

interface B {
    String doSomething(int b);
}

class MyClass implements A, B {
    ...
}
```

Answer: There will be a compile time error: We cannot have 2 methods in a class with the same signature but different return types.

# Example: Fibonacci Generator

-   Write a program to generate the Fibonacci sequence
-   Each value is the sum of 2 previous values
-   1, 1, 2, 3, 5, 8, 13, 21
-   Constructor takes in an `int n` that specifies the (finite) number of values to generate
-   Fibonacci object provides `hasNext()` and `next()` methods to generate the values (Note the similarities to `Scanner`)

```java
public class Fibonacci1 {
    private int n;
    private int i;

    private int f1;
    private int f2;


    public Fibonacci1(int n) {
        this.n = n;
        this.i = 0;
        f1 = f2 = 1;
    }

    public boolean hasNext() {
        return (i < n);
    }

    public int next() {
        if (i == 0 || i == 1) {
            i++;
            return 1;
        }

        int result = f1 + f2;
        f1 = f2;
        f2 = t;
        i++;
        return t;
    }

    public static void main(String[] args) {
        Fibonacci1 f = new Fibonacci1(25);
        while (f.hasNext()) {
            System.out.printf("%d ", f.next());
        }
        System.out.println("\n");
    }
}
```

# Fibonacci with Iterator

We will now define 2 interfaces `Iterator` and `Iterable` to be able to generate the fibonacci sequence

```java
interface Iterator<T> {
    boolean hasNext();
    T next();
}

interface Iterable<T> {
    Iterator<T> iterator();
}
```

`Iterator` is found under `java.util`, while `Iterable` is under `java.lang`, which is already imported by default. Documentation for [iterable](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html) and [iterator](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html)

Note: The `for each` loop uses the `Iterable` interface

```
for (Tree t: list) {...}
```

-   The list must implement the `Iterable` interface
-   Must have a method that returns an `Iterator` over elements of the collection

Now we can rewrite `Fibonacci2`

```java
import java.util.Iterator;

public class FibonacciGenerator implements Iterator<Integer> {
    private int n;
    private int i = 0;
    private int f1 = 1;
    private int f2 = 1;

    FibonacciGenerator(int n) {
        this.n = n;
    }

    public boolean hasNext() {
        return this.i < this.n;
    }

    public Integer next() {
        if (i == 0 || i == 1) {
            i++;
            return 1;
        }

        int t = f1 + f2;
        f1 = f2;
        f2 = t;
        i++;

        return t;
    }

    public static void main(String[] args) {
        FibonacciGenerator i1 = new FibonacciGenerator(5);
        while (i1.hasNext()) {
            System.out.println(i1.next());
        }
    }
}
```

Now we will implement the `Iterable` interface as well

```java
import java.util.Iterator;

public class FibonacciGenerator implements Iterator<Integer>, Iterable<Integer> {
    private int n;
    private int i = 0;
    private int f1 = 1;
    private int f2 = 1;

    FibonacciGenerator(int n) {
        this.n = n;
    }

    public boolean hasNext() {
        return this.i < this.n;
    }

    public Integer next() {
        if (i == 0 || i == 1) {
            i++;
            return 1;
        }

        int t = f1 + f2;
        f1 = f2;
        f2 = t;
        i++;

        return t;
    }

    public Iterator<Integer> iterator() {
        return this;
    }

    public static void main(String[] args) {
        FibonacciGenerator i1 = new FibonacciGenerator(5);
        while (i1.hasNext()) {
            System.out.println(i1.next());
        }

        FibonacciGenerator i2 = new FibonacciGenerator(30);
        for (int i : i2) {
            System.out.println(i);
        }
    }
}
```

# Comparable Interface

-   Allows consistent approach for comparing 2 objects
-   Has one method used to report on comparison between 2 (equality, greater than or less than)
-   Has added bonus of providing functionality with regards to the sort function of list types

```java
interface Comparable<T> {
    int compareTo(T o);
}
```

-   Returns 0 if equal
-   1 if caller is greater than argument
-   -1 if caller is less than argument

```java
public class KarateKid implements Comparable<KarateKid> {
    private static final String[] belts = {"white", "yellow", "orange", "green", "blue", "purple", "red", "brown", "black"};
    private int belt;
    private String name;

    public KarateKid(String name) {
        this.name = name;
        this.belt = 0;
    }

    public void promote() {
        if (belt < 8) {
            belt++;
        }
    }

    public String toString() {
        return belts[belt] + " belt " + this.name;
    }

    public int compareTo(KarateKid k) {
        if (this.belt > k.belt) return 1;
        if (this.belt < k.belt) return -1;
        return 0;
    }

    public static void main(String[] args) {
        KarateKid k1 = new KarateKid("Daniel");
        KarateKid k2 = new KarateKid("Johnny");

        for (int x = 0; x < 6; x++) {
            k2.promote();
        }

        System.out.println(k1);
        System.out.println(k2);
    }
}
```

# Summary

-   An interface declaration looks like a class declaration except
    -   Methods have no bodies (**abstract**)
    -   All fields are implicitly `public static final`
-   Classes that implement an interface
    -   Must provide the method bodies declared
    -   Get access to the fields declared
-   Interface variables allow methods to access "interface methods" of an object without knowing the actual class of the object
