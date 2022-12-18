# Practice

1. Complete the following code for static vs non-static variables

```java
public class Order {
     String menuChoice;
     /*** TODO: Declare a static variable, orders, to keep track of how many current
                orders a restaurant has open ***/

     public Order(String menuChoice) {
          this.menuChoice = menuChoice;
          /*** TODO: Increment the static variable, orders ***/
     }

     public void makeFood() {
          System.out.println(menuChoice + "! Order up!");
          /*** TODO: Decrement the static variable, orders ***/
     }

     public String toString() {
          return "There are " + orders + " open orders, and this order is for a " + menuChoice;
     }

     public static void main(String[] args) {
          Order o1 = new Order("Burrito");
          Order o2 = new Order("Salad");
          o2.makeFood();
          Order o3 = new Order("Pizza");
          System.out.println(o3);
     }
}
```

2. Writing method headers

```java
public class Practice {

     /*** TODO: Write the method header for a method named addMe, which takes three
                integer parameters (a, b and c) and returns an integer result ***/
     {
          return a + b + c;
     }

     public static void main(String[] args) {
          System.out.println(addMe(3,4,5));
          System.out.println(addMe(1,9,91));
     }
}
```
