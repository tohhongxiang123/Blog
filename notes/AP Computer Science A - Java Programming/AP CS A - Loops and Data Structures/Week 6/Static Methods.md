# Static methods
- May only access static fields and call other static methods in the class
- Can be called using the class name (`Math.pow(2, 56)`)

# Non-static methods
- May also access non-static fields associated with the particular object
- Must be associated with an object in some way in order to be called (E.g. `t3.describe()`)
- If no object is specified, `this` is implied (`describe()` is the same as `this.describe()`)

# Method Syntax

```
[static] return_type method_name(param_list) {
    statements;
    return_if_needed;
}
```

# When designing a class
- Non-static methods operate on the attributes of the class ("Do an action with the object")
  - `computeDiameter`
  - `getChange`
- Static methods operate on static variables or use no non-local variables at all
  - Utility methods: process parameters, return value
  - `main` method of a program