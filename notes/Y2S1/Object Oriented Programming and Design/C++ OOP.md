# C++ OOP

- `.h`: Header files, used for function declarations
- `.cpp`: Source code, used for defining the implementations of the functions

For example, `MyClass.h` declares a class `MyClass` with a private attribute `value` and public methods `foo` and `evaluate`

```cpp
#ifndef MYCLASS_H

class MyClass {
    private:
        int value;
    public:
        void foo();
        int evaluate();
}

# endif
```

In `MyClass.cpp`, we declare the implementation of methods within `MyClass`

```cpp
#include "MyClass.h"
void MyClass::foo() {
    // implementation included
}

int MyClass::evaluate() {
    // more implementation
}
```

Inside `main.cpp`, where we run the driver that runs the code, we want to use `MyClass`. So we include `MyClass.h` in here

```cpp
#include "MyClass.h"

int main() {
    MyClass a;
    // usage
    return 0;
}
```

By separating classes into their individual `.h` and `.cpp` files:

- Speeds up compile time (Because only classes that got changed need to be recompiled)
- Keeps code more organised (Eaiser to find which class belongs in which file rather than going through a single large file)
- Allows separation of implementation from interface. Client classes only require the `.h` files, instead of the `.cpp` files

Make sure to have an `#include Guard` within your header files, to prevent duplicate inclusions of the header files. The syntax is

```cpp
#ifndef FILENAME_H

// code

# endif
```

`FILENAME_H` is usually the file name, but as long as it is unique for each header file, it is valid as well.

# Translation of C++ Code into Executable Program

1. `*.h` files and `*.cpp` files are put through the C++ **compiler** to get Object code (`*.obj`)
2. Object code from the standard cpp library, along with your own code, is put through the **linker**, and the output is a `.exe` executable file to execute your code

# C++ Classes

```cpp
class MyPoint {
    private: // private methods and attributes
        int _x;
        int _y;
    public: // public methods and attributes
        // constructors
        Point(): _x(0), _y(0) {}
        Point(const int x, const int y): _x(x), _y(y) {}

        ~Point() {
            cout << "MyPoint is destructing" << endl;
        }

        void setX(const int val);
        void setY(const int val);
        int getX() {
            return _x;
        }
        int getY() {
            return _y;
        }
};

void MyPoint::setX(const int val) { // defining setX inside the MyPoint class
    _x = val;
}

void MyPoint::setY(const int val) {
    _y = val;
}
```

The `const` keyword tells the compiler to prevent any changes to that variable. For example

```cpp
const int x = 6;
doSomething();
x = 3; // error because x is a const
```

## Constructors

- Just like java, cosntructors should have exactly the same name as the class itself

```cpp
Point(): _x(0), _y(0) {}
```

The constructor above takes in no parameters, and sets `Point::_x = 0` and `Point::_y = 0`

```cpp
Person(const string username, const int age): _username(username), _age(age) {
    cout << "I have created a new person" << endl;
}
```

The above `Person` constructor takes in 2 arguments, a string `username` and an integer `age`. It sets `Person::_username = username` and `Person::_age = age`. Then, it prints out the message `"I have created a new person"`

## Destructors

- Destructors are called just before an object is deleted from memory
- Destructors have the same name as the class itself, prefixed with a `~`

```cpp
~Person() {
    delete somePointer;
    cout << "Deleting" << endl;
}
```

## Object Creation

1. Creating objects on to the stack

```cpp
Point aPoint; // note: Without (), constructor without arguments
Point bPoint(12, 34); // constructor with arguments

aPoint.setX(15); // accessing methods within an object
int y = bPoint.getY();
```

2. Creating objects on to the heap

```cpp
// pointers
Point *p1 = new Point();
Point *p2 = new Point(12, 34);
Point *p3;
p3 = new Point();

// accessing methods on pointers to objects
p3->setX(230);
int x = p1->getX();

delete p1, p2, p3; // deleting data pointed to by pointers
```

## Inheritance

```cpp
class Square : public Shape {
    // Square inherits from Shape
    // Square is child, Shape is parent
};

class Student : public Person {
    // Student inherits from Person
    // Student is child/derived/sub class. Person is parent/base/super class
};
```

General form:

```cpp
class DerivedClass : [visibility-mode] BaseClass {
    //
};
```

`visibility-mode` is optional, either `public` or `private`

- `private`: privately inherited (default)
  - public members of base class become private in the derived class
- `public`: publicly inherited (default)
  - public members of base class remain public in the derived class

```cpp
class Point3D : public Point {
    int _z;
    public:
        // constructor using base class methods
        Point3D() {
            setX(0);
            setY(0);
            _z = 0;
        }

        // constructor using base class constructor
        Point3D(const int x, const int y, const int z) : Point(x, y), _z(z) {}

        ~Point3D() {
            // do nothing
        }

        int getZ() {
            return _z;
        }

        void setZ(const int val) {
            _z = val;
        }
};

class Foo : public Bar, public Baz {
    int a, b, c;
    public Foo(): Bar(), Baz() {} // using multiple base constructors
    public Foo(int a, int b, int c, int d, int e) : Bar(d), Baz(e), _a(a), _b(b), _c(c) {}
}
```

For using base class constructors

```cpp
DerivedConstructor(parameters): BaseConstructor1(parameters1), BaseConstructor2(parameters2) {
    // code
}
```

Note that for inheritance

- Constructors are called from the lowest class to the highest class (base class -> sub class)
- Destructors are called from the highest class to the lowest class (sub class -> base class)

# Method Overloading

```cpp
int add(int x, int y);
double add(double x, double y);
```

- Different signatures with the same method name will overload the method
- Note that having the same signature with different return types will errror
  - `int doSomething()` and `double doSomething()` will fail

# Default Parameters

```cpp
int doSomething(int x, int y = 10);
```

- `doSomething(1)` will call `doSomething(1, 10)`
- `doSomething(5, 2)` will set `y = 2`

Remember that

- Default parameters are always the rightmost elements
  - `doSomething(int x = 4, int z)` will be an error
- Leftmost parameters should be the one most likely changed by the user
- C++ excludes default parameters to check function signatures. Make sure signatures do not clash
  - `void print(int z)` and `void print(int z, int x = 40)`. When you call `print(5)`, which method do you actually call?

# References vs Pointers

A reference is an "alias" to a real object/variable

- `&` used to define an alias
- References cannot be `NULL` (`int &a;` is not allowed)
- References cannot be rebound after initialisation

```cpp
int x;
int &rx = x; // rx is a reference to x

x = 1; // this also causes rx == 1
rx = 2; // this also causes x = 2

int *p = &x; // set the pointer p to point to the address where x is stored
int &q = *p; // dereference p, and let q be an alias to whatever is stored at p. Similar to int q = *p
```

# Polymorphism

`virtual`

- Force method evaluation to be based on **object type**, instead of **reference type**
- Without virtual, objects only use static binding
- Virtual function magic only works on references (`&`) and pointers (`*`)
- If a method is `virtual` in the base class, it is implicitly `virtual` in all derived classes

```cpp
#include <iostream>

using namespace std;

class ParentClass {
    public:
        virtual void doSomething() {
            cout << "Do something in parent class" << endl;
        }

        void doAnotherThing() {
            cout << "Do another thing in parent class" << endl;
        }
};

class ChildClass: public ParentClass {
    public:
        void doSomething() {
            cout << "Do something in child class" << endl;
        }

        void doAnotherThing() {
            cout << "Do another thing in child class" << endl;
        }
};

int main() {
    ChildClass c;
    ParentClass *parentClassPointer = &c;
    ChildClass *childClassPointer = &c;

    ParentClass &parentClassReference = c;
    ChildClass &childClassReference = c;

    ParentClass parentClassValue = c;
    ChildClass childClassValue = c;

    /*
    Virtual method, follows type of the object pointed at
    Only works for references and pointers
    */
    parentClassPointer->doSomething(); // do something in child class
    childClassPointer->doSomething(); // do something in child class

    parentClassReference.doSomething(); // do something in child class
    childClassReference.doSomething(); // do something in child class

    parentClassValue.doSomething(); // do something in parent class
    childClassValue.doSomething(); // do something in child class

    /*
    Non-virtual methods, follows static binding (type of the pointer/reference/value)
    */
    parentClassPointer->doAnotherThing(); // do another thing in parent class
    childClassPointer->doAnotherThing(); // do another thing in child class

    parentClassReference.doAnotherThing(); // do another in parent class
    childClassReference.doAnotherThing(); // do another in child class

    parentClassValue.doAnotherThing(); // do another in parent class
    childClassValue.doAnotherThing(); // do another in child class
}
```

Abstract method

- Place `= 0` in its declaration
- `virtual void abstractMethodName() = 0;`
- If a class has an abstract method, it is automatically an abstract class

# Polymorphism

- Safe down cast
  - Use `dynamic_cast`
  - `Type* t = dynamic_cast<Type*>(variable)`
  - Returns `NULL` if the conversion was not possible
  - Only applicable to pointers
- If you keep using downcasts, it is likely that your application design is flawed

```cpp
#include <iostream>

using namespace std;

class Shape {
    virtual void doSomething() {};
};

class Rectangle: public Shape {
    private:
        int _width = 0;
        int _height = 0;
    public:
        Rectangle(int width, int height): _width(width), _height(height) {}
};

int main() {
    Shape *s = new Rectangle(10, 20);

    // the operand of a runtime dynamic_cast must have a polymorphic class type
    // this means that Shape must have a virtual method for dynamic cast to work
    Rectangle *r = dynamic_cast<Rectangle*>(s); // cast from base to derived

    if (r != NULL) {
        cout << "Valid cast from Shape* to Rectangle*" << endl;
    }

    Rectangle *r2 = new Rectangle(10, 20);
    Shape *s2 = dynamic_cast<Shape*>(r2); // cast from derived to base

    if (s2 != NULL) {
        cout << "Valid cast from Rectangle* to Shape*" << endl;
    }

    Rectangle *r3 = new Rectangle(12, 12);
    Shape *s3 = r3; // implicitly downcast

    // Shape *s4 = new Rectangle(12, 12);
    // Rectangle *r4 = s4; // error, cannot upcast implicitly
}
```

# Arrays

```cpp
int main() {

    int a[] = { 1, 2, 3, 4, 5 }; // no need to declare array size if directly initialising
    int b[5] = { 1, 2, 3, 4, 5 }; // declaring array size and directly initialising
    int c[10] = { 1, 2, 3, 4, 5 }; // dont have to fully fill up the array

    int d[2]; // declaring the array with a size
    d[0] = 1; // explicitly setting each individual element
    d[1] = 55;

    // the following line will cause an error
    int e[4] = { 1, 2, 3, 4, 5 }; // having more elements than the defined size

    // pointers with arrays
    int *f = new int[5];
    int g[5];

    // passing arrays into functions

    void funcOne(int[] a) {
        // code
    }

    void funcTwo(int *a) {
        // code
    }

    funcOne(f);
    funcOne(g);
    funcTwo(f);
    funcTwo(g);

    // Array of objects

    Cats *cats = new Cat[5]; // Cat is a concrete class
    delete [] cats;

    // Mammal is an abstract class
    Mammal **zoo = new Mammal*[5]; // Since we cannot initialise Mammal, we must use Mammal*
    zoo[0] = new Dog();

    for (int j = 0; j < 5; j++) {
        delete zoo[i]; // delete the objects the pointers are pointing to
    }

    delete [] zoo; // delete the array itself

    // SIMILARLY,
    Mammal *zoo2[5];
    zoo[0] = new Dog();
}
```

# Operator Overloading

Sometimes we want our operators (such as `+`, `-`, `*`, `/`) to work on our classes as well. To do this, we must overload our operators.

Consider a class `Complex` which models complex numbers. We want to overload the `+` operator such that we can add 2 complex numbers together

```cpp
#include <iostream>

using namespace std;
class Complex
{
private:
    double _real, _imaginary;

public:
    double getReal()
    {
        return _real;
    }

    double getImaginary()
    {
        return _imaginary;
    }
    Complex(const double real, const double imaginary) : _real(real), _imaginary(imaginary) {}

    Complex operator+(const Complex o)
    {
        double real = _real + o._real;
        double imaginary = _imaginary + o._imaginary;

        return Complex(real, imaginary);
    }

    Complex operator-(const Complex o) {
        double real = _real - o._real;
        double imaginary = _imaginary - o._imaginary;

        return Complex(real, imaginary);
    }

    // using friend, we can access private variables outside our class
    friend Complex operator*(const Complex, const Complex);
    friend ostream &operator <<(ostream &, const Complex);
};

Complex operator *(const Complex o1, const Complex o2) {
    double real = o1._real * o2._real - o1._imaginary * o2._imaginary;
    double imaginary = o1._imaginary * o2._real + o1._real * o2._imaginary;

    return Complex(real, imaginary);
}

ostream &operator <<(ostream &os, const Complex o)
{
    os << o._real << " + " << o._imaginary << "i";
    return os;
}

int main()
{
    Complex a(1, 2);
    Complex b(3, 4);

    Complex c = a + b;
    cout << a + b << endl;
    cout << a - b << endl;
    cout << a * b << endl;
}
```

# `const`

Used to declare that a variable (value or object) cannot be changed

```cpp
const int a = 111; // constant integer
a = 123; // fails

int *p = &a; // pointer to integer
int *const cp = &a; // constant pointer

int const *cip = &a; // pointer to constant integer
int const *const *cicp = &a; // constant pointer to constant integer
```

# Resources

- https://stackoverflow.com/questions/57483/what-are-the-differences-between-a-pointer-variable-and-a-reference-variable-in
