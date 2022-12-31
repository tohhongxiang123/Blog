# Variable Scope

- Where in code the variable can be used
- Basic rule: a variable is usable from the **point of declaration** until **end of enclosing block**
- Special cases
  - Parameters: accessible within method body
  - For loop variable: accessible within heading and body

For example

```java
// x cannot be used here because it has not been declared
int b = 4;

if (b > 2) {
    int x = 5; // x can be used after this line
    x++;
    System.out.println(x);
}

// x cannot be used here because we are outside the block that declared it
```

Note: We cannot have 2 variables with the same name active in the same scope (compiler gives a syntax error). The only exception is

- parameters and local variables can "shadow" or "hide" fields with the same name
- Use `this.field` to access hidden `field`
- E.g.

```java
class Person {
    int count;
    String name;
    Person(int count, String name) {
        // inside here, there are 2 "count" variables and 2 "name" variables. However, we can access each one differently
        // we can access the class member "count" with this.count, and we can access the parameter "count" by just using count
        this.count = count;
        this.name = name;
    }
}
```

# Extent (vs Scope)

- Scope: Where a variable is visible
- Extent: How long a value is kept (its lifetime)
- Variables: lifetime same as scope
  - When block is left, value of variable is lost
  - So initialisers are re-done on block entry
- Objects: lifetime lasts until it is no longer accessible (no variables reference it)

```java
Customer c1 = new Customer();
c1.getDetails();

c1 = new Customer(); // lifetime of old customer object ends. Now c1 references a new customer
```

Java's automatic garbage collection helps to take care of freeing the memory of dead objects
