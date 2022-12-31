# Cache

![Computer Block Diagram](https://media.geeksforgeeks.org/wp-content/uploads/cache.png)

- CPU speed is usually faster than external memory
- Need a faster memory to act as a buffer between main memory and CPU
- The purpose of cache memory is to speed up accesses by storing/fetching recently used data closer to the CPU instead of the main memory
- Potentially able to improve overall system performance drastically

### Procedure to request for data

- CPU first sends a request to its nearest memory (usually cache)
- If data not in cache, query is sent to main memory (primary memory)
- If data not in main memory, request goes to disk (secondary memory)
- Once data is located, required data and a number of its nearby data elements are fetched into cache memory simultaneously

### Analogy of Cache

Consider a stack of books. All the books are **storage memory**. An exam is coming up, and we only require a small subset of all the books for the exam. The subset is **system memory**. At any instance, we can only read 1 page at a time, this is **cache memory**

# Cache Design (Principle of Locality)

- The principle of locality tells us that once a byte in a program is accessed, it is likely that a nearby data element will be needed soon
- There are 2 principles of locality governing this behaviour

### Locality of Space

- Data that are nearby each other is likely to be accessed together
- Transfer of data between system memory and cache is done in blocks to leverage on this behavior

### Locality of Time

- Recently accessed data is more likely to be accessed again
- Used to decide which items to replace in the cache

## Cache Memory Replacement Policy

- When there is a need to transfer a block to the cache but the cache is fully occupied, there is a need to decide which cache block to evict/purge in order to free up space for new data
- Algorithm used to decide which block to evict is based on a **cache replacement policy**.

### Least Recently Used (LRU)

- Keeps track of the last time a block was accessed, evicts the block that has been unused for the longest period of time.
- This approach has high complexity - LRU has to maintain an access history for each block, which ultimately slows down the cache

### First-in, First-out (FIFO)

- The block that has been in the cache the longest is removed, regardless of when it was last used

# Cache Mapping Scheme

- Deals with how each main memory block is mapped to a particular cache block
- Each block in the main memory can only go into one cache block location
- We need a way to allocate the data in the entire system memory into the cache which is smaller thn the memory
- Also need to be able to uniquely identify each and every system memory location within the cache via the cache way of addressing
- There are 3 basic cache mapping schemes

  - Direct Mapping
  - Set Associative
  - Fully Associative

- Conceptually, a cache is divided into smaller storage locations called **Blocks** (also known as **Cache Lines**)
- The term index, or block number is used to specify a specific cache block/line
- The whole cache block is transferred when one or more bytes in the block is needed

## Direct Mapped Cache

- In direct mapped cache consisting of N blocks of cache, block X of main memory maps to cache block

$$
Y = X \mod N
$$

- Whole block of data is filled when one or more bytes in the block is needed
- A tag value keeps track of which main memory block is associated with each cache block
  - Tag value is derived from the main memory address (Tag/Block/Offset)
    - **Offset** refers to the target data's location's offset from the start of the cache block. If a cache block has a size of 16, one would need 4 bits in the OFFSET field to address all 16 locations
    - **Block** refers to the index of the cache block that the targeted data will be mapped to. If there are 8 cache blocks, 3 bits is required in the BLOCK field to fully represent the cache block index
    - **Tag** bits are the bits left over of the target data's system memory address after partitioning for Offset and Block Index. All these allow the cache system to **uniquely identify** data in cache
  - For example, 1000 00 01
  - The tag is 1000. This tells you which main memory block the memory comes from
  - The block is 00. This tells you which block inside the main memory block the data came from
  - The offset is 01. This tells you which byte of memory the data came from inside that block.
  - More information [here](https://stackoverflow.com/questions/15937002/how-does-direct-mapped-cache-work)

# Cache Write Policy

- Locations in cache that are written into by the CPU are known as **dirty blocks**
- Cache replacement policies must take into account dirty blocks, as those blocks have different contents than the memory they were from
- Dirty blocks must be written back to memory. A **write policy** determines how this is done
- There are 2 types of write policies
  1. Write Through
  2. Write Back

![Write Through vs Write Back](https://www.student-circuit.com/wp-content/uploads/sites/54/2019/08/data-cache.png)

## Cache Write Policy (Write Hit)

- A write hit occurs when the data required is within the cache

### Write Through

- Write through updates cache and main memory simultaneously on every write
- Coherency between cache and main memory always maintained
- Increased system bus utilisation

### Write Back

- Write back updates memory only when the block is selected for replacement
- Minimum system bus utilisation
- Coherency management between cache and main memory is more complicated (Need to check whether memory and cache contain the same data)

## Cache Write Policy (Write Miss)

- A write miss occurs when the data required is not in the cache, and the CPU has to fetch the data from the main memory

### Write Allocate

- Fetch on write. Data block at the write-miss address to be loaded into the cache

### Write No-allocate

- A write miss will not cause the data block to be loaded into the cache. Data write is done directly to its location in the main memory

# Effective Access Time

- The performance of hierarchical memory is measured by its effective access time (EAT)
- EAT is a weighted average that takes into account the hit ratio and relative access times of successive levels of memory
- EAT for 2-level memory is given by

$$
EAT = H \times T_{access} + (1-H) \times P_{miss}
$$

where $H$ is the hit rate (Percentage of time data is found in the cache), $T_{access}$ is the access time for cache, and $P_{miss}$ is the time required to access the data when there is a cache miss.

- However, if we assume that data access to cache and main memory do not overlap, then $P_{miss} = T_{accessCache} + T_{accessMain}$, $T_{accessCache}$ is the time taken to access the cache, and $T_{accessMain}$ is the access time for main memory

$$
EAT = H \times T_{access} + (1-H) \times  (T_{accessCache} + T_{accessMain})
$$
