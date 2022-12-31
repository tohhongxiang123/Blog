# If

- How is `if` implemented in assembly? From the C code:

```c
if (a > b) {
    f();
}
```

Converted to assembly

```assembly
    CMP a, b
    BGT f
    B Skip

f   ; Do something

Skip ...
```

However the above can be simplified by **reversing the condition**

```assembly
    CMP a, b
    BLT Skip

f   ; Do something

Skip ...
```

# Conditional Execution

ARM supports conditional execution based on CC flags

For example,

```assembly
        CMP R0, #1
        BNE Skip
        MOV R1, #3
Skip    ...
```

This code `MOV`s a 3 into `R1` if `R0 == 1`. We can optimise this by replacing the branch with a conditional execution instruction

```assembly
        CMP R0, #1
        MOVEQ R1, #3
Skip    ...
```

Conditional execution works with multiple instructions as long as status registers are not altered from the comparison instruction

# If-Else

How is if-else implemented in assembly? Consider the following C code

```c
if (a == 3) {
    S1();
} else {
    S2();
}
```

In assembly:

```assembly
        CMP a, #3
        BEQ S1
S2      { Do s2 here }
        B Skip
S1      { Do s1 here }
Skip    { Do things after the if-else }
```

If equality is true, we would run 4 lines of code, while if equality is false, we would run 5 lines of code. Hence we should **not reverse the condition if condition is likely to be met**

If we reverse the condition instead:

```assembly
        CMP a, #3
        BNE S2
S1      { Do s1 here }
        B Skip
S2      { Do s2 here }
Skip    { Do things after the if-else }
```

If the equality is true, 5 lines of code run. If equality is false, 4 lines of code run. Hence we should **reverse the condition if condition is unlikely to be met**

This improvement in speed is less pronounced if `S1` and `S2` are both very long (1000 vs 1001 lines of code)

# Compound Logical Statements

### Compound AND statements

Consider the following

```c
if ((a == b) && (b > 0)) { S1; }
```

Compilers resolve compounnd ANDs by negating the statements

```c
        if (a != b) then skip;
        if (b <= 0) then skip;

        {S1;}

Skip
```

- Conditions are tested **left to right** in order given by the C program.
- The first false condition means that the remaining conditions do not need to be computed. This is called **fast Boolean operation**
- Keep the least likely condition to be **leftmost** to improve speed

```assembly
        CMP a, b
        BNE Skip
        CMP b, #0
        XXXGT XXXX ; S1
Skip
```

### Compound OR statements

Most compilers handle compound or statements by reversing the last conditional test.

```c
if ((a == 1) || (a == 2)) { S1; }
```

```c
        if (a == 1) then DoIf;
        if (a != 2) then Skip;
DoIf    { S1 }
Skip    ...
```

- The condition that is most likely to be true should be the **leftmost** condition

```assembly
        CMP a, #1
        BEQ DoIf

        CMP a, #2
        BNE Skip

Doif    { S1 }
Skip    ...
```

This can be simplified even further with conditional execution

```assembly
        CMP a, #1
        BEQ DoIf

        CMPNE a, #2 ; If a != 1, compare if a == 2

Doif    XXXEQ XXXX ; S1. If a == 2, then execute this statement
Skip    ...
```

# Branchless Logic

- Branchless logic avoids using conditional jump instructions when implementing logical constructs
- `Bcc` instructions may result in costly **flushing** operations when the wrong instruction is prefetched

### How to implement branchless logic?

1. Exploit arithmetic relationships to transform the test case into the desired outcome
2. Conditional execution statements to avoid branching
