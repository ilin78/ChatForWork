# ChatForWork

## Начало работы

 1. Создадим базу данных и добавим данные
```sql
CREATE TABLE chat (
id int NOT NULL AUTO_INCREMENT, 
name varchar(100) NOT NULL, 
message varchar(400),
PRIMARY KEY (id)
);
```  
