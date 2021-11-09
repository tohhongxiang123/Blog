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

Boyer-Moore is basically an improvement of the naive algorithm, by skipping as much as possible after a mismatch. For example

```
THERE WOULD HAVE BEEN A TIME FOR SUCH A WORD
     WORD
        ^
```

From here, we can see that `U` does not occur in our pattern `P`, hence we can skip the next 2 alignments

```
THERE WOULD HAVE BEEN A TIME FOR SUCH A WORD
         WORD
        ^
```

Just like the naive algorithm, we start from the leftmost side of the text, and try the compare the pattern with the text. However, unlike the naive algorithm, we will begin looking at characters from the back of the pattern instead, so that we can skip as much as possible

Boyer-Moore uses 2 specific rules:
1. Bad character rule
2. Good suffix rule

## Bad Character Rule

Upon mismatch, we will skip alignments until 
- Mismatch becomes a match, or
- P moves past mismatched character

```
GCTTCTGCTACCTTTTGC
CCTTTTGC
    ^ first mismatch from the back
```

Our first mismatch occurs at the character `C` in the text. We will move P towards the right until the mismatch becomes a match (i.e. we reach the rightmost C to the left of the mistmatch)

```
GCTTCTGCTACCTTTTGC
   CCTTTTGC
    ^ matched again
```

Now the new mismatch is the `G` from the back, mismatched with `A` in the text

```
GCTTCTGCTACCTTTTGC
   CCTTTTGC
         ^ first mismatch
```

Since there are no `A`s in the pattern, we can safely move `P` past the mismatch

```
GCTTCTGCTACCTTTTGC
          CCTTTTGC
         ^ first mismatch
```

Finally, we have reached a full match

## Good Suffix Rule

Let `t` be the substring matched by the inner loop. We will skip until
- There are no mismatches between P and `t`, or
- P moves past `t`

```
CGTGCCTACTTACTTACTTACTTACGCGAA
CTTACTTAC
      ^^^ t
```

We can see another occurrence of `TAC` within our pattern, hence we shift our pattern such that it aligns with the matched suffix

```
CGTGCCTACTTACTTACTTACTTACGCGAA
    CTTACTTAC
      ^^^^^^^ t
```

For this, we can see that our `CTTAC` in our pattern P matches `CTTAC`, the suffix in the text (even though it is not a full match). Hence we will shift until both `CTTAC`s match.

```
CGTGCCTACTTACTTACTTACTTACGCGAA
        CTTACTTAC
```

## Using Both Rules Together

We will use both the good-suffix and the bad-character rule within our algorithm, and we will use whichever skips more

```
GTTATAGCTGATCGCGGCGTAGCGGCGAA
GTAGCGGCG
        ^ first mismatch
```

We can see that `T` in the text is the first mismatch. We see that there is another `T` in the pattern we can shift to, hence by bad character rule, we shift to that `T` (7 spaces). The good suffix rule doesn't apply here because the suffix is only 1 character `T` (0 spaces).

```
GTTATAGCTGATCGCGGCGTAGCGGCGAA
       GTAGCGGCG
        ^ align T
```

Now we can see that `GCG` is a matched suffix, and `C` is our first mismatch. 

```
GTTATAGCTGATCGCGGCGTAGCGGCGAA
       GTAGCGGCG
            ^ first mismatch
```

By bad character rule, we align the next `C` in the pattern with the mismatched `C` in the text (1 space). By good suffix rule, we see that there is another `GCG` that occurs within the text, hence we align that other `GCG` with the text (3 spaces). Since good suffix rule skips more than the bad character rule, we skip by 3 spaces in total

```
GTTATAGCTGATCGCGGCGTAGCGGCGAA
          GTAGCGGCG
            ^ first mismatch
```

The bad-character rule makes us move 3 spaces, while the good suffix rule makes us skip 8. So in total we skip 8 

```
GTTATAGCTGATCGCGGCGTAGCGGCGAA
                  GTAGCGGCG
```

And we now have a match

## Preprocessing

To make Boyer-Moore fast, we pre-process the pattern by building table so that we can easily calculate how far we can skip

### Preprocessing for bad-character heuristic

For a pattern $P$ and a character set $\Sigma$ (a set of all possible characters in the text $T$), we calculate **how many alignments we can skip**

For example, let $\Sigma = \{ A, C, G, T \}$ and $P = TCGC$

|     | T   | C   | G   | C   |
| --- | --- | --- | --- | --- |
| A   | 0   | 1   | 2   | 3   |
| C   | 0   | -   | 0   | -   |
| G   | 0   | 1   | -   | 0   |
| T   | -   | 0   | 1   | 2   |

The rows represent which is the mismatch in our text, and the columns represent the mismatch in our pattern

For example, we currently had the following alignment

```
AATCAATAGC
TCGC
```

Our first mismatch is `G` in P and `T` in our text. Hence, we check the row `T` and column `G`, and see that we can skip 1 alignment. This is equivalent to moving 2 spaces.

```
AATCAATAGC
  TCGC
```

### Simplifying Bad Character Heuristic

Instead of creating a 2D table, we can just create a 1D table, where the entries represent the currently mismatched character in the text, and the value of the entry represents the index of the rightmost character within `P` that matches the mismatched character

Consider us having a mismatch at index `k` of the pattern, and `j` in the text. The character in the pattern at index `k` is `b`, and the current character in the text is `d` Note the 2 cases
1. If `d` does not occur within the text, we set `j = j + m`, since we shift the whole text past `j`
2. If `d` occurs at index `i` within the pattern, where `i` is the rightmost occurrence of `d`, we shift by `j = j + m - i`, to align the 2 occurrences of `d` within the text, and the pattern

For example, 

```
RATSANDCATS - m = 11

badCharacterTable = [ 2, 11, 3, 4, ..., ]
```

The first element of `badCharacterTable` is the rightmost occurence of `A` from the back of the pattern, which is `2`. The second element of `badCharacterTable` is the rightmost occurence of `b` in the table. Since there is no occurence of `b`, the overall shift will be `11`, which is the length of the string

However, sometimes this heuristic fails. If `d` occurs to the right of `b` in the pattern (`j < i`), the pattern will be shifted in the wrong direction instead. 

To fix this, when we are calculating the jump based on the bad character heuristic, we use

```
int simpleBMScan(char[] P, char[] T, int m, int[] charJump) {
    int j;
    int k;

    j = m;
    k = m;

    while (j <= n) {
        if (j < 1) {
            return j + 1; // match found
        }

        if (T[j] == P[k]) {
            j--;
            k--;
        } else {
            j += max(charJump[T[j]], m - k + 1); // if bad character heuristic fails, we now compare character in the text that comes directly after the end of the pattern previously
            k = m;
        }
    }

    return -1;
}
```

## Preprocessing Good Character Heuristic

Consider the following alignment

```
ABAABABABCBA
CABAB
  ^ first mismatch
```

The suffix `AB` has matched, and mismatched at `B`. Hence we shift until we find the first occurrence of `AB` without `B` preceding, and we can see that `CAB` exists. Hence we shift by a total of 2

```
ABAABABABCBA
  CABAB
```

Consider another alignment

```
ABCABABACBA
CBAAB
   ^ first mismatch
```

We matched the suffix `AB`, but there is no other suffix `AB` in the pattern, hence we shift by the length of the pattern (5)

```
ABCABABACBA
     CBAAB
```

Consider the pattern `ANPANMAN`, we want to calculate the good character heuristic for each possible mismatch

1. Mismatch `N`
    We mismatched the first character within the pattern. The good suffix length is 0. Hence we only shift 1

2. Mismatch `A` in `AN`
    Mismatched the second character we check. The good suffix length is 1. We have to find an occurence of `N` that is not preceded by `A` within the pattern. This means no part of the good suffix can be useful to us, and we shift by the full pattern length 8.

3. Mismatch `M` in `MAN`
    We matched `AN` but not `M`. Hence, we will look for the first `AN` not preceded by a `M`, which is `PAN`. We shift the pattern to line up the `AN`s, hence the shift is 3

4. Mismatch `N` in `NMAN`
    We matched `MAN` but not `N`. `MAN` does not match anything within the pattern. However the trailing suffix `AN` matches the start of the pattern, hence we shift by 6. This is the same for all other cases

Consider `m` the length of the pattern, `k` the current index in the pattern, `j` the current index in the text, and `q`, the index of the end of the reoccurring suffix within `P`

`m - k` tells us how many characters we have matched. `slide[k] = m - q` tells us how much to slide the pattern `p` until a new suffix matches the old matched suffix

```
RATSANDCATS
.......DATS........
       ^ old j


goodSuffixTable[k] = m - k + slide[k]
slide[k] = m - q
```

## Procedure

Below is the simplified boyer-moore algorithm, which only implements the bad character heuristic

```cpp
#include <iostream>
#include <vector>
#include <string>

#define NUMBER_OF_CHARACTERS 26

using namespace std;

int max(int a, int b) {
    return (a > b) ? a : b;
}

int characterToNumber(char character) {
    return character - 'A';
}

vector<int> badCharacterHeuristic(string pattern)
{
    vector<int> result;

    // default to be the length
    for (int i = 0; i < NUMBER_OF_CHARACTERS; i++) {
        result.push_back(pattern.length()); 
    }

    // for each character, find the rightmost occurrence
    for (int i = 0; i < pattern.length(); i++) {
        result[characterToNumber(pattern.at(i))] = pattern.length() - 1 - i; // position from end
    }

    return result;
}

int search(string text, string pattern)
{
    vector<int> badCharacterTable = badCharacterHeuristic(pattern);

    int currentIndexInText = pattern.length() - 1;
    int currentIndexInPattern = pattern.length() - 1;

    while (currentIndexInText < (int) (text.length())) {
        // went through whole pattern, found match
        if (currentIndexInPattern < 0) { 
            return currentIndexInText + 1;
        }

        // same last character, decrease both indices by 1
        if (text.at(currentIndexInText) == pattern.at(currentIndexInPattern)) {
            currentIndexInText--;
            currentIndexInPattern--;
            continue;
        }

        // mismatched, calculate jump
        currentIndexInText += max(
            badCharacterTable[characterToNumber(text.at(currentIndexInText))], 
            pattern.length() - currentIndexInPattern
        );

        currentIndexInPattern = pattern.length() - 1;
    }

    // no match
    return -1;
}

int main()
{
    cout << search("ZSXVAFVNSBAAABASFHASF", "BAAA") << endl;

    return 0;
}
```

Below is the Boyer-Moore search implemented with both the good suffix and bad character heuristic (Not complete)

```cpp
#include <iostream>
#include <vector>
#include <string>

#define NUMBER_OF_CHARACTERS 26

using namespace std;

int max(int a, int b) {
    return (a > b) ? a : b;
}

int characterToNumber(char character) {
    return character - 'A';
}

vector<int> badCharacterHeuristic(string pattern)
{
    vector<int> result;

    // default to be the length
    for (int i = 0; i < NUMBER_OF_CHARACTERS; i++) {
        result.push_back(pattern.length()); 
    }

    // for each character, find the rightmost occurrence
    for (int i = 0; i < pattern.length(); i++) {
        result[characterToNumber(pattern.at(i))] = pattern.length() - 1 - i; // position from end
    }

    return result;
}

vector<int> goodCharacterHeuristic(string pattern) {
    vector<int> result;
    vector<int> slide;
    
    for (int i = 0; i < pattern.length() + 1; i++) {
        result.push_back(0);
        slide.push_back(0);
    }

    int i = pattern.length();
    int j = pattern.length() + 1;
    
    slide[i] = j;
    while (i > 0) {
        while (j <= pattern.length() && pattern.at(i - 1) != pattern.at(j - 1)) {
            if (result[j] == 0) {
                result[j] = j - i;
            }
            
            j = slide[j];
        }
        
        i--;
        j--;
        slide[i] = j;
    }
    
    j = slide[0];
    for (i = 0; i <= pattern.length(); i++) {
        if (result[i] == 0) {
            result[i] = j;
        }
        
        if (i == j) {
            j = slide[j];
        }
    }
    
    return result;
}

int search(string text, string pattern)
{
    vector<int> badCharacterTable = badCharacterHeuristic(pattern);
    vector<int> goodSuffixTable = goodCharacterHeuristic(pattern);
    

    int currentIndexInText = pattern.length() - 1;
    int currentIndexInPattern = pattern.length() - 1;

    while (currentIndexInText < (int) text.length()) {
        // went through whole pattern, found match
        if (currentIndexInPattern < 0) { 
            return currentIndexInText + 1;
        }

        // same last character, decrease both indices by 1
        if (text.at(currentIndexInText) == pattern.at(currentIndexInPattern)) {
            currentIndexInText--;
            currentIndexInPattern--;
            continue;
        }

        // mismatched, calculate jump
        currentIndexInText += max(
            badCharacterTable[characterToNumber(text.at(currentIndexInText))], 
            pattern.length() - currentIndexInPattern
        );

        currentIndexInPattern = pattern.length() - 1;
    }

    // no match
    return -1;
}

int main()
{
    cout << search("ZSXVAFVNSBAAABASFHASF", "BAAA") << endl;

    return 0;
}
```


# Resources

- https://www.youtube.com/watch?v=4Xyhb72LCX4
- https://www.youtube.com/watch?v=Wj606N0IAsw
- https://stackoverflow.com/questions/27428605/constructing-a-good-suffix-table-understanding-an-example
- https://www.inf.hs-flensburg.de/lang/algorithmen/pattern/bmen.htm
- https://stackoverflow.com/questions/19345263/boyer-moore-good-suffix-heuristics