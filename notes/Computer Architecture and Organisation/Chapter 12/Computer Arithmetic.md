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
E.g. 48 + 19 = 67

| Carry |     |     |     |     |     |     |     |
| ----- | --- | --- | --- | --- | --- | --- | --- |
| 0     | 0   | 1   | 1   | 0   | 0   | 0   | 0   |
| 0     | 0   | 0   | 1   | 0   | 0   | 1   | 1   |
| 0     | 1   | 0   | 0   | 0   | 0   | 1   | 1   |
