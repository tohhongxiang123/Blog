# Minimum Algorithm

Get the minimum of an array

1. Set the first element of the array as the minimum
2. Check the next element of the array
3. If this element is less than minimum, set minimum to this element
4. Return to 2 until no more elements are remaining

```java
int[] arr = { 3, 4, 1, 6, 3, 9, 4, 2};
int minimum = arr[0];

for (int i = 1; i < myData.length; i++) {
     if (arr[i] < minimum) {
          minimum = arr[i];
     }
}
```
