# ChatForWork

## Начало работы

 1. Создадим базу данных 
```sql
CREATE TABLE chat (
id int NOT NULL AUTO_INCREMENT, 
name varchar(100) NOT NULL, 
message varchar(400),
PRIMARY KEY (id)
);
```  
