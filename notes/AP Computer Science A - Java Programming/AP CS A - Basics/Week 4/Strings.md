# Strings

A built-in java class, no need to import, and supports string literals ("Hello").

Because `String` is a class:

- Instances are objects
- Can create with `new` operator
- String variables hold references to new objects

## Operations on Strings

- Concatenation (`+` or `concat()`)
- `length()`
- `charAt(int index)`
- `indexOf(char character)`

`charAt()` and `indexOf()` are both **zero-based** indexing, just like arrays.

Note that strings are **immutable**: no operation on a `String` object changes the value of that object.

## Challenge

```java
public class Main {
    public static void main(String[] args) {
        String s1, s2;
        int length;
        char c1, c5;

        /*** TODO: Create a new String, s1, that contains "West Lafayette, Indiana, USA".
         Store the length of s1 in the integer variable "length".
         Store the character in position 1 of s1 in the character variable "c1".
         Store the character in position 5 of s1 in the character variable "c5".
         Store a new String in s2 which is composed of the concatenation of c1 and c5. ***/

        s1 = "West Lafayette, Indiana, USA";
        length = s1.length();
        c1 = s1.charAt(1);
        c5 = s1.charAt(5);

        s2 = "" + c1 + c5;

        System.out.println("The string \"" + s1 + "\" is " + length + " characters long.");
        System.out.println("Character 1 of s1 is '" + c1 + "' and character 5 is '" + c5 + "'.");
        System.out.println("The new string s2 is \"" + s2 + "\".");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "I am the very model of a modern major general";
        String s2, s3;

        /*** TODO: Use the substring method to store "model" from s1 in s2, and "major general" from s1 in s3. ***/
        s2 = s1.substring(14, 19);
        s3 = s1.substring(32);

        System.out.println("s2: " + s2 + "\ns3: " + s3);
    }
}
```

# String Operations

We will use the following string to do the rest of the examples

```java
String str = "All who wander are not lost";
```

## `length()`

Returns the length of the string

```java
str.length(); // 27
```

## `equals(String s)`

Checks whether the string is equal to `s`, case-sensitive

```java
str.equals("I'm lost"); // false
str.equals("all who wander are not lost"); // false
```

## `compareTo(String s)`

Returns positive integer if the parameter is less than the original String, negative if greater than, and 0 if the 2 are equal. This refers to the ASCII value of the string. Each character is compared one index at a time until there is a difference, and that value is returned

```java
int y = str.compareTo("Are you lost?"); // negative because l < r
int z = str.compareTo("Add it up!"); // positive because l > r
```

## `indexOf(String s)`

Returns the **first** index where `s` appears in the string. Returns -1 if not found

```java
int x = str.indexOf("who"); // 4
```

## `substring(int beginIndex)`, `substring(int beginIndex, int endIndex)`

If only 1 parameter is provided, then it will return all characters from `beginIndex` to the end of the string. Else it will return all characters from `beginIndex` to `endIndex - 1`

```java
String s2 = str.substring(19); // "not lost"
String s3 = str.substring(4, 7); // "who"
```

# String Comparison

Remember that strings are reference types, so

```java
String s1 = "Hello world";
String s2 = new String("Hello world");

System.out.println(s1 == s2); // false
```

Using `==` will result in `false` because `s1` and `s2` are stored in different memory addresses. To check whether both strings have the same content, we use the following:

```java
s1.equals(s2); // true
```

## String Pooling

```java
public class StringEquality {
    public static void main(String[] args) {
        String a = "h1";
        String b = new String("h1");

        System.out.println(a == b); // false
        System.out.println(a.equals(b)); // true

        String c = "h1";
        System.out.println(a == c);
        System.out.println(a.equals(c));
    }
}
```

At the line `String c = "h1";`, **java does not actually create a new string**. Java will make `c` reference the exact same string that `a` references.

Java uses **interning** for strings. There is a pool of String Objects, and if we want to use the same value for a string later in our program, JVM will not create a new string to optimise performance. JVM reuses the old string instead.

However, between `a` and `b`, this did not occur because we created a string through the constructor, forcing JVM to create a new string object, even though the value is the same. When using a string literal ("h1"), then, if possible, JVM will reuse the string.

# `printf` and `format`

Other than `System.out.println` and `System.out.print`, we have other methods to show as well.

There might also be complications in printing caused by floats and doubles

- How many digits to print after the decimal?
- Default is all non-zero digits
- `10.0 - 9.1 = 0.9000000000000004`, due to binary being unable to accurately represent the floating point number

We can solve this problem using `printf` instead of `println`

```java
System.out.printf(String formatString, arg1, arg2, ...)
```

The first argument is the format string, or template string (with placeholders `%d`, `%f`, `%s`)

Remaining arguments are converted and inserted into placeholderse in the format string

```java
double d = 10.00 - 9.1;
System.out.printf("%.2f", d); // 0.90
```

`%` signifies that there is a placeholder. `f` signifies that the variable is a float. `.2` signifies that we want 2 decimal places

```java
String s = "Hello world";
System.out.printf("This is a string: %s", s);
```

`%s` signifies a string placeholder.

Note: `printf` will not end the line with a newline. So:

```java
double d = 10.00 - 9.1;
System.out.printf("%.2f", d);

String s = "Hello world";
System.out.printf("This is a string: %s", s);
```

will show in the console as `0.90This is a string: Hello world`

We need to include a `\n` (newline) within the first string to separate them. Like this:

```java
double d = 10.00 - 9.1;
System.out.printf("%.2f\n", d);

String s = "Hello world";
System.out.printf("This is a string: %s", s);
```

Some references for string formats:

- `%s`: string
- `%d`: decimal (byte, short, int, long)
- `%f`: float, double

Width specifications:

- `%10s`: pad string on the left to make it 10 characters
- `%-10s`: pad string on the right to make it 10 characters
- `%10.3f`: format number with 3 decimal places, and total width 10 (the width of a number includes the number of digits + the decimal point)
- `%.2f`: format number with 2 decimal places, whatever width needed

A similar method to `System.out.printf` is `String.format`

- Formats strings without printing them
- `String.format(template, arg1, arg2, ...)`
- Has the same arguments as `System.out.printf`
- Will not print anything out on the console, will only return the formatted string.
