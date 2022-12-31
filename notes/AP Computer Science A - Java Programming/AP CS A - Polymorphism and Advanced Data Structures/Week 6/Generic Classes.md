# Generic Classes

Consider us implementing a stack

We would like to be any of the following

- A stack of integers
- A stack of strings
- A stack of objects

However, we would like to only implement our class once. What we can do is allow the type to be a parameter, and this is called a **generic**

Generics allow a `<T>` to denote a type parameter. E.g.

- `Stack<Integer> S = new Stack<Integer>();`
- `ArrayList<String> T = new ArrayList<String>();`
- `Stack<Stack<Float>> U = new Stack<Stack<Float>>();`

The generic helps allow you to limit the types provided to your class method to those within the specified type's inheritance hierarchy

# `HashMap<K, V>`

`K` is the type of the key, while `V` is the type of the value.

```java
HashMap<String, Tree> = new HashMap<String, Tree>();
map.put("elm", new Tree("elm", 35.6));
map.put("maple", new Tree("maple", 12.6));

Tree t = map.get("maple");
```
