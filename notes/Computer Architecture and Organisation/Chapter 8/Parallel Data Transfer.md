# Parallel Data Transfer
- Multiple bits of data transferred simultaneously between 2 devices
- Synchronous in nature as some sort of **strobe signal** is required to inform the receiver when to latch in the data
  - A strobe signal is a signal used to validate data or other signals on adjacent parallel lines
- Able to achieve higher transfer rate than serial interface
- More prone to signal skew and crosstalk
  - Crosstalk: Signal transmitted on one circuit creates an undesired effect in another circuit

### Signal Skew

![Signal Skew](http://1.bp.blogspot.com/-em8H-CwygxA/Vp8ozoVZhbI/AAAAAAAAA5Q/iCScfgPUp8M/s1600/Clock%2BSkew.JPG)

- Signal Skew is the phenomena where the same sourced clock signal arrives at different components at different times.
- May result in the wrong data being read
- Is caused by variation in propagation delay between signals from the same data bus
- Capacitance and resistance of the physical data line is a major contributor to circuit propagation delay
  - Larger resistances and capacitances lead to larger delay ($\tau = RC$)
- Variation in resistance and capactiance of the signal lines can be due to
  - Variation in PCB trace length/width
  - Connecting active components to some of the signal lines

### Crosstalk

![Crosstalk](https://networkencyclopedia.com/wp-content/uploads/2019/09/crosstalk.jpg)
- Crosstalk is the phenomena that signal transmitted from one circuit creates an undesired effect in another circuit
- In a parallel bus context, the close placement of data lines in PCB routing enables the effect of electrical signal in one trace/wire to be coupled over to the other, creating undesired interference
- Crosstalk can be transmitted electrically or via electromagnetic radiation

# Pros and Cons

### Pros
- Fast data transfer rate
- Hardware interface design tend to be simpler as only strobe signals are required

### Cons
- Affected by signal skew and crosstalk, limits the maximum clocking speed and transfer distance
- Hardware can be bulky if data width is large
- More space to route PCB traces
- Higher hardware cost compared to serial data implementation
