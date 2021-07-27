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