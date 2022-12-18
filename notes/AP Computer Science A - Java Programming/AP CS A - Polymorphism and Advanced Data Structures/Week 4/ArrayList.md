# ArrayList

-   Like an array, but grows when elements are added

# Implementing ArrayList

-   Hide details within ArrayList
-   Use underlying fixed-size array
-   Use accessor and mutator methods to control access, enforcing abstraction
-   Keep track of
    -   Actual number of elements currently stored
    -   Capacity of underlying array

## Expanding the Underlying Array

-   If actual number of elements becomes bigger than current capacity
    -   Allocate new underlying array
    -   Copy old elements into new
    -   Free old array

# What Methods are Inside ArrayList?

-   Allocate new instances (`ArrayList a = new ArrayList()`)
-   Add elements into array (`a.add("Hello"), a.add("Goodbye")`)
-   Replace specific element in array (`a.set(0, "world")`)
-   Get specific element of array (`a.get(0)`)
-   Get size of array(`a.size()`)
-   Remove element in array (`a.remove(5)`)
