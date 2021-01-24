# PC-related Addressing Modes

# Absolute Jump
- A new address can be loaded into the PC to alter the sequential order of program execution
- An absolute jump to a new code position is done by loading the addres to jump to the PC

```
MOV PC, #0x060
```

- Absolute jump is **position-dependent**. This code can only execute correctly in the specific area of code memory

# Relative Jump
- An offset can be added to the PC to alter the sequential order of program execution
- A relative jump is done using the branch instruction `B` with an appropriate signed offset (For ARM, this range is +- 32 MBytes)
- `B 0x008; Jump by a value of 8`
- Relative jump supports **position-independent** code

# Position Independent Code
- Such programs can be loaded anywhere in memory and still execute correctly (relocatable)
- Position dependent code cannot be loaded anywhere because the jumps are hard-coded

# `ADD` instruction

Adds 2 operands and stores it in the destination operand

```
ADD DEST, SRC1, SRC2
```

For example, `ADD R2, R0, R1`:

| Register | Before execution | After execution |
| -------- | ---------------- | --------------- |
| `R0`     | 0x03             | 0x03            |
| `R1`     | 0x06             | 0x06            |
| `R2`     | 0x09             | 0x09            |

- Destination and middle operands **must be registers** but rightmost operand can be a register or immediate value

# Accessing Data
- Position independent programs require data to be accessed relative to the PC
- PC-relative addressing is used to access variables in the data segment of program in memory

PC-relative offset of 0x0F8 is added since PC has incremented by 8 when executing `ADD` instruction

> PC-relative offset = Var address - (PC value + 8)

If we want to get a variable `var1` located at 0x100, the PC-relative offset is 0x100 - (0x00 + 0x08) = 0x0F8

```
ADD R0, PC, #0x0F8
LDR, R1, [R0]
```