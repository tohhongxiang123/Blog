# More Repetition

# Common Practices

- To loop n times, go from 0 to n-1

```java
for (int i=0; i<n; i++) {
    // code
}
```

We usually start from 0 because arrays are zero-indexed (starts from 0)

# Common Mistakes

1. Infinite loop

```java
int n = 1;
while (n < 100) {
    System.out.printf("n = %d\n", n);
}
```

`n` was not incremented, thus infinite loop.

```java
for (int i = 10; i > 0; i++) {
    System.out.println(i);
}
```

Almost infinite loop. `i` will be positive for a long time (until integer overflows)

2. Fencepost Error (Repeating the wrong number of times)

```java
for (int i = 0; i <= 5; i++) {
    System.out.println("This line will print 5 times");
}
```

The line will print 6 times instead, because we loop until `i <= 5`

3. Skipped Loop

```java
int n = 0;

while (n > 0) {
    // code
}
```

The loop never runs because the condition was false in the beginning. If we wanted to run the loop at least once, we should use a do-while loop

4. Misplaced Semicolon

```java
int i = 10;
while (--1 >= 0); {
    // code
}
```

The loop body will run only once, because the semicolon should not be there.