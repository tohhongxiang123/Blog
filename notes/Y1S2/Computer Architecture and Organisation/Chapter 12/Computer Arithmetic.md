# Computer Arithmetic

# Positional Numbering System

- Position of each numeric digit associated with a weight
- Each numeric value represented with increasing powers of a **radix**
- E.g. decimal (base 10), hexadecimal (base 16)
- To represent signed integers, computer systems allocate the most significant bit (MSB) to indicate the sign of the number
- Remaining bits contain the value of the number, which can be interpreted in different ways
- Signed binary integers can be expressed using different number formats, such as 2's complement

# Signed Magnitude

- MSB = 0 indicates positive number
- MSB = 1 indicates negative number
- Remaining n-1 bits represent the magnitude of the number

# 2's complement

- Positive numbers represented as normal binary
- Negative numbers are negated
  - Invert positive value of number
  - Add one to inverted result (ignoring overflow)
  - 01101010 -> 10010101 -> 10010110
- MSB indicates the sign of a number (same as signed magnitude)
  - MSB = 0 indicates positive
  - MSB = 1 indicates negative

# Range of representation

- For unsigned, we can represent $[0, 2^n-1]$
- For signed magnitude, we can represent $[-2^{n-1} + 1, 2^{n-1} - 1]$
- For 2's complement, we can represent $[-2^{n-1}, 2^{n-1} - 1]$

# Carry vs Overflow

- Overflow flags get set when the register cannot properly represent the result as a signed value (you overflowed into the sign bit).
- Carry flags are set when the register cannot properly represent the result as an unsigned value (no sign bit required).
  E.g. 48 + 19 = 67
- [Stackoverflow link](https://stackoverflow.com/questions/6265896/arithmetic-overflow-vs-arithmetic-carry)

| Carry |     |     |     |     |     |     |     |
| ----- | --- | --- | --- | --- | --- | --- | --- |
| 0     | 0   | 1   | 1   | 0   | 0   | 0   | 0   |
| 0     | 0   | 0   | 1   | 0   | 0   | 1   | 1   |
| 0     | 1   | 0   | 0   | 0   | 0   | 1   | 1   |

E.g. 48 - 19

1. Negate 19 (00010011 -> 11101101)
2. Add both numbers together, and discard any carries from the MSB

|     | Carry |     |     |     |     |     |     |     |
| --- | ----- | --- | --- | --- | --- | --- | --- | --- |
|     | 0     | 0   | 1   | 1   | 0   | 0   | 0   | 0   |
|     | 1     | 1   | 1   | 0   | 1   | 1   | 0   | 1   |
| 1   | 0     | 0   | 0   | 1   | 1   | 1   | 0   | 1   |

In this example, there is a carry out. The answer is still correct, because we do not take into account the carry out for the final answer

## Detecting Overflow

- Overflow can be easily detected by checking MSB of the operands and result
- Conditions for overflow
  - Addition: if MSB(A) == MSB(B) and MSB(result) != MSB(A)
  - Subtraction: if MSB(A) != MSB(B) and MSB(result) != MSB(A)

### Unsigned Numbers

- Carry = 1 indicates an overflow (new value is too large to be stored)
- Overflow flag means nothing in the context of unsigned numbers

### Signed Numbers

- Overflow = 1 indicates overflow
- Carry flag can be set for signed numbers, however this does not mean that an overflow has occurred

| Expression            | Result    | Carry | Overflow | Correct |
| --------------------- | --------- | ----- | -------- | ------- |
| 0100 (4) + 0010 (2)   | 0110 (6)  | No    | No       | Yes     |
| 0100 (4) + 0110 (6)   | 1010 (-6) | No    | Yes      | No      |
| 1100 (-4) + 1110 (-2) | 1010 (-6) | Yes   | No       | Yes     |
| 1100 (-4) + 1010 (-6) | 0110 (+6) | Yes   | Yes      | No      |

# Sign Extension

- In 2's complement, sign extension is needed to convert a smaller sized operand to a larger sized operand
- 0010 1000 -> 0000 0000 0010 1000 (Extending positive sign outwards)
- 1000 0000 -> 1111 1111 1000 0000 (Extending negative sign outwards)

# Multi-Precision Arithmetic

- How can we add operands larger than 32-bits if we only have a 32-bit ALU?
- We can reuse the 32-bit adder for multi-precision addition
- Multi-precision arithmetic involves the computation of numbers whose precision is larger than what is supported by the maximum size of the processor register (Single-precision)

For example, the first 64bit number is placed in registers `R3, R1`
The second 64-bit number is placed in registers `R2, R0`

|                |                |
| -------------- | -------------- |
| 0000 0000 (R3) | FFFF FFFF (R1) |
| 0000 0001 (R2) | 0000 0001 (R0) |
| 0000 0002      | 0000 0000      |

```assembly
ADD R0, R0, R1 ; add lower word with carry out
ADC R2, R2, R3 ; add upper word with carry in
```
