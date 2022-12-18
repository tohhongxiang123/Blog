# Data Alignment

Most computer systems have restrictions on the allowable address for accessing various data types

-   Multi-byte data must be aligned to addresses that are multiple of values such as 2, 4, 8
-   Programs written with Visual C++ or GNU (gcc) and compiled for a 64-bit Intel processor uses the following data alignment enforcement

| Data Type | Size (Bytes) | Example of allowable start addresses due to alignment |
| --------- | ------------ | ----------------------------------------------------- |
| char      | 1            | 0x...00, 0x...01, 0x...02                             |
| short     | 2            | 0x...00, 0x...02, 0x...04                             |
| int       | 4            | 0x...00, 0x...04, 0x...08                             |
| float     | 4            | 0x...00, 0x...04, 0x...08                             |
| double    | 8            | 0x...00, 0x...08, 0x...10                             |
| pointer   | 8            | 0x...00, 0x...08, 0x...10                             |

[How to determine the required memory alignment](http://www.mathcs.emory.edu/~cheung/Courses/255/Syllabus/7-M68000/align.html)

# Memory Interfacing and Data Alignment of the Intel Pentium 4

Main memory consist of multiple 8-bit memory modules required to make up 64-bit data word size of processor

-   Data width selected by additional control lines

By aligning memory properly, we can read all 8 bits with 1 cycle. However, if data is not aligned, we will require 2 read cycles.

Data padding (addition of meaningless bytes) is used by compilers to ensure alignment of different data types within a structure. However it is wasteful as it stores meaningless data.
