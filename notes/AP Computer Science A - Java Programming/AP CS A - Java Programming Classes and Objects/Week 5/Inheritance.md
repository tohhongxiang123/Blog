# Inheritance

- Sometimes classes have related or overlapping functionality
- E.g. consider a program for keeping track of personnel at a university
- Need a Person class to keep information
- However we might want special classes for:
  - Student: includes grades or classes taken
  - Professor: include salary and rank

```java
public class Person {
    private String name;
    private String address;

    public Person(String name, String address) {
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```

For the student class, without inheritance, we have a lot of duplicate code

```java
public class Student {
    private String name;
    private String address;
    private String[] classes;
    private String[] grades;

    // repeated code from Person class
    public Person(String name, String address, String[] classes, String[] grades) {
        this.name = name;
        this.address = address;
        this.classes = classes;
        this.grades = grades;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // code unique to Student class
    public String[] getClasses() {
        return classes;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    public String[] getGrades() {
        return grades;
    }

    public void setGrades(String grades) {
        this.grades = grades;
    }
}
```

- To remove duplication, we can use **inheritance**. We can inherit from the `Person` class to **share member definitions in a hierarchical fashion**
- One class can "extend" another, "inheriting" fields and methods from it
- Terminology: the "subclass" inherits from the "superclass"

- In our example, 
  - `Person` has the following fields
    - `name`
    - `address`
  - And their corresponding accessors and mutators
- `Student` extends `Person`
  - Inherits fields and methods from `Person`
  - Adds `classes` and `grades` field (and more accessors and mutators)
- `Professor` extends `Person`
  - Inherits fields and methods from `Person`
  - Adds `rank` and `salary` (and more accessors and mutators)
- Common fields and methods go in `Person`, and are inherited by its subclasses

Note: Classes inherits all fields that are `public` or `protected`

```java
public class Student extends Person {
    private String[] classes;
    private String[] grades;

    public Person(String name, String address, String[] classes, String[] grades) {
        super(name, address)
        this.classes = classes;
        this.grades = grades;
    }

    public String[] getClasses() {
        return classes;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    public String[] getGrades() {
        return grades;
    }

    public void setGrades(String grades) {
        this.grades = grades;
    }
}
```

# What happens upon creation of object that belongs to a subclass
- Constructors

# What if the subclass does not "like" the implementation of a method of the superclass?

What if the class inherits a specific method, but requires a different implementation of the method?
- Overriding
- Consider composition instead of inheritance

# Terminology

- `Student extends Person`
- `Student` is a **subclass** of `Person`
- `Person` is a **superclass** of `Student`
- `Person` is a **parent** class, `Student` is a **child** class
- `Person` is a **base** class, `Student` is a **derived** class
- `Student` is a `Person`

# Is-A vs. Has-A relationship

- Is-A
  - Class A extends class B
  - Class A is a class B
  - Student is a Person
  - Note: Class B "is not necessarily a" class A
  - To model is-a relationships, use inheritance
- Has-A
  - Class A "has-a" class B
  - Class A has a field that references a class B object
  - Person "has-a" String name
  - Composition should be used

# Practice

```java
class BaseClass {
     protected int x;
     protected int y;

     public BaseClass(int x, int y) {
          this.x = x;
          this.y = y;
     }

     public String toString() {return "x: " + x + "; y: " + y;}
}

/*** TODO: Write the header for the ChildClass class, which inherits from BaseClass ***/
{
     /*** TODO: Write the header for the ChildClass constructor, taking two inputs, x and y ***/
     {
          super(2*x,2*y);
     }
}

public class Practice {

     public static void main(String[] args) {
          /*** TODO: Create a new ChildClass object with inputs x = 4, y = 3, and store it in a 
                     ChildClass reference, c ***/
          System.out.println(c);
     }
}
```