# Characteristics of Instructions and the ARM Programmer's Model

Instructions are stored in memory as binary patterns called **machine codes**. They are represented in more readable **mnemonics**

ARM (32-bit CPU) Example

- `MOV R1, R0`
- `LDR R2, R1`

Memory partitioned into separate **code** and **data** segments

# `MOV`

The `MOV` operator is a two-operand instruction that copies the source operand to the destination operand

```
MOV DEST SRC
```

`MOV R1, R0`

| Register | Before Execution | After Execution |
| -------- | ---------------- | --------------- |
| R0       | 0x12345678       | 0X12345678      |
| R1       | 0x00000000       | 0X12345678      |

Instructions are **binary encoded** and stored in memory. Unlike data, instruction bytes tell CPU what actions to take (executable)

Most instruction formats consists of 2 parts

`OP-CODE OPERANDS`

`OP-CODE` specifies the operation to be carried out (move, add, subtract). `OPERANDS` specify the data itself, or the location of the data, or where results are to be stored

Some operations produce no storable result but may alter program sequence or influence **status flags** (NZVC)

# How are opcodes encoded in an instruction?

If there are 80 different operations (`add`, `sub`, etc.), then at least 7 bits ($2^6 < 80 < 2^7$) of opcode is required to represent all the unique bit patterns

The **more variety** of operations supported by the instruction set, the **more bits** required by each instruction

There are numerous ways to specify the operands. Ooperands can be stored as part of the instruction, stored in a register, or stored in memory. The method by which the operand is specified is the **addressing mode**

| Addressing Mode               | ARM                | Intel             |
| ----------------------------- | ------------------ | ----------------- |
| Absolute (Direct)             | None               | `MOV AX, [1000h]` |
| Register Direct               | `MOV R1, R0`       | `MOV AX, DX`      |
| Immediate                     | `MOV R1, #3`       | `MOV AX, 0003h`   |
| Register Indirect             | `LDR R1, [R0]`     | `MOV AX, [BX]`    |
| Register Indirect with Offset | `LDR R1, [R0, #4]` | `MOV AX, [BX+4]`  |
| Register Indirect with Index  | `LDR R1, [R0, R2]` | `MOV AH, [BX+DI]` |
| Implied                       | `BNE LOOP`         | `JMP -8`          |

ARM has 16 instructions, hence each instruction is 2 bytes long.

# Role of Instructions

The role of an instruction is to make **changes to the current state** of the processor

- The visible current state of a processor is defined by the programmer's model and contents in memory
- There are 3 broad categories of instructions for general programming

| Data Processing  | Data Transfer       | Program Control |
| ---------------- | ------------------- | --------------- |
| `ADD R0, R1, R2` | `MOV R1, R0`        | `B Back`        |
| `SUB R1, R2, #3` | `STR, R0, [R2, #4]` | `BNE Loop`      |
| `EOR R3, R3, R2` | `LDR R1, [R2]`      | `BL Routine`    |

# Programmer's Model and Memory

- Registers
- Stack Pointer (SP)
- Program Counter (PC)
- Status Register (SR)
- Memory

The ARM processor can operate in various modes. The following are visible registers in the **User mode**

- 16 32-bit registers (R0-R15)
- R13 is the Stack Pointer (SP)
- R14 is the Link Register (LR)
- R15 is the Program Counter (PC)
- The Current Processor Status Register (CPSR) holds the condition code bits (NZVC)

### Program Counter

ARM's register R15 is the Program Counter and keeps track of program execution

- The content of the PC is an address, which is the start address of the **next instruction** to be fetched
- The PC automatically increments by the length of the instruction executed
- Sequential execution can be altered by modifying the contents of the PC to a new address location (i.e. jump, branch operation)
- Due to **pipeline** architecture of the ARM CPU, the value in the PC is the address of the current instruction being executed plus 8 bytes

### Stack Pointer (SP)

- R13 in the ARM processor is designated by the stack pointer
- Used to maintain a space in memory (stack) that is used to temporarily stored away register information which will be needed again later

### Link Register (LR)

- R14 used as a Link Register during the calling of subroutines
- R14 gets a copy of the PC when a Branch with Link (BL) instruction is executed
- At all other times, R14 can also act as a general purpose register

### CPSR Condition Code Flags

| CPSR Bit(s) | Name | Description                                                                            |
| ----------- | ---- | -------------------------------------------------------------------------------------- |
| 31          | N    | Can set if last operation produced a **negative** result                               |
| 30          | Z    | Can set if last operation produced a **zero** result                                   |
| 29          | C    | Can set if last operation produced a **carry out** in the most significatn bit         |
| 28          | V    | Can set if last operation produced an **overflow** for **signed** arithmetic operation |
