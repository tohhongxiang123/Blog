# String Matching

> Given a text $T$ of $n$ characters and a pattern $P$ of $m$ characters, find the first occurence of $P$ in $T$.

```c
int simpleScan(char[] pattern, char[] text, int patternLength, int textLength) {
    int currentGuess = 0;
    int currentIndexInText = 0;
    int currentIndexInPattern = 0;

    while (currentIndexInText < textLength) {
        if (text[currentIndexInText] != pattern[currentIndexInPattern]) { // if no match
            currentIndexInText = ++currentGuess; // restart searching from the next index of last checked character in text
            if (currentIndexInText > textLength - patternLength) { // went too far
                break;
            }
            currentIndexInPattern = 0; // start again from beginning of pattern
        } else {
            currentIndexInText++;
            currentIndexInPattern++;
            if (currentIndexInPattern == patternLength) { // full match
                return currentIndexInText;
            }
        }
    }

    return -1;
}
```

An example of the worst case is `pattern = "AAAAC"` and `text = "AAAAAAAAAAAAAAAAAAAA"`. Total number of comparisons done is m(n - m + 1) comparisons (Each guess compares with the text $m$ times (including the final mismatch). If our index hits $n - m + 1$, we cannot possibly find a match already, because the length of remaining text is less than the length of the pattern). Worst case complexity is $O(mn)$, where $m$ is the length of the pattern, and $n$ is the length of the text.

# Rabin-Karp Algorithm

1. Convert the pattern (length $m$) into a number $p$
2. Convert the first m-characters (the first text window) to a number $t$
3. If $p = t$, we have found the match, and exit
4. If not end-of-text, shift the window one character right, and convert the string in it to $t$, and go back to step 3; Else, pattern not found and exit

- The hash function converts a string into a unique number
    - For a string `a1, a2, ..., an`, we use the hash $\sum_{i = 1}^{n} a_i * D^{n - i}$, where $D$ is the number of possible characters in the string
    - 'ABC' has a hash of $1*10^2 + 2*10^1 + 3*10^0$ if we use only 10 possible characters
- When we want to update our hash when the window rolls over, we do the following
    1. Subtract $a_1 * D^{n - 1}$
    2. Multiply the remaining hash by $D$
    3. Add $a_{n-1}$
- For example, 'ABC' to 'BCD'
    - Subtract $1*10^2$
    - Multiply the remaing hash by 10
    - Add D ($+ 4$)

```cpp
#include <iostream>
#include <math.h>

using namespace std;

// assuming only alphanumeric characters, we range from 1-57
#define NUMBER_OF_CHARACTERS 57

// converts 'A' to 1, 'B' to 2, etc.
int characterToInt(char c) {
    return c - 'A' + 1;
}

// sum of char(i) * 57^(n-i-1)
int hashString(string text) { 
    int hashCode = 0;
    for (int i = 0; i < text.length(); i++) {
        hashCode += characterToInt(text.at(i)) * pow(NUMBER_OF_CHARACTERS, text.length() - i - 1);
    }
    return hashCode;
}

// checks whether t1 has the same value as t2
bool isMatch(string t1, string t2) {
    if (t1.length() != t2.length()) {
        return false;
    }
    
    for (int i = 0; i < t1.length(); i++) {
        if (t1.at(i) != t2.at(i)) {
            return false;
        }
    }
    
    return true;
}

int string_match(string text, string pattern) {
    // if pattern longer than text, obviously no match
    if (text.length() < pattern.length()) {
        return -1;
    }
    
    // hash the first window
    int currentTextHash = hashString(text.substr(0, pattern.length()));
    // hash the pattern
    int patternHash = hashString(pattern);
    
    // if immediately match, return 
    if (isMatch(text.substr(0, pattern.length()), pattern)) {
        return 0;
    }
    
    for (int i = 1; i < text.length() - pattern.length() + 1; i++) {
        // update rolling window hash
        currentTextHash -= characterToInt(text.at(i - 1)) * pow(NUMBER_OF_CHARACTERS, pattern.length() - 1);
        currentTextHash *= NUMBER_OF_CHARACTERS;
        currentTextHash += characterToInt(text.at(i + pattern.length() - 1));
        
        if (isMatch(text.substr(i, pattern.length()), pattern)) {
            return i;
        }
    }
    
    // no match
    return -1;
}

int main()
{
    cout << string_match("aaaaaaaab", "aab") << endl;

    return 0;
}
```

# Boyer-Moore Algorithm

- An efficient algorithm for string searching
- The text being scanned is $T$ with $n$ characters
- The pattern we are looking for is $P$ with $m$ characters
- Process text $T[1..n]$ from left to right
- Scan the pattern $P[1..m]$ from left to right
- Preprocessing to generate 2 tables based on which to slide the pattern as much as possible after a mismatch
- Performs very well with long patterns

## Bad Character Rule

Consider a mismatch at $T[j]$ and $P[k]$. If the character $T[j]$ does not appear in $P$ at all, we can move the start of $P$ to $j + 1$, and continue from there.

```
ANPANMAN
BBBBBMANCCCCCCCCCC
    ^ first mismatch

     ANPANMAN
BBBBBMANCCCCCCCCCC
```

We will then set $j := j + m$

If the $T[j]$ character occurs on the left of $P[k]$, we line up $T[j]$ with the rightmost instance of $T[j]$ in $P$

```
ANBANMAN
BBBBBMANCCCCCCCCCC
    ^ first mismatch

  ANBANMAN  
BBBBBMANCCCCCCCCCC
```

We will set $j := j + m - i$, where $i$ is the index in $P$ where the next $T[j]$ occurs

For example, consider text = "The big crackers" and pattern "crackers"

```
CRACKERS
THE BIG CRACKERS
       ^ first mismatch

        CRACKERS
THE BIG CRACKERS    
```

Since there is no " " character that occurs in $P$, we shift the start of $P$ to $j + 1$.

Now, consider the text = "The crackers are" and pattern = "crackers"

```
CRACKERS
THE CRACKERS ARE
       ^ first mismatch

    CRACKERS
THE CRACKERS ARE
```

The first mismatch occurs at 'c', so we find the rightmost instance of 'c', and we slide the pattern over to align those 2 characters together. P slides 4 places to the right, and j = j + 8 - 4.

To compute the jumps,

```c
void computeJumps(char[] P, int m, int alpha, int[] charJump) {
    // alpha is the number of characters in the character set
    char ch;
    int k;

    for (ch = 0; ch < alpha; ch++) {
        // initially, assume all characters are not in the pattern
        // this means we will slide the entire pattern across
        charJump[ch] = m; 
    }

    for (k = 1; k <= m; k++) {
        // if a character is in the pattern, we do not slide the entire pattern across
        // we slide until we match the rightmost index of the pattern
        charJump[P[k]] = m - k; // position from the end
    }
}
```

## Good Suffix Rule


## Procedure

For text `text`, pattern `pattern`, and 2 tables generated in preprocessing, `charJump` and `matchJump`

```cpp
int bmSearch(string text, string pattern, int[] charJump, int[] matchJump) {
    int patternLength = pattern.length();
    int stringLength = string.length();

    int j = patternLength - 1;
    int k = patternLength - 1;

    while (j <= n) { // while we have not reached the end of the text
        if (k < 1) {
            return j; // if k reaches 0, match is found
        }

        if (text.at[j] == pattern.at[k]) { // if the current character we are looking at matches
            j--;
            k--;
        } else {
            j += max(charJump[text.at(j)], matchJump[k]);
            k = patternLength;
        }
    }

    return -1;
}
```