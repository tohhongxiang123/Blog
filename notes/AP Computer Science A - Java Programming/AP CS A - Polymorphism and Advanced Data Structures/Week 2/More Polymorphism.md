# Polymorphism Example

Let us create the following:

-   PoliceOfficer
-   Clown
-   Barber

All these should inherit from an abstract class Person.

```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        setName(name);
        setAge(age);
    }

    private void setName(String name) {
        if (name != null) {
            this.name = name;
        }
    }

    private void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }

    public String toString() {
        return this.name;
    }
}
```

We know that all Person objects have a name and age. For something like `precinctNumber`, we would assign that for a `PoliceOfficer` but not a `Clown`, hence we do not put it inside the `Person` class. In general, the superclass should contain all the variables/methods that all the subclasses would inherit, and anything unique for each subclass should be in their own subclass.

Here, we are also using mutators to set our data. Our mutators ensure that our variables will never be invalid (such as setting `name` to `null`, or `age` to -99). And by using these mutators in our constructor, we prevent passing in invalid parameters into the constructor. Another key point is that our mutators are `private` because they will only be used inside `Person`. If our other classes do not use `setAge` and `setName`, there is no reason to expose them for outside usage.

Now, we know that we have all these different professions for a person. We need to ask the following:

> Do we want to instantiate a `Person` object without a profession?

If the answer is no, then we should declare the class `abstract`, since we should not be able to instantiate the `Person` object, but we should be able to instantiate a `PoliceOfficer` or a `Clown`. Hence, we declare

```java
public abstract class Person {
    private String name;
    // more code...
}
```

Now we want a method `act`, which will behave differently based on the profession of the `Person`. The default `Person` has no profession, so now we need to think:

> Do we want a default behavior for `act`?

If there is no default behavior, then we should declare `act` as `abstract` as well, because we will leave it up to the individual professions for the implementation of `act`

```java
public abstract class Person {
    private String name;
    // more code...

    public Person(String name, int age) {
        setName(name);
        setAge(age);
    }

    abstract String act();

    public void setName(String name) {
    // more code...
}
```

So now, the `Person` class looks like this:

```java
public abstract class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        setName(name);
        setAge(age);
    }

    public abstract String act();

    private void setName(String name) {
        if (name != null) {
            this.name = name;
        }
    }

    private void setAge(int age) {
        if (age > 0) {
            this.age = age;
        }
    }

    public String toString() {
        return this.name;
    }
}
```

Now we can write a new `Clown` object which extends `Person`. The `Clown` has an `isScary` variable.

```java
public class Clown extends Person {
    private boolean isScary;

    public Clown(String name, int age, boolean isScary) {
        super(name, age);
        this.isScary = isScary;
    }

    public String act() {
        return "Honk! Honk!";
    }

    public String toString() {
        if (this.isScary) {
            return "Scary clown " + super.toString();
        }
        return "Teeheehee! " + super.toString();
    }
}
```

We can also write a new `PoliceOfficer` class which extends `Person`. Each `PoliceOfficer` has its own `precinctNumber`, which is the location where the `PoliceOfficer` works.

```java
public class PoliceOfficer extends Person {
    private int precinctNumber;

    public PoliceOfficer(String name, int age, int precinctNumber) {
        super(name, age); // remember to pass parameters to superclass
        this.precinctNumber = precinctNumber;
    }

    public String act() { // needs to be implemented since we declared it abstract in Person, and we do not want PoliceOfficer to be abstract
        return makeAnArrest(new Clown("Bubbles", 36, false));
    }

    private String makeAnArrest(Person p) {
        return p + " is under arrest";
    }
}
```

Finally, a `Barber` class:

```java
public class Barber extends Person {
    public Barber(String name, int age) {
        super(name, age);
    }

    public String act() {
        return "Snip snip";
    }
}
```

Now, in our main code:

```java
public class PersonRunner {
    public static void main(String[] args) {
        Person[] people = new Person[4];
        people[0] = new PoliceOfficer("Molly", 22, 123123);
        people[1] = new PoliceOfficer("Caitlyn", 29, 234234);
        people[2] = new Clown("Doink", 56, true);
        people[3] = new Barber("Seville", 123);

        for (Person p: people) {
            System.out.println(p.act());
        }
    }
}
```

This shows the power of polymorphism. Even though the `people` array contains different classes, because all of them have the `act` method, the loop will run correctly.
