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