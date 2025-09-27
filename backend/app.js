const mongoose=require('mongoose')
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');

const umodel = require('./models/user.js');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/',function(req,res){
  res.redirect('/register')
})
app.get('/register',function(req,res){
  res.render('userinp');
})
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "frontend/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });





app.post('/register',upload.single('image'),async function(req,res){
    let { name, email, password, cpassword,number } = req.body;
      let eusers=await umodel.findOne({email:email});
      if(eusers!=null){
       return  res.send(`<html>
          <body>
          <div>Email already exists login directly or use different email </div>
          <button onclick="log()">Login with this mail</button>
          <button onclick="creat()">Register with different mail</button>
          <script>
          function log(){
          setTimeout(function(){
          window.location.href='/login'},1000)}
            function creat(){
          setTimeout(function(){
          window.location.href='/register'},1000)}
          </script>
          </body>
          </html>`)
      }
      if(password===cpassword){
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          const user = await umodel.create({
            name,
            email,
            password: hash,
            number,
            image: req.file ? req.file.filename : null

            
          });
          res.render('login');
        });
      });
    }
    else{
        res.send(`<html>
            <body>
            <div> Password  And Confirm Password do not match please try again</div>
            <script>
          setTimeout(function(){
      window.location.href='/register'},1000);
      </script>
      </body>
      </html>
                `)
    }
    });
    app.get('/login', function (req, res) {
  res.render('login');
});
    app.post('/login', async function (req, res) {
      let { email1, password1 } = req.body;
      let user = await umodel.findOne({ email: email1 });
      console.log(user);
      if (user != null) {
        bcrypt.compare(password1, user.password, function (err, result) {
          if (result) {
            res.redirect(`/login/home/user/${user._id}`);
          } else {
            res.redirect('/login');
          }
        });
      } else {
        res.redirect('/register');
      }
    });
    app.get('/login/home/user/:id', async function (req, res) {
      let id1 = req.params.id;
      let user = await umodel.findById(id1);
      res.render('frontend',{user:user})
    });
   app.get("/delete", async function (req, res) {
     const users = await umodel.find();
     console.log(users);
     await umodel.deleteMany();
     res.send("deleted all users ");
   });
  // Update any field (name/email/number)
app.post("/profile/updateField", async (req, res) => {
  try {
    const { field, value, id } = req.body;   // id passed from frontend
    await umodel.findByIdAndUpdate(id, { [field]: value });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Update failed" });
  }
});

// Update profile image (AJAX)
app.post("/profile/updateImage", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.body;  // id passed from frontend
    await umodel.findByIdAndUpdate(id, { image: req.file.filename });
    res.json({ success: true, filename: req.file.filename });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: "Image upload failed" });
  }
});


   app.get('/profile/:id',async function(req,res){
    let userid=req.params.id;
    let u=await umodel.findById(userid)
    res.render('profile',{user:u})
   })

app.listen(3000,()=>{
    console.log("running")
})