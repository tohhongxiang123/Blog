# Processor Pipeline

- So far we have discussed a simple CPU which does the following 3 operations sequentially
  - Fetch
  - Decode
  - Execute
- In the simple CPU, the fetch-decode-execute cycle of an instruction must complete before the next instruction is fetched

![Parallel execution of fetching/decoding/executing](http://simplecore-ger.intel.com/techdecoded/wp-content/uploads/sites/11/figure-2-3.png)

- Consider a processor which can execute the individual stages simultaneously
- When instruction1 is in the decode stage, the processor is able to fetch the machine code of instruction2 from the memory
- And when instruction1 is in the execution stage, the processor is able to decode instruction2 and fetch instruction3
- Total time taken to execute reduced from 9 clock cycles to 5
- This is an example of a pipeline processor architecture
- Pipelining is about **partitioning an instruction into simpler stages** and **assigning resources to allow these stages to be executed simultaneously**
- There are many ways to partition instructions, the example shown here is the simplest. It is not uncommon for more complex application processors to have more than 10 pipeline stages

- Pipelining is possible if the fetch-decode-execute operations use independent resources
- For e.g.
  - Fetch - External busses
  - Decode - Instruction decoder
  - Execute - ALU

# Pipeline Efficiency

- The efficiency of a pipeline is maximised when the pipeline is filled
- Suppose we have a 4-stage pipeline processor
  1. Instruction fetch
  2. Instruction decode
  3. Instruction execute
  4. Data store
- It takes 4 cycles to fill up the pipeline and release thefirst instruction from the pipeline
- But after the pipeline is filled, it is able to release 1 instruction every cycle, giving the effect of "executing" one instruction every clock cycle

# Pipeline Conflicts

- Pipeline efficiency will be reduced drastically if there are disruptions to the pipeline
- These events are known as pipeline conflicts
- Pipeline conflicts typically cause a temporary halt to the pipeline or in some cases, the processor has to flush the instructions in the pipeline and reload with a fresh set of instructions
- These actions result in additional time to execute a particular set of instructions
- Since total time taken to execute the instruction is longer, the number of instructions that can be released from the pipeline is reduced, which means the effective performance of the processor is lowered
- We will look at 3 sources of pipeline conflicts
  - Insufficient resource
  - Data dependencies between instructions
  - Pipeline flushing due to branch instruction

# Resource Conflicts

- Consider a processor with 4 pipeline stages: fetch, decode, execute, store
- Resource conflicts occur when 2 instructions attempt to access the same resource in the same cycle
- fetch and store both require the system bus. But if there is only 1 system bus, then there is a resource conflict

## Resolving Resource Conflicts

- You need sufficient resources for a pipeline processor to work efficiently
- A pipeline processor with insufficient resources to operate each pipeline stage simultaneously will result in constant halting and flashing of pipeline
- Resultant processor performance may become worse that that of a a processor with a simple CPU architecture
- Very common for pipeline processors to have multiple resources: internal buses (data, instruction, peripherals), control and processing units etc. to allow simultaneous operations in any instance

# Data Dependency Conflict

- Consider a 4-stage pipeline (FDES)
- Actual operation of each instruction (ADD, SUB, etc) is done during execution (E) stage
- Resultant value of execution is transferred to the destination during the store (S) stage
- Consider the following instructions

```assembly
ADD R2, R2, R1
SUB R3, R3, R2
```

- If data dependency was ignored, the old value of R2 will be used when the SUB instruction is being executed, so R3 will have the wrong value
- Data dependency is not an issue for simple CPU architecture, because the current instruction will only start its execution after the previous instruction is complete. Hence the most updated copy of the memory/registers is always available to the current instruction
- Due to the overlapping nature between instructions within a pipeline, there will be instances where a data required for the proper execution of the current instruction has not been updated yet
- This is known as data dependency conflict. This arises when the source operand of the current instruction is also the destination operand of a prior instruction
- The exact separation between 2 instructions in order for the issue to occur depends on thepipeline structure and design

## Resolving Data Dependency Conflicts

- Hardware circuitry can be used to detect data dependency between instructions
  - Compare destination identifier in the execute stage with source(s) in the decode stage
  - If data dependency is detected, allow the initial instruction to continue normally, but **stall the next instruction**
  - After the initial instruction completes, the next instruction will resume
- Compiler can analyse and insert redundant instructions to reduce data conflict
  - Data dependencies are evident in instructions during compilation
  - Compiler inserts explicit **NOP (No Operation) instructions** between instructions with data dependencies
- Delay ensures new value is available in register but causes total execution time to increase

# Branch Instruction

- Branch instruction usually need to perform 2 operations
  - Evaluate condition to determine if branch should be taken
  - If branch taken, calculate branch target using adder in ALU
- Both operations requires an ALU to perform some computation and processing so a natural stage to do this is in the execute (E) stage of the pipeline
- However due to overlapping operations between instructions in a pipeline, the unnecessary instructions may already been introduced into the pipeline before the branch decision has been made
- The processor would need to **flush the pipeline to reload the correct instructions** according to the branch decision. Flushing of pipeline is equated to wastage in cycles for instruction execution
- The number of cycles lost is known as the **branch delay**
- Consider the following

```assembly
        BEQ Next
        InstructionI
        InstructionJ
Next    InstructionK
```

![Branch Delay Diagram](https://slideplayer.com/slide/4342503/14/images/48/2-Cycle+Branch+Delay+Next1+thru+Next2+instructions+will+be+fetched+anyway.+Pipeline+should+flush+Next1+and+Next2+if+branch+is+taken..jpg)

- The branch target is only known after the execute stage, but by this time, instructions I and J are already fetched
- If branch is taken (BEQ evaluates to true), instructions I and J have to be discarded, resulting in 2-cycle branch delay
- The 2 slots are are discarded are known as delay slots
- Instructions I and J are known as the delay slot instruction

## Reducing Branch Delay

### Pre calculating branch target

- Branch delay can be reduced by making the branch decision and calculating the branch target **earlier at the decode stage**
- An additional adder is introduced to be used in the decode stage to enable earlier calculation of branch target
- After the decode stage, the branch decision and the branch target is known
- Hence if branch is taken, only 1 instruction needs to be discarded
- Branch delay **reduced** to 1 cycle

### Delayed Branching

- In the previous implementation, the instruction immediately following a branch is always fetched regardless of branch decision
- If branch is taken, the instruction will be discarded resulting in branch delay
- Delayed branching is a method that ensures **no instructions are discarded after the branch**. Which means **delay slot instructions are always executed**
- User or compiler can schedule independent instructions to be filled in the delay slots after the branch
- If such independent instructions exists, they will always be executed, leading to zero branch delay, since nocycles are wasted
- If an independent instruction cannot be found, or if there are insufficient number of independent instructions to fill the delay slots, **NOP instructions should be used to populate the delay slots** to preserve the correctness of the original program logics
  - Independent instructions refer to instructions which will always be executed in the original program flow regardless of whether the branch is taken or not, but does not play a part in the branch decision making process
  - It should be some instructions that are earlier sequence wise in the original program compared to the branch instruction. Any instruction that occurs later than the branch instruction in the original program would incidentally be executed or not executed depending on the branch decision
  - Its operation should not have effect on status of any registers that would in turn affect the branch decision
    - E.g. if BEQ used, the independent instruction should not affect the Z flag which the BEQ instruction used for decision making
  - This is because delay slot instructions get fully executed only after the branch decision has been made, which means delay slots instruction had no effect on the branch decision
  - If branch is part of a loop, independent instructions needs to be sourced from instructions within the loop as delay slot instruction will go through the same number of iterations as well

```assembly
        INSTR1
        INSTR2
        INSTR3
        BEQ Next
        INSTRI
        INSTRJ
Next    ISNTRK
```

- If INSTR2 and INSTR3 are independent instructions (They do not impact the branch decision), then they can be moved below BEQ, so they will always be executed regardless of the branch decision (if delayed branching is enabled)

### Dynamic Branch Prediction

- Hardware circuitry to guess outcome of a conditional branch
  - Branch history table implemented to store target addresses of taken branches
- If prediction is correct, no wasted cycles
- If prediction is incorrect
  - Flush instructions that were incorrectly fetched - wasted cycles
  - Update prediction bit and target address for future use

# Real World Examples

- ARM Cortex M3/M4 Processor
  - 3-stage pipeline - Fetch, Decode, Execute
- Branch speculation
  - When a branch is encountered, the decode stage also includes a speculative instruction fetch that could lead to faster execution
  - The processor fetches the branch destination instruction during the decode stage itself
  - During the execute stage, the branch is resolved and it is known which instruction is to be executed next
  - If branch is not taken, the next sequential instruction is already available
  - If the branch is taken, the branch instruction is made available at the same time as the decision is made
