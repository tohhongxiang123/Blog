# Longest Common Subsequence

Given 2 sequences $x = <x_1, x_2, .... x_n>$ and $y = <y_1, y_2, ..., y_m>$, compute `LCS(x, y)`, which gives the length of the longest common subsequence. A sequence $s = <s_1, s_2, ..., s_n>$ is any sequence where $<s_{i_1}, s_{i_2}, ..., s_{i_m}>$ with $i_j$ strictly increasing.

# General Procedure

1. We initialise 2 arrays, `lengths[a.length() + 1][b.length() + 1]` and `hints[a.length() + 1][b.length() + 1]`.
    - `lengths[i][j]` is the length of the longest common subseqeuence between `a[0..i]` and `b[0..j]`.
    - `hints` will be used to extract the characters that form the longest common subsequence
2. Initially, all the entries in the first row for `lengths` is 0, and all the entries in the first column for `lengths` is 0. This is because the longest common subsequence between any string and an empty string is 0
3. As we go through both strings, we check whether the last 2 characters of `a` and `b` that we are currently looking at are the same
    - If the last characters of `a` and `b` are equal, then the longest common subsequence is now 1 + lcs(a[0..i-1], b[0..j-1])
    - Else, the longest common subsequence is the max of lcs(a[0..i], b[0..j-1]) and lcs(a[0..i-1], b[0..j])

Now regarding the `hints` array,

-   The first column of `hints` are all `|`
-   The first row of `hints` are all `-`
-   If `hints[i][j] == '\'`, then `a[i] = b[j]`, and this character is the last character of the longest common subsequence for `a[0..i], b[0..j]` This character is preceded by the longest common subseqeuence of `a[0..i-1], b[0..j-1]`
-   If `hints[i][j] == '|'`, the longest common subsequence for `a[0..i], b[0..j]` is the longest common subsequence for `a[0..i-1], b[0..j]`
-   If `hints[i][j] == '-'`, the longest common subsequence for `a[0..i], b[0..j]` is the longest common subsequence for `a[0..i], b[0..j-1]`

To extract the longest common subsequence,

1. Create a stack
2. Start from the end corner of the hints matrix
3. If the symbol is `-`, we move left of the array
4. If the symbol is `|`, we move up the array
5. If the symbol is `\`, we add the current character to the stack, and move diagonally left up the array
6. We keep moving until we reach the start of the array
7. Pop the stack into a string, and the final string is the longest common subsequence

# Code

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <stack>

using namespace std;

string lcs(string a, string b);

int main()
{
    string a, b;
    cin >> a;
    cin >> b;
    cout << lcs(a, b) << endl;
}

string lcs(string a, string b)
{
    int lengths[a.length() + 1][b.length() + 1]; // lcs between a[0..i] and b[0..j]
    char hints[a.length() + 1][b.length() + 1]; // used to extract longest common subsequence

    string solution = ""; // final solution

    // lcs between empty string and b is 0
    for (int i = 0; i <= a.length(); i++)
    {
        lengths[i][0] = 0;
        hints[i][0] = '|';
    }

    // lcs between empty string and a is 0
    for (int i = 0; i <= b.length(); i++)
    {
        lengths[0][i] = 0;
        hints[0][i] = '-';
    }

    // start from the first letter of a and b
    for (int i = 1; i <= a.length(); i++)
    {
        for (int j = 1; j <= b.length(); j++)
        {
            // if the 2 current characters of a and b are equal,
            if (a.at(i - 1) == b.at(j - 1))
            {
                lengths[i][j] = 1 + lengths[i - 1][j - 1];
                hints[i][j] = '\\';
            }
            else
            {
                int excludeBLcs = lengths[i][j - 1]; // length of lcs if we exclude last letter of b
                int excludeALcs = lengths[i - 1][j]; // length of lcs if we exclude last letter of a
                lengths[i][j] = max(excludeALcs, excludeBLcs);

                if (excludeALcs > excludeBLcs)
                {
                    // longest sequence excludes the last character of a, so we head up
                    hints[i][j] = '|';
                }
                else
                {
                    // longest sequence excludes the last character of b, so we head left
                    hints[i][j] = '-';
                }
            }
        }
    }

    stack<char> s;
    int i = a.length();
    int j = b.length();

    while (i != 0 || j != 0)
    {
        if (hints[i][j] == '\\') // character is part of lcs
        {
            s.push(a.at(i - 1));
            i--;
            j--;
        }
        else if (hints[i][j] == '|') // head up the array
        {
            i--;
        }
        else // head left of the array
        {
            j--;
        }
    }

    while (!s.empty())
    {
        solution += s.top();
        s.pop();
    }
    return solution;
}
```

# Resources

-   https://en.wikipedia.org/wiki/Longest_common_subsequence_problem
