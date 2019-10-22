# ChatForWork

Для демонстрационного запуска понадиться MySQL и создать базу данных 
```sql
CREATE TABLE chat (
id int NOT NULL AUTO_INCREMENT, 
name varchar(100) NOT NULL, 
message varchar(400),
PRIMARY KEY (id)
);
```  
