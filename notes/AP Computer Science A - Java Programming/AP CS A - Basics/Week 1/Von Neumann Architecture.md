# Von Neumann Architecture

There are many kinds of computers on the market, and many changes have come in the way that they have appeared from their initial development in the early and mid 20th century to now. As we look at these machines, we find that certain core components are shared between these various models. The basic abstract concept of the modern computer was described by John Von Neumann, a brilliant mathematician.

![John Von Neumann](http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR8r5JsA8KVTKKiwph_05EG82SQ9E90Oal7SpoVTiShsiLohfx6RZ7toqLDFxMV)

The von Neumann architecture is a computer architecture based on a 1945 description by John von Neumann and others. This design is still used in most computers produced today. It was an advancement over the pure Harvard Architecture created in 1937. The first few computers to use the von Neumann architecture included the [ENIAC](https://en.wikipedia.org/wiki/ENIAC) and the [Colossus](https://en.wikipedia.org/wiki/Colossus_computer). 

This are the following components in the von Neumann architecture. 

- Input
- Output
- Control Unit
- Arithmetic Logic Unit
- Memory Unit

![Von Neumann Architecture Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Von_Neumann_Architecture.svg/1200px-Von_Neumann_Architecture.svg.png)

## Input

A computer has many components to it 

- keyboard
- mouse
- trackpad
- touchscreen
- etc.

![Input devices to a computer](https://digitalworld839.com/wp-content/uploads/2020/06/10-Input-devices-of-computer.jpg)

These components can be abstracted to a simple idea: The **input**. We interact with these input devices to tell the computer to do something.


## Output 

On the other side, we have 
- monitors 
- printers 
- etc. 

![Output devices to a computer](https://image.shutterstock.com/image-vector/output-devices-icon-set-vector-260nw-1285103905.jpg)

These components can be abstracted as **outputs**. These display, or show, or perform a certain task when instructed to do so.

## CPU

The remaining components are in between of the input and output. These components are within the computer's **Central Processing Unit (CPU)**. 

![Processors](https://i.pcmag.com/imagery/articles/05H4n2dV0nMnFiEUnPG4Sgl-6..1569492159.jpg)

Inside the CPU, there are 3 components in the von Neumann architecture

1. Memory Unit
2. Control Unit
3. Arithmetic/Logic Unit

## Memory Unit 

There is a small amount of internal **memory**, used to store information for immediate use in a computer, such as the inputs required for a program, the intermediate results, or the final output.

## Control Unit

The control unit (CU) is a component of the computer's CPU that directs the operation of the processor. It tells the computer's memory, arithmetic logic unit and input/output devices how to respond to the instructions sent by the processor. Think of it as the conductor in a band, telling each musician how to play. Or a traffic police controlling the flow of traffic at an intersection. 

## Arithmetic Logic Unit

The Arithmetic Logic Unit (ALU) is a digital circuit that performs arithmetic and bitwise operations on integer binary numbers. It does all the math required for the program. 



# Extensions

Besides the von Neumann architecture, there are also other types of computer architecture, such as the Harvard Architecture. 

![Harvard Architecture Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Harvard_architecture.svg/362px-Harvard_architecture.svg.png)

Unlike the von Neumann architecture, the Harvard Architecture had separate storage and signal pathways for instructions and data. In a computer using the Harvard architecture, the CPU can both **read an instruction and perform a data memory access at the same time**, even without a cache. A Harvard architecture computer can thus be faster for a given circuit complexity because instruction fetches and data access do not contend for a single memory pathway.

However the in von Neumann architecture, the instruction memory and data memory share the same location, and share a single **bus** (a wire to transmit data), preventing simultaneous read/writes. This limitation is called the **Von Neumann bottleneck**

There are many ways to mitigate the von neumann bottleneck, such as
- Providing a cache (which is faster than normal memory) between the CPU and main memory
- Using branch predictor algorithms and logic

However, the bottleneck cannot be fully mitigated, and since CPU speeds and memory sizes have been increasing a lot faster than the throughput between them, the severity of the problem has bneen increasing with every generation of CPUs.

So what are the pros and cons of the von neumann architecture?

| Pros                                                                                                                                                          | Cons                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Control Unit retrieves data and instruction in the same manner from one memory. Design and development of the Control Unit is simplified, cheaper and faster. | Parallel implementation of program is not allowed due to sequential instruction processing.   |
| Data from input / output devices and from memory are retrieved in the same manner.                                                                            | Von Neumann bottleneck – Instructions can only be carried out one at a time and sequentially. |
| Organisation of memory is done by programmers which allows them to utilise the memory’s whole capacity.                                                       | Risk of an instruction being rewritten due to an error in the program.                        |