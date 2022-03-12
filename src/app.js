const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());

const con = mysql.createConnection({
  host: process.env.RX_HOSTNAME,
user: process.env.RX_USER,
password: process.env.RX_PASSWORD,
database: process.env.RX_DATABASE,
});

app.use(cors({
  origin: "*",
})) 

con.connect((err)=>{
  if(!err)
     console.log('DB connection success');
  else
     console.log('DB connection fail', err)
})



const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server app listening on port ${PORT}`)
  })

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/data_api/', (req, res)=> {
    const products = [
      {
        id: 0,
        name: '4-BedRoom-Bungalow',
        href:  '/user_dashboard/0',
        imageSrc: '../assets/p_images/4-Bedroom-Bungalow.jpg',
        imageAlt: "3 bed rooms, 3 toilet, 1 palour, kitchen",
        price: '750000',
        color: 'Click Here',
      },
      {
          id: 1,
          name: '5 Bed Room Bungalow',
          href: '#',
          imageSrc: '../assets/p_images/massive-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '2.5,000.000',
          color: 'Click Here',
        },
        {
          id: 2,
          name: '2 Bungalow',
          href: '#',
          imageSrc: '../assets/p_images/bungalow-2-1024x683.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '250000',
          color: 'Click Here',
        },
        {
          id: 3,
          name: '3 Bedroom Flat',
          href: '#',
          imageSrc: '../assets/p_images/3 Bedroom Flat.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '450000',
          event: 'Click Here',
        }
      // More products...
       ]
          res.send(products)
  })

app.get('/data_api/:id', (req, res)=> {
  const products = [
     {
      id: 0,
      name: '4-BedRoom-Bungalow',
      href: 'alert(1)',
      imageSrc: '../assets/p_images/4-Bedroom-Bungalow.jpg',
      imageAlt: "3 bed rooms, 3 toilet, 1 palour, kitchen",
      price: '750000',
      color: 'Click Here',
    },
     {
        id: 1,
        name: '5 Bed Room Bungalow',
        href: '#',
        imageSrc: '../assets/p_images/massive-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '25000000',
        color: 'Click Here',
      },
      {
        id: 2,
        name: '2 Bungalow',
        href: '#',
        imageSrc: '../assets/p_images/bungalow-2-1024x683.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '250000',
        color: 'Click Here',
      },
      {
        id: 3,
        name: '3 Bedroom Flat',
        href: '#',
        imageSrc: '../assets/p_images/3 Bedroom Flat.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '450000',
        event: 'Click Here',
      }
    // More products...
     ]
        res.send(products[req.params.id])
})

app.get('/kwaba_user/:u_id', (req,res)=> {  
  con.query(
    "SELECT * FROM users ",(err,result)=>{
          if(err){
            res.send({err: err})
          }
      
        if(result) {
          res.send(req.params.u_id);
        }
    }
  )
})

app.get('/kwaba_user/', (req,res)=> {  
  con.query(
    "SELECT * FROM users ORDER BY id ",(err,result)=>{
          if(err){
            res.send({err: err})
          }
      
        if(result) {
          res.send({result: result});
        }
    }
  )
})

app.post('/register_user', (req,res)=>{
  const fullname = req.body.fullName
  const username = req.body.userName
  const email = req.body.emailAdrr
  const password = req.body.passWord
  const rand_u = req.body.randUser
    
  // res.send({reg_confirmed: 'Registration Successfully Completed'})

   con.query(
     "INSERT INTO users (fullname,username,email,password,rand) VALUE(?,?,?,?,?)",[fullname,username,email,password,rand_u],
     (err,result)=>{
         if(result){
             res.send({reg_confirmed: 'Registration Successfully Completed'})
         }else{
          res.send({reg_exist: 'Account Already Exist!!!'})
         }
     }
   )
})

app.post('/login_user', (req,res)=> {
      const userEmail = req.body.email_u
      const userPass =  req.body.pass_u

    con.query(
      "SELECT * FROM users WHERE email=? AND password=?",
       [userEmail,userPass],(err,result)=>{
            if(err){
              res.send({err: err})
            }
         
           if(result.length > 0) {
             res.send({result: result });
           } else {
             res.send({message: "Wrong username / password combination."})
           }
        
      }
    )
})