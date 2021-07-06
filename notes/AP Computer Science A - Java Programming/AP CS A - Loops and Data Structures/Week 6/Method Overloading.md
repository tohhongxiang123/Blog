# Method Overloading

## Signature
- The signature refers to the name and parameter types of a method or constructor
- `compute(int, int)`
- `getCustomer(String)`

Each constructor and method in a class must have a unique signature. Same names are OK, but parameter types must be different

```java
public static void main(int x, int y);
public static void main(String[] args);
public static void main();
```

# Overloading Constructors and Methods
- Java matches the argument types with the parameter types to choose the right constructor or method to invoke
- Called **overloading**
- Many built-in classes use constructor and method overloading (E.g. `println`)