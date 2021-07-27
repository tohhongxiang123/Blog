# Statically Bound Fields

- Suppose both `Animal` and `Dog` have a field `name`
- `Dog d = new Dog();`
- `d.name` is the field in `Dog`
- `Animal a = d;`
- `a.name` is the field in `Animal`
- Unlike methods, fields are **statically bound** (Methods are **dynamically bound**)
- Determined at compile time, not at runtime
- We are not recommended to have the same name and type of a field in a derived class and a parent class

Reminder: A subclass contains its fields as well as all the fields defined in the superclass. But since the subclass and superclass have a variable of the same name and type, the subclass's variable **hides** the superclass variable. 

```java
public abstract class Animal {
    String name;
    abstract void speak();
}

public class Dog extends Animal {
    String name = "Snoopy";

    void speak() {
        System.out.println("Bark");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        System.out.println(d.name); // Snoopy

        Animal a = d;
        System.out.println(a.name); // null
    }
}
```

`System.out.println(d.name);` will show `Snoopy` because `Dog` has a field `name`. However `System.out.println(a.name);` will print `null` because `Animal` has not initialised the `name` field.

Suppose now we want to be able to initialise the name of the Animal in whatever derived class we use. We can actually give the abstract class `Animal` a constructor (and even make it public) to have `Animal` receive a name

```java
abstract class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    abstract void speak();
}

class Dog extends Animal {
    // note how we removed name here
    // if we wanted to keep name here and access Animal's name, then you must use super
    
    Dog(String name) {
        super(name); // required to add because Animal has no non-default constructor
    }

    void speak() {
        System.out.println("Bark");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Snoopy");
        System.out.println(d.name); // Snoopy

        Animal a = d;
        System.out.println(a.name); // Snoopy
    }
}
```
*Remember now that we have a non-default constructor, we need to call `super` in the subclass*
