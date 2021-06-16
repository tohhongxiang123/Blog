# Nested Loops

```java
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        System.out.printf("i: %d, j: %d\n", i, j);
    }
}
```

The following will be printed out

```
i: 0, j: 0
i: 0, j: 1
i: 0, j: 2
i: 0, j: 3
i: 0, j: 4
i: 1, j: 0
i: 1, j: 1
i: 1, j: 2
i: 1, j: 3
i: 1, j: 4
i: 2, j: 0
i: 2, j: 1
i: 2, j: 2
i: 2, j: 3
i: 2, j: 4
i: 3, j: 0
i: 3, j: 1
i: 3, j: 2
i: 3, j: 3
i: 3, j: 4
i: 4, j: 0
i: 4, j: 1
i: 4, j: 2
i: 4, j: 3
i: 4, j: 4
```

The number of loops run is: number of outside loop iterations * number of inside loop iterations