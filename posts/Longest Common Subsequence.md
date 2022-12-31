# Longest Common Subsequence

The longest common subsequence (LCS) is defined as the longest subsequence that is common to all the given sequences, provided that the elements of the subsequence are not required to occupy consecutive positions within the original sequences.

If S1 and S2 are the two given sequences then, Z is the common subsequence of S1 and S2 if Z is a subsequence of both S1 and S2. Furthermore, Z must be a strictly increasing sequence of the indices of both S1 and S2.

For example, the longest common subsequence between `ABCDE` and `AXBXCXBXA` is 3 (`ABC`)

Let's look at a few properties first before tackling the code.

1. The longest common subsequence between any string with an empty string is 0. "AAA" and "" have a longest common subsequence of 0
2. The longest common subsequence between any strings with the same last 2 characters is 1 + the longest common subsequence if both the strings did not have that character.

Between `ABC` and `BDC`, we know that `C` will be part of the subsequence, hence we can just compare `AB` and `BD`, and figure out the longest common subsequence between those 2 shortened strings. Afterwards, we can add 1 to that result.

3. Now between `ABCD` and `BDEF`, to find the longest common subsequence, we

- Remove 1 character from the first string, and compare the LCS for both strings (`lcs("ABC", "BDEF")`)
- Remove 1 character from the second string, and compare the LCS for both strings (`lcs("ABCD", "BDE")`)
- Take the maximum as the answer

With these information, we can write a recurrent function first

```python
def lcs(s1, s2):
    # If one of the strings is empty, the longest common subsequence is 0
    if len(s1) == 0 or len(s2) == 0:
        return 0

    # If the last characters are the same, we can add 1 to the score
    if s1[-1] == s2[-1]:
        return 1 + lcs(s1[:-1], s2[:-1])

    # Remove 1 character from the first string and compare, remove 1 character from the second string and compare
    return max(lcs(s1[:-1], s2), lcs(s1, s2[:-1]))
```

However, this algorithm has a very long runtime. We can reduce this by using dynamic programming instead. We will create a DP table, and build up our answers from there.

# Dynamic Programming

Dynamic Programming is an optimization over plain recursion. Wherever we see a recursive solution that has repeated calls for same inputs, we can optimize it using Dynamic Programming. The idea is to simply store the results of subproblems, so that we do not have to re-compute them when needed later.

Let us consider finding the LCS of "ABC" and "BCZA"

So, to represent our series of subproblems, we can use the following table

|     | ""  | A   | B   | C   |
| --- | --- | --- | --- | --- |
| ""  |     |     |     |
| B   |     |     |     |
| C   |     |     |     |
| Z   |     |     |     |
| A   |     |     |     |

Each cell in the table represents the LCS of the string up to that character. For example, `table[0][0]` is the LCS for 2 empty strings. `table[1][3]` is the LCS between "B" and "ABC". Our final result is in `table[4][3]`

To begin, we can realise that any comparison with an empty string is 0. Hence,

|     | ""  | A   | B   | C   |
| --- | --- | --- | --- | --- |
| ""  | 0   | 0   | 0   | 0   |
| B   | 0   |     |     |
| C   | 0   |     |     |
| Z   | 0   |     |     |
| A   | 0   |     |     |

Next. We look at `table[1][1]`. We are finding the longest common subsequence between "A" and "B", which is the maximum of

1. The LCS between "A" and ""
2. The LCS between "" and "B"

The answer to 1. is in `table[0][1]` and 2. in `table[1][0]`. Hence, `table[1][1] = 0`

|     | ""  | A   | B   | C   |
| --- | --- | --- | --- | --- |
| ""  | 0   | 0   | 0   | 0   |
| B   | 0   | 0   |     |
| C   | 0   |     |     |
| Z   | 0   |     |     |
| A   | 0   |     |     |

Now we consider `table[1][2]`. We are looking for the LCS between "AB" and "B". Since the last characters are the same, we can conclude that `lcs("B", "AB") = 1 + lcs("", "A")`. From the table, we can conclude that `lcs("B", "AB") = 1`.

|     | ""  | A   | B   | C   |
| --- | --- | --- | --- | --- |
| ""  | 0   | 0   | 0   | 0   |
| B   | 0   | 0   | 1   |
| C   | 0   |     |     |
| Z   | 0   |     |     |
| A   | 0   |     |     |

In general, if at `table[m][n]`, the last characters of both strings are equal, then `table[m][n] = 1 + table[m-1][n-1]`.

Now we consider `table[1][3]`. We are trying to find the LCS of "ABC" and "B". The last character is not the same. Hence, we look at the 2 cases we mentioned.

1. `lcs("AB", "B")`, removing the last character of the first string. From the table, `lcs("AB", "B") = 1`
2. `lcs("ABC", "")`, removing the last character of the second string. From the table, `lcs("ABC", "") = 0`

With these 2 pieces of information, we can conclude that `lcs("ABC", "B") = max(1, 0) = 1`.

|     | ""  | A   | B   | C   |
| --- | --- | --- | --- | --- |
| ""  | 0   | 0   | 0   | 0   |
| B   | 0   | 0   | 1   | 1   |
| C   | 0   |     |     |
| Z   | 0   |     |     |
| A   | 0   |     |     |

We can continue filling up the entire table, and it will look like this

|     | ""  | A   | B   | C   |
| --- | --- | --- | --- | --- |
| ""  | 0   | 0   | 0   | 0   |
| B   | 0   | 0   | 1   | 1   |
| C   | 0   | 0   | 1   | 2   |
| Z   | 0   | 0   | 1   | 2   |
| A   | 0   | 1   | 1   | 2   |

So, our final result is `lcs("ABC", "BCZA") = 2`

The code looks like this

```python
def lcs(s1, s2):
    # DP Table
    results = [[0]*(len(s1)+1) for i in range(len(s2)+1)]

    for columnIndex in range(1, len(results[0])):
        for rowIndex in range(1, len(results)):
            currentCharS1 = s1[columnIndex-1]
            currentCharS2 = s2[rowIndex-1]

            if currentCharS1 == currentCharS2:
                results[rowIndex][columnIndex] = 1 + results[rowIndex-1][columnIndex-1] # same as removing the last character of both strings
            else:
                results[rowIndex][columnIndex] = max(results[rowIndex-1][columnIndex], results[rowIndex][columnIndex-1])

    print(results)
    return results[-1][-1]
``
```
