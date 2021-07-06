# Practice

1. Write a class `MyMath` which implements a static method `power`, which has the following prototype

```java
static int power(int a, int b)
```

This method computes $a^b$

Write 3 methods, `sin`, `cos` and `tan` which compute $\sin(x), \cos(x), \tan(x)$, where $x$ is an angle in degrees

```java
static double sin(double x);
static double cos(double x);
static double tan(double x);
```

2. Method overloading. Write an overloaded method `getUser` which can get the user via the `name` or the `id` of the user 
```java
public class User {
     String name;
     int id;

     public User(String name, int id) {
          this.name = name;
          this.id = id;
     }
}

public class Practice {
     User[] users;

     public Practice() {
           users = {new User("Joe",201408001),
                    new User("Alexa",201609014),
                    new User("Avinash",201702016)};
     }

     public int getUser(String name) {
          for (int i = 0; i < users.length; i++) {
               if (users[i].name.equals(name)) return i;
          }
          return -1;
     }

     /*** TODO: Write the overloaded method for getUser that takes an integer, id 
                and returns an integer ***/
     {
          for (int i = 0; i < users.length; i++) {
               if (users[i].id == id) return i;
          }
          return -1;
     }

     public static void main(String[] args) {
          Practice p = new Practice();
          System.out.println("Alexa is at position " + p.getUser("Alexa"));
          System.out.println("201702016 is at position " + p.getUser(201702016));
     }
}
```

3. Write a class `UserAccount` with the following:
   - `private String email`
   - `private String password` 
   - `public String getEmail`
   - `public String setEmail` - Only change email if email contains an `@` and ends with `.com` or `.edu`
   - `public String setPassword` - Only change password if password is at least 8 characters long