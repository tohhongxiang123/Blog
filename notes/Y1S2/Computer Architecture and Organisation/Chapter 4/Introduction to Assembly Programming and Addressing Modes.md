# Introduction to Assembly Programming and Addressing Modes

### What is an Assembly Program?

Unlike high-level programming, languages, assembly level statements

-   known as **mnemonics**. Each has a one-to-one correspondence with a binary pattern that is directly understood by the CPU
-   **hardware-dependent** and address the architecture of processor directly (CPU register aware and reference them by name)
-   converted to machine code by an **assembler**

### Why Assembly?

-   More efficient
    -   Code with faster execution speed
    -   More compact program size
    -   Exploit optimized features of the processor's instruction set architecture
-   Cybersecurity jobs require good knowledge in assembly programming

### When to Use Assembly?

-   Critical parts of the operating system's software
-   Input/Output intensive codes
    -   Drivers, video decoders etc.
-   Time-critical codes
    -   Auto braking system in cars

# Addressing Modes

Addressing mode (AM) is concerned with how data is accessed

-   The correct AM allows the CPU to identify the actual operand or the address location where operand is stored.

The ARM processor instruction set architecture supports many different addressing modes

-   Register direct
-   Immediate data
-   Register indirect
-   Register indirect with offset
-   Register indirect with index register
-   Pre and post auto-indexing

# Register Direct

Operand is the content of the specified register

-   Register direct can be used for both destination and source operand
-   E.g. `MOV R1, R0` moves the content of `R0` to `R1`
-   **Fast** addressing mode since no further memory access is involved during execution
-   Should be used to optimise execution speed

# Immediate Addressing

The value of the operand is directly specified within the instruction itself

-   `#` symbol precedes the immediate value
-   E.g. `MOV R1, #3`
-   After execution, the immediate value is copied into the destination register (left operand)
-   Immediate addressing can only be used as a **source** operand
-   Used for loading **constant** values into registers. Value must be known at the time of coding

How is a 32-bit immediate value encoded?

The entire ARM instruction is 32 bits long, 4 bits is used for the mnemonic (recall ARM has 16 instructions), 16 bits is used for the register operand, and only 12 bits are left for the immediate operand

-   Store an 8-bit immediate value in the 8 least significant bits (Bit 0 - 7)
-   Let bits 8 - 11 be a "rotate right" value, where the immediate value is rotated right by **2n** bits, where n is the value given by the 4 bits ($0 \le n \le 15$)

The assembler does the necessary calculations and gives warning if requested immediate value cannot be encoded

-   `MOV R3, #0xFF` - immediate values within 8 bits always valid
-   `MOV R3, #0x100` - right rotate 8-bit value of 0x01 with n=12
-   `MOV R1, #0X102` - invalid immediate value - `0 0 0 1 | 0 0 0 0 | 0 0 1 0` requires a 1 bit left rotation of `1000 0001`, but right rotate can only rotate an even number of bits

# Register Indirect with Base Register

-   Register direct and immediate addressing do not allow CPU to access operands stored in memory
    -   C variables are usually allocated memory for storage (especially large arrays)
-   How do you specify a 32-bit adress in memory using a 32-bit register?
    -   The ARM specifies the 32 bit address of the operand in a 32 bit register
    -   The register with the memory address points to the memory location where the operand is stored
    -   Memory operand is fetched during instruction execution using register indirect addressing
    -   ARM uses `LDR` and `STR` mnemonics

### `LDR`

-   `LDR` is used to copy memory content to a register

```
LDR DESTINATION, [SOURCE]
LDR R1, [R0]
```

Copies the contents of the memory pointed by `R0` into `R1`

### `STR`

-   `STR` operator is used to copy register content to memory

```
LDR SOURCE, [DESTINATION]
LDR R1, [R0]
```

Copies the content in `R1` to the memory location pointed by `R0`

-   Access of 32-bit operands from memory must follow data alignment constraints
-   The 4-byte data read or written to memory must start at an address that is a multiple of 4

# Register Indirect with Offset

-   Adds a specific offset value to the indirect register to compute the effective address in memory
-   Base Plus Offset addressing does not change indirect register's content

```
LDR R1, [R0, #4]
```

Copies content from memory pointed by `R0`, plus 4, to `R1`. E.g. if `R0` points to 0x100, contents will be taken from 0x104 in memory, and copied into `R1`

Consider the following code in C

```C
int main() {
  // assume base address of array i is 0x100
  int i[5];

  i[0] = 7;
  i[4] = 7;
}
```

In assembly,

```assembly
MOV R2, #0x100
MOV R1, #7
STR R1, [R2, #0]
STR R1, [R2, #16]
```

1. Initialise base address of array `i` into register `R2`
2. Load value of 7 into `R1`
3. Store the value of 7 into `i[0]` and `i[4]` using offsets of 0 and 4x4=16 of register `R2` respectively

# Register Indirect with Index Register

-   This variant adds the content of the idnex register to the indirect register to compute effective address
-   Base Plus Index Register does not change base register's content

```
LDR R1, [R0, R2]
```

If the value of `R0` is 0x100 and `R2` is `0x04`, then the effective address is 0x100 + 0x04 = 0x104, and the contents stored in 0x104 will be copied to `R1`

```c
int main() {
  int i[400];
  int n = 0;

  while (n < 400) {
    i[n] = 0;
    n++;
  }
}
```

In assembly,

```
MOV R2, #0x100
MOV R0, #0
MOV R1, #0

..

STR R0, [R2, R1]
ADD R1, R1, #4
```

1. Initialise start address of `R2` as 0x100
2. Move the value 0 into `R0`
3. Move the value 0 into `R1`
4. Loop 400 times,
    1. Store the value of `R0` at memory address pointed by `R2` with offset `R1`
    2. Increment `R1` by 4 (the size of an `int`)

# Register Indirect with Autoindexing and Stacks

**Autoindexing** allows the indirect register's content to be modified during execution, and provides an efficient way to access consecutive array elements

### Offset with Autoindexing

Adds offset value to the autoindex register (AR) to compute effective address, and AR gets modified

```
LDR R1, [R0, #4]!
```

Assume `R0` has the value 0x100

1. Copies contents at 0x100 + 0x04 = 0x104 to `R1`
2. Changes the value in `R0` to 0x104

```c
int main() {
  int i[400];
  int n = 0;

  while (n < 400) {
    i[n] = 0;
    n++;
  }
}
```

Without autoindexing, assembly code is:

```
MOV R2, #0x100
MOV R0, #0
MOV R1, #0

..

STR R0, [R2, R1]
ADD R1, R1, #4
```

With autoindexing,

```
MOV R2, #0x100
MOV R1, #0

..
STR R1, [R2]
STR R1, [R2, #4]!
```

_You can add negative values as well_

# Index Register with Autoindex

Instead of using a direct value to increment the autoindex register, use the value of a register

```
LDR R1, [R0, R2]!
```

# Pre-index and Post-index

-   Pre-index, the indirect register is autoindexed **before** being used to compute effective address

```
LDR R1, [R0, #4]!
```

Equivalently,

```c
R0 = R0 + 4;
R1 = mem[R0];
```

-   Post-index, the indirect register is used to compute the effective address **after** it is autoindexed

```
LDR, R1, [R0], #4
```

Equivalently,

```c
R1 = mem[R0];
R0 = R0 + 4;
```

The above code to set all 400 elements of array `i` to 0 can be rewritten as

```
MOV R2, #0x100
MOV R1, #0

..
STR R1, [R2]
STR R1, [R2], #4
```

# The System Stack

A stack is a first-in, last-out linear data structure that is maintained in the memory's data area

The system stack in the ARM is maintained by a dedicated stack pointer (SP) or R13

The full descending (FD) stack grows towards lower memory addresses (E.g. by default, SP starts at 0xFF000000 in VisUAL ARM simulator)

In the FD stack, the SP points to the top item on the stack (but SP can also point to the next empty space on the stack)

There are 3 basic stack operations

-   push
-   pop
-   access

There are 4 possible stack implementations

-   Full descending
-   Full ascending
-   Empty descending
-   Empty ascending

| Type       | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| Full       | Stack pointer points at the top item of the stack            |
| Empty      | Stack pointer points at the next empty space on the stack    |
| Ascending  | Stack grows from lower address value to higher address value |
| Descending | Stack grows from higher address value to lower address value |
