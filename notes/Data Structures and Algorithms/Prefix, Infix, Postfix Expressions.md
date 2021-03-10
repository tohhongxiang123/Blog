# Prefix, Infix and Postfix Expressions

# Infix
The most readable expression, because that is what expressions are usually written in

- A + B
- B * C
- X - Y

> An infix expression is where the operator is in the middle of the 2 operands

# Prefix
> A prefix expression is where the operator is on the left of the 2 operands

- + A B
- * B C
- - X Y

# Postfix
> A postfix expression is where the operator is on the right side of the 2 operands

- A B +
- B C *
- X Y -

# Advantages of Prefix/Postfix expressions

Writing in prefix/postfix makes the **order of precedence** obvious for computers. While for infix, a **fully parenthesised** expression would be required to determine the order of operations

# Writing Compound Expressions

Consider A + B * C

We know that the order of precedence comes as (A + (B * C)). 

1. We multiply B * C first
2. We add A to that result

Hence, A + B * C = + A * B C (prefix) = A B C * + (postfix)

How about (A + B) * C?

1. We add A + B
2. We multiply C

Hence, (A + B) * C = * + A B C (prefix) = A B + C * (Postfix)

# How to Systematically Convert from Infix to Prefix/Postfix?

Consider the expression (A + B) * C + D. Using order of precedence, we can fully parenthesise the expression

(((A + B) * C) + D)

### Prefix
- Move the operator to its corresponding left bracket
- (A + B) = + A B
- ((A + B) * C) = ((+ A B) * C) = * + A B C
- (((A + B) * C) + D) = ((* + A B C) + D) = + * + A B C D

### Postfix
- Move the operator to its corresponding right bracket
- (A + B) = A B +
- ((A + B) * C) = ((A B +) * C) = A B + C *
- (((A + B) * C) + D) = ((A B + C *) + D) = A B + C * D +

# General Conversion from Infix to Postfix

Input: A string of tokens delimited by spaces. The operator tokens are *, /, +, and -, along with the left and right parentheses, ( and ). The operand tokens are the single-character identifiers A, B, C, and so on
Output: A string, the postfix expression of the input string

### Algorithm

1. Create an empty stack `opstack` to keep operators
2. Create an empty list `output`
3. Split the input string into individual tokens
4. Scan the token list from left to right
   1. If the token is an operand, append it to the end of `output`
   2. If token is a `(`, push it onto `opstack`
   3. If token is `)`, pop `opstack` until the corresponding `(` is popped. Append each operator onto the end of `output`
   4. If the token is an operator (`+, -, *, /`), push it onto `opstack`. However, remove any operators already on the opstack that have **higher or equal** precedence, and append them to the output list
5. Once input completes, pop any remaining operators on the stack to the end of `output`

### To convert from infix to prefix
1. Reverse the expression, but while reversing the string, interchange left and right parentheses.
2. Obtain postfix expression
3. Reverse the postfix expression

```python
validParentheses = {
    '}': '{',
    ')': '(',
    ']': '['
}

def isBalanced(expression):
    '''
    Checks if the expression has balanced parentheses
    '''
    s = []
    for token in expression:
        if token in validParentheses.values():
            s.append(token)
        elif token in validParentheses.keys():
            if s[-1] != validParentheses[token]:
                return False
            s.pop()
            
    return len(s) == 0
    
validOperators = '* / % + - << >> ='.split()

def getPrecedence(operand):
    '''
    Gets the precedence of the operand
    Returns a number, the precedence of the operand
    The higher the precedence, the higher the number
    '''
    if not operand:
        return 0
        
    if operand in '* / %'.split():
        return 3
    elif operand in '+ -'.split():
        return 2
    elif operand in '<< >>'.split():
        return 1
    else:
        return 0
        
def convertToPostfix(expression):
    '''
    Converts infix expression to postfix expression
    Returns a string, the postfix expression
    '''
    output = []
    opstack = []
    
    for token in expression:
        if token.isalnum():
            output.append(token)
            continue
        
        if token == '(':
            opstack.append(token)
            continue
        
        if token == ')':
            topOfOpstack = opstack.pop()
            while topOfOpstack != '(':
                output.append(topOfOpstack)
                topOfOpstack = opstack.pop()
            continue
        
        if token in validOperators:
            while len(opstack) > 0 and getPrecedence(opstack[-1]) >= getPrecedence(token):
                output.append(opstack.pop())
            opstack.append(token)
            
    while len(opstack) > 0:
        output.append(opstack.pop())
        
    return ' '.join(output)
    
def reverseExpression(expression):
    '''
    Reverses the expression, and maintains the parentheses
    Returns a string, the reversed expression
    '''
    output = []
    for token in expression[::-1]:
        if token in validParentheses.values():
            for closingParenthesis, openingParenthesis in validParentheses.items():
                if token == openingParenthesis:
                    output.append(closingParenthesis)
                    break
        elif token in validParentheses.keys():
            output.append(validParentheses[token])
        else:
            output.append(token)
            
    return ''.join(output)
    
def convertToPrefix(expression):
    '''
    Converts infix to prefix expression
    Returns a string, the prefixed expression
    '''
    expression = reverseExpression(expression)
    postfixedExpression = convertToPostfix(expression)
    return reverseExpression(postfixedExpression)
         
if __name__ == "__main__":
    exp = input()
    if not isBalanced(exp):
        print("Not balanced expression")
    else:
        print(f"Postfix: {convertToPostfix(exp)}")
        print(f"Prefix: {convertToPrefix(exp)}")
```
# Postfix Evaluation

The general procedure is:
1. Create an empty stack `operandStack`
2. Convert string to list 
3. Scan tokens from left to right
   1. If token is operand, convert from string to int, and push onto `operandStack`
   2. If token is operator, pop `operandStack` twice. The first pop is the **second operand**, the second pop is the first operand. Perform the operation, and push the result back onto `operandStack`
4. When input expression is completely processed, the result is on top of the `operandStack`. Pop and return

```python
def performOperation(token, operand1, operand2):
    assert token in validOperators, f"{token} is not a valid operator"
    if token == "*":
        return operand1*operand2
    elif token == "/":
        return operand1/operand2
    elif token == "%":
        return operand1 % operand2
    elif token == "+":
        return operand1 + operand2
    elif token == "-":
        return operand1 - operand2
    elif token == "<<":
        return operand1 << operand2
    else:
        return operand1 >> operand2
        
    
def evaluatePostfix(expression):
    """
    Evaluates numerical postfix expression
    Returns the result of the postfix expression
    """
    operandStack = []
    for token in expression:
        if token.isalnum():
            currentNumber = int(token)
            operandStack.append(currentNumber)
        if token in validOperators:
            operand2 = operandStack.pop()
            operand1 = operandStack.pop()
            result = performOperation(token, operand1, operand2)
            operandStack.append(result)
            
    return operandStack.pop()
```

# External Resources

- [What is Prefix, Infix, Postfix](https://runestone.academy/runestone/books/published/pythonds/BasicDS/InfixPrefixandPostfixExpressions.html)
- [Converter between infix/prefix/postfix](https://raj457036.github.io/Simple-Tools/prefixAndPostfixConvertor.html)