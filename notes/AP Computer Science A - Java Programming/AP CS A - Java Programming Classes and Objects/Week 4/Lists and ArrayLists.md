# Lists and ArrayLists

-   Interface = behavior contract
-   A preview of polymorphism
-   Using a list reference allows developers to have flexibility in the choice of data structures when they use your code

`interface java.util.List`

-   `int size()`
-   `boolean add(E obj)`
-   `void add(int index, E obj)`
-   `E get(int index)`
-   `E set(int index, E obj)`
-   `E remove(int index)`

`java.util.ArrayList implements java.util.List`

```java
import java.util.List;
import java.util.ArrayList;

public class TodoList {
    public static void main(String[] args) {
        // List<String> myList = new List<String>(); // not allowed because List is an abstract class
        List<String> myList = new ArrayList<String>();

        myList.add("Eat Lunch");
        myList.add("Fold Laundry");
        myList.add("Cook Dinner");

        String firstTask = myList.get(0);
        myList.remove(0);
        firstTask = myList.get(0);
        System.out.println(firstTask);
    }
}
```

# ArrayList Class

-   Dynamic array: automatically grows to accomodate new items
-   Class provided within `java.utils`
-   Works with any type of objects, but must specify the type of object created
-   `ArrayList<String> list = new ArrayList<String>();`

# Generic Class

-   `ArrayList` is a generic class
-   A generic class is one that can be parameterised with another class
-   `ArrayList<E>` is parameterised with class `E`. It can only "hold" elements that are references to objects of class `E`

# Wrapper Classes

-   Unlike Java arrays, `ArrayList` does not work with primitive types, only reference types
-   `ArrayList<int> list;` is not allowed
-   Fortunately, java provides "wrapper" classes for each primitive type
-   `ArrayList<Integer> list;` is allowed
-   Java handles conversion from the wrapper class to the primitive type

# Useful ArrayList Methods

-   `add(e)` - Adds `e` to the end of the list
-   `add(i, e)` - Adds `e` at index `i` (0-based), pushing down others to the back of the list
-   `contains(e)` - returns true if `e` is in the list
-   `get(i)` - returns the value at index `i` (0-based)
-   `remove(e)` - removes `e` from the list
-   `size()` - returns current size of the list

Example program using ArrayList:

```java
import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListDemo {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<String>();
        Scanner in = new Scanner(System.in);

        while (in.hasNextLine()) {
            String s = in.nextLine();
            list.add(s);
        }

        System.out.printf("Read %d lines\n", list.size());
        for (int i = 0; i < list.size(); i++) {
            System.out.printf("%s\n", list.get(i));
        }
    }
}
```

# Example - Least Recently Used (LRU) Memory

Cache is limited, and we need to find a way to fit items in the cache. If the cache is full, we need to decide which element to remove from the cache. We will used the LRU algorithm, which is to remove the element that was least recently used.

```java
import java.util.ArrayList;
import java.util.List;

public class Cache {
    private List<String> programs;
    private int maxSize;

    public Cache(int size) {
        this.programs = new ArrayList<String>();
        this.maxSize = size;
    }

    private int findProgram(String programName) {
        int position = 0;
        while (position < programs.size()) {
            if (programs.get(position).equals(programName)) {
                break;
            }
            position++;
        }
        return position;
    }

    private void addProgram(String programName) {
        programs.add(0,programName);
        if (programs.size() > this.maxSize) {
            programs.remove(maxSize);
        }
    }

    private void useProgram(int position) {
        String s = programs.remove(position);
        programs.add(0,s);
    }

    public void update(String programName) {
        int position = findProgram(programName);
        if (position < programs.size()) {
            useProgram(position);
        } else {
            addProgram(programName);
        }
    }

    public String toString() {
        String out = "Current cache contents:\n----------------------\n";
        for (int i = 0; i < programs.size(); i++) {
            out += String.format("%2d) %s\n",(i+1),programs.get(i));
        }
        return out;
    }
}
```
