# Programming Languages and Translation

# High vs Low-Level Languages

We usually write code in **high-level** languages, such as

-   Python
-   C++
-   Fortran
-   Java
-   Etc.

A compiler is used to convert high-level instructions to a low-level language that the machine can implement. Low level languages include

-   ARM
-   MIPS

The computer stores all data as binary information (0's and 1's), which includes instructions. We use a compiler to translate our code and symbols into instructions specific to a machine's instruction set and architecture. For example, take the following C code in the file `simple.c`:

```c
int main() {
    int x=10,y=15;
    return 0;
}
```

By compiling the code using

```
gcc -S simple.c
```

We can see how the compiler actually converts the code into assembly, in the file `simple.s`

```assembly
.globl main
    .type main, @function
main:
    pushq %rbp
    movq %rsp, %rbp
    movl $10, -8(%rbp)
    movl $15, -4(%rbp)
    movl $0, %eax
    leave
    ret
```

The compiler turns this into instructions specific to a machine's instruction set. Machines have a limited vocabulary of their own, and these instructions map to specific actions that they can execute. For example: `ADD`, `JMP`, `STR` etc.

We can consider these instructions to still be readable, but less so.

From the assembly code, each instruction can be mapped to a specific binary code that refer to the specific machine's operations, memory locations and numerical representations.

## Interpreted vs Compiled Code

More recently, another model has emerged for translating high-level instructions. Code is read in small pieces and translated on the fly is called **interpreted** code.

### Compiled Languages

C++ is a compiled language, which means that the code is **compiled** by a compiler into a low-level language, and the instructions for a C++ program are compiled for a **specific instruction set** (i.e. specifically for your machine). This means that the lines execute more quickly, and can be optimised during compile process to become more efficient

However, code is not portable, as a distinct version needs to exist for every type of instruction set architecture. For example, C++ code compiled on Windows will not run on Linux.

Python is an intepreted language. These instructions are translated on the fly, which means that our code is machine-independent. However, for portability, we have sacrificed speed.

Java goes through a hybrid process. Java is compiled to an intermediate stage called **bytecode**, which can be run on any machine by the Java Virtual Machine (JVM), which does **just-in-time translation** of bytecode to machine code. The JVM knows the specifics of the machine it is running on, hence it runs faster than an intepreted language like python. This model does allow for machine-independence,
and runs faster because it has been pre-compiled.

Which language you choose is based on what you want to do, because each has its own advantages and disadvantages for particular tasks.

# Extra Resources

-   [How do computers read code?](https://www.youtube.com/watch?v=QXjU9qTsYCc)
-   [#67 Python Tutorial for Beginners | is Python Compiled or Interpreted Language?](https://www.youtube.com/watch?v=0BhSWyDEDC4)
-   [Compiled vs Interpreted Programming Languages - C++, Rust, Go, Haskell, C#, Java, Python, Javascript](https://www.youtube.com/watch?v=y6VvxGHCxa4)
