create database Practice;
USE Practice;

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

USE [master]
GO
CREATE LOGIN [app_login] WITH PASSWORD=N'YourPassword', 
                 DEFAULT_DATABASE=[Practice], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO
USE [Practice]
GO
CREATE USER [app_user] FOR LOGIN [app_login] WITH DEFAULT_SCHEMA=[dbo]
GO