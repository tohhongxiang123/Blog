# Chapter 1

For a single neuron,

The input vector to the neuron is:

$$
\bold{x} = (x_1 \ \cdots \ x_n)^T \in \mathbb{R}^n
$$

The weight vector for the neuron:

$$
\bold{w} = (w_1 \ \cdots \ w_n)^T \in \mathbb{R}^n
$$

The synaptic input to a neuron,

$$
u = \bold{w}^T \bold{x} + b
$$

- $b \in \mathbb{R}$ is the bias of the neuron

![](https://miro.medium.com/v2/resize:fit:1068/1*Z1_IgFO1c6tq4Tz1iwJraw.png)

# Activation Functions

The threshold (unit step) activation function is given by

$$
f(u) = 1 (u > 0) =
\begin{cases} 0 & \text{if } u \leq 0 \\ 1 & \text{otherwise} \end{cases}
$$

A linear activation function is given by

$$
f(u) = u
$$

The ReLU (Rectified Linear Unit) activation function is written as:

$$
f(u) = \max \{ 0, u \}
$$

The sigmoid activation function is given by:

$$
f(u) = \frac{1}{1 + e^{-u}}
$$

The tanh activation function is given by:

$$
f(u) = \tanh (u) = \frac{e^u - e^{-u}}{e^u + e^{-u}}
$$
