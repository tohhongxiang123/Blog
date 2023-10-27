# Chapter 1

For a single neuron,

For an input with $n$ features, input vector to the neuron is:

$$
\bold{x} = (x_1 \ \cdots \ x_n)^T \in \mathbb{R}^n
$$

The weight vector for the neuron:

$$
\bold{w} = (w_1 \ \cdots \ w_n)^T \in \mathbb{R}^n
$$

The synaptic input to a neuron $u$,

$$
u = \bold{w}^T \bold{x} + b
$$

- $b \in \mathbb{R}$ is the bias of the neuron

The output of the neuron, $y$,

$$
y = f(u)
$$

# Activation Functions

| Activation            | Formula                                                |
| --------------------- | ------------------------------------------------------ |
| Threshold (Unit step) | $f(u) = 1(u > 0)$                                      |
| Linear                | $f(u) = u$                                             |
| ReLU                  | $f(u) = \max\{0, u\}$                                  |
| Sigmoid               | $f(u) = \frac{1}{1 + e^{-u}}$                          |
| Tanh                  | $f(u) = \tanh (u) = \frac{e^u - e^{-u}}{e^u + e^{-u}}$ |

## Stochastic Gradient Descent

Given a set of training examples $\{(\bold{x}_p, d_p)\}_{p=1}^{P}$

- Initialise weights $\bold{W}$ and biases $\bold{b}$
- Set learning rate $\alpha \in \mathbb{R}$ and iterate until convergence:
  - For each pattern $(\bold{x}_p, d_p)$:
    $$
    \begin{aligned}
        \bold{W} &\leftarrow \bold{W} - \alpha \nabla_\bold{W} J_p \\
        \bold{b} &\leftarrow \bold{b} - \alpha \nabla_\bold{b} J_p \\
    \end{aligned}
    $$
- $J_p$ is the cost from the $p$-th training pattern
- 1 epoch goes through all $P$ training examples
- $\frac{\partial J(\bold{W}, \bold{b})}{\partial \bold{W}}$ has the same dimensions as $\bold{W}$, similarly for $\bold{b}$

## Gradient Descent

Input datapoints are rows in the data matrix, and the targets are a single vector

$$
\bold{X} = \begin{pmatrix}
    \bold{x}_1^T \\
    \vdots \\
    \bold{x}_P^T
\end{pmatrix} \in \mathbb{R}^{P \times n}, \bold{d} = \begin{pmatrix}
    d_1 \\
    \vdots \\
    d_P
\end{pmatrix} \in \mathbb{R}^P
$$

Given a set of training examples $(\bold{X}, \bold{d})$

- Initialise weights $\bold{W}$ and biases $\bold{b}$
- Set learning rate $\alpha \in \mathbb{R}$ and iterate until convergence:
  $$
  \begin{aligned}
      \bold{W} &\leftarrow \bold{W} - \alpha \nabla_\bold{W} J \\
      \bold{b} &\leftarrow \bold{b} - \alpha \nabla_\bold{b} J \\
  \end{aligned}
  $$
- $J$ is the cost calculated from **all** training patterns
- Weights are updated once after considering all input patterns

# Linear Regression

For a neuron with

- Weights $\bold{w} \in \mathbb{R}^n$
- Bias $b \in \mathbb{R}$
- Input $\bold{x} \in \mathbb{R}^n$
- Activation function $y = f(u)$
- A target $d \in \mathbb{R}$

A batch of $P$ inputs is given by $\bold{X} \in \mathbb{R}^{P \times n}$, and its corresponding outputs $\bold{d} \in \mathbb{R}^{P}$: (Put each example as a row)

$\bold{1}_P \in \mathbb{R}^P$ is a column vector of $P$ ones

$$
\bold{X} = \begin{pmatrix}
    \bold{x}_1^T \\
    \vdots \\
    \bold{x}_P^T
\end{pmatrix} \in \mathbb{R}^{P \times n}, \bold{d} = \begin{pmatrix}
    d_1 \\
    \vdots \\
    d_P
\end{pmatrix} \in \mathbb{R}^P
$$

| Name                | GD                                     | SGD                                           |
| ------------------- | -------------------------------------- | --------------------------------------------- |
| Input               | $(\bold{X}, \bold{d})$                 | $(\bold{x}_p, d_p)$                           |
| Synaptic input      | $\bold{u} = \bold{Xw} + b\bold{1}_P$   | $u_p = \bold{w}^T \bold{x}_p + b$             |
| Output              | $\bold{y} = f(\bold{u})$               | $y_p = f(u_p)$                                |
| Cost function       | $J = \frac{1}{2}(\bold{d}-\bold{y})^2$ | $J =\frac{1}{2} \sum_{p=1}^{P} (d_p - y_p)^2$ |
| $\nabla_\bold{W} J$ | $-\bold{X}^T (\bold{d} - \bold{y})$    | $-(d_p - y_p) f'(u_p) \bold{x}$               |
| $\nabla_b J$        | $-\bold{1}_P^T (\bold{d} - \bold{y})$  | $-(d_p - y_p) f'(u_p)$                        |

# Binary Classification

For a neuron with

- Weights $\bold{w} \in \mathbb{R}^n$
- Bias $b \in \mathbb{R}$
- Input $\bold{x} \in \mathbb{R}^n$
- Activation function $y = f(u) = \frac{1}{1+ e^{-u}}$
- A target $d \in \{0, 1\}$

| Name                | GD                                                                 | SGD                                                 |
| ------------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| Input               | $(\bold{X}, \bold{d})$                                             | $(\bold{x}_p, d_p)$                                 |
| Synaptic input      | $\bold{u} = \bold{Xw} + b\bold{1}_P$                               | $u_p = \bold{w}^T \bold{x}_p + b$                   |
| Cost function       | $J = -\sum_{p=1}^{P} d_p \log(f(u_p)) + (1 - d_p)\log(1 - f(u_p))$ | $J = -d_p \log(f(u_p)) + (1 - d_p)\log(1 - f(u_p))$ |
| Output              | $\bold{y} = 1(f(\bold{u}) > 0.5)$                                  | $y_p = 1(f(u_p) > 0.5)$                             |
| $\nabla_\bold{W} J$ | $-\bold{X}^T (\bold{d} - f(\bold{u}))$                             | $-(d_p - f(u_p)) \bold{x}$                          |
| $\nabla_b J$        | $-\bold{1}_P^T (\bold{d} - f(\bold{u}))$                           | $-(d_p - f(u_p))$                                   |

## Limitations of Logistic Regression Neuron

- Neuron can perform pattern classification on ly on linearly separable patterns

## Learning Rates

- Higher learning rates, faster convergence, unstable
- Lower learning rates, slower convergence

# Neuron Layers

We have a layer of $K$ neurons. Each neuron takes in

- Input $\bold{x} \in \mathbb{R}^n$
- Activation function $f(\bold{u}), f: \mathbb{R}^n \to \mathbb{R}^K$
- Target $\bold{d} \in \mathbb{R}^K$

The weights $\bold{W}$ and biases $\bold{b}$ of the layer are given by

$$
\begin{aligned}
    \bold{W} &= (\bold{w_1}, ..., \bold{w}_K) \in \mathbb{R}^{n \times K} \\
    \bold{b} &= (b_1, ..., b_K)^T \in \mathbb{R}^K
\end{aligned}
$$

For a batch of $P$ inputs, we write the inputs $\bold{X} \in \mathbb{R}^{P \times n}$ and their corresponding targets $\bold{D} \in \mathbb{R}^{P \times K}$, where the $i$-th row represents the $i$-th example

$$
\bold{X} = \begin{pmatrix}
    \bold{x}_1^T \\
    \vdots \\
    \bold{x}_P^T
\end{pmatrix} \in \mathbb{R}^{P \times n}, \bold{D} = \begin{pmatrix}
    \bold{d}_1 \\
    \vdots \\
    \bold{d}_P
\end{pmatrix} \in \mathbb{R}^{P \times K}
$$

## Regression for Neuron Layer

| Name                          | GD                                                                  | SGD                                                               |
| ----------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Inputs                        | $(\bold{X}, \bold{D})$                                              | $(\bold{x}, \bold{d})$                                            |
| Synaptic Inputs               | $\bold{U} = \bold{XW} + \bold{B}$                                   | $\bold{u} = \bold{W}^T \bold{x} + \bold{b}$                       |
| Outputs                       | $\bold{Y} = f(\bold{U})$                                            | $\bold{y} = f(\bold{u})$                                          |
| Cost function                 | $J = \frac{1}{2} \sum_{p=1}^{P} \sum_{k=1}^{K} (d_{pk} - y_{pk})^2$ | $J = \frac{1}{2} \sum_{k=1}^{K} (d_k - y_k)^2$                    |
| Gradients wrt synaptic inputs | $\nabla_\bold{U} J = -(\bold{D} - \bold{Y}) \cdot f'(\bold{U})$     | $\nabla_\bold{u} J = -(\bold{d} - \bold{y}) \cdot f'(\bold{u})$   |
| Gradients wrt weights         | $\nabla_\bold{W} J = \bold{X}^T \nabla_\bold{U} J$                  | $\nabla_\bold{W} J = \bold{x} \left( \nabla_\bold{u} J \right)^T$ |
| Gradients wrt biases          | $\nabla_\bold{b} J = \left(\nabla_\bold{U} J \right)^T \bold{1}_P$  | $\nabla_\bold{b} J = \nabla_\bold{u} J$                           |

## Classification for Neuron Layer

For multi-class classification, we use the softmax activation function:

$$
P(y = k | \bold{x}) = f(u_k) = \frac{e^{u_k}}{\sum_{k'=1}^{K} e^{u_{k'}}}
$$

where $u_k = \bold{w}_k^T \bold{x} + b_k$ is the synaptic input for the $k$-th neuron. $P(y = k | \bold{x})$ is the final output of the $k$-th neuron in the softmax layer

$1(\bold{k} = d) \in \mathbb{R}^K$ is a one-hot vector where the element corresponding to the target label $d$ is 1, and elsewhere 0

$$
1(\bold{k} = d) = \begin{pmatrix}
    1(d = 1) \\
    \vdots \\
    1(d = K)
\end{pmatrix}
$$

For a batch of $P$ inputs, $\bold{K}$ is a matrix where the $i$-th row corresponds to the $i$-th training example's output

$$
\bold{K} = \begin{pmatrix}
    1(\bold{k} = d_1)^T \\
    \vdots \\
    1(\bold{k} = d_P)^T
\end{pmatrix}
$$

| Name                  | GD                                                                              | SGD                                                               |
| --------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Inputs                | $(\bold{X}, \bold{D})$                                                          | $(\bold{x}, d)$                                                   |
| Synaptic input        | $\bold{U} = \bold{XW} + \bold{B}$                                               | $\bold{u} = \bold{W}^T \bold{x} + \bold{b}$                       |
| Output                | $\bold{y} = \argmax_k f(\bold{U})$                                              | $y = \argmax_k f(\bold{u})$                                       |
| Cost function         | $J = - \sum_{p=1}^{P} \left( \sum_{k=1}^{K} 1(d_p = k) \log(f(u_{pk})) \right)$ | $J = - \sum_{k=1}^{K} 1(d=k) \log(f(u_k))$                        |
| Gradients wrt input   | $\nabla_\bold{U} J = -(\bold{K} - f(\bold{U}))$                                 | $\nabla_\bold{u} J = -(1(\bold{k} = d) - f(\bold{u}))$            |
| Gradients wrt weights | $\nabla_\bold{W} J = \bold{X}^T \nabla_\bold{U} J$                              | $\nabla_\bold{W} J = \bold{x} \left( \nabla_\bold{u} J \right)^T$ |
| Gradients wrt biases  | $\nabla_\bold{b} J = \left(\nabla_\bold{U} J \right)^T \bold{1}_P$              | $\nabla_\bold{b} J = \nabla_\bold{u} J$                           |

# Weight Initialisation

Xavier/Glorat Uniform Initialisation: Uniformly draw weight samples

$$
w \sim U(-a, a), \ a = g \sqrt{\frac{6}{n_{in} + n_{out}}}
$$

- $n_{in}$: number of input nodes
- $n_{out}$ = number of neurons in the layer

| Activation | Linear | Sigmoid | Tanh | ReLU       | LeakyReLU                             |
| ---------- | ------ | ------- | ---- | ---------- | ------------------------------------- |
| $g$        | 1      | 1       | 5/3  | $\sqrt{2}$ | $\sqrt{\frac{1}{1 + \text{slope}^2}}$ |

Truncated Normal Distribution (Kaiming Normal Initialisation): Draw weight samples from

$$
w \sim \text{truncated normal}\left[\mu=0, \sigma = \frac{g}{\sqrt{n_{in}}}\right]
$$

- In truncated normal, samples that are more than $2\sigma$ away from $\mu$ are discarded and resampled
