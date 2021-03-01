# Serial Data Transfer

- Data is transferred one bit at a time
- Less affected by signal skew and crosstalk, able to support higher frequency clocking
- Lower transfer rate

# Pros and Cons

### Pros
- Less affected by signal skew and crosstalk
- Able to transfer data reliably over a longer distance
- Lower cost since less wires/connectors required

### Cons
- Lower data transfer rate due to only having 1 data bus
- Hardware interface design more complex as it needs to handle serial to parallel conversion

There are 3 types of data transfer modes
1. Simplex: Data transfer in 1 direction
2. Half-duplex: Data transfer in both directions, but RX (receiving) and TX (transmitting) is mutually exclusive (Only 1 can occur at a time)
3. Full-duplex: Simultaneous RX and TX

# Synchronous and Asynchronous
- If there is a common clock signal between transmitter and receiver, then the communication is **synchronous**. Else, it is **asynchronous**
- In synchronous transmission, the common clock signal is used to synchronise the data transfer (E.g.receiver to latch in the data on the rising edge of the clock)
- In asynchronous transmission, no common clock signal. Hence devices have to agree on a pre-fixed clock frequency to use for data transfer

# Synchronous Serial Transfer
- Common clock signal between transmitter and receiver to synchronise the data transfer
- Master-Slave configuration, with master providing the clock signal
- Potentially allows faster transfer rate since no data overhead is needed to synchronise the transfer

# I2C and SPI Bus
- Popular serial buses used by processor to transfer data and control peripheral devices
  - Accelerometers
  - Temperature sensors
  - Touch screen controllers

Note: I2C not covered here

# SPI Bus

An SPI master is connected to 1 or more SPI slaves. Each SPI device has 
- CS/SS - Chip select/Slave select. Needs to be enabled before any other function is enabled
- SCLK - Signal Clock
- MOSI - Master out slave in
- MISO - Master in slave out

To start transfer
- Slave select (SS) put to low
- Data on MOSI and MISO latched in on rising/falling edge of clock (Configurable)
- Allows multiple slaves via the use of multiple Slave Selects

# Asynchronous Serial Data Transfer
- No common clock provided between transmitter and receiver
- Prior to transmission, the receiver needs to know the transmitting clock rate and number of bits that are to be transferred with each data packet
- Special SYNC words to indicate START/STOP condition
- Upon receiving START SYNC word, the receiver then use its own local clock to track the timing
- Potential skew issue between 2 local clocks as transmission progress
- Asynchronous Transmission typically also uses SYNC word/bits to provide occasional timestamps for receiver to synchronise its clock to the transmitter clock (reduces clock skew between 2 clocks)

# Universal Asynchronous Receiver Transmitter (UART)
- Most commonly used serial interface

- During IDLE state, data line is in logic 1
- Transmitter sends a START pattern (logic 0) to alert the receiver
- Sending 0 from idle will result in a falling edge on the data line. Used by receiver to detect start of transmission
- Followed by actual DATA at a frequency known to the receiver. The transmitting clock rate is known as the **baud rate**, determines number of bits transmitted per second
- PARITY bit (optional) also sent for the receiver to check integrity of data packet
- STOP (Logic 1) terminates the transmission.

### Parity Bit
- If parity scheme is enabled, receiver will sample the parity bit and check for parity error
- If even parity scheme is used, there shoudl be an even number of 1's in the data field and parity field
- Hence, if odd number of 1's is received in an even parity scheme, **parity error** is flagged, meaning one or more bits in the transmission is wrong

- If the receiver then samples the STOP bit, if a 0 is detected instead of 1, the receiver flags a **framing error**

# UART Receive
- Receiver monitors data line for start bit. In real world design, falling edge on the data line will trigger an interrupt in the microprocessor to start the receveing process
- Need to know baud rate in order to sample the data correctly
- Baud rate determined by length of start signal received, compared to the internal clock
- Internal clock of UART typically run at a multiple (Usually 16x) of the baud rate so as to time the sampling close to the middle of each data bit