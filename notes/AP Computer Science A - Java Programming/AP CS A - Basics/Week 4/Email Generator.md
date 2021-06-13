# Challenge: Email Generator

1. Design a class called `EmailGenerator` in a file called `EmailGenerator.java`. This class will hold the main method, and the class methods that we will write in this assignment.
2. Write an empty `public static void main(String[] args)` method. This method should appear inside the curly braces of the `EmailGenerator` class.
3. Write two static class methods (`makeUserName`, `makeEmail`). The method `makeUserName` should take two String arguments and will return a String. The method should take the first letter of the first String and combine it with the full second String, returning the final String in all lowercase characters. The method `makeEmail` should take two String arguments and will return a String. This method should combine the first string, a "@" symbol, and the second String. Several example method calls appear below.

```java
EmailGenerator.makeUserName("Alan","Turing");       // returns "aturing"
EmailGenerator.makeEmail("aturing","purdue.edu");       // returns "aturing@purdue.edu"
```

1. Complete the definition for `main`. Your program should create a new `Scanner` object, prompt the user to type in a first and last name, and then collect two Strings. The `main` method should then call the two static methods of the `EmailGenerator` object, first creating a username String and then generating the corresponding email String. You can pick any domain for your email (we used "purdue.edu" above). The program should output the final email address for a user with the given first and last name. For example, if the user enters "Grace" and "Hopper" as inputs:

"This user’s e-mail is: ghopper@purdue.edu"

# Solution

```java
import java.util.Scanner;

public class EmailGenerator {
    public static String makeUserName(String firstName, String lastName) {
        String concatenatedString = firstName.charAt(0) + lastName; // first letter of firstName, and entire lastName
        return concatenatedString.toLowerCase(); // lowercase the string
    }

    public static String makeEmail(String firstPart, String secondPart) {
        return firstPart + "@" + secondPart; // concat first part and last part with "@"
    }

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);

        System.out.println("Enter your first name: ");
        String firstName = s.nextLine();

        System.out.println("Enter your last name: ");
        String lastName = s.nextLine();

        System.out.println("Enter the email domain");
        String domain = s.nextLine();

        String userName = makeUserName(firstName, lastName);
        System.out.println("This user's e-mail is: " + makeEmail(userName, domain));
    }
}
```