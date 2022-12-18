# Fixed and Floating Point Number System

# Range vs Precision

> Range is the interval between the smallest and the largest representable number

-   e.g. Range of 2's complement is between $[-2^{n-1}, 2^{n-1} - 1]$

> Precision is the amount of information used to represent each number

-   e.g. 1.666666 has higher precision than 1.67

# Fixed Point Representation

-   Fixed point format can represent integer/fractional values

$$
2^3, 2^2, 2^1, 2^0 (.) 2^{-1}, 2^{-2}, 2^{-3}, 2^{-4}
$$

-   Number of bits to the left of the decimal point affects the range
-   Number of bits to the right of the decimal point affects the precision
-   Bits are not fully utilised for certain values (e.g. 15.5 is 1111 1000)

## Range and Precision Tradeoff

-   Considering a constant number of bits,
-   If we decide to move the radix point from the LSB to the MSB (Increase number of decimal places)
    -   Range decreases
    -   Precision increases

E.g. +999 vs +99.9 vs +0.999

# Floating Point Representation

| Sign  | Mantissa |     | Exponent |
| ----- | -------- | --- | -------- |
| $\pm$ | 9.99     | e   | $\pm$ 99 |

-   **Sign** denotes positive/negative number
-   **Mantissa** denotes the base value
-   **Exponent** specifies position of radix point

-   Floating point representation can represent values across a wider range $[-9.99e^{99}, +9.99e^{99}]$
-   Size of **exponent** determines **range of representable numbers**
-   Size of **mantissa** and value of **exponent** determines **representable precision**
-   Small numbers can be represented with good precision
-   When representing large numbers, precision can be sacrificed to achieve greater range

## Normalisation

-   In the simple decimal floating-point format, there are multiple representation of the same value
    -   1.00e1
    -   0.10e2
    -   0.01e3
-   Normalisation is necessary to avoid synonymous representation by maintaining one non-zero digit before the radix point
    -   In decimal numbers, this digit can be from 1-9
    -   For binary, this digit should be 1

## Underflow

-   Normalisation results in underflow regions where values close to zero cannot be represented
-   Smallest positive normalised number: 1e-99
-   Smallest negative normalised number: -1e-99
-   Numbers within the range $[-1*10^{-99}, 1*10^{-99}]$ cannot be represented

# IEEE 754

$$
(-1)^S * (1.F)_2 * 2^{E - Bias}
$$

-   Found in every computer since 1980
-   Simplified porting of floating-point numbers
-   Unified the development of floating-point algorithms

-   Single precision floating-point numbers (32-bits)
    -   1-bit sign + 8-bit exponent + 23 bit fraction
-   Double prevision floating-point numbers (64-bits)
    -   1-bit sign + 11-bit exponent + 52-bit fraction

### Sign bit (S)

-   S = 0 (positive), S = 1 (negative)

### Exponent (E)

-   Biased representation (0000 0001 to 1111 1110)
-   Value of exponent = E - bias
-   Bias = 127 for single precision, and 1023 for double precision

### Fraction ($1.f_1 f_2 ... f_n$)

-   Assume a hidden 1 (not stored) for normalised numbers
-   Value of normalised floating point number is
    -   $(-1)^S * (1 + f_1 2^{-1} + f_2 2^{-2} + \cdots )_2 * 2^{E - Bias}$

E.g. the decimal value of the following single precision numbers

-   0 10110010 11100000000000000000000
    -   Sign is 0
    -   Exponent is $1011 0010_2 - 0111 1111_2 = 011 0011_2 = 51_{10}$
    -   Fraction is $1.111_2 = 1.875_{10}$
    -   Hence the number is $1.875 * 2^{51}$
-   1 00001100 01010000000000000000000
    -   Sign is 1
    -   Exponent is $0000 1100_2 - 0111 1111_2 = -115_{10}$
    -   Fraction: $1.0101_2 = 1.3125_{10}$
    -   Hence the number is $-1.3125 * 2^{-115}$

### Representable Range for Normalised Single Precision

-   In normalised mode, exponent ranges from 0000 0001 to 1111 1110

### Smallest magnitude normalised number

| Sign | Exponent  | Fraction                     |
| ---- | --------- | ---------------------------- |
| 0    | 0000 0001 | 0000 0000 0000 0000 0000 000 |

-   Smallest exponent = $1_2 - 0111 1111_2 = -126_{10}$
-   Smallest fraction: $(1.00000...)_2 = 1_{10}$
-   Value in decimal: $1*2^{-126}$

### Largest magnitude normalised number

| Sign | Exponent  | Fraction                     |
| ---- | --------- | ---------------------------- |
| 0    | 1111 1110 | 1111 1111 1111 1111 1111 111 |

-   Largest exponent = $1111 1110_2 - 0111 1111_2 = 127_{10}$
-   Largest fraction = $(1.1111...)_2 \approx 2$
-   Value in decimal = $2*2^{127} = 2^{128}$

| Negative overflow | Denormalised        | Denormalised       | Positive Overflow |
| ----------------- | ------------------- | ------------------ | ----------------- |
| $<-2^{128}$       | $-2^{-126} < x < 0$ | $0 < x < 2^{-126}$ | $> +2^{128}$      |

### Special Encodings for IEEE 754

| Mode               | Sign | Exponent               | Fraction       |
| ------------------ | ---- | ---------------------- | -------------- |
| Normalised         | 1/0  | 0000 0001 to 1111 1110 | Anything       |
| Denormalised       | 1/0  | 0000 0000              | Non-zero       |
| Zero               | 1/0  | 0000 0000              | 0000 ... 0000  |
| Infinity           | 1/0  | 1111 1111              | 0000 .... 0000 |
| NaN (Not a number) | 1/0  | 1111 1111              | Nonzero        |

# Fixed Point vs Floating Point Number System

-   Given the same number of bits to represent the data (32-bits)

|               | Floating Point                      | Fixed Point                   |
| ------------- | ----------------------------------- | ----------------------------- |
| Max Range     | $2\*2^{128}, (-2^{128}, 2^{128}), $ | (Radix right of LSB) $2^{32}$ |
| Max precision | $2^{-126}$ (near zero)              | (Radix left of MSB) $2^{-32}$ |

-   Floating point yields a larger range and better precision at small numbers with the same number of bits representation
-   One usually needs the best precision when the numbers are small
-   However, fixed point number has the advantage of having uniform prevision across the entire range
-   Floating point precision changes across the range and very coarse precision at the 2 ends of the range may not be desirable for the intended algorithms
    -   E.g. The precision at $9.99*2^{99} vs 1.01*2^{-99}$

# Computer Arithmetic Considerations When Coding

-   Addition/Subtraction
    -   Addition/Subtraction will cause result to increase/decrease
    -   When done sufficient amount of times, overflow at min/max end of representable range will eventually occur
    -   Take note of the range of the data type used when coding in high level languages, or the width of registers/memory when coding in assembly
-   Multiplication
    -   Multiplication in binary is similar to arithmetic left shift
    -   Overflow at min/max end of the representable range
    -   Similarly considered as add/sub
-   Division
    -   Division in binary is similar to arithmetic right shift
    -   Trucation of LSB leads to loss in precision
    -   Reduces the magnitude of the result so it get further away from min/max range

# Effects of Rounding

-   Rounding refers to the removing of LSB(s) so that the result can fit into the representable bits
-   Round up, round down, or round to the nearest representable number
-   The limits imposed in the width of the representable bits could be from the registers width, data bus etc.
-   As rounded numbers are only an estimation of the raw result, a certain amount of **rounding error** is incurred
    -   E.g. 1.686e01 -> 1.69e01
    -   Error of 0.004e01
-   Common to have **intermediate register with width larger than regular data registers** to allow intermediate processing to be done at higher precision, reducing amount of rounding error

## Rounding Error Mitigation

-   When adding/subtracting 2 numbers, the exponents must be aligned such that they are the same
    -   1.23e1 + 4.56e0 = 1.23e1 + 0.45e1 = 1.68e1
    -   Rounding error (0.006e1) due to alignment of exponent values
    -   To improve accuracy, guard digits (bits) are used to maintain precision during floating point computations
    -   An intermediate register with a wider width could also be used
    -   1.23e1 + 4.56e0 = 1.230e1 + 0.456e1 = 1.686e1 = 1.69e1
    -   Rounding performed on result to ensure the result fits into the 3 significant digits in teh mantissa
    -   Rounding error of 0.004e1

# Handling Numbers with Different Magnitudes

-   Suppose we want to compute 1.23e3 + 1.00e0 + 1.00e0 + 1.00e0 + 1.00e0 + 1.00e0

| Numbers   |
| --------- | -------------- |
| 1.23e3    |                |
| + 0.001e3 | Align exponent |
| = 1.231e3 |                |
| = 1.230e3 | Rounding       |
| + 0.001e3 | Align exponent |
| ...       | ...            |
| = 1.231e3 |                |
| = 1.230e3 | Rounding       |

-   We can rearrange the equation as 1.00e0 + 1.00e0 + 1.00e0 + 1.00e0 + 1.00e0 + 1.23e3
-   Now we compute in the first few terms first
-   1.00e0 + 1.00e0 + 1.00e0 + 1.00e0 + 1.00e0 = 5.00e0
-   And now we can calculate 5.00e0 + 1.23e3 = 0.005e3 + 1.230e3 (Aligning) = 1.235e3 = 1.24e3 (Rounding)

# Maximising Accuracy During Computation

-   2 issues: overflow and precision
-   Addition/Subtraction/Multiplication may lead to overflowing the range of representable number used
-   Division will lead to a loss in precision due to truncation of LSB(s)
-   Some general guidelines
    -   Accumulate/subtract numbers that have a smaller magnitude first to allow their magnitude to be comparable to the larger magnitude numbers
    -   Take note of the range of the number system used, depending on the usage scenario. The range can depend on the data type, number format, register/memory width etc
    -   Apply threshold to check for overflow if possible
    -   If no overflow checks are done, take note of the number/value accumulation that can be done without triggering overflow
    -   To preserve as much as possible, always do division last as far as possible
