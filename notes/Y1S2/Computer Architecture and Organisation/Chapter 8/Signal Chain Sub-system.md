# Signal Chain Sub-System

Transfer of information from the real world into the processor and vice versa

-   Analog to Digital Conversion - Digital to Analog Conversion (ADC-DAC)
-   Parallel and Serial (UART/SPI) Digital Interfaces
-   Interrupt Controller
-   Direct Memory Access Controller

Real world signals are **analog** in nature

-   Continuous voltage level, continuous in time domain
-   In the past most processing were done in analog
-   With introduction of digital processing and decreasing cost to build them, digital processing became more popular as it offered **flexibility in implementation**, and **more tolerant to noise and component aging**

Digital signals are **discrete time representation** of analog signals

-   Obtained through process of digitisation, commonly known as **Analog-to-Digital Conversion**
-   Analog signals are digitzed to its digital equivalent using an Analog-to-Digital Converter (ADC)
-   Digital signals have discrete voltage levels
-   Analog signals can be reconstructed from digital signals via **Digital-to-Analog Converters** (DAC)

### Converting Digital to Analog

-   Digital signal obtained by sampling analog signal level at discrete times (sampling interval)
-   Sampling frequency needs to be at least twice the signal frequency ([Nyquist theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem))
-   Typically the analog signal level is assigned the nearest discrete level allowed in that particular digitisation process
-   Analog signals can be reconstructed back by applying a filter on the digital signal

# Electrical Signal Interface

Interface - A boundary where 2 or more devices meet to exchange information. Some modes of connection include

-   Single bit data transfer (Serial)
-   Multiple-bit Data transfer (Parallel)

For each mode, the connection could be single-directional or bi-directional

-   Semiconductor devices interface to the outside world via pins
-   Depending on device design and configuration, these pins are either input/output/bi-directional (both input and output)

# Interface Compatibility

-   Interfacing one electronic device to another requires compatibility in
    -   Electrical signal level
    -   Communication protocol (Handshaking and Data signals)

### Electrical Signal Level

-   Output voltage level of output device < max allowable input voltage of input device
-   Else, device will get "fried", or reduce reliability
-   4 important parameters to take note

| Parameter                 | Description                                        |
| ------------------------- | -------------------------------------------------- |
| VOH (Voltage Output High) | Transmitting logic 1 yields a signal level >= VOH  |
| VOL (Voltage Output Low)  | Transmitting logic 0 yields a signal               |
| VIH (Voltage Input High)  | Receiving a signal >= VIH is recognised as logic 1 |
| VIL (Voltage Input Low)   | Receiving a signal <= VIL is recognised as logic 0 |

### Differential Signals vs Single-ended Signalling

-   Single-ended signalling - The simplest and most common method to transmit electrical signals over wires
-   One wire carries a varying voltage, the other wire is connected to a reference voltage, usually **ground**
-   Receiver responds to **difference** in wire signal and ground
-   **Fewer** wires required than differential signalling (For n signals, differential signalling requires 2n wires, single-ended signalling requires n+1)
-   Unable to reject noise

-   Differential Signal - A method for electrically transmitting information using 2 complementary signals.
-   2 signals are sent, and the receiver responds to the **difference** between the 2 signals
-   **Better noise tolerance** so is able to be clocked at a higher frequency
-   Requires more wires

### Communication Protocol

-   Communication Protocols refers to how the data is formatted during transmission.
-   Some factors include
    -   Number of bits in a transmission frame
    -   What synchronisation to use
    -   Data width
    -   Types of data and its formatting
-   Examples of communication protocols: USB, UART, SPI
