# Arrays

Arrays are a list of values, a kind of "container object" in java

Arrays are

- homogeneous
- static
- random access
- reference types

Example:

```java
String[] args
```

In general,

```
type_name[] variable_name
```

# Interacting with Arrays

## Creating an array

```java
int[] studentScores = new int[10];
String[] names = new String[200];

int[] speedLimits = {95,96,100,81,75,50,93,90,100,88};
```

## Accessing Array Elements

```java
studentScores[0];
names[199];
```

# Generalisations

- A method can take an array as parameter

  - `int computeSum(int[] a)`
  - `public static void main(String[] args)`

- A method can return an array
  - `int[] sortIntegers(int[] a)`
  - `int[] computeHistogram`

An array of type `T[]` has elements of type `T`.

## Array Initialisations

- Default: elements intialised with type-specific default
  - Integer types: 0
  - Real types: 0.0
  - Reference types: null
- Compile-time array initialisation possible
  - `char[] vowels = { 'a', 'e', 'i', 'o', 'u' };`
