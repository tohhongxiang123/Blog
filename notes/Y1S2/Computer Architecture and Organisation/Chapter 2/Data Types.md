# Data Types

Programming languages have many different data types
- Numbers
- Characters
- Boolean
- Arrays
- Structures
- Pointers

# Number Representation
There are 2 basic types of numbers
1. Integers, declared `int` (E.g. 69)
2. Floats, declared `float` (E.g. 6.9)

Floating point numbers are useful for scientific calculations. However, there is a trade off between **precision** and **range**
- Precision is the number of decimal places you can represent (0.123456789 vs 0.123)
- Range is determined by the biggest and smallest positive number you can represent ($10^0 - 10^99$ vs $10^0 - 10^9$)

Floating point numbers are always **signed**. However, integers can either be **signed** (`int`) or **unsigned** (`unsigned int`)

Most computers represent signed integers using **2's complement**. 

> To convert a number to 2's complement, you invert all the bits, and add 1 to the result. E.g. 0010101 -> 1101010 -> 1101011. The 2's complement of 0010101 is 1101011

The range of a number can be increased by using more bytes to represent the number

Type | Bytes | Bits | Range
--- | --- | --- | ---
`signed char` | 1 | 8 | $-2^7, 2^7-1$
`unsigned char` | 1 | 8 | $0, 2^8-1$
`short int` | 2 | 16 | $-2^{15}, 2^{15}-1$
`unsigned short int` | 2 | 16 | $0, 2^{16}-1$
`int` | 4 | 32 | $-2^{31}, 2^{31}-1$
`unsigned int` | 4 | 32 | $0, 2^{32}-1$
`long int` | 4 | 32 | $-2^{31}, 2^{31}-1$
`long long int` | 8 | 64 | $-2^{63}, 2^{63}-1$
`float` | 4 | 32 | 
`double` | 8 | 64 |

- More information on the [wiki page](https://en.wikipedia.org/wiki/C_data_types)

# Data Organisation in Memory
How is a 32-bit number stored in memory?
- Each memory address can only store a certain number of bytes (8 bytes)
- 2 ways depending on **byte-ordering** of the data in memory

1. Big Endian - The biggest (most significant) byte in the smallest address
2. Little Endian - The smallest (least significant) byte in the smallest address

# Character Representation

Characters are declared as `char`. Each `char` requires 1 byte of memory storage
- Data in a computer is stored in binary, but are transformed into representative characters through some encoding standard
- The most common character encoding standard is the 7-bit ASCII code

### ASCII (American Standard Code for Information Interchange)
- 7 bit code for representing characters

![ASCII Table](http://projects.zo.uni-heidelberg.de/course_resources/s02/images/image61.gif)

- A byte is normally used to store an ASCII character, and the MSB could be used for **parity error checking**

### Unicode
- Developed to handle text expressions for all major living languages in the world
- 8/16/32-bit character encoding standard that is downward compatible with ASCII
- Adopted by technologies such as XML, Java, .NET and many operating systems

# Boolean Representation

Boolean variables have only 2 states
- 1
- 0

The Boolean type was made available in ANSI C (after 1999) as `_Bool` with the `stdbool.h` header file
- False: 0
- True: Non-zero (1)

Memory storage for Boolean variables is **inefficient** as most implementation use a byte to store a 1-bit boolean value. The 8051 processor solves this problem by providing 128 **bit-addressable** memory locations

### Bit Addressable Memory
- In embedded applications, data variables are often related to ON-OFF status of discrete sensors and outputs (LEDs or switches)
- Bit-addressable memory provided an efficient way to handle such information

# Array Representation

A linear array is a consecutive area in the memory storing a series of homogenous data type

```c
int main() {
    char c[2];
    c[0] = "A";
    c[1] = "B";
}
```

If `c` has the address `0x100`, "A" will be stored at `0x100` and "B" will be stored at `0x101`. Note that each `char` is 1 byte.

```c
int main() {
    short int i[2];
    i[0] = 2;
    i[1] = 69;
}
```

If `i` has the address `0x200`, 2 will be stored at `0x200` and 69 will be stored at `0x202`, because each `short int` is 2 bytes

> For an array with type $T$ and base address $A$, the $n^{th}$ element of the array is at address $A + sizeof(T) * (n-1)$

### Nested Arrays
```c
int main() {
    int k[3][2];
}
```

Address | Element in Memory
--- | ---
0x100 | k[0][0]
0x104 | k[0][1]
0x108 | k[1][0]
0x112 | k[1][1]
0x116 | k[2][0]
0x120 | k[2][1]
0x124 | k[3][0]
0x128 | k[3][1]

Note that each `int` is 4 bytes. The offset from $A$ for element `k[a][b]` is `sizeof(int)*((2*a) + b)`

# String Representation
A string in C is an array of characters terminated by a `NUL` (0x00) character.

```c
int main() {
    char s[4] = "123";
}
```

Address | Content
--- | ---
0x100 | 0x31
0x101 | 0x32
0x102 | 0x33 
0x103 | 0x00
0x104 | ...
0x105 | ...

An alternative is the **Pascal string** which stores the length of the length of the string at the start of the string

Address | Content
--- | ---
0x099 | 0x03
0x100 | 0x31
0x101 | 0x32
0x102 | 0x33 
0x103 | ...
0x104 | ...

# Structure Representation

Structures allow new data types to be created by combining objects of different types. Each data type in a **declared** struct variable occupies predefined consecutive locations based on data type size

```c
struct Man {
    char race;
    int age;
    char name[20];
};

int main() {
    Man m;
}
```

Address | Memory
--- | ---
0x100 | m.race
0x101 | m.age
0x102 | m.age
0x103 | m.age
0x104 | m.age
0x105 | m.name
0x106 | m.name
... | ...
0x118 | m.name

# Pointer Representation

Pointers in C provide a mechanism for referencing memory variables, elements of structures and arrays

- C pointers are declared to point to a particular data type
- The value of a pointer is an **address**. Its size is **fixed** regardless of data type
- The size of the pointer depends on the processor's **address range**

```c
int main() {
    char c;
    char *ptr;

    c = 'A';
    ptr = &c;
}
```

Address | Memory
--- | ---
0x0100 | 'A'
0x0101 | ...
0x0102 | ...
0x0103 | ...

We do not know where the pointer will be stored. However we can see that each pointer will be 2 bytes (16 bits), because the address is a 16 bit address (Each digit is a hexadecimal digit of 4 bits, hence 4 digits = 16 bits = 2 bytes)

- When properly initialised, a pointer contains the start address where the memory variable can be found
- We use the dereferencing operator (*) to copy a value to the address pointed to by the pointer `ptr`
- Knowing the start address of an array/struct makes it easy to access their different elements
