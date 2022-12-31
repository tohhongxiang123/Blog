# Encapsulation and Access Modifiers

- A form of "information hiding"
- Encapsulation serves 2 purposes
  - Hides implementation details from other programmers, allowing author to make changes without affecting other programmers
  - Prevents other programmers from modifying certain fields or calling certain methods that might leave object in an incosistent/unexpected state

# Java Access Modifiers

- Can apply to members: fields and methods
- Modifiers control access to members from methods in other clases
- This list is from least to most restrictive
  - `public` - any other method can access
  - `protected` - Only methods in the class, subclass, or in classes in the same package can access
  - `[none]` - Only methods in the class or classes in the same package can access (package private)
  - `private` - Only methods in the class can access

# Conventional Wisdon

- Make methods public
  - Allows anyone to use them
  - Should be written defensively to "protect" the object's internal state (i.e. attribute fields)
- Make fields private
  - Keeps them safe from unexpected changes
  - Only your methods can modify them
- Constants can be made public since they cannot be changed

# Accessor and Mutator Methods

- With fields being private, all access to them from outside the class is via methods
- No special Java syntax, only naming conventions
  - Accessor: `get` access (read) fields in an object
  - Mutator: `set` mutate (change) fields in an object
- Accessor methods allow read-only access
- Mutators methods allow "controlled" change

```java
public class PiggyBank {
    private double amount;
    private String owner;
    private int PIN;

    public PiggyBank(String name, int PIN) {
        this.owner = name;
        this.amount = 0;
    }

    public double getAmount(int PIN) {
        if (PIN == this.PIN) return amount;
        else return -1;
    }

    public boolean setAmount(int PIN, double amt) {
        if (PIN != this.PIN) return false;
        else {
            this.amount += amt;
            return true;
        }
    }
}
```
