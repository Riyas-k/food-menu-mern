const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.json())

const userRouter = require('./routes/user.js')
const adminRouter = require('./routes/admin.js');

app.use('/',userRouter);
app.use('/admin',adminRouter);

app.post('/',(req,res)=>{
   console.log(req.body);
})

app.listen(3000,()=>{
    console.log('start server');
})