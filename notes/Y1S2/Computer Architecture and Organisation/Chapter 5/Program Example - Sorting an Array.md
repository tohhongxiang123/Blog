# Program Example - Sorting an Array

```assembly
DataArea	EQU		0x00000100	;data area starts at 0x0100
N_Size	EQU		7			;declare size of N-Array
N_Array	DCD		0x00000010	;start of N-array, decimal (16)
N_2		DCD		0x00000003   	;decimal (3)
N_3		DCD		0xFFFFFFFF	;decimal (-1)
N_4		DCD		0x00000003	;decimal (3)
N_5		DCD		0xFFFFFFFD	;decimal (-3)
N_6		DCD		0x00000020	;decimal (32)
N_7		DCD		0xFFFFFFEE	;decimal (-18)

		MOV		R0, #DataArea ;Start of array
		MOV		R1, #N_Size ;Length of array

		MOV		R3, R0 ; Pointer to current element of array
		MOV		R2, R1 ; Initialise current loop coutner

Loop	SUBS	R2, R2, #1 ; Decrease current loop counter by 1
		BEQ		Out ; Go to outer loop if current loop counter is 0

		LDR		R4, [R3] ;Get current element in array
		LDR		R5, [R3, #4]! ; Increment current element pointer and get next element in array

		CMP		R4, R5 ;
		BLT		Loop 	; If first element smaller than second element, continue to next

		STR		R4, [R3]
		STR		R5, [R3, #-4] ; Swap the 2 if theyre out of order
		B		Loop

Out		MOV		R3, R0 ; Reset pointer to start of array
		SUB		R1, R1, #1 ; Decrease remaining length required by 1
		MOVS		R2, R1 ; Initialise current loop coutner
		BNE		Loop ; If remaining array length is not 0, complete

Complete	END
```
