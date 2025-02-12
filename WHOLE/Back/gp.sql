create database gp;
use gp;
create table users(
id int primary key auto_increment,
name varchar(255),
email varchar(255) ,
password varchar(255),
level int not null,
verified boolean default false
);