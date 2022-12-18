# Basic Components of a Microcomputer

Consists of 3 main Components

-   Processor
-   Main memory
-   Input/Output (IO) interfaces

They are connected by a **bus**, consists of a collection of wires through which binary information can be transferred in parallel

-   Other important components include the power supply, CPU clock and reset circuitries

### Processor

-   The CPU, provides the instructiosn and processing power the computer needs to do its work
-   Executres instructions that make up a computer program
-   Performs basic arithmetic, logic, controlling and IO operations specified by the instructions in the program

### Main Memory

-   Directly accessible to the CPU
-   Stores both data and instructions for the computer to run
-   CPU reads instructions stored in the main mermoy, and executes them as required
-   Access speed of the memory usually determines the performance of the conputer
-   Fast processors with fast clock speeds, coupled with slow memory will execute instructions slowly (bottlenecking)

### IO

-   The communication between the CPU and the outside world
-   Inputs are signals received by the system, outputs are signals sent from the system
-   IO devices are pieces of hardware used by humans to communicate with a computer
-   e.g. keyboard, mouse are input devices, monitors and printers are output devices

### Clock

-   Most computers are **synchronous** and are driven by a master or system clock
-   Speed performance of the computer governed by the frequency of the clock
-   CPU requires a fixed number of clock ticks (cycles) to execute each instruction
-   Different clock frequencies are derived from the one master clock
-   Operations closer to the CPU core (e.g. registers and arithmetic and logic units) are clocked faster than those involving external components

### Reset Circuitry

-   The CPU is put into a known state on power up. The reset circuitry provides an external signal that asserts the reset pin when power is applied
-   An active-low signal on the reset pin for a substantial duration (several clock cycles) is required to reset the CPU
-   Most computer systems provide an additional manual reset button to reset the CPU without switching off the pwoer
-   On reset, CPU is put into a known initial state where the boot-up code can then execute

# Major Components of a Desktop Personal Computer

-   Motherboard
-   Central Processing Unit (CPU)
-   Power supply unit (PSU)
-   DRAM Main Memory
-   Hard Disk Drive
-   Graphic Processor Unit (GPU)
-   IO Peripherals (Display, keyboard, mouse)

# Tablet Computer

-   Circuit board
-   LCD Display
-   Li-Ion Polymer Battery
-   Circuit board
    -   CPU
    -   NAND Flash Chip (Equivalent to the HDD of a computer)
    -   Touchscreen controller and driver
    -   Power management Integrated Chip (IC)
    -   LCD Timing Controller

# Package on Package (PoP)

PoP is an IC packaging technique that **vertically stacks and interconnects separate packages** via ball grid array (BGA) connections. The benefits of PoP include

-   Save space on motherboard
-   Minimize track length - faster signal propagation, reduced electrical noise
-   Memory units can be tested separately before combining with CPU units - omproved manufacturing yield, supports multiple memory suppliers
-   Different sized memory can be coupled with CPU based on user requirements - simplifies inventory control
