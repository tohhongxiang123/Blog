# Modular Programming

Software decomposed to several less complex modules
- Modules can be designed and tested independently
- Reduce overall program size
- Can be re-used in other programs

Characteristics of a Good SW Module
- Loose coupling - data within module is entirely independent of other modules (local variables only)
- Strong modularity - should perform a single logically coherent task

### Subroutines
- Modules (e.g. functions in C) are implemented as subroutines
- Subroutine can be called from various parts of the program
- Consists of a caller and a callee
  - Caller: the program that calls subrouting 
  - Callee: subroutine
- On completion, subroutine returns control to the caller
  - Exactly after subroutine was called
- Calling and returning from a subroutine
  - To go to subroutine (SUB1): `BL SUB1`
  - To return to caller program `BX LR`
  - `BL` - Branch with link, `BX` - Branch and exchange

### Why `BL` and `BX` but not `B`?
- Main program branches to subroutine:
  - Can be done with `B`, but what is the draw back?
  - `B` overwrites value in PC - oldPC value in main program is lost
  - Maybe add another branch at the end of subroutine - need to know exact memory location during compilation, not effective

### Branch with Link (BL)
- `BL` used to make subroutine call
- Return address (PC contents + 4) stored in link register
- Subroutine address stored to the PC
- We can also conditionally make a functional call

### Branch with Exchange (BX)
- `BX LR` returns from subroutine
- `LR` contains the return address, the instruction copies the value over to the PC
- Note: VisUAL does not support `BX LR`, use `MOV PC, LR`

# Parameter Passing
- Calling programs need to pass parameters to influence a subroutine's execution
- Parameters must be setup properly before the subroutine is called and appropriately removed after returning
- There are 3 basic methods to pass parameters, via registers, memory block or system stack

### Parameter Passing Using Registers
- Parameters placed into registers before calling subroutine
- Number of parameters passed limited to available registers
  - Useful when number of parameters are small
  - Not all R0-R12 are preferred to pass parameters
  - R0-R3 can be used to pass argument values, also used to return values from subroutine. Subroutine can modify values
  - R4-R11 used to hold local variables. Not for passing arguments. Must be preserved in the subroutine
  - R12 - scratchpad register. Does not need to be preserved. Can be used sometimes as return register
- Pros 
  - Efficient as parameters already in register within the subroutine and can be used immediately
- Cons
  - Lack generality due to limited number of registers

### Parameter Passing Using Memory
- A region in memory is treated like a mailbox, used by both the calling program and subroutine
- Parameters to be passed are gathered into a block at a predefined memory location
- Useful for passing large number of parameters

### Parameter Passing Using Stack
- A stack is a first-in, last-out linear data structure that is maintained in the memory's data area
- System stack in ARM processor maintained by a dedicated stack pointer (**SP**, R13)
  - Stack can grow towards lower/higher memory address (Descending/Ascending stack)
  - SP points to the top item of the system stack (Full)
- The 3 basic operations on a stack are
  - Push - Push item on top of the stack
  - Pop - Remove top item from stack
  - Access - Look at top item of stack

# Operations Regarding the Stack

### Pushing Data to the Stack
- Writing to stack uses the `STR` instruction
- Remember to update the SP before storing
- `STR R0, [SP, #-4]!` Store the contents of R0 onto the stack
  - Because the stack is a descending stack, we have to increment the SP by -4 first, and then store the content

### Popping Data from the Stack
- Popping off the stack is done using `LDR`
- Remember to update SP after popping
- `LDR R0, [SP], #4` - Pop the top item off the stack, and store it into `R0`
  - We read what is pointed to by the SP first
  - Then we increment SP by 4, because it is a full descending stack

### Pushing Registers to Stack
- We want to push R0 and R1 to the stack

```
STR R0, [SP, #-4]!
STR R1, [SP, #-4]!
```

- However, there is a faster way to write this, using `STMFD` (Store multiple full descending)

```
STMFD SP!, { R1, R0 }
```

- Note the `!` on SP, means that after the operation, the SP is mutated.
- `{R0, R1}` are the registers to be stored on the stack. 
  - Order **does not matter**. `STMFD SP!, { R0, R1, R2 } == STMFD SP!, { R2, R0, R1 }`
  - The register with the **smallest** index will be on top of the stack
  - Another way to write this is `STMDF SP!, {R0-R2}`

### Popping Multiple Items off the Stack

- We use the instruction `LDMFD` (Load multiple full descending) to pop multiple items off the stack

```assembly
LDMFD SP!, { R1, R0 }
```

- Order does not matter, the register with the **smallest** index will receive the **topmost** item of the stack

Parameters pushed to the stack **must be removed** after returning back from the subroutine. If not, repeated pushing of parameters to the stack will cause a **stack overflow**. 

# Summing first N integers
- Write a program, given a number N, computes the sum $\sum_{i=1}^{N} i$

Main program:
```assembly
MOV R1, #5 ; Number of numbers = 5
MOV R0, #0x100 ; Address of the start of the data
STMFD SP!, {R1, R0} ; Store R1, R0 onto the stack
BL Sum1N ; Go to Sum1N
ADD SP, SP, #8 ; Pop the 2 registers off the stack
```

Sum1N
```assembly
Sum1N STMFD SP!, {R4, R5, R6} ; save registers to stack
      LDR R5, [SP, #16] ; Load N from stack to R5
      LDR R6, [SP, #12] ; Load answer's address from stack

      MOV R4, #0 ; Set sum to 0
Loop  ADD R4, R4, R5 ; Add current number to sum
      SUBS R5, R5, #1 ; Decrement count by 1
      BNE Loop ; Loop again if R5 != 0
      STR R4, [R6] ; Write sum to answer

      LDMFD SP!, {R4, R5, R6} ; restore saved registers
      MOV PC, LR ; Return from subrouting
```

# Transparent Subroutines

> A transparent subroutine will not affect any CPU resources used by the program calling it.

```
Start MOV R4, #0
      BL Sub1

Sub1  MOV R4, #0xFFFFFFFF
      MOV PC, LR
```

R4 has been mutated from 0 to -1 thanks to `Sub1`

# Pass by Value and Pass by Reference
- Parameters can be passed to subroutines in 2 ways

### Pass by value
- The value of the data is passed directly to the subroutine
- Original variable is not modified

### Pass by reference
- The **address** of the variable is passed to the subroutine
- Used when the parameter passed is to be modified by the subroutine
- Large quantity of data required to be passed (Arrays)

# Local Variables
- Subroutines often use local variables whose scope and life span exists only in the subroutine itself
- Data within the module is independent of the data outside the module (Loose coupling)
- Memory storage for these variables is created on entry into the subroutine, and released on exit from subroutine
- The system stack is the ideal place to create memory space for temporary variables
- This temporary memory space is called the **stack frame**
- A frame pointer is used to point to the steart of the stack frame (This is usually register R11)
