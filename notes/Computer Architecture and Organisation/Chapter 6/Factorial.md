# Factorial

Calculate N!, where N is stored in R0. The result is stored in R12

```assembly
		MOV		R0, #3
		BL		Fact
		END
		
Fact	; Calculate R0!
		STMFD	SP!, {R4, LR}
		MOV		R4, R0 ; Initialise n
		CMP		R4, #1 ;
		BGT		Gt1 ; If R4 > 1, go to Gt1
		
		MOV		R12, #1 ; If R4 <= 1, return 1
		LDMFD	SP!, {R4, LR}
		MOV		PC, LR
		
Gt1		STMFD	SP!, {R0, R1} ; Save R0, R1
		
		MOV		R0, R4
		SUB		R0, R0, #1 ; Load n-1 in R0
		
		BL		Fact ; Calculate fact(n-1)
		MOV		R1, R12 ; Move result to R1
		
		BL		Mult ; Calculate n * fact(n-1)
		
		LDMFD	SP!, {R0, R1} ; Restore R0, R1
		
		LDMFD	SP!, {R4, LR}
		MOV		PC, LR
		
Mult ; Multiply R0 and R1, puts into R12
		STMFD	SP!, {R4, R5, LR} ; Save registers
		MOV		R4, R0 ; Initialise first number
		MOV		R5, R1 ; Initialise second number
		
Loop		ADD		R12, R4, R12 ;
		SUBS		R5, R5, #1 ;
		BNE		Loop ; Add first number to itself second number times
		
		LDMFD	SP!, {R4, R5, LR} ; Restore registers
		MOV		PC, LR ; Return
```