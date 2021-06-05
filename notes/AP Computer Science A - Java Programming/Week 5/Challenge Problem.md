# Challenge Problem

Let the user input 2 integers, `x` and `y`. If `x` > `y`, swap the values of `x` and `y`. Then print out the values of `x` and `y`

```java
public Class Swapper {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);

        System.out.println("Please provide 2 integers");
        int x = s.nextInt();
        int y = s.nextInt();

        System.out.println("x = " + x + ", y = " + y);

        if (y < x) {
            int temp = x;
            x = y;
            y = temp;
        }

        System.out.println("x = " + x + ", y = " + y);
    }
}
```