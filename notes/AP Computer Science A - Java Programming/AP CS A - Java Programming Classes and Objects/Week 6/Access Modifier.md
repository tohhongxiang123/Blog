# Access Modifier

There are 4 access modifiers, which give different access levels to variables/methods

### Access Levels

| Access Modifer | Class | Package | Subclass (Outside of Package) | World |
| -------------- | ----- | ------- | ----------------------------- | ----- |
| `public`       | Y     | Y       | Y                             | Y     |
| `protected`    | Y     | Y       | Y                             | N     |
| _no modifier_  | Y     | Y       | N                             | N     |
| `private`      | Y     | N       | N                             | N     |

# Subclass Access

- Subclasses cannot access private fields in their superclasses
- Two options
  - Leave as is; provide accessors/mutators
  - Change private to protected
