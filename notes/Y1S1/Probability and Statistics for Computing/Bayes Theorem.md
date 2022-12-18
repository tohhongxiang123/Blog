# Bayes Theorem

Bayes' Theorem is a formula to determine conditional probability. It states that

$$
P(A|B) = \frac{P(B|A)P(A)}{P(B)} =  \frac{P(B|A)}{P(B|A)  + P(B | \neg A)}
$$

First note: $P(A|B) = \frac{P(A \cap B)}{P(B)}$. Intuitively, $P(B)$ is the sample space, and $P(A|B)$ is the probability that $A$ occurs given $B$ already occured.

Derivation:

$$
\begin{aligned}
P(A|B) &= \frac{P(A \cap B)}{P(B)} \\
&= \frac{P(B|A)P(A)}{P(B)} \\ \\
P(A|B) &= \frac{P(A \cap B)}{P(B)} \\
&= \frac{P(B \cap A)}{P(B \cap A) + P(B \cap \neg A)} \\
&= \frac{P(B|A)P(A)}{P(B|A) P(A) + P(B | \neg A) P(A)} \\
&= \frac{P(B|A)}{P(B|A)  + P(B | \neg A)}
\end{aligned}
$$
