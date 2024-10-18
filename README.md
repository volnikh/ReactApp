### What is done
Main page with list of employee
List containt following attributes in grid (id, First name, Last lname, Patronymic, Birth date, Email, Salary, Last modify date)
Grid is sortable by clicking header
Grid has a filter, by anetering filter and pressing Enter new GET requested will be sent to server and result of this request displayed

Adding and editing employee done (one component is resposible for add and edit)

### TO BE DONE
Validation
Pagination
Authentication


####
bellow table is used for a data storage

````
create table Employee
(
    id int not null identity primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    patronymic varchar(50),
    birth_date date not null,
    email varchar(150) not null,
    salary DECIMAL not null,
    last_modify_date DATETIME, -- data will be stored after convertion to UTC
);
````