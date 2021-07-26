# Overriding Methods

Sometimes when a class inherits from another, we require a different implementation of a method that has already been defined. We can solve this problem by overriding the inherited method.

- Useful to change behavior of a method when applied to a subclass object
- A subclass method with the **same signature** as a superclass method overrides the superclass method
- Subclass method executed instead of superclass method
- A method that is not overridden is inherited by (available to) subclass

# Overriding vs Overloading

- Overriding: new method with same signature (in subclass)
- Overloading: new method with different signature (in same class or subclass)
- Caution: You may intend to override but you overload instead

# Accessing Overridden Methods
- Overridden methods can still be accessed using `super`
- `super.doSomething()`
- Useful to cascade functionality from superclass version to subclass version

# Example: `toString()`

- `toString` is a method in the `Object` class
- Inherited by all other classes
- Default behavior: Concatenation of
  - Class name
  - Hex representation of memory address
- Can be overridden to provide better information about the object