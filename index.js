const express=require("express");
const path=require("path");
const app=express();
const multer=require("multer");

const PORT=8002;
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


 app.use(express.urlencoded({extended:false}));
// app.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null,uniqueSuffix + '-'  + file.originalname);
    }
  })
  
  const upload = multer({ storage:storage})

// app.post("/upload", upload.single('UploadImage'),(req,res)=>{
//     console.log(req.body);
//     console.log(req.file);
//     return res.redirect("/");
// })
app.post("/upload",upload.fields([{ name: 'UploadImage', maxCount: 1 }, { name: 'CoverImage', maxCount: 8 }]),(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    return res.redirect("/");
})


app.get("/",(req,res)=>{
    return res.render("home");
})


app.listen(PORT,()=>console.log(`Server Started at port ${PORT}`));