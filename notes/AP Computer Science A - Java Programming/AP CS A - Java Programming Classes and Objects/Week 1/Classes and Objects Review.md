# Classes and Objects

A class is a description of how the object should work, while an object is a collection of variables that match those specified in the class definition, and behave by following the steps and methods defined within the class definition.

```java
public class House {
    private int houseNumber;
    private String street;
    private String color;

    public House(int houseNumber, String street, String color) {
        this.houseNumber = houseNumber;
        this.street = street;
        this.color = color;
    }

    public String getAddress() {
        return "" + houseNumber + " " + street;
    }

    public boolean setColor(String color) {
        String[] colors = { "Blue", "Red", "White", "Yellow" };
        for (String c : colors) {
            if (color.equals(c)) {
                this.color = color;
                return true;
            }
        }

        return false;
    }
}
```

# Variables

-   Typically, vairables are written at the top of the class definition.
-   They do not require a specific order. Variables can be of any type.
-   A general rule of thumb is to make non-final and non-static members **private**, to ensure information integrity.

# Constructor

-   Called once, when the object is created using `new`
-   Has the same name as the class itself
-   Can have zero or more parameters
-   No return type
-   You can have multiple constructors

# Accessors

-   Methods usually preceded by the word `get` (`getColor`, `getBalance`, `getCount`)
-   Allows client to read a value of a given variable

# Mutators

-   Methods usually preceded by the word `set` (`setName`, `setAddress`, `setDiameter`)
-   Allows client to set a value of a given variable
