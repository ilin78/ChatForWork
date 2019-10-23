# ChatForWork

В этой папке выполните команду терминала npm install, чтобы установить зависимости и devDependencies. Затем запустите npm start, чтобы запустить приложение.
P.S.:Перед запуском потребуется установить MySQL и создать в ней базу данных.
```sql
CREATE TABLE chat (
id int NOT NULL AUTO_INCREMENT, 
name varchar(100) NOT NULL, 
message varchar(400),
PRIMARY KEY (id)
);
```  

