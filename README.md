# ChatForWork

В этой папке выполните команду терминала npm install, чтобы установить зависимости и devDependencies. Затем выполните npm start, чтобы запустить приложение.

P.S.:Перед запуском потребуется установить MySQL и создать в ней базу данных.
```sql
CREATE TABLE chat (
id int NOT NULL AUTO_INCREMENT,
name varchar(100) NOT NULL,
message varchar(400),
time varchar(50),
PRIMARY KEY (id));
);
```  

