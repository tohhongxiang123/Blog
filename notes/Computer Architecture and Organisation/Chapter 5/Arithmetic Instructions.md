# Arithmetic Instructions

`ADD` and `SUBTRACT`

- The basic arithmetic operations are `ADD` and `SUBTRACT`. 
- These arithmetic instructions involves 3 operands
- Add and subtract can only involve registers or immediate values (as source operand)
- ARM provides some variants of the basic add and subtract operations to provide flexibility
  - `ADD, SUB, RSB, ADC, SBC, RSC` (add, subtract, reverse subtract add with carry, subtract with acarry, reverse subtract with carry)


`ADD`

- Addition is commutative (`ADD R2, R1, R0 === ADD R2, R0, R1`)
- Only the rightmost operand can take on an immediate value. The other operands can be registers
- To influence NZVC flags, use the suffix `S` (`ADDS`)
- `ADD` can affect all the flags
  - 1 + 127 -> 128. 2's complement overflow + negative result afterwards. Hence N = V = 1
  - 1 + -1 -> 0. Carry is turned on , and the result is 0. Hence Z = C = 1

`SUB`

- Subtraction is not commutative (`SUB R2, R0, R1 !== SUB R2, R1, R0`)
- `SUB R2, R0, R1` is calculating `R2 = R0 - R1` (`SUB RESULT, MINUEND, SUBTRAHEND`, where result = Minuend - Subtrahend)
- To influence status flags, use `SUBS`
- `RSB` reverses subtraction order. Hence `RSB R2, R0, R1` is `R2 = R1 - R0`
- Subtraction is done by adding the minued to the **negated** subtrahend (negated with 2's complement)
- `SUB` can affect all flags
  - `C` flag clears if subtraction produced a **borrow**, else set to 1 otherwise
  - Borrows occur in subtraction when the unsigned value of the minuend is less than the unsigned value of the subtrahend ($|A| < |B| \implies C = 0$)
  - `V` flag set when result is out of the signed 32-bit range
  - Unsigned underflow is indicated by c=0

# Carry based Arithmetic Instructions
- ARM provides arithmetic instructions that take the carry bit into consideration

```
ADC R2, R0, R1 ; R2 = R0 + R1 + C (Add with carry)
SBC R2, R0, R1 ; R2 = R0 - R1 + NOT(C) (Sub with carry)
RSC R2, R0, R1 ; R2 = R1 - R0 + NOT(C) (Reverse sub with carry)
```