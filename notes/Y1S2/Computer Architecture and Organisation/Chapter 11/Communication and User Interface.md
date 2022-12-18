# Communication and User Interface

Wired and wireless communication technology

-   USB
-   HDMI
-   Wifi
-   Bluetooth

User Interface Devices to transfer real world data

-   Keyboard, Mouse
-   Capacitive Touch devices
-   Camera
-   Microphones
-   Display
-   Audio Speakers

# Universal Serial Bus (USB)

![USB Ports](https://www.conwire.com/assets/USB-types-2x-1024x334.png)

-   Serial Bus designed to standardise connection of computer peripheral devices
-   Effectively replaced many interface buses such as COM port, parallel ports etc
-   USB1.0 standard only supported a transfer rate of 12Mbps but has progressed, USB3.2 standard supports up to 20Gbps
-   4 basic pinout:
    -   VBUS (+5V power supply)
    -   Data+/Data- (Data pins) for differential signalling
    -   Ground pin

## USB Topology and Interface

-   All data transactions are initiated by the **USB Host** (usually on the computer) USB peripherals can be connected directly to the host, or indirectly via USB hubs
-   Host assigns address to devices connected to enable proper communication
-   All data transactions are **with respect with the USB host**
    -   Data going into the host is known as IN transaction, data going out of the host is OUT transaction
-   Power to the devices can be supplied by the Host or Hub, known as **bus-powered**, or the device could have its own power souce (**self-powered**)
-   When a USB device is first connected to the host, it will undergo an **enumeration** process where the device and the host will exchange information on their capabilities and requirements
    -   E.g. a USB mouse will inform the host its vendor and product ID, the device class it supports, required bandwidth etc
    -   The host cannot communicate properly with the device until it is properly enumerated
-   Once the device information is transferred to the host, the host will check if it has the **required USB driver** to support the USB device according to the USB device class that the device belongs to
-   Examples of USB device classes
    -   Human Interface Device (HID) such as mouse/keyboards
    -   Communication Device Classd (CDC) used to implement Virtual COM Port e.g. Arduino, MSP432 Launchpad
    -   Mass Storage Class (MSC) used to interface to external USB HDD/SSD
    -   USB Audio Class used to stream audio to USB headsets or microphones

# High-Definition Multimedia Interface (HDMI)

![HDMI Connectors](https://tethertools.com/wp-content/uploads/2013/10/HDMI-1.jpg)

-   A proprietart audio/video interface for transmitting uncompressed video data and compressed/uncompressed digital audio data from a source device, such as a display controller in a computer, to a compatible HDMI receiver such as a montiro/television
-   In addition to transferring audio/video data, the CEC (Consumer Electronics Control) capability allow HDMI devices to control each other when necessaary and allows the user to operate multiple devices with one handheld remote control device
-   Common types of HDMI include
    -   Type D
    -   Type C
    -   Type A
-   Original HDMI v1.0/1.1 could only support transfer rates of 3.96 Gbps, allowing only up to 1080p 60fps video
-   HDMI v2.1 can achieve 42.6 Gbps, allowing 8K resolution video to be displayed

# Industrial, Scientific and Medical (ISM) Radio Frequency Band

-   A range of "Royalty Free" radio frequency bandwidth
-   Some are applicable world wide while some are restricted to certain geographical regions
-   The 2 most commonly known ISM bands
    -   2.4Ghz
    -   5.8Ghz

![Wireless Standards in ISM](https://www.edn.com/wp-content/uploads/media-1072637-fig1-ti.jpg)

# Wifi

-   A family of **wireless networking** technologies, based on IEEE 802.11 family of standard, commonly known as "Wireless LAN"
-   Operates in **2.4Ghz** and **5.8Ghz** RF range
-   Two common topologies
    -   Infrastructure
        -   Uses Star topology, at the center of the network is an access point or router, connected to devices at the end
    -   Adhoc
        -   Peer to peer connection
-   Transmission range generally between **20m to 150m**, factors affecting the range include **transmission frequency, transmission power and interference**
-   Bandwidth up to 10Gbps range for the latest 802.11ax (WiFi 6)

# Bluetooth

-   Mainly used for **low data rate** wireless transmission with focus on **low power consumption**
-   Operates in **2.4Ghz** range
-   Transmission range up to 100m but typically kept to **10-20m** to keep power consumption low. Factors affecting transmission range is similar to that of WiFi
-   Star topology
-   Transfer rate in order of **Kbps and Mbps**
-   The bluetooth standard defined 2 different bluetooth protocols
    -   Bluetooth Classic (BT)
    -   Bluetooth Low Energy (BLE)
-   These are based on 2 completely different network protocols and are **not compatible**. But most bluetooth hosts today are **dual mode** so are able to connect to both BT classic and BLE devices

## Factors affecting transmission range of RF communication

-   Transmission power
    -   Transmission range increases as transmission power increases
-   Transmission frequency
    -   Higher frequency signals experience higher attenuation (loses power faster) when propagating through the air or other mediums
    -   All things equal, higher frequency signals have lower range than lower frequency signals
-   Interference
    -   Many commonly adopted standard such as Wifi and Bluetooth work in the same 2.4Ghz ISM band. Their transmission will interfere with each other
    -   The closer the transmitters are to each other, the stronger the interference
    -   Even a microwave oven operates in the 2.4Ghz range

## Mitigating Interference

![Wifi bands](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/2.4_GHz_Wi-Fi_channels_%28802.11b%2Cg_WLAN%29.svg/660px-2.4_GHz_Wi-Fi_channels_%28802.11b%2Cg_WLAN%29.svg.png)

-   2.4Ghz actually consists of a **band of frequencies** between 2.4 and 2.5Ghz. Simlarly, 5.8Ghz spans across a certain frequency range
-   One common way to mitigate Wifi interference is to select **different channels** to use from your neighbors
-   For scenarios of different wireless standard such as bluetooth and wifi, another common way is to use **frequency hopping**, to constantly hop from one channel to another so that transmission will eventually succeed. BT uses frequency hopping
-   There are many other moethods to further mitigate interference between transmitters

# Keyboard

-   User input device for transmitting characters (alphabets, numbers, special symbols etc)
-   Has a small micro-controller on board to detect key presses and sends their corresponding ASCII codes to the computer
-   Connection to PC is via wired/wireless means
-   Wired keyboards today mainly use USB, and keyboards are enumerated as a HID keyboard device
-   Wireless keyboards mainly operate in the 2.4Ghz ISM, technology could be Bluetooth or proprietary 2.4Ghz RF protocol

# Mouse

-   User pointing device, tracks its position by mechanical/optical means
-   Information reported are the (x, y) coordinates and the left/right mouse buttons
-   More information may be reported for mouse with more advanced features
-   Information reported back to the PC periodically and is known as the scan/polling rate of the mouse
-   Typical mouse has a scan rate of 125Hz, and gaming mice have scan rates up to 1000Hz or higher. Higher scan rates usually mean better response
-   Another parameter is Dot-Per-Inch (DPI), which measures how fine the mouse could track the physical movement. Higher DPI means higher sensitivities to small physical mouse movements
-   Connection to PC utilises similar technology as keyboard

# Capacitive Touch Interface

![Capacitive Touch Interface](https://cdn.xenarc.com/images/C/capacitive-touch-screen.jpg)

-   A capacitive touch pad/button is seen as a capacitor to the processor it is connected to
-   When a conductive element is present, the effective capacitance of the setup increases
-   Capacitance is also affected by any dielectric (e.g. gloves, liquids) between the finger and the pad
-   Capacitance is directly proportional to the dielect constant (k) and air typically has a smaller dielectric constant (~1) compared to all other materials (> 1)
-   That is why phone touch screens do not work as well with a glove, or if the screen is wet
-   Calibration is done under the assumption of a human finger's touch
-   Capacitive touch screen consist of an array of electrodes functioning as capacitive touch sensors
-   Finger touching any part of the screen will affect one or more electrodes, with the closest having the most change to its nominal capacitance
-   A controller is used to process the information to derive the exact position of contact

# Camera

![CMOS camera parts](https://image.slidesharecdn.com/yoleydms17046cameramoduleindustry2017sample-171102094303/95/camera-module-industry-2017-report-by-yole-developpement-6-638.jpg?cb=1509616245)

-   Typical camera on phones or PCs use CMOS camera module
-   Lens
    -   Optical lens to focus the real world images on to the image sensor
-   Image Sensor
    -   Mostly CMOS based these days
    -   Array of sensors that transduce photons to electrical signals
    -   Analog to digital conversion of the analog electrical signal to its digital equivalent for processing the ISP
-   Image signal processor (ISP)
    -   Processor designed to specifically handle image processing of collected image data from the sensor
    -   Processing done includes signal conditioning, image format conversion, image post-processing/compressions etc
    -   Common image formats include YUV (luminance and chrominance) and RGB (red, green, blue)
-   Interface IO
    -   Reformatting of image data from ISP for delivery to the host processor

# Microphones

-   2 of the most popular types of microphones are micro-electro-mechanical systems (MEMS) and electret condenser microphones (ECM)
-   Both MEMS and ECM use the variations in capacitance when the diaphragm is displaced by the sound pressure to transduce sound wave to electrical signals
-   Difference is that in ECM, the electrical charges needed to measure the change in capacitance is provided by the charges stored on the electret
-   In MEMS, the electrical charges needed is provided by a charge pump instead
-   The transduced signal is analog in nature but an ADC could be added to enable a digital output

# Liquid Crystal Display (LCD)

-   Passive display technology - don't emit light. Instead requires a backlight for the user to see the image
-   Liquid crystal is an organic substance that has botha liquid form and a crystal molecular structure. The rod-shaped molecules are able to keep their order in a particular direction although they are in a liquid state
-   An electric field can be used to control the molecules' orientation
-   Depending on their orientation, these molecules are able to twist the light passing through them
-   The amount of light that is able to pass through the polariser depends on its orientation with respect to the polariser
-   This results in light passing or being blocked from the user's point of view
-   Process for color LCD is similar
    -   Each pixel is associated with 3 color filters to project the RGB colors
    -   A varying orientation of molecules in the liquid crystal suspension varies the amount of light allowed to pass through to the color filter, thereby changing the color picture on the display screen

# Audio Speaker

-   The device transduces electrical energy to sound energy
-   The speaker cone vibrates, pushing and pulling the air to create sound waves
-   The conversion from electrical to mechanical energy occurs through an electromangetic coil and magnet combination attached to the cone. This moves the speaker cone back and forth as its electromagnetic field changes with the electrical current passing through it, converting the mechanical energy to sound energy
