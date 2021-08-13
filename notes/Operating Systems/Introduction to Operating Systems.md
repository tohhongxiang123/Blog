# Introduction to Operating Systems

# What is an Operating System?

> An operating system is a program that manages the computer's hardware. It provides a basis for application programs, and acts as an intermediary between the **user** and **computer hardware**

Operating systems aim to achieve 2 major goals:

1. User **convenience**
2. **Efficient** hardware utilisation

# Computer System Components

A computer system is made up of multiple components. Those are

1. **Hardware** - Provide basic computing resources for the system (CPU, memory, IO)
2. **Operating System** - Controls and coordinates the use of hardware among various applications for various users
3. **Application programs** - Defines the way system resources are used to solve problems for users (Compilers, Database systems, Video games, Business Programs)
4. **Users** - People, other machines, other computers

```mermaid
graph TD
    User --> Applications
    Applications --> User
    Applications --> OperatingSystems(Operating Systems)
    OperatingSystems --> Applications
    OperatingSystems --> Hardware
    Hardware --> OperatingSystems
```

# Operating System Definitions

- **Resource allocator**: Manages and allocates hardware resources
- **Control Program**: Controls the execution of user programs and operations of IO devices
- **Kernel**: The one "core" program that is always ready to accept new commands from the user or the hardware

# Computer System Operation

- A modern day computer system consists of one or more CPUs and multiple device controllers connected along a common bus which provides access to shared memory
- Each device controller is in charge of a specific type of device (Disk drives, audio devices, video displays)
- CPU and device controllers can execute concurrently, but this makes them compute for usage of the common bus and shared memory
    - A memory controller is used to coordinate both of them to synchronise access to the memory

```mermaid
    graph LR
    CPU --> CommonBus(Common Bus)
    DiskController(Disk Controller) --> CommonBus
    USBController(USB Controller) --> CommonBus
    GraphicsAdapter(Graphics Adapter) --> CommonBus
    Disk1(Disk 1) --> DiskController
    Disk2(Disk 2) --> DiskController
    Mouse --> USBController
    Keyboard --> USBController
    Printer --> USBController
    Monitor --> GraphicsAdapter
    CommonBus --> Memory
```

- Operating systems are **interrupt-driven**
    - Operating systems usually wait for an event to occur, which is signalled by an **interrupt** or a **trap**
    - An interrupt can come from either the hardware or the software, and this interrupt is sent to the CPU
        - For example, the printer signals that it is ready, or a software signals that an error has occurred
    - A **trap** is a CPU generated interrupt, caused by software error or request
        - E.g. unhandled exceptions in user program
    - When the CPU is interrupted, CPU stops what it is doing
    - The operating system preserves the state of the CPU by storing registers and the program counter (called a **context switch**)
    - Then it determines which type of interrupt has occured
    - Based on the interrupt type, it identifies the appropriate **interrupt service routine** (ISR) to execute
        - Obtained from **interrupt vector table**, a place to store ISRs to be executed
    - Once ISR completes execution, CPU returns to continue the interrupted computation
- If the OS is not interrupt driven, it would be required to constantly poll for task/event completion, which is inefficient.

# Operating System Structures

- In general, the operating system keeps several jobs in memory simultaneously
- Since the main memory is too small to keep every single job, the jobs are initially kept on the disk in a **job pool**, which consists of all processes residing on disk awaiting allocation in main memory
- The set of jobs within the main memory is a subset of the jobs in the job pool
- The OS picks and executes one of the jobs in memory
- Eventually, the job may have to wait for some task, such as an IO operation to complete
- In non-multiprogrammed systems (e.g. batch systems), the CPU would remain idle
- However in multiprogrammed systems, the operating system will **switch** to execute another job, **maximising utilisation of CPU**
- In turn the second job may need to wait for another task, and the OS will switch to execute another job again
- Eventually the first job finishes waiting and gets the CPU back, and can continue with execution

A few examples of operating system structures include:

- Batch Systems
- Multiprogrammed
- Time-sharing systems
- Embedded and Cyber-physical systems

## Simple Batch Systems

![](https://media.geeksforgeeks.org/wp-content/uploads/Time-Share.jpeg)

Computerized batch processing is the running of "jobs that can run without end user interaction, or can be scheduled to run as resources permit."

- Reduce setup times by **batching** similar jobs
- To setup each job, there is an initial cost (more time required). Hence by setting up similar jobs together, we reduce the cost
- Automatic job sequencing: automatically transfers control from one job to another
- Simple memory layout: Only 1 user job in the memory at any given time
- Not efficient: When job waits for IO, CPU is idle

## Multi-Programming System

Multi-programming systems allow **multiple programs to be executed at the same time** by monitoring their states and switching in between processes.

- When a job is waiting for the IO, the CPU is idle
- CPU then swaps to another job in memory, so it does not remain idle
- Everytime a job requires waiting, the CPU will go on to execute another job instead
- CPU utilisation is maximised, and CPU will keep running as long as there is at least 1 job to run

## Time Sharing Systems

![](https://media.geeksforgeeks.org/wp-content/uploads/20200426074318/Multiprogramming-300x258.png)

In computing, time-sharing is the **sharing of a computing resource among many users at the same time** by means of multiprogramming and multi-tasking

- Several jobs are kept in the main memory at the same time, and CPU is multiplexed among them
- A job is swapped in and out of memory to the hard disk
- System is highly interactive - supports multiple online users
- E.g. desktops, servers

### OS Features required for Multi-Programming

- Memory management: To allocate memory for multiple jobs
- CPU scheduling: To choose among several jobs ready to run
- IO device scheduling: To allocate IO devices to jobs

### Desktop Systems

- Personal computers: Computer systems dedicated to a single user
- Several IO devices: Keyboard, mouse, printer etc.
- User convenience and responsiveness is the main focus
- May run several different types of operating systems (Windows, Linux, MacOS etc.)

## Embedded and Cyber-Physical Systems

![](https://addi-data.com/wp-content/uploads/cyberphysical-systems.png)

- Physical systems whose operations are monitored and controlled by a reliable computing and communication core
- Resource-constrained: Low power, small memory, low bandwidth etc.
- Domain-specific OSes: Real-time, handheld, automotive etc.
- E.g. Central heating systems, GPS systems, dishwashers etc.

### Real-time Systems
- Used as a control device in a dedicated application such as industrial controls, automotives, medical devices etc.
- Well-defined fixed-time constraints
    - Job must be completed within a deadline
    - E.g. airbag control in vehicles
- E.g. of real-time OSes: LynxOS, RTLinux

### Handheld Systems
- Mobile phones, tablets
- Issues: Limited memory, slow processors, small display screens
- Popular OSes: Android, iOS, Windows Phone

# Multiprocessor Systems

![](https://ecomputernotes.com/images/Multiprocessing-System.jpg)

> Multiprocessor systems are systems with more than 1 CPU, or CPU with multiple cores (Also called multi-core systems)

- Tightly coupled system: Communication usually takes place through shared memory
- Advantages of such systems
    - Increased system throughput
    - Economical due to sharing of memory and IO
    - Increased reliability due to redundancy

# Computer System Architecture

- Computer-System Operation
- Storage hierarchy
- Hardware protection

## Direct Memory Access (DMA)

DMA is a feature of computer systems that allows certain hardware subsystems to **directly access** main system memory (random-access memory) **independently of the CPU**

- Used for high-speed IO devices that are able to transmit information at close to memory speeds
- OS sets up the memory blocks, counters etc
- Device controller transfers data block from buffer to main memory **without CPU intervention**
- Only one interrupt is generated per block, rather than one interrupt per byte

# Storage Hierarchy

A storage device hierarchy consists of a group of storage devices that have different costs for storing data, different amounts of data stored, and different speeds of accessing the data. Storage devices higher up the hierarchy usually **cost more**, have **lower capacity**, but **faster speeds**

- Memory hierarchy: CPU registers, CPU Cache, Main memory, Hard Disks
- Storage system organisation is based on
    - speed
    - cost
    - volatility
    - size
- Caching: Copying information into faster storage systems: main memory can be viewed as the last cache before secondary storage

![Storage Hierarchy](https://media.geeksforgeeks.org/wp-content/uploads/Untitled-drawing-4-4.png)

# Hardware Protection

Hardware protection is vulnerability protection that comes in the form of a physical device rather than software that is installed on the hardware of a computer system. Types of hardware protection include:

- Dual-mode Operation
- IO Protection
- Memory Protection

## Dual-mode Operation

- Provides hardware protection by differentiating between at least 2 modes of operations
    1. User mode: Execution of user process
    2. Monitor mode (Supervisor mode or system mode or kernel mode): Execution of operating system processes
- A **mode bit** added to computer hardware to indicate the current mode: monitor (0) or user (1)
- Mode bit allows us to distinguish between tasks executed on behalf of the OS, or tasks executed on behalf of the user
- When a user performs a task, and the computer system is executing on behalf of the user application, it is on user mode
- When an interrupt or trap occurs, or if a user application requests a service from the operating system (via a system call), hardware switches to monitor mode

```mermaid
graph TB
    subgraph User Mode
    ProcessExecution(Process execution) --> SystemCall(System call)
    ReturnFromSystemCall(Return from system call)
    end
    subgraph Monitor Mode
    SystemCall -- Mode bit from 0 to 1 --> ExecuteSystemCall(Execute system call)
    ExecuteSystemCall -- Mode bit from 1 to 0 --> ReturnFromSystemCall
    end
```

- Dual mode prevents errant users from causing harm to the operating system
- We designate some instructions that may cause harm to the computer as **privileged instructions** 
- Privileged instructions can only be executed in monitor mode
    - A privileged instruction is a 
    - If a privileged instruction is attempted to be executed in user mode, the hardware does not run the instruction, instead treating it as an **illegal** operation and **traps** it to the OS

### Kernel Mode vs root/admin

- Kernel mode and root/admin are not the same
- Kernel or user mode is a hardware operation mode
- Root/Administrator is a user account in the OS
    - Jobs still execute in user mode, even when executed by root/admin user
    - This may in turn execute code in kernel mode indirectly, e.g. loading a kernel module

## IO Protection

- User program may issue illegal IO operations, hence IO must be protected
    - E.g. reading files that do not exist
    - Unauthorized access to a device
- All IO instructions are privileged instructions
- All IO operations must go through the OS to ensure its correctness and legality
    - CPU generates a trap for IO operations that try to bypass the OS

## Memory Protection

- OS must provide memory protection, at least for the interrupt vector and the interrupt service routines
- 2 CPU registers determine the range of legal addresses a program may access
    1. Base register: Holds the first legal memory address
    2. Limit register: Contains the size of the legal memory range
- Memory outside the defined range is protected and cannot be accessed

![](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter8/8_01_LogicalAddressSpace.jpg)

![](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter8/8_02_HardwareAddressProtection.jpg)

- The load instructions for the base and limit registers are privileged instructions (Only in monitor mode)
- CPU issues trap to OS is the above check fails

# Operating System Services

![](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter2/2_01_OS_Services.jpg)

## System Calls
- System calls provide the interface between a user program and the operating system
    - Generally available as assembly-language instructions
    - Possible to replace assembly language for system programming to allow system calls to be directly made (e.g. in C/C++)
- The execution of a system call requires the switch from the user to the kernel mode

![](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter2/2_06_Open.jpg)

# Further Resources
- https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/8_MainMemory.html
- https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/2_Structures.html
- https://www.geeksforgeeks.org/types-of-operating-systems/
- Operating System Concepts, 8th Edition - Silberschatz, Galvin, Gagne