# Program Control Instructions

These intsructions facilitate the disruption of a program's normal sequential flow
- Done by modifying the contents of the Program Counter (PC)
- Content of PC can be modified directly or by using Branch instruction
- Jump can be executed based on a given condition (e.g. if previous execution is negative). This is called a **Conditional branch**
- Conditional branch is useful for implementing 
  - Conditional constructs (if, else)
  - Loop constructs (for, while loop)

# Conditional Branch (Bcc)

ARM provides conditional branch using `Bcc`

If the condition specified in the condition field (`cc`) is true, a displacement is added to the PC, otherwise the next instruction is executed

```
    BEQ Skip ; branch to Skip if Z=1 (EQual to zero)
    ..
    ..
Skip MOV R1, R0 ;instruction at Skip
```

- `Bcc` uses PC-relative addressing modes with a displacement range of +-32 MB
- PC value used to compute required displacement is 8 bytes ahead of the current `Bcc` being executed
- `Bcc` is used with address labels that allows the assembler to compute the required displacement values

# Test Conditions for Bcc
ARM provides different conditional branch options
- 15 possible conditions is permitted in the condition field using combinations of NZVC flags
- Flexible conditional branch can be programmed based on outcome of instructions prior to `Bcc`

| Suffix   | Flags              | Meaning                                             |
| -------- | ------------------ | --------------------------------------------------- |
| EQ       | Z = 1              | Equal                                               |
| NE       | Z = 0              | Not equal                                           |
| CS or HS | C = 1              | Higher or same, unsigned                            |
| CC or LO | C = 0              | Lower, unsigned                                     |
| MI       | N = 1              | Negative                                            |
| PL       | N = 0              | Positive or zero                                    |
| VS       | V = 1              | Overflow                                            |
| VC       | V = 0              | No overflow                                         |
| HI       | C = 1 and Z = 0    | Higher, unsigned                                    |
| LS       | C = 0 or Z = 1     | Lower or same, unsigned                             |
| GE       | N = V              | Greater than or equal, signed                       |
| LT       | N != V             | Less than, signed                                   |
| GT       | Z = 0 and N = V    | Greater than, signed                                |
| LE       | Z = 1 and N != V   | Less than or equal, signed                          |
| AL       | Can have any value | Always. This is default when no suffix is specified |

### Example program that counts the number of 1s

```
		MOV R2, #0
		MOV R3, #32
Loop	MOV R0, R0, ROR #1  ; Rotate R0 right 1 bit
		AND R1, R0, #1 ; Clear everything except LSB
		ADD R2, R2, R1 ; Add LSB to 1-counter
		SUBS R3, R3, #1 ; Decrement loop counter
		BNE Loop ; Loop when Z=0 (R3 not 0)
```

# Comparing Signed and Unsigned Values
- Appropriate conditional test must be selected based on the number representation used
- For signed values, use GT, LT, GE, LE
- For unsigned values, use HI, LO, HS, LS

# `CMP`
- `CMP` subtracts the source operand from the destination operand and sets the CC flags according to the results
- Destination register remain unmodified after `CMP`
- `CMP DESTINATION SOURCE`
- Use `CMP` instead of `SUBS` to compare values of two operands without affecting the  operands

```
CMP R1, #4  ; test R1-4 where R1 is a signed number
BGE nextInstruction ; Branch to nextInstruction if result is positive
```