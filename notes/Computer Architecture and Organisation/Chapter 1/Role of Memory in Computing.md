# Role of Memory in Computing

### Approaches to Computing

Programming in hardware
- Fast computation but very inflexible

Programming in software
- Slower and more complex, but easily programmable

# Code, Data and Memory

> **Code** is a sequence of instructions. **Data** are the values these instructions are placed on. **Memory** is a sequential list of addressable storage elements for storing both instructions and data

# The Stored Program Concept

![Von Neumann Architecture Diagram](/public/von-neumann-architecture.png)
Most modern day computer designs based on the von Neumann's stored program concept
1. Both data and instructinos are stored in the same memory
2. Contents of memory are addressable by location without regard to data type
3. Execution occurs sequentially unless explicitly modified

# Memory Hierarchy

Memory is generally organised in levels of increasing speed and cost

Processor/Register <-> Cache Memory <-> Main Memory <-> Secondary Memory

<- Highest speed and Highest Cost

Type of memory | Description
--- | ---
Registers | Fast access, but limited numbers within CPU (2-128 registers). Operates at CPI clock rate
Cache Memory | Fast access static RAM close to CPU. Typical access time 3-20 ns (up to 512kB)
Main Memory | Usually dynamic RAM/ROM (for program storage). Typical access time 30-70 ns (up to 16GB)
Secondary Memory | Not always random access but non-volatile. Usually based on magnetic/flash technology. Typical access time 0.03-100 ms (up to 4TB)

### Characteristics of Main Memory
- Fixed size (typically 8bit) storage location accessible at high speed and in any order
- Each byte sized location has a unique address that is accessed by specifiying its binary pattern on the address bus
- Memory size dependent on number of lines in the address bus (for n lines, memory size = 2^n bytes)
- https://superuser.com/questions/1216428/if-a-cpu-has-a-16-bit-address-bus-and-8-bit-words-how-much-memory-can-it-addres/1216434
- Memory stores both data and instructions. Consecutive locations used to store multi-byte data