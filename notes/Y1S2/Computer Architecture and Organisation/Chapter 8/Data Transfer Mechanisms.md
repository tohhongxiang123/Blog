# Data Transfer Mechanisms

There are 3 types of data transfer mechanisms
1. Polling (Programmed IO)
2. Interrupt Triggered
3. Direct Memory Access (DMA)

# Polling Technique
- CPU polls a certain IO port continuously using software for data or readiness of the port to perform a data transaction
  - For example, CPU polls the printer port continuously to see if printer is ready to accept data
  - If ready, CPU writes a data byte to the printer port. Else, waits
- CPU has full control and dedicates 100% of its resources in the whole data transfer process and does nothing else

### Polling Control Flow
1. CPU performs necessary intialisation
2. CPU polls IO device for its readiness to perform data transfer
3. If IO device is not ready, CPU continues to wait in the loop to check if device is ready
4. If IO device is ready, CPU makes the data transfer and exits the loop

### Pros
- Programmer has complete control over entire process
- Easiest to test/debug

### Cons
- Loop is blocking - program execution of CPU held up while waiting for IO device to get ready
- Inefficient use of CPU resources

# Interrupts
- Singalling mechanism that allows internal and external peripherals to alert the CPU that attention is needed
- Could be in the form of external/internal electrical pulse or change in internal register status
- Once CPU receives the signal, known as the interrupt request, it would then decide if it wanted to service the request
- If CPU decides to service interrupt request, it will follow up with the series of procedures to handle the interrupt event (Interrupt service routine)
- ISRs are typically short routines so as not to suspend the main program for too long
- After executing the ISR, CPU returns to previous program and continues from where it branched off
- Possible for CPU to receive multiple interrupt requests simultaneously since CPUs typically interface with multiple devices
- To handle multiple requests, some arbitration scheme has to be designed to decide which interrupt to service first (priority, first come first serve etc.)
- Interrupt mechanisms are typically used to trigger the CPU to start some operation, e.g. data transfer to memory, status registers etc.

How does the CPU know the location of the corresponding interrupt service routine for each interrupt?
- The starting address of each interrupt is stored inan **interrupt vector table**
- Each interrupt has a unique index to the vector table, similar to jump tables for switch statements

### Interrupt Control Flow
- Signal from external/internal peripheral or change in status of some special register notifies CPU that some event occurred, and asks for CPU's immediate attention
- If CPU decides to service the interrupt, it will **suspend** its current program temporarily
- CPU looks up the interrupt vector table to check the starting address of the interrupt service routine (ISR) for the corresponding interrupt
- CPU saves a copy of the processor context (current values of various registers, to allow the interrupted routing to continue execution after returning from ISR)
- CPU proceeds to execute ISR linked to the interrupt that was triggered
- Once ISR completes, CPU restores the saved context, returns to the interrupted routine and continues from where it left off

### Pros
- Efficient use of CPU resources, as it does not need to continuously monitor IO device status
- CPU can continue with other tasks between interrupts
- Allow prioritisation and pre-emption (Higher priority events come first)

### Cons
- More hardware interface circuitry required between IO device and processor
- Program is slightly more complex and difficult to debug

# Direct Memory Access
- Polling and Interrupts use the CPU to perform data transfer
- This becomes increasingly inefficient as the amount of data increases, as the CPU has to spend most of its time moving data
- Less time to perform algorithm processing 
- DMA controller (DMAC) added to relieve CPU of data transferring
- DMAC has dedicated hardware that moves data more efficiently than CPU in scenarios where complex address manipulation is required (E.g. de-interleaving left/right channel audio data)
- If there are no conflucts in hardware resources used, possible to transfer data via DMA and CPU execution to occur **simultaneously**
- If there is a conflict in hardware resources used (e.g. both DMAC and CPU requires the system bus), access will be given to the one with higher priority
- Who has priority and whether the priority is configurable is **processor specific**

# DMAC
- DMAC is a data bus controller module that performs data transfer independent of CPU, between 
  - memory and memory, 
  - IO peripheral and IO peripheral, 
  - Memory and IO peripheral
- Generates address and initiates read/write operations between devices mentioned above
- Peripheral refers to either internal/external peripherals

### Basic DMA Process
- DMA Configuration parameters intialised by CPU, given to DMAC
  - Source address
  - Destination address
  - Amount of data to transfer
  - DMA trigger signal (DMAREQ, interrupt, software bit, etc.)
- CPU proceeds with its own task while DMAC waits for DMA trigger signal
- Once DMA Trigger occurs, DMAC requests to take over system bus
- After taking over system bus, DMAC transfers data according to configuration
- DMAC notifies CPU of data completion (typically via interrupts) and releases system bus

### DMA Mode of Operation
- Different processors have different DMAC designs, typically with slight variance in terms of how they transfer data and data types they are optimised for
- In general, DMAC transfer blocks of data they are tasked to transfer in the following modes
  - Burst
  - Cycle stealing
  - Transparent
- Do note that you may encounter DMAC designs that vary from the basic mode of operation discussed, but general concepts still apply
- Majority of the time, you'll encounter DMAC designs that use a combination of the modes described

# Burst Mode
- DMAC gains control of the data bus and transfer multiple units of data before returning control to the CPU
- Note that the burst could be the entire block of data the DMAC is tasked to transfer, or a subset of the block (i.e. it may take a few bursts to complete the transfer of the entire block)
- CPU may continue to operate as long as it does not need access to the particular data bus that the DMAC is using
- If CPU requires access to the data bus, CPU may be suspended till DMAC has completed the data transfer
- Fast data transfer rates, however may render CPU inactive for longer periods of time

# Cycle Stealing
- DMAC releases the data bus after transferring 1 unit of data
- Depending on processor design, DMAC tends to execute data transfer
  - Between CPU instructions
  - Between Pipeline stages
- CPU may be suspended if it needs to access the data bus, but suspend time is shorter as only 1 unit transferred at one time
- Transfer rates slower than burst mode, but CPU will only be inactive for short period of time
- Favoured in applications which require CPU to be responsive (e.g. Real time security status monitoring)

# Transparent Mode
- DMAC transfers data only when CPU is not using the data bus
- Zero impact to CPU performance in terms of data bus access
- Potentially the slowest transfer rate among the 3 modes
- More complex hardware required to detect whether CPU is not using the data bus
- CPU activity detection technique could also be used by some processors as a cue to trigger a burst transfer only when CPU is not using the system bus