# Basic Execution Cycle

# `LDR`

The `LDR` operator copies memory content to a register

- The left operand is always a destination register
- The right source operand is a memory location whose address is contained in a register (indirect addressing)

```
LDR R1, [R0]
```

| Register | Content    |
| -------- | ---------- |
| R0       | 0x00000100 |
| R1       | 0x12345678 |

`LDR` will check the contents of `R0`, and inside it will go the the **address** pointed by `R0`.

| Address | Memory |
| ------- | ------ |
| 0x100   | 0xDD   |
| 0x101   | 0xCC   |
| 0x102   | 0xBB   |
| 0x103   | 0xAA   |

_Assume little-Endian byte ordering_

Then, the contents at the address will be copied into `R1`

| Register | Content    |
| -------- | ---------- |
| R0       | 0x00000100 |
| R1       | 0xAABBCCDD |

# Role of the Processor

- Fetch instructions - CPU reads instructions from memory
- Decode instructions - Instruction is decoded to determine action required
- Fetch data - Data from memory may need to be fetched in order to complete execution of instruction through an external data bus (optional)
- Execute - Instruction execution may require CPU to perform some arithmentic/logical operation on the data, or just move the data into a register

The **fetch-decode-execute** cycle is performed repeatedly once the CPU is powered on.

- Execution of a single instruction may involve multiople accesses to memory, and in most single memory CPU (von-Neumann type), different instructions take different number of clock cycles to execute
- Data transfer on external bus (loading from memory to the CPU) is slower than within the CPU's internal bus. Microprocessor's performance is limited by data traffic bandwidth between CPU and memory (von Neumann bottleneck)
- Keeping regularly used operands in CPU registers helps reduce memory access (caching)
- Keeping instructions and data in separate memories (Harvard architecture) can help make instructions execute in more regular cycles (using parallel fetches), improving performance

### Example Fetch Cycle - `LDR R1, [R0]`

1. Fetch cycle - The PC points to address of the next instruction and its opcode is fetched from code memory into the Instruction Register (IR)
2. Decode cycle - IR decodes the instruction it receives
3. Fetch data - Since the operation decoded is `LDR`, the CPU sends a signal to the data address register (DAR), and DAR fetches from data memory (pointed by `R0`) to retrieve operand into the buffer register
4. Execute - Data currently in the buffer register is loaded into the destination register `R1`
