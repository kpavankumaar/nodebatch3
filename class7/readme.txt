c drive -> data directory -> db directory
relational database                 Document database (No Sql)

server                              server     
Database                            Database
tables                              Collections
row                                 Document
columns                             Fields


Document -> is a javascript object 
eg:
{
    id:1,
    brand:"nokia",
    model:"xr",
    price:100,
    orders:[
        {date:1/1/2000,qty:2},
        {date:1/1/2000,qty:3},
        {date:1/1/2000,qty:1}]
}
{
    id:2,
    brand:"samsung",
    model:"s8",
    price:1000,
    
}

product - tables
id    brand     model       price 
1     nokia     xyz         200

orders
productID  date         qty 
1          1/1/2000      2
1          1/1/2000      3
1          1/1/2000      1

reviews -> new table 


///////  cannot run mongod server for unclean shutdowns

sudo lsof -iTCP -sTCP:LISTEN -n -P
Search for mongod COMMAND and its PID and type,

sudo kill <mongo_command_pid>
Now start your mongod instance by typing,

mongod


// detected lock file 
sudo rm /data/db/mongod.lock
