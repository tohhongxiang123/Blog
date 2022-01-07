# Introduction

There are 5 basic hardware components of a computer

1. Control Unit - Controls signals for data movement and storage operations, and/or lets the ALU perform operations specified in the instruction
2. Memory - Stores data
3. Arithmetic Logic Unit (ALU) - Performs integer arithmetic operations and logical operations (It does the math)
4. Input/Output (I/O) - How users give/receive feedback with the computer
5. Bus/Communication - A component for data to travel from one place to another

The Central Processing Unit (CPU) is made up of the ALU, memory and control unit. While the IO, bus and secondary storage are outside the CPU

![Datapath](https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Single_bus_organization.jpg/440px-Single_bus_organization.jpg)
A datapath is a collection of functional units such as arithmetic logic units or multipliers that perform data processing operations, registers, and buses. It contains the ALU, the set of registers, and the CPU's internal bus(es) that allow data to flow between them.

# Types of Computer Architectures

![Computer Architectures](http://www.sharetechnote.com/image/EmbeddedSystem_Harvard_VonNeuman_01.png)

There are 2 types of computer architectures

1. Von Neumann Architecture - Memory holds both data and instructions, both are transferred to the CPU through the same bus
2. Harvard Architecture - Separate memory holds data and instructions, each transferred to the CPU with separate busses
    - This allows data access and instructions to be fetched concurrently
    - Harvard architecture is found in most modern processors

# Computer Architecture

Computer architecture deals with the design and implementation of computer hardware. Consists of 3 main subcategories

1. Instruction set architecture - Defines the machine code that a processor can read and act upon, as well as word sizes, memory address modes, processor registers, and data types
2. Microarchitecture - Defines the implementation of the ISA. Specifies how the instructions are executed through the control, storage and computing
3. System Design - Defines how the hardware components in a computer are assembled, each of the component's functionalities and interconnections

# Program Execution

1. Fetch instruction from memory, and get ready to fetch next instruction
2. Decode current instruction, generate control signals and fetch register operands from register file (Decode current instruction and check what needs to be done)
    - A register file is an array of processor registers in a central processing unit (CPU)
    - Register operands refer to data stored in registers
3. Execute ALU operations specified in the opcode of the instruction
4. Perform memory access operations (read/write)
5. Write the result back to the register file
6. Go back to step 1

# Design Goals and Constraints

1. Functional requirements 
    - Must process data according to the instructions
    - Tests and verifications are required at different stages since it is impossible to modify the processor once fabricated
2. Reliability
    - Should continue to perform correctly
3. Cost
    - Embedded consumer products are highly sensitive to cost
4. Performance
    - Basic requirement
5. Power consumption
    - Systems should consume less power for better battery life, reduced electricity costs, reduced thermal problems etc

The evolution of computer architecture is driven to improve **performance** and **power consumption**