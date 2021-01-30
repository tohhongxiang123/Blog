# Data Transfer Instructions

Non system-level instructions in a processor can be typically classified into 3 groups
1. Data Transfer
   1. `MOV R1, RO`
   2. `STR R0, [R2, #4]`
   3. `LDR R1, [R2]`
2. Data Processing
   1. `ADD, R0, R1, R2`
   2. `SUB R1, R2, #3`
   3. `EOR R3, R3, R2`
3. Program Control
   1. `B Back`
   2. `BNE Loop`
   3. `BL Routine`

- Data transfer - instructions that move data between registers and memory
- Data processing - instructions that modify the data in register through arithmetic or logical operations
- Program control - instructions that alter the normal sequential execution flow of a program

# Register Data Transfer
- Moves source operand to destination register
- `MOV` moves the source to the destination
- `MVN` negates the source and then moves it to the destination

# Memory Data Transfer
- Data in memory can be transferred to or from register
- `LDR R1, [R0]` copies 32-bit value pointed by R0 into R1
- `LDRB R2, [R0]` copies an 8-bit value pointed by R0 into R2
- `STR R1, [R0]` copies R1 into the address pointed by R0
- `STRB R2, [R0, #1]!` copies a byte in R2 into the address pointed by R0 + 1, then R0 = R0 + 1