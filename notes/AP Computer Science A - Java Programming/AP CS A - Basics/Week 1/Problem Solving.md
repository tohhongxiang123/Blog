# Problem Solving

The heart of computer science is problem solving. We need to be able to analyze complex problems and translate them into code for our computers to execute for us.

Computers are not smart - they only do what they are told. However they can complete tasks a lot faster than humans can. By coding, we can use the help of a computer to solve large complicated problems. However, what kind of problems do computer scientists usually solve?

- How does google return the best web pages depending on your search terms?
- How does a driverless car follow a road?
- What is the shortest path from one point to another?

Problems are solved by computers using **algorithms**

> Algorithms are an ordered set of instructions, which has a flow of execution

For a single question, there can be many possible algorithms that solve a problem

- Some are faster, but require more memory
- Some are slower, but require less memory
- Some are simpler to understand, but are slower and require more memory, etc.

Each algorithm has its own tradeoffs, and as computer scientists we have to design and choose algorithms that fit our needs.

There are many skills that are used to solve problems. Some of these skills include

- Abstraction
- Decomposition

## Abstractions

An abstraction is a generalisation of a problem. We **ignore the functional details of a concept** and think only of the idea that is being represented. By generalising a problem, I **hide away the little details** of how to solve a problem, and I can use this to **solve bigger problems without thinking about the hidden complexity**. Computer science is full of abstractions. For example, I can make coffee every morning by doing the following

1. Line the basket of your coffee maker with a filter.
2. Grind coffee beans to medium or medium-fine grind size.
3. Bring filtered water to a boil, then let it sit for a minute.
4. Pour enough water into the filter to wet it completely
5. Let the water drain into your cup or coffee pot.
6. Discard the water.
7. Measure the ground coffee into the wet filter.
8. Pour in enough water to wet the ground beans and drain into your cup or coffee pot
9. Pour in the rest of the water

Instead of doing all these steps individually, I can let the coffee machine **abstract these complexities away** for me. I don't need to know how the coffee machine is working internally to brew a fresh cup of delicious coffee. I don't need to know the ideal temperature of the water or the amount of ground coffee I need to use. All I have to do is interact with a simple interface that **does not require any knowledge about the internal implementation**. Now I can go about my day without worrying how to make a coffee, I can just have a cup of coffee.

Similarly, for people who have programmed a little bit before, I don't need to know how to sort a list of numbers. All I have to do is call a function `sort`, which hides all the implementation details away from me, and I get a sorted list of numbers, without knowing how exactly to sort those numbers. More examples of abstractions include

- Using "communication" to refer to writing, talking, gesturing
- using "transportation" to refer to automobiles, trains, planes

## Decomposition

Decomposition takes a complicated problem, and breaks it into smaller problems. These smaller problems can be solved individually, and by combining these little pieces together, I can solve a bigger, more complicated problem.

Let us take the problem of finding the best path from my house to my school. There are many ways I can approach this task. So, I break the task down to smaller, more manageable pieces

- What is the best way to exit my neighborhood?
- Which path is the shortest route?
- Which path is the fastest route?
- Which school entrance should we enter? Maybe the least crowded one? Or the closest one to us

Decomposition is also related to **parallel processing**. Most computers have multiple processors, which means we can divide up individual tasks and do them independently at the same time.

Take the example of preparing a large full course meal for a party. Instead of one dish being prepared at a time, multiple chefs can prepare a meal at the same time.

- A group of the chefs can fry the chicken wings
- A group of the chefs can boil the soup
- The waiters can receive orders and serve the food once they are done

All the individuals are working together to serve the entire party. Similarly, multiple processors can be used on a computer to solve the same problem. Let us say we want to sort all the files inside of our folders. Instead of 1 processor doing all the work, we could divide up the tasks like this:

- Processor 1 takes the folders starting with A-C
- Processor 2 takes the folders starting with D-F
- Etc.

This way it is a lot faster because we are being more efficient with our resource usage
