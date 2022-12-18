# Operator Shortcuts

There are a few shortcuts available

```java
x = x + 1;
x += 1;

y = y + 5;
y += 5;

z = z + x
z += x;

num = num - 5;
num -= 5;

p = p * 5;
p *= 5;

t = t / 2;
t /= 2;

a = a % 5;
a %= 5;
```

# Increment and Decrement

Used specifically when incrementing or decrementing by 1

```java
x += 1;
x++;

x -= 1;
x--;
```

Also, these operators can be used prefix or postfix.

## Prefix increment

```java
int x = 7;
int y = ++x * 8; // x = 8, y = 64
```

By using `++x`, we tell java to increment x by 1 first, before evaluating the rest of the expression. The above code block is similar to:

```java
int x = 7;
x = x + 1
int y = x * 8;
```

# Postfix increment

```java
int x = 7;
int z = x++ * 8 // x = 8, y = 56
```

By using `++x`, we are telling java to evaluate the expression first, before incrementing x by 1. The above code block is similar to:

```java
int x = 7;
int z = x * 8
x = x + 1
```
