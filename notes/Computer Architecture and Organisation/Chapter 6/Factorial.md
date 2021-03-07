# Factorial

Calculate N!, where N is stored in R0. The result is stored in R12

Using a stack and iterative multiplication

```assembly
START	MOV		R0, #7
		STMFD	SP!, {R0}
		BL		Fact
		LDMFD	SP!, {R0}
		End
		
Fact		; Calculates n!, where n is the top of the stack
		STMFD	SP!, {R4-R6, LR}
		
		LDR		R4, [SP, #16] ; Read n
		
		CMP		R4, #1 ; If n < 1
		MOVLT	R12, #1 ; return 1
		LDMFDLT	SP!, {R4-R6, LR} ; restore everything
		MOVLT	PC, LR ; exit function
		
		SUB		R5, R4, #1
		STMFD	SP!, {R5} ; Store n-1 onto the stack
		BL		Fact
		MOV		R6, R12 ; Move result of (n-1)! to r6
		LDMFD	SP!, {R5} ; and restore
		
		STMFD	SP!, {R4, R6} ; push n and fact(n-1) onto the stack
		BL		Mult ; calculate n*fact(n-1)
		LDMFD	SP!, {R4, R6} ; restore
		
		LDMFD	SP!, {R4-R6, LR}
		MOV		PC, LR
		
Mult		; Multiplies the top 2 numbers on the stack
		STMFD	SP!, {R4-R5}
		
		LDR		R4, [SP, #8] ; Load x
		LDR		R5, [SP, #12] ; Load y
		MOV		R12, #0
		
		CMP		R5, #0 ; if y is 0, finish
		BEQ		Complete
Loop	ADD		R12, R12, R4 ; add x y times
		SUBS		R5, R5, #1
		BNE		Loop
		
Complete	LDMFD	SP!, {R4-R5}
			MOV		PC, LR
```

However, we can improve this using [bit shift multiplication](https://stackoverflow.com/questions/2776211/how-can-i-multiply-and-divide-using-only-bit-shifting-and-adding), rather than iterative addition multiplication. This reduces the number of cycles spent within multiplication

```assembly
Mult		; Multiplies the top 2 numbers on the stack
		STMFD	SP!, {R4-R7}
		
		LDR		R4, [SP, #20] ; Load x
		LDR		R5, [SP, #16] ; Load y
		MOV		R7, #0 ; n
		MOV		R12, #0 ; result

; Add using bit shifting https://stackoverflow.com/questions/2776211/how-can-i-multiply-and-divide-using-only-bit-shifting-and-adding
Loop	ANDS		R6, R5, #1 ; check the last bit
		ADDNE	R12, R12, R4, LSL R7 ; add r4 left shifted by n bits if the last bit checked was 1
		ADD		R7, R7, #1 ; add 1 to n
		MOVS		R5, R5, LSR #1 ; shift right 
		BNE		Loop
		
Complete	LDMFD	SP!, {R4-R7}
		MOV		PC, LR
```