# Switches and Loops
- Assembly code compiled from switch statements vary between compilers and depends on the nature and range of the case values

1. Running values in a narrow range

```c
switch(x) {
    case 0: {
        S0;
        break;
    }

    case 1: {
        S1;
        break;
    }

    case 2: {
        S2;
    }
}
```

2. Random values with a wide range
```c
switch(x) {
    case 1: {
        S0;
        break;
    }

    case 10: {
        S1;
        break;
    }

    case 100: {
        S2;
    }
}
```

# Running and Narrow Values

```c
if (x == 0) {

} else if (x == 1) {

} else if (x == 2) {

}
```

This is a standard if-else cascade. It is **not efficient** if there are many cases and x is large. 

If cases are consecutive narrow range values, a **Jump Table** is used to avoid testing each case in turn.
- Jump table contains a list of **start addresses** for each code segment associated with each case value
- `x` acts as an **offset** into the table to access the corresponding start address
- Start address loaded into `PC` to execute the required code segment

```assembly
MOV R1, #0x90 ; Start address of jump table
LDR PC, [R1, R2, LSL#2] ; Go to the corresponding entry in the jump table
```

- Each consecutive address in the jump table is offset by 4, and a `LSL` by 2 bits multiplies `R2` by 4

*Note: `x = R2`*

# Random and Wide Values
- If cases are random wide range values, a **fork algorithm** is used to speed up the average seasrch time and avoid testing every case 
- Due to the wide value spread, the jump table size will be too large. Cascaded if-else statements will be more efficient

Example of forking algorithm:
```c
if (x <= 10) {
    if (x == 1) {
        S0;
    } else if (x == 10) {
        S1;
    }
} else {
    if (x == 100) {
        S2;
    } else if (x == 1000) {
        S3;
    }
}
```

# Loops

Loop constructs are distinguished by the position of their conditional test
1. Pre-test (Condition tested before the loop, `while`)
2. Post-test (Condition tested after the loop, `do-while`)

Pre-test loops may never execute, while post-test loops will always execute the loop at least once.

# While Implementation
```c
while (x > 0) {
    loop;
}
```

```assembly
Back    CMP X, #0
        BLE Exit
        ; Loop
        B Back
Exit
```

# Do While Implementation
```c
do {
    loop;
} while (x > 0)
```

```assembly
Back    ; Loop
        CMP X, #0
        BGT Back
```

Post-test loops are more efficient than pre-test loops because there is no need for an additional unconditional jump

# For Loop Implementation

```c
for (int n=0; n<5; n++) {
    loop;
}
```

```assembly
        MOV R0, #0
Back    CMP R0, #5
        BGE Exit
        ; Loop
        ADD R0, R0, #1
        B Back
Exit
```

The `for` loop is a pretest loop. However, if the loop segment is executed and the count `n` is not used in the loop segment, compilers optimise by implementing a post-test loop by decrementing the counter instead, and testing for zero

```assembly
        MOV R0, #5
Back    ; Loop
        SUBS R0, R0, #1
        BNE Back
```