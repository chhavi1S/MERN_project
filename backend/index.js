import express from "express"
import mysql from "mysql"
import cors from "cors"

const app =express();

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"crud"
});
app.use(express.json())
app.use(cors())
// 
app.get("/",(req,res)=>{
    res.json("Hello this is the backend!");
});
app.get("/book",(req,res)=>{
    const q="SELECT * FROM book"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


app.post("/book",(req,res)=>{
    const q="INSERT INTO book(`title`,`description`,`cover`,`price`) VALUES(?)";
    const values=[
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ];

    db.query(q,[values],(err,data)=>{
        if (err) return res.json(err);
        return res.json("Book has been created successfully");
    });
});

app.delete("/book/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="DELETE FROM book WHERE id=?";
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully!")
    }) ;
});

app.put ("/book/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="Update book Set `title`=?,`description`=?,`cover`=?,`price`=? WHERE id=?";
    const values=[
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ]



    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully!")
    }) ;
});

app.listen(8800,()=>{
    console.log("Connected to backend!")
})