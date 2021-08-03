# Abstract Classes vs Interfaces

| Question                                                   | Regular Class | Abstact Class | Interface |
| ---------------------------------------------------------- | ------------- | ------------- | --------- |
| Can be instantiated?                                       | Y             |               |           |
| Can have constructors?                                     | Y             | Y             |           |
| Can have member variables?                                 | Y             | Y             |           |
| Can have function declarations? (Only signature)           | Y             | Y             | Y         |
| Can have private function declarations?                    | Y             | Y             |           |
| Can have function definitions? (Implementation)            | Y             | Y             |           |
| Must have function definitions?                            | Y             |               |           |
| Must label undefined functions with `abstract` explicitly? |               | Y             |           |
| Multiple inheritance/implementation?                       |               |               | Y         |

### Consider using abstract classes if you:

- Want to share code among serveral closely related classes
- Expect that classes that extend your abstract class have many common methods or fields
- Expect that classes that extend your abstract class require access modifiers other than `public` (such as `private`/`protected`)
- You want to declare non-static or non-final fields

### Consider using interfaces if you:
- Expect that unerlated classes would implement your interface (E.g. `Comparable` and `Cloneable` are implemented by many unrelated classes)
- Want to specify the behavior of a particular data type, but not concerned about who implements the behavior

Tldr;

An abstract class allows you to create functionality that subclasses can implement/override. An interface only allows you to define functionality, not implement it. A class can extend only 1 abstract class, but can implement multiple interfaces.