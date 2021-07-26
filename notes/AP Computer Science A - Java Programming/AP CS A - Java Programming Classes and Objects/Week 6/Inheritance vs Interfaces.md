# Inheritance vs Interfaces

| Interfaces                                  | Inheritance                              |
| ------------------------------------------- | ---------------------------------------- |
| Class B implements interface A              | Class B extends class A                  |
| B can implement multiple interfaces         | B can only extend a single class         |
| B and A do not have to be logically related | B and A have a hierarchical relationship |

We are allowed to write

```
A var = new B();
```

This is called **dynamic binding**

# Interface and "extends"

- An interface can extend another interface
- In fact and interface can extend many other interfaces
- A class cannot extend an interface, only implement
- An interface cannot extend a class
- An interface cannot implement another interface