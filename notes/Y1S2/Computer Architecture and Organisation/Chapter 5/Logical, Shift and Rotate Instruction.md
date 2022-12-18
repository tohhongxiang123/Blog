# Logical, Shift and Rotate Instruction

`MVN` is a two operand instruction that does the **NOT** operation

-   `MVN R2, R2`

| Register | Before Execution | After Execution |
| -------- | ---------------- | --------------- |
| R2       | 0x0000           | 0xFFFF          |

`AND, ORR, EOR` are three operand instructions for AND, OR, and XOR operations

-   The `S` suffix can be used to influence the N and Z bits in the CC flags

# Shift and Rotate

-   ARM has several shift and rotate operations
-   `LSL` (logical shift left), `LSR` (logical shift right)
-   `ASR` (arithmetic shift right) Will shift everything, while the sign bit remains the same
-   `ROR` (rotate right) will shift your 32 bits right, and the last bit will be rotated to the front
-   `RRX` (rotate right extended) will shift your 32 bits + carry to the right. The last will move into the carry, the carry will move to the first bit.

# Doing Arithmetic with Shift

-   Shifting left n bits is the same as multiplying by $2^n$
-   Shifting right n bits is the same as dividing by $2^n$
-   In signed/unsigned multiply, binary 0 is shifted into the LSB of the register from the right using `LSL` (0100 -> 1000)
-   In unsigned divide, binary 0 is shifted into the MSB of the register from the left using `LSR` (0100 -> 0010)
-   In signed divide, the sign bit is shifted into the MSB from the left using `ASR` (1100 -> 1110, 0110 -> 0011)
-   `S` suffix is used to influence the C flag

# Rotate Operations

-   Rotate is known as **cyclical shift** as no bits in the register are lost during the shift operation
-   0110 -> 0011 -> 1001 -> 1100 -> 0110
