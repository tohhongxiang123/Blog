# Entity Relationship Diagrams

# What is a Database?

- A collection of data specially organised for efficient retrieval by a computer

# What is a Database System?

- A piece of software that helps us efficiently manage/retrieve information from databases
- Also known as a database management system (DBMS)

# DBMS in Practice

- Large websites rely heavily on DBMS
    - Facebook
    - Twitter
- Non-web companies also depend on DBMS
    - Banks
- Small pieces of software as well
    - Web browsers

# Relational Model

- Numerous DBMS exist out in the market
    - Oracle, SQL Server, DB2, MySQL
- Most of them follow a relational model: **They store their data in relations**

# Relation

Product

| Name       | Price | Category | Manufacturer |
| ---------- | ----- | -------- | ------------ |
| iPhone 6   | 888   | Phone    | Apple        |
| iPad Air 2 | 999   | Tablet   | Apple        |
| EOS-1D X   | 1199  | Camera   | Canon        |

- A relation is often called a **table**
- A row in a table is often called a **record**
- A column in a table is also called an **attribute** of the table

# Designing Databases for Applications
- Conceptually model the requirements for the application
    - What needs to be stored?
    - How do they interact with one another?
- We use an Entity-Relation (ER) Diagram
    - A pictorial and intuitive way for modelling object relations
- We translate the conceptual model into tables for the DB
- Construct the table with a DBMS

# ER Diagram

![Example ER Diagram](https://wcs.smartdraw.com/entity-relationship-diagram/img/erd-example.png?bn=15100111801)

![Symbols in ER Diagram](https://d3n817fwly711g.cloudfront.net/blog/wp-content/uploads/2012/03/ER-Diagram-Elements.jpeg)

## Entity/Entity Set
- Represented by a rectangle
- Describes a collection of similar objects
- E.g. of an entity set: Accounts, People, Companies etc.

## Attribute
- Represented by an oval
- Describes the attributes an object has
- E.g. Person has a name, age, ID etc.

## Relationship
- Represented by a diamond
- Shows the connection between 2 related objects
- E.g. Companies **have** Employees, Companies **make** Products, Users **create** Characters

## Weak Entity
- Represented by a double rectangle
- Weak entities depend on some other entity type. They **don't have primary keys** (hence cannot be uniquely identified)
- Weak entities have no meaning in the diagram without their parent entity, they depend on their parent entity (owner entity)
- An example of a weak entity:

![Example of weak entity](https://media.geeksforgeeks.org/wp-content/uploads/20190520181337/Untitled-Diagram-231.png)

- A loan cannot exist without a customer. Hence a loan depends on the existence of a customer, hence is a weak entity
- The existence of rooms is dependent on the existence of a hotel. So a room can be seen as a weak entity of the hotel

## Weak Relationship

- Represented by double diamond
- Shows the connection between a weak entity and its owner

## Multivalued Attribute

- Represented by double oval
- An attribute that can hold multiple values
- E.g. A student can have multiple phone numbers, but only 1 name

![](https://beginnersbook.com/wp-content/uploads/2015/04/multivalued_derived_attribute.png)

# Types of Relationships

There are many different types of relationships between entities
- One-to-One relationship
- Many-to-One relationship
- Many-to-Many relationship

## One-to-One Relationship

![](https://vertabelo.com/blog/one-to-one-relationship-in-database/1-to-1-pk-plus-fk.png)

- Each country can have only 1 capital
- Each capital can only be in 1 country

## Many-to-One Relationship

![](https://database.guide/wp-content/uploads/2016/05/relationship-diagram-one-to-many.png)

- A customer can only live in 1 city
- A city can have many customers

## Many-to-Many Relationship

![](https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Databases-ManyToManyWJunction.jpg/1200px-Databases-ManyToManyWJunction.jpg)

- A book can have many authors, and an author can have many books

## Multi-way Relationships

![](https://courses.cs.washington.edu/courses/cse444/99au/lectures/odl+er/img015.gif)

- How do we model a purchase relationship between buyers, products and stores?
- We can use a 3-way relationship, however the arrows will be complicated

# Roles

![](https://i.stack.imgur.com/mKoU7.jpg)

- Sometimes in a relationship, an entity set may appear more than once
- A course may have another course as a prerequisite
- Role is specified on the edge connecting the entity set to the relationship

Note: A relationship can have attributes

![](https://media.geeksforgeeks.org/wp-content/uploads/1to1-1.jpg)

- We can record the start date that an employee manages a department

# Resources
- https://www.lucidchart.com/pages/ER-diagram-symbols-and-meaning
- https://beginnersbook.com/2015/04/e-r-model-in-dbms/

