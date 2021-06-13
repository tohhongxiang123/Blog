# Formatting

A few conventions or suggestions to write code that is easier to read. Breaking these conventions will not break the code, however it helps people read code more easily

# Naming Conventions

Variables are named with *lowerCamelCase* (`maxSpeed`, `isEligible`, `hasAdminPrivileges`)

Classes are named with *UpperCamelCase* (`BankingAccount`, `InternationalAirline`, `CorporateVehicle`). Note that the file must have the same name as the class.

Symbolic constants are *UPPER_CASE* (`DAYS_IN_MONTH`, `PI`, `DEFAULT_NAME`)

# Formatting Brackets

Open curly brackets at the end of the line

```java
public static void main(String[] args) {
    // code
}
```

# Indentation

Indentation should be consistent. A new block should be indented (usually 1 tab or 4 spaces)

```java
public static void main(String[] args) {
    int x = 10;
    int y = 5;

    if (x > y) {
        System.out.println("X is greater than Y");
        x += 1;
    }
}
```

See the [Java Formatting Guidelines](https://google.github.io/styleguide/javaguide.html)