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
3. Create an empty list `parenthesisStack` to keep track of the last parenthesis encountered
4. Split the input string into individual tokens
5. Scan the token list from left to right
   1. If the token is an operand, append it to the end of `output`
   2. If token is a opening parenthesis
      1. Push it onto `opstack`
      2. Push the corresponding closing parenthesis onto `parenthesisStack`
   3. If token is the corresponding closing parenthesis
      1. Pop `opstack` until the corresponding opening parenthesis is popped. Append each operator onto the end of `output`
   4. If the token is an operator (`+, -, *, /`), 
      1. Push it onto `opstack`. However, remove any operators already on the opstack that have **higher or equal** precedence, and append them to the output list
6. Once input completes, pop any remaining operators on the stack to the end of `output`

### To convert from infix to prefix

1. Reverse the expression, but while reversing the string, interchange left and right parentheses.
2. Obtain postfix expression
3. Reverse the postfix expression

```python
import re

validParentheses = {
    '}': '{',
    ')': '(',
    ']': '['
}

def splitExpression(s):
    """
    Splits expression into tokens
    Returns array of tokens
    """
    sep = '|\\'
    regex = fr'\w+|\*|\/|\%|\+|\-|<<|>>|=|{sep.join(list(validParentheses.keys()) + list(validParentheses.values()))}'
    return re.findall(regex, s)

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
    parenthesisStack = []
    
    for token in splitExpression(expression):
        if token.isalnum():
            output.append(token)
            continue
        
        if token in validParentheses.values():
            # Get corresponding closing parenthesis
            for closingParenthesis, openingParenthesis in validParentheses.items():
                if token == openingParenthesis:
                    parenthesisStack.append(closingParenthesis)
                    break
                
            opstack.append(token)
            continue
        
        if len(parenthesisStack) > 0 and token == parenthesisStack[-1]:
            topOfOpstack = opstack.pop()
            while topOfOpstack != validParentheses[parenthesisStack[-1]]:
                output.append(topOfOpstack)
                topOfOpstack = opstack.pop()
            parenthesisStack.pop()
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
    for token in splitExpression(expression[::-1]):
        if token in validParentheses.values():
            for closingParenthesis, openingParenthesis in validParentheses.items():
                if token == openingParenthesis:
                    output.append(closingParenthesis)
                    break
        elif token in validParentheses.keys():
            output.append(validParentheses[token])
        else:
            output.append(token)
            
    return ' '.join(output)
    
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
        print(f"Infix from postfix: {convertPostfixToInfix(convertToPostfix(exp))}")
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
    if not operand1.isnumeric() or not operand2.isnumeric():
        return "(" + str(operand1) + " " + str(token) + " " + str(operand2) + ")"
    
    operand1 = int(operand1)
    operand2 = int(operand2)
    
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
    elif token == ">>":
        return operand1 >> operand2
    else:
        return "(" + str(operand1) + " " + str(token) + " " + str(operand2) + ")"
def convertPostfixToInfix(expression):
    """
    Converts postfix to infix
    Returns the infix expression
    """
    operandStack = []
    for token in splitExpression(expression):
        if token.isalnum():
            operandStack.append(token)
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

# Overall Code

```python
import re

validParentheses = {
    '}': '{',
    ')': '(',
    ']': '['
}

def splitExpression(s):
    sep = '|\\'
    regex = fr'\w+|\*|\/|\%|\+|\-|<<|>>|=|{sep.join(list(validParentheses.keys()) + list(validParentheses.values()))}'
    return re.findall(regex, s)

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
    parenthesisStack = []
    
    for token in splitExpression(expression):
        if token.isalnum():
            output.append(token)
            continue
        
        if token in validParentheses.values():
            # Get corresponding closing parenthesis
            for closingParenthesis, openingParenthesis in validParentheses.items():
                if token == openingParenthesis:
                    parenthesisStack.append(closingParenthesis)
                    break
                
            opstack.append(token)
            continue
        
        if len(parenthesisStack) > 0 and token == parenthesisStack[-1]:
            topOfOpstack = opstack.pop()
            while topOfOpstack != validParentheses[parenthesisStack[-1]]:
                output.append(topOfOpstack)
                topOfOpstack = opstack.pop()
            parenthesisStack.pop()
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
    for token in splitExpression(expression[::-1]):
        if token in validParentheses.values():
            for closingParenthesis, openingParenthesis in validParentheses.items():
                if token == openingParenthesis:
                    output.append(closingParenthesis)
                    break
        elif token in validParentheses.keys():
            output.append(validParentheses[token])
        else:
            output.append(token)
            
    return ' '.join(output)
    
def convertToPrefix(expression):
    '''
    Converts infix to prefix expression
    Returns a string, the prefixed expression
    '''
    expression = reverseExpression(expression)
    postfixedExpression = convertToPostfix(expression)
    return reverseExpression(postfixedExpression)
    
def performOperation(token, operand1, operand2):
    assert token in validOperators, f"{token} is not a valid operator"
    if not operand1.isnumeric() or not operand2.isnumeric():
        return "(" + str(operand1) + " " + str(token) + " " + str(operand2) + ")"
    
    operand1 = int(operand1)
    operand2 = int(operand2)
    
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
    elif token == ">>":
        return operand1 >> operand2
    else:
        return "(" + str(operand1) + " " + str(token) + " " + str(operand2) + ")"
def convertPostfixToInfix(expression):
    """
    Converts postfix to infix
    Returns the infix expression
    """
    operandStack = []
    for token in splitExpression(expression):
        if token.isalnum():
            operandStack.append(token)
        if token in validOperators:
            operand2 = operandStack.pop()
            operand1 = operandStack.pop()
            result = performOperation(token, operand1, operand2)
            operandStack.append(result)
            
    return operandStack.pop()


if __name__ == "__main__":
    exp = input()
    if not isBalanced(exp):
        print("Not balanced expression")
    else:
        print(f"Postfix: {convertToPostfix(exp)}")
        print(f"Prefix: {convertToPrefix(exp)}")
        print(f"Infix from postfix: {convertPostfixToInfix(convertToPostfix(exp))}")
```

# Lab Questions

1. Write a C program to convert an infix expression to a postfix expression. The input and the output of the function are character strings. The input expression contains only four possible operators: +, -, * and /. Operands can be any alphanumeric. Each operand is represented by a character symbol. The parentheses are allowed in the input expression. You may assume that the expression is always valid. The function prototype is given below:

```c
void in2Post(char* infix, char* postfix);
```

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SIZE 80 //The limit of expression length

typedef struct _stackNode{
    char item;
    struct _stackNode *next;
}StackNode;

typedef struct _stack{
   int size;
   StackNode *head;
}Stack;

void push(Stack *sPtr, char item);
int pop(Stack *sPtr);
char peek(Stack s);
int isEmptyStack(Stack s);

void in2Post(char*, char*);

int getPrecedence(char);

int main()
{
    char infix[SIZE];
    char postfix[SIZE];

    printf("Enter an infix expression:\n");
    gets(infix);

    in2Post(infix,postfix);
    printf("The postfix expression is \n");
    printf("%s\n",postfix);
    return 0;
}

int getPrecedence(char token) {
    switch(token) {
        case '*':
        case '/':
            return 1;
        case '+':
        case '-':
            return 0;
        default:
            return -1;
    }
}

void in2Post(char* infix, char* postfix)
{
// Write your code here
    int infixOffset = 0;
    int postfixOffset = 0;
    
    Stack *s = malloc(sizeof(Stack));
    s->head = NULL;
    s->size = 0;

    for (int i=0; i<strlen(infix); i++) {
        char currentChar = infix[i];
        
        if (currentChar == '(') {
            push(s, currentChar);
            continue;
        }
        
        if (currentChar == ')') {
            while (!isEmptyStack(*s) && peek(*s) != '(') {
                postfix[postfixOffset] = peek(*s);
                pop(s);
                postfixOffset++;
            }
            
            pop(s);
            continue;
        }
        
        // operator
        if (currentChar == '+' || currentChar == '-' || currentChar == '*' || currentChar == '/') {
            while (!isEmptyStack(*s) && peek(*s) != '(' && peek(*s) != currentChar && getPrecedence(peek(*s)) >= getPrecedence(currentChar)) {
                postfix[postfixOffset] = peek(*s);
                postfixOffset++;
                pop(s);
            }
            
            push(s, currentChar);
            continue;
        }
        
        // operand
        postfix[postfixOffset] = currentChar;
        postfixOffset++;
    }
    
    while (!isEmptyStack(*s)) {
        postfix[postfixOffset] = peek(*s);
        postfixOffset++;
        pop(s);
    }
    
    postfix[postfixOffset] = '\0';
}

void push(Stack *sPtr, char item){
    StackNode *newNode;
    newNode = malloc(sizeof(StackNode));
    newNode->item = item;
    newNode->next = sPtr->head;
    sPtr->head = newNode;
    sPtr->size++;
}

int pop(Stack *sPtr){
    if(sPtr == NULL || sPtr->head == NULL){
        return 0;
    }
    else{
       StackNode *temp = sPtr->head;
       sPtr->head = sPtr->head->next;
       free(temp);
       sPtr->size--;
       return 1;
    }
}

char peek(Stack s){
    return s.head->item;
}

int isEmptyStack(Stack s){
     if(s.size == 0) return 1;
     else return 0;
}
```

2. Write a C program to evaluate a postfix expression. You may assume that operands are single-digit numbers. The function prototype is given below:

```c
double exePostfix(char* postfix)
```

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define SIZE 80 //The limit of expression length

typedef struct _stackNode{
    double item;
    struct _stackNode *next;
}StackNode;

typedef struct _stack{
   int size;
   StackNode *head;
}Stack;

void push(Stack *sPtr, double item);
int pop(Stack *sPtr);
double peek(Stack s);
int isEmptyStack(Stack s);

double exePostfix(char*);
double performOperation(char, double, double);

int main()
{
    char postfix[SIZE];

    printf("Enter a postfix expression:\n");
    gets(postfix);

    printf("The answer is %.2lf.\n",exePostfix(postfix));

    return 0;
}

double performOperation(char token, double operand1, double operand2) {
    switch(token) {
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        default:
            return operand1;
    }
}


double exePostfix(char* postfix)
{
	// Write your code here
    Stack *s = malloc(sizeof(Stack));
    s->head = NULL;
    s->size = 0;
    
    for (int i=0; i<strlen(postfix);i++) {
        char currentChar = postfix[i];
        int currentNumber;
        
        if (isdigit(currentChar)) {
            currentNumber = currentChar - '0'; // convert char to int
            push(s, currentNumber);
            continue;
        }
        
        double operand2 = peek(*s);
        pop(s);
        double operand1 = peek(*s);
        pop(s);
        
        double result = performOperation(currentChar, operand1, operand2);
        push(s, result);
        
    }
    
    double result = peek(*s);
    pop(s);
    free(s);
    return result;
}

void push(Stack *sPtr, double item){
    StackNode *newNode;
    newNode = malloc(sizeof(StackNode));
    newNode->item = item;
    newNode->next = sPtr->head;
    sPtr->head = newNode;
    sPtr->size++;
}

int pop(Stack *sPtr){
    if(sPtr == NULL || sPtr->head == NULL){
        return 0;
    }
    else{
       StackNode *temp = sPtr->head;
       sPtr->head = sPtr->head->next;
       free(temp);
       sPtr->size--;
       return 1;
    }
}

double peek(Stack s){
    return s.head->item;
}

int isEmptyStack(Stack s){
     if(s.size == 0) return 1;
     else return 0;
}
```

3. Write a C program to convert an infix expression to a prefix expression.

```c
void in2Pre(char* infix , char* prefix )
```

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SIZE 80 //The limit of expression length

typedef struct _stackNode{
    char item;
    struct _stackNode *next;
}StackNode;

typedef struct _stack{
   int size;
   StackNode *head;
}Stack;

void push(Stack *sPtr, char item);
int pop(Stack *sPtr);
char peek(Stack s);
int isEmptyStack(Stack s);

void in2Pre(char*, char*);
int getPrecedence(char);

int main()
{
    char infix[SIZE];
    char prefix[SIZE];

    printf("Enter an infix expression:\n");
    gets(infix);

    in2Pre(infix,prefix);
    printf("The prefix expression is \n");
    printf("%s\n",prefix);

    return 0;
}

int getPrecedence(char token) {
    switch(token) {
        case '*':
        case '/':
            return 2;
        case '+':
        case '-':
            return 1;
        default:
            return 0;
    }
}

void in2Pre(char* infix, char* prefix)
{
 // Write your code here
    Stack tokens;
    tokens.head = NULL;
    tokens.size = 0;
    
    for (int i=0; i<strlen(infix); i++) {
        int currentChar = infix[i];
        if (currentChar == '(') {
            push(&tokens, ')');
            continue;
        }
        
        if (currentChar == ')') {
            push(&tokens, '(');
            continue;
        }
        
        push(&tokens, currentChar);
        continue;
    }
    
    Stack opStack;
    opStack.head = NULL;
    opStack.size = 0;
    
    Stack result;
    result.head = NULL;
    result.size = 0;
    
    while (!isEmptyStack(tokens)) {
        int currentToken = peek(tokens);
        pop(&tokens);
        
        switch(currentToken) {
            case '+':
            case '-':
            case '*':
            case '/':
                while (!isEmptyStack(opStack) && getPrecedence(peek(opStack)) > getPrecedence(currentToken)) {
                    push(&result, peek(opStack));
                    pop(&opStack);
                }
                push(&opStack, currentToken);
                continue;
            case '(':
                push(&opStack, currentToken);
                continue;
            case ')':
                while (!isEmptyStack(opStack) && peek(opStack) != '(') {
                    push(&result, peek(opStack));
                    pop(&opStack);
                }
                pop(&opStack);
                continue;
            default:
                push(&result, currentToken);
        }
    }
    
    while (!isEmptyStack(opStack)) {
        push(&result, peek(opStack));
        pop(&opStack);
    }

    int offset = 0;
    while (!isEmptyStack(result)) {
        prefix[offset] = peek(result);
        pop(&result);
        offset++;
    }
    
    prefix[offset] = '\0';
}

void push(Stack *sPtr, char item){
    StackNode *newNode;
    newNode = malloc(sizeof(StackNode));
    newNode->item = item;
    newNode->next = sPtr->head;
    sPtr->head = newNode;
    sPtr->size++;
}

int pop(Stack *sPtr){
    if(sPtr == NULL || sPtr->head == NULL){
        return 0;
    }
    else{
       StackNode *temp = sPtr->head;
       sPtr->head = sPtr->head->next;
       free(temp);
       sPtr->size--;
       return 1;
    }
}

char peek(Stack s){
    return s.head->item;
}

int isEmptyStack(Stack s){
     if(s.size == 0) return 1;
     else return 0;
}
```
