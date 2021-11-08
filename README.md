
# Book Store App Projects 
In COMP3100 course, we have 3 individual assignments. 
Name As: web_assignment_1, web_assignment_2, and web_assignment_3.

### [web_assignment_1](https://github.com/yeeteing/web_assignment_1)
- Create a REST API for Book and Loan.
- Having a mock JSON data for Books and Loans.

### [web_assignment_2](https://github.com/yeeteing/web_assignment_2)
- Create unit test for the Book API.
- Store the Book's data in mongo db.

### [web_assignment_3](https://github.com/yeeteing/web_assignment_3)
- Developed a responsive web page for Library management with JQuery, ajax, HTML, and CSS. 
- The website need to communicate with the server API through ajax.

## web_assignment_3
Prerequisite: 
- [Node.js(LTS version will be fine) and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-node-js-and-npm)
- [mongodb](https://www.mongodb.com/try/download/community)

## To run the app 
1. First open a terminal and navigate to the root directory of web_assignment_3
2. run `mongo`
3. inside mongo shell: 

    a. run `use my-library` 
4. Then open a new terminal and navigate to the root directory of web_assignment_3
5. run `node app.js`

## Demo GIF
### There are 2 Different Things available to be manage (Books & Loans): 
![Demo Landing Page](Demo_0.gif)
### How it behave when you click one of the tab (in this case, "Books"):
![Demo Click Book Page](Demo_1.gif)
### Managing the books:
![Demo Book Management Page](Demo_2.gif)
### Managing the loans:
![Demo Loan Management Page](Demo_3.gif)
### When trying to update a Book or Loan (in this case Loan), 
### if the loan/book ID entered is found in the database, the rest of the form will be auto-filled:
![Demo auto-fill feature in update](Demo_4.gif)
### Messages from the server is being disply on a log like mannaer:
![Demo Log](Demo_5.gif)


