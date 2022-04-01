# Library-Management-System

It's an library management system in which multiple students can request book for rent and ond of the admin can approve their request with user authentication enabled.
Admin can upload different book's, publisher's, author's, category details over the portal. Author_id, category_id, publisher_id are the foreign key in the book table which refers author, category, publisher table respectively.
Also used Redis to cached homepage of the book section with pagination enabled.
Different types of events get publshed in RabbitMQ such as create, update, delete user/book/author/publisher/category.
Two services are there in which event processor service sync data with MongoDB for analytic's team and main service sync data with PostgreSQL.
All use cases are handled in an object oriented friendly way.
Analytic's team can check top rented books, top user / publishers / category details. 
These analtyic's team API's are private and main service API's are for public.

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
status (active / archived)
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
status (active / archived)
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
status (active / archived)
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
status (active / archived)
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
status (active / archived)
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

POST /books/{id} (Only for Admin's)

PATCH /books/{id} (Only for Admin's)

DELETE /books/{id} (Only for Admin's)



                                                user:-

GET /users (Only for admin)

GET /user/{id}

POST /user/{id} 

PATCH /user/{id}

DELETE /user/{id}


                                               category:- 
GET /category     

GET /category/{category_id}

POST /category/{category_id} (Only for Admin's)

PATCH /category/{category_id} (Only for Admin's)

DELETE /category/{category_id} (Only for Admin's)



                                                author:-

GET /author (Only for Admin's)

GET /author/{author_id}

POST /author/{author_id}

PATCH /author/{author_id}

DELETE /author/{author_id}


                                                publisher:- (Only for Admin's)

GET /publisher

GET /publisher/{publisher_id}

POST /publisher/{publisher_id}

PATCH /publisher/{publisher_id}

DELETE /publisher/{publisher_id}


                                          rentals:-

GET /rentals (Only for Admin's)

POST /rentals

PATCH /rentals (Only for Admin's)


                                                        Analytic's API's
                                                        
GET /highest-rented-book

GET /highest-rented-customer

GET /highest-rented-author

GET /highest-rented-publisher                                                      

