# Library-Management-System

Library Management System

Requirements:-

Student's have to register book (Renting) 


Listing of Students (Only if it's admin) and on clicking it have to show the books student holds already.


Search the book:- By Author Name, Book Name, Book Category (Hybrid Searching:- Author Name + Book Category)


For each request coming from the student, it's approval is mandatory from admin side. 
On requesting a book, one request goes to the admin to verify this request.
In admin account, all the request comes in one section. 


Have to differntiate between Normal and Regular user.



Have to update the availabe books after some student rented a book.


Have to upload all the book details from the admin side. So, it will be availabe for displaying.


API's :-


To register in the portal (Post Request) -> /signup 
(There is one middleware which checks whether the input is valid or not such as different Username and Email)


To log in the portal (Post Requets) -> /login
(One midlleware is there which checks whether the username and password is present. Also checks whether the username exists or not in our db)


fetch all the books (Get Request) -> /getBooks
Displaying all the contents of Global book db which contains all the availabe books. already requested this book so we can't display it.


for renting a book (Post Request) -> /rentBook 
We will Initialize one global Queue and it push the userID and bookID so admin can verify the request.


Admin approval for request from users -> /adminApproval (GET Request)
If the user.isAdmin is true then we will display all the incoming rented book requests.
else we will display that the page doest't exists (404).


Admin approval for request from users -> /adminApproval (POST Request)
-> accepted :- Delete this bookID from Global Book Schema and insert it into rented book schema (Only bookID and userID)
-> rejected :- Do Nothing, just refersh the page.


If admin wants to change administrative rights to a user -> /updateAdmin (Get Method)
If a user.isAdmin is false then it will display none (as it is not admin).
Else will display a page through which admin can search a user change the administrative rights {
    user.isAdmin == true -> false;
    user.isAdmin == false -> true;
}


delete the user (Delete request) -> /deleteUser
If the user holds some books then it can't delete itself and we will display the message that user has to return all the books.
(search this userID into Rented book model and if the number of books rented is not zero then user can't delete itself and vice versa).


To Update the user details -> /updateUser (Put Request)
(can only update it's password)


Get the user details (Get Request) -> /getUser
(Only the user itself can view what books he/she holds)
(If the different user tries to access some other user info then we will display you can't view other user details).
(Have to search userID into the Rented book schema).


return the book -> (Post Request) -> /returnBook
will delete this book from rented book model and push it into global book model.


cancel the request -> (Have to make cancelBook model and when admin is approving the request it check's in the cancelBook db).


Searching the book by different parameters -> (Get Request) -> /SearchBook
We can enable the filter options in db and pass that options in the query. 
Will extract query part in the backend and search by that tag in our db.


How to find whether the user is regular or not ?
In the rented book model, we stored the date when user rented a book. 
We will use a filter for dates, let's suppose for last 15 days and by userID will going to find numbers of books rented by a user.
E.g:- User1 30 books
      User2 15 books 


What if multiple users requested the book and all these request comes in the global queue.


Right now, I'm assuming that only one book is available.
And if multiple copies of a book is present then we will define a count_book in our db.


What to do if multiple user requested for the book -> Go with First Come First Serve principle.



                                                   Models:-

user:-
id (Auto Generated)
username (Compulsory)
email (Compulsory)
password (Compulsory)
created_by_user_id
deleted_by_user_id
updated_by_user_id
created_at
deleted_at
updated_at
role (customer / admin)
status
meta


book:-
id  (Auto Generated)
book_name
author_id (Foreign Key)
category_id (Foreign Key)
publisher_id (Foreign Key)
created_by_user_id
deleted_by_user_id
updated_by_user_id
created_at
deleted_at
updated_at
status
meta


author:-
author_id
author_name
description
created_by_user_id
deleted_by_user_id
updated_by_user_id
created_at
deleted_at
updated_at
status
meta

publisher:-
publisher_id
publisher_name
description 
created_by_user_id
deleted_by_user_id
updated_by_user_id
created_at
deleted_at
updated_at
status
meta


category:-
category_id
category_name
created_by_user_id
deleted_by_user_id
updated_by_user_id
created_at
deleted_at
updated_at  -> Take this field as array.
status
meta


rentals:- (Stores the rented books)
book_id
user_id
rental_no (Auto Generated)
rented_at (To find the regular users)
returned_at
status (same as if rental_status value is returned).
rental_status (REQUESTED / RENTED / REJECTED / CANCELLED / RETURNED)
cancelled_at
rejected_at
requested_at
meta

                                                     
                                                     
                                                API's 



                                                book:-

GET /books?page=2&size=20&search=book_name

GET /books/{id}   

POST /books/{id} 

PUT /books/{id}

PATCH /books/{id}

DELETE /books/{id}



                                                user:-

GET /users (Only for admin)

GET /user/{id} // for username too.

POST /user/{id} 

PUT /user/{id}

PATCH /user/{id}

DELETE /user/{id}


                                               category:-
GET /category     

GET /category/{category_id}

POST /category/{category_id} 

PUT /category/{category_id}

PATCH /category/{category_id}

DELETE /category/{category_id}



                                                author:-

GET /author 

GET /author/{author_id}

POST /author/{author_id}

PUT /author/{author_id}

PATCH /author/{author_id}

DELETE /author/{author_id}


                                                publisher:-

GET /publisher

GET /publisher/{publisher_id}

POST /publisher/{publisher_id}

PUT /publisher/{publisher_id}

PATCH /publisher/{publisher_id}

DELETE /publisher/{publisher_id}


                                          rentals:-

GET /rentals

POST /rentals

PATCH /rentals


