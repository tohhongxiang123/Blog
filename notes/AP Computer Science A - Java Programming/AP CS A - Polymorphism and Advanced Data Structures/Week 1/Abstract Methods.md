# Abstract Method

- Methods may be declared `abstract`
  - Provide only the header (No body)
  - Class must be declared `abstract` as well
- Methods in an interface are implicitly declared `abstract`
- When subclassing an abstract class
  - Generally provide method bodies for abstract methods
  - If abstract methods remain, then subclass is still abstract and must be declared so.

```java
abstract class AbstractParent {
    abstract void doOne();
    abstract void doTwo();
}

abstract class AbstractChild extends AbstractParent {
    void doOne() {
        System.out.println("In abstract child");
    }
}

class ConcreteGrandChild extends AbstractChild {
    void doTwo() {
        System.out.println("In Concrete Grandchild");
    }
}

public class Main {
    public static void main(String[] args) {
        ConcreteGrandChild c = new ConcreteGrandChild();
        c.doOne();
        c.doTwo();
    }
}
```

- `AbstractParent` is an abstract class with 2 abstract methods `doOne` and `doTwo`
- `AbstractChild` implements `doOne` but not `doTwo`, hence it has to be declared `abstract`
- `ConcreteGrandChild` inherits `doOne` from `AbstractChild`, and implements `doTwo`, hence it does not need to be declared `abstract` 