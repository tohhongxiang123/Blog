# Program Example - Finding the Largest Number

Write an assembly language program to find the largest unsigned value in an integer array and store the result in register R3. The array consists of 10 unsigned integers stored starting at address 0x100

```
        MOV R0, #0x100 ; Store starting address in R0
        MOV R1, #10 ; 10 numbers to loop through
        MOV R3, #0 ; Store 0 to R3
        
Loop    CMP R3, [R0] ; Compare R3 with number at address pointed by R0
        BLS Small ; If R3 <= [R0], Go to Small
        STR R3, [R0] ; Store [R0] in R3
Small   ADD R0, R0, #4 ; Increment R0 by 4
        SUBS R1, R1, #1 ; Subtract 1 from loop counter
        BNE Loop ; If loop counter is not 0, continue looping
```

We can further optimise it by
1. We assume the first value of the array is the max, and we can reduce the number of loops by 1
2. We can remove `ADD R0, R0, #4` by using auto indexing (However we will need to add another register)
3. We can remove BLS Small using **conditional execution**

```
        MOV R0, #0x100 ; Store starting address in R0
        MOV R1, #9 ; 9 numbers to loop through
        LDR R3, [R0] ; Store first number to R3
        
Loop    LDR R2, [R0, #4]! ; Store current number into R2, and autoindex to next element
        CMP R2, R3 ; Compare R3 with number at address pointed by R0
        MOVHI R3, R2 ; Store R2 into R3 if R2 > R3
Small   SUBS R1, R1, #1 ; Subtract 1 from loop counter
        BNE Loop ; If loop counter is not 0, continue looping
```

# Conditional Execution 
- ARM instruction can be conditionally executed based on CC flag
- For example `MOVEQ R1, R2` only executes `MOV` if `R1 == R2`