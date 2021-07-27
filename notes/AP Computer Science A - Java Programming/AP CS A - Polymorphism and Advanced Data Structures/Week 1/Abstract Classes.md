# Abstract Classes

Suppose you are modelling animals
- Dog
- Cat
- Fish
- Horse

Lots of redundancy, so you create a superclass to inherit from
- Animal
- All other subclasses extend Animal
- But what does `new Animal()` mean?
- Nothing -- we do not want to create a generic `Animal` class

Solution: Abstract Classes

- Declaring a class `abstract` means that it **cannot be instantiated**
- Some methods may be unimplemented (just like an interface)
- But abstract classes may also include some implemented methods for default behavior

```java
public abstract class Animal {
    abstract void speak();
    public static void main(String[] args) {
        // ...
    }
}
```

`Animal` cannot be instantiated because it is `abstract`. We would like all animals to have a `speak` method, but we leave it `abstract` without implementation because we leave it up to the individual animals to implement `speak`.


```java
public class Dog extends Animal {
    void speak() {
        System.out.println("Bark");
    }
}

public class Cat extends Animal {
    void speak() {
        System.out.println("Meow");
    }
}
```

We use `Dog` and `Cat` to extend `Animal`, and also since they are not `abstract`, we need to provide an actual implementation for `speak`. If `Dog` and `Cat` were abstract, we would not need to provide method bodies for all the abstract methods inside `Animal`. 

```java
public abstract class Animal {
    abstract void speak();
    public static void main(String[] args) {
        Animal[] animals = new Animal[2];

        animals[0] = new Cat();
        animals[1] = new Dog();

        for (int i = 0; i < animals.length; i++) {
            animals[i].speak();
        }
    }
}
```

# Reminder: Is-A Relationship
- The relationship of a subclass to the superclass should be "is-a"
  - `Cat` is a `Animal`
  - `Dog` is a `Animal`
- Other relationships are "has-a"
  - `Cat` "has-a" `Home`
  - `Dog` "has-a" `Owner`

# Practice - Abstract Classes

```java
/*** TODO: Write an abstract class header for the "A" class ***/
{
     public abstract char whoAmI();
     
     public String toString() {return "Hello!";}
}

public class B extends A {
     /*** TODO: Write the header for the required method ***/
     {
          return 'B';
     }
}

public class Practice {

     public static void main(String[] args) {
          /*** TODO: Create a new B object and store it in a B 
                     reference, b ***/
          System.out.println(b);
          System.out.println(b.whoAmI());
     }
}
```