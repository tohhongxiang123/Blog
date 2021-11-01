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