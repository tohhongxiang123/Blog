# Primitive Types

A primitive type is either a numeric type or a boolean.

Integral Numbers: `byte` (8 bits), `short` (16 bits), `int` (32 bits), `long` (64 bits), `char` (Uses UTF-16, 16 bits, unsigned)
Floating Point Numbers: `float` (1 bit sign, 8 bit exponent, 23 bit mantissa), `double` (1 bit sign, 11 bit exponent, 52 bit mantissa)
Boolean: `boolean` (either `true` or `false`)

# Operations on Integer Types

- Usual mathematical + - * / %
- Important note
  - Division is "integer division", where the result is an integer, even if it should be a fraction
  - Example:
    - 10 / 5 = 2
    - 3 / 2 = 1
    - 1 / 2 = 0
    - m / n = floor(m / n)
  - However, doing 4.5 / 9.0 = 0.5, because both are doubles, hence the result is as expected, a double too

```java
int a = 9 / 2;
System.out.println(a); // 4

float b = 9 / 2;
System.out.println(b); // 4.0

double c = 9.0 / 2.0;
System.out.println(c); // 4.5

float d = 9.0F / 2.0F;
System.out.println(d); // 4.5
```

## Challenge

Write a calculator, that takes 2 integers from the user, and prints the sum of the integers. For example

```
Enter an integer:
3
Enter a second integer:
4
The sum of 3 and 4 is 7
```

Further challenge: Also take in a choice of operation for the user, and output the result as well.

```
Enter an integer:
3
Enter a second integer:
4
Enter "add", "subtract", "multiply", "divide"
divide
3 / 4 = 0.75
```

# Operations on Real Types (Float and Double)

- Usual mathematical: + - * / 
- The `Math` class includes many others (which are also applicable to integers)
  - `Math.pow(base, exponent)`
  - `Math.log10(number)`
  - Trigonometric functions, logs etc.

## Challenge

Get an integer from the user, and print out the square root of the number to the user

# The `final` keyword

`final` is a modifier used in variable declarations, which prevent the variable from being changed.

```java
final int SIZE = 10000;
SIZE = 0; // not allowed by Java
```

All the letters in the name of a constant is UPPER_CASE

## Challenge

Declare a constant `GRAVITY` that holds the value `9.81` and print it out to the user

# Chars

- Set of possible characters, symbols that make up a String
- We map characters to a number ('A' = 65, 'B' = 66 under ASCII)
- In Java, a char has 2 bytes (16 bits)
- Java uses the Unicode character set, specifically UTF-16 (Since chars are 16 bits)

ASCII subset uses character codes from 0-127, and included the English alphabet (upper and lower), numbers, punctuation and special characters

Latin-1 extended the character codes 128-255, and included non-English (Romanized) characters and puncutations (dipthongs, accents, circumflexes etc.)

Unicode 1 extension added character codes 256-65536, includes non-Romanized alphabetic characters from Hebrew, Arabic, Chinese, Japanese etc.

## Char Literals

A single character surrounded by single quotes, for example: 'a', 'A', '0', '!'

There are also special escape sequences surrounded by single quotes, for example
- '\t' (tab)
- '\n' (newline)
- '\'' (single quote)
- '\\' (backslash)
- '\uxxxx' (char hexadecimal xxxx in Unicode set, e.g. '\u12FC')

## Operations on chars

We can do some mathematical operations on chars. For example

```java
char c = 'C';
c = c + 32;
System.out.println(c); // 'c'
```

By adding 32, we can convert uppercase to lowercase.

Chars can also be concatenated with Strings to form longer Strings

```java
String s = "Hello World";
s = s + '!'
System.out.println(s); // "Hello World!"
```

# Boolean

The only non-numeric primitive type. Booleans are a set of 2 elements: { `true`, `false` }. Operators that work on Boolean values are called logical operators.

- `&&` (and)
- `||` (or)
- `^` (xor)
- `!` (not)

Booleans are also used in testing various Java statements (if/else)

Booleans can be created by comparison operators as well
- `<`, `>`, `<=`, `>=`, `==`, `!=`
- Note: `==` and `!=` work with reference types, but only compare references (addresses), not the values

## Challenge

Declare a boolean variable, b, and store the relational expression 8 >= 3 