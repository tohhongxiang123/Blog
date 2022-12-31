# Hiding Fields by Subclassing

- Fields in superclass with same name as subclass are hidden
- Object still contains both fields
- Access superclass version with `super.fieldName`
- Not recommended: Can make code difficult to read

```java
class A {
    int x = 4;
}

class B extends A {
    int x = 3;

    void printX() {
        System.out.println("B x: " + this.x);
        System.out.println("A x: " + super.x);
    }
}
```
