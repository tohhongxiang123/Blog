# Non-Volatile Memory

There are a few types of non-volatile memory available in the market

- EPROM (Erasable Programmable Read-Only Memory)
  - Earliest floating gate transistors are implemented as EPROM devices
  - Need to put device under ultra-violet (UV) light to erase the stored program
- EEPROM (Electrically Erasable Read-Only Memory)
  - Advancement in process technologies make it possible to reduce the oxide thickness
  - Can electrically program or erase device

# MOSFET (Metal-Oxide-Semiconductor Field Effect Transistor)

![MOSFET Diagram](https://www.electronicsforu.com/wp-contents/uploads/2019/04/p-channel-mosfet-1-500x464.jpg)

- For n-channel MOSFET, if gate source voltage > threshold voltage, a conductive channel of electrons will be formed and current will flow is a positive voltage is applied across drain and source

# Floating-Gate Transistor (FGT)

![Floating Gate Diagram](https://www.embedded.com/wp-content/uploads/contenteetimes-images-design-embedded-2018-fl101-4-fig1-c.jpg)

- Allows "programming", to alter threshold voltage of the floating gate transistor
- [How the floating gate transistor works](https://searchstorage.techtarget.com/definition/floating-gate)
- Works by charging or discharging electrons from a floating gate
  - When electrons are present in the floating gate, current cannot flow through the transistor, hence bit state = 0
  - When electrons are removed from the floating gate, current is allowed to flow, and bit state = 1

- When a high voltage is applied to the control gate, electrons tunnel through the thin oxide layer, and are trapped in the floating gate. This enables **persistent** storage
- For EPROM technology, to remove the electrons from the floating gate, memory cell is exposed to UV light. In EEPROM and flash memory devices, [Fowler-Nordheim tunneling](https://en.wikipedia.org/wiki/Field_electron_emission#Fowler%E2%80%93Nordheim_tunneling) removes electrons from the floating gate

### Reading Stored Data in Floating Gate
- Applting a positive gate voltage = 6V (Between the erased and programmed threshold voltage)
  - Transistor remains OFF if floating gate is programmed (Charged)
  - Transistor turns ON if floating gate is erased (No charges)

# Flash

- Based on similar floating gate technology as EEPROM
- Can be erased in larger block size compared to EEPROM
- Since erase cycle is comparatively slower than other operations (read/write), but flash memory has faster speed than EEPROM when performing write operations for large blocks of data
- Cheaper than EEPROM
- Suitable for systems requiring large amounts of non-volatile memory

# NOR Flash

![NOR Flash Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/NOR_flash_layout.svg/350px-NOR_flash_layout.svg.png)

- Cells behave like a NOR gate
- When any one of the word line > Programmed threshold voltage, bit line output = 0
- Supports **Execute in Place** - Program code stored can be executed directly without needing to transfer to internal RAM first
  - Allows random reading of memory data using only address information (no additional commands required)
- Needs special commands (issue in write mode) in order to perform operations other than data read - e.g. program, eraase etc
- Allows random word/byte programming. However erasing has to be done at a block level
- Use as system memory to store program code or general storage memory

# NAND Flash

![NAND Flash Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Nand_flash_structure.svg/350px-Nand_flash_structure.svg.png)

- Cell behaves like NAND
  - Bit line 0 only when all word lines > programmed threshold voltage
- Does not support execute in place operation
  - Data has to be accessed one page at a time
  - Command issued to open a particular page, followed by which bytes are needed in the page
  - NAND chips use a single bus to carry address and data
- Lower cost per bit than NOR. Used mainly as main storage memory
  - On board main storage, USB flash drives, SSD, etc.

# System vs Storage Memory

### System Memory
- Used to store runtime program and code
- Executed directly from the system memory
- Typically refers to 
  - Internal SRAM/DRAM or NOR Flash
  - External memory that supports XIP (NOR Flash, SRAM, DRAM)
- DRAM technically does not support XIP, but processors that have a DRAM interface will have DRAM controller that handles the necessary translation to allow execution of code directly from DRAM

### Storage Memory
- Used to store all program and data in a computer system
- Cannot run code directly from storage memory, needs to be transferred to system memory before code execution
- All memory types can be used as storage memory