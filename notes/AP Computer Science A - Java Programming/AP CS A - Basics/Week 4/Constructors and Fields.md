# Constructors and Fields

Most classes have at least 1 constructor and 1 field.

# Constructor

A constructor is a special method in a class that is used to "construct" an object when it is created, called by the `new` operator. In a class, the constructor is a method with the same name as the class itself

```java
class Wheel {
    double radius;
    Wheel(double radius) {
        this.radius = radius;
    }
}
```

# Field

A field is a variable of an instance. Fields are variables located inside the class definition that become part of the object. They are often initialised by the constructor using `this`.

```java
this.radius = radius;
```