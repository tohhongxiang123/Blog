# Master Theorem

If $T(n) = aT(\lceil \frac{n}{b} \rceil) + O(n^d)$ for constants $a > 0, b > 1, d \ge 0$, then 

$$
T(n) = \begin{cases}
O(n^d) & d > \log_b a \\
O(n^d \log n) & d = \log_b a \\
O(n^{\log_b a}) & d < \log_b a
\end{cases}
$$