# Volatile Memory

# Random Access Memory (RAM)

### Static RAM (SRAM)

- Data stored as long as power is applied
- Large (4-6 transistors per cell)
- Fast
- Low power consumption (Active and Standby)

### Dynamic Random Access Memory (DRAM)

- Periodic refresh required
- Small (1-3 transistors per cell)
- Slower
- Higher power consumption due to need for periodic refresh operation to maintain data integrity of memory cells

# SRAM Access

| I/O in SRAM        | Function                                         |
| ------------------ | ------------------------------------------------ |
| Address bus        | Specify address of memory location to read/write |
| Data bus           | Specify data to be read/written (8/16/32 bits)   |
| Chip Select (CS)   | Enable/disable the chip                          |
| Write Enable (WE)  | Allow/disallow data to be written                |
| Output Enable (OE) | Allow/disallow SRAM to output data               |

Components in SRAM include

- Memory array
- SRAM cells
- Control circuitry
- Decoders
- Sense amplifiers
- Input/Output multiplexers

### SRAM Cell

- Memory cells are organised in arrays (rows) and accessed via word lines and bit lines
- Each individual SRAM Bit consists of 6 transistors

![SRAM Cicruit Diagram](https://www.researchgate.net/profile/Shilpi-Birla/publication/271304374/figure/fig1/AS:601138848100352@1520334078583/Conventional-6T-SRAM-Cell-7.png)
![SRAM Cell Diagram](https://upload.wikimedia.org/wikipedia/commons/9/9d/SRAM_Cell_Inverter_Loop.png)

- Word line (WL) derived from address decoder output. It controls the read/write process
- The actual data are placed on the differential bit lines (BL and BLB), which are connected to the data bus
- The data bit is stored in M1, M2, M3, M4 (Equivalent to the 2 invertors)
- M5, M6 are pass transistors (A transistor used as a switch to pass logic levels between nodes of a circuit, instead of as a switch connected directly to a supply voltage.)

# DRAM

![DRAM Circuit Diagram](https://www.allaboutcircuits.com/uploads/articles/intro_to_DRAM1.png)

- Single Transistor design
- DRAM uses a **capacitor** as a storage element
- Transistor is used to control charges flowing in and out of the capacitor during read/write process

### Write Process

- To store logic '1': Enable transistor, and transfer charge to capacitor
- To store logic '0': Enable transistor, discharge the capacitor

### Read Process

- Enable transistor, and measure capacitor charge with a sense amplifier

### Maintaining Data Integrity

- DRAM read process destroys information stored in capacitor
- The process of measuring charges on a capacitor also discharges the capcitor, effectively destroying data. Hence, original data needs to be re-written after every read
- Capacitors also "leak" over time, hence a **periodic refresh** is required
- The basic DRAM is obsolete in the market today, replaced by a synchronous version called **Synchronous DRAM (SDRAM)**
- SDRAM uses a clock signal from the host to synchronise data transfer, enabling faster transfer rates. SDRAM also has a pipeline architecture to allow faster, overlapping operations
- Other enhancements of SDRAM includes its double data rate versions DDR, DDR2, DDR3, DDR4 SDRAM, which can reach transfer speeds of more than 2G transfers per second
