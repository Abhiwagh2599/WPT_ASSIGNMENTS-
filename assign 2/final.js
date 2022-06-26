let userdata={

    host:"localhost",
    user:"root",
    password:"cdac",
    database:"chandan",
    port:"3306",

}

const mysql=require('mysql2');
const con=mysql.createConnection(userdata);

const express=require('express');
const app=express();

app.use(express.static("sf"));

app.get("/getItem",(req,resp)=>{

    let input=req.query.x;

    let output ={itemfound:false,itemdetails:{itemno:4,itemname:"",price:1000}}

    con.query('select * from itemlist where itemno =?',[input],(error,res)=>{

            if(res.length >0){

                output.itemfound=true;
                output.itemdetails=res[0];
            }
            resp.send(output);
    });
});

// ==============================================

app.get("/additem",(req,resp)=>{

    let input={itemno:req.query.x,itemname:req.query.y,price:req.query.z};

    let output=false;  // true tha pahle

    con.query('insert into itemlist(itemno,itemname,price) values (?,?,?)',
    [input.itemno,input.itemname,input.price],
    (error,res)=>{
        if(error)
        {
                
        }
        else if(res.affectedRows>0)
        {
                output=true;
        }
        resp.send(output);    
}
);
});

// =============================================================

app.get("/updateitem",(req,resp)=>{

    let output=false;
    let input={itemno:req.query.itemno,
    itemname:req.query.itemname,price:req.query.price};
    
    
    con.query('update itemlist set itemname = ?,price =? where itemno=?',
    [input.itemname,input.price,input.itemno],
    (error,res1)=>{
            if(error)
            {
                console.log("Error occured");    
            }
    
            else if(res1.affectedRows>0){
                output=true;
            }
            
    resp.send(output);
               
    }
       
  );
});

//=========================================================

app.get("/deleteitem",(req,resp)=>{

    let output=false;
    let input={itemno:req.query.itemno};
    
    
    con.query('delete from itemlist where itemno=?',
    [input.itemno],
    (error,res1)=>{
            if(error)
            {
                    console.log("Error occured");
            }
    
            else if(res1.affectedRows>0){
                output=true;
            }
            
    resp.send(output);
               
    }
    
    
  );
});

//========================================================

app.get("/showall",(req,resp)=>{

    con.query('select * from itemlist',[],(error,rows)=>{

        
        resp.send(rows);

}
);
});



app.listen(1000, function () {
    console.log("server listening at port 1000...");
});
