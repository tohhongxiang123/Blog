# Data Center Storage

# Criteria for Storage Elements

- Power consumption
  - Data centers consume a lot of power, direct costs in utility and cooling measures, and limit choice of locations
  - Centers are commonly found near natural cooling elements such as large natural water bodies, which offer a low cost and reliable source of cooling
- Speed
  - Beneficial for caching databases and other data affecting overall application of system performance
- Robustness
  - Tolerance to various form of mechanical movement/interference increases reliability and reduces need and cost of maintenance
  - Drive housing structure shock absorption requirement also reduced
- Heat production
  - Less heat generated means less cooling and power required in the data center
- Size
  - Data centers will be able to store more data in less space, increasing efficiency in all areas

Even though SSDs win HDDs in all the criterions, HDDs still remain the dominant choice for storage due to **cost**

# HMAR (Heat Assisted Magnetic Recording)

- The areal density of HDDs was stagnant for a while and manufacturers have been shipping drives with 2TB/platter
- However, HMAR can help increase the areal density
- A small laser is attached to the recording head, designed to heat a tiny spot on the disk where the data will be written. This allows a smaller bit cell to be written as either a 0 or 1
- Current projections are that HMAR can achieve 5Tbpsi (Tera bits per square inch), enabling drives with capacities higher than 100TB

- The major problem with packing bits so closely together on conventional magnetic media is that data bits become unstable and may flip
- To make media maintain stability to store bits over a longer period of time, recording media needs to have higher **coercivity**
- Higher coercivity implies the media is magnetically more stable during storage, however it would also be more difficult to change the magnetic characteristics of the media when writing
- For that, a laser is employed to heat a tiny region of several magnetic grains for a short time to a temperature high enough to lower the media's coercive field to below that of the write head's magnetic field, to write the data
- Immediately after the heat pulse, the region cools down quickly and the bit's magnetic orientation is frozen in place. The data is stored in the media and would be stable due to the high coercivity of the recording media
