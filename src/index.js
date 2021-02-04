require('./models/User');
require('./models/track');
const express= require('express');
const mongoose=require('mongoose');
app.use(bodyParser.json());
const authRoutes =require('./routes/authRoutes');
const tracksRoutes=require('./routes/trackRoutes')
const requireAuth=require('./middlewares/requireAuth');
const bodyParser=require('body-parser');
const app=express();

app.use(authRoutes);
app.use(tracksRoutes);
 const mongoUri='mongodb+srv://admin:passwordpassword@cluster0.godu2.mongodb.net/<dbname>?retryWrites=true&w=majority';
 if (!mongoUri) {
    throw new Error(
      `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
    );
  }
 mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
});

mongoose.connection.on('connected',()=>{
    console.log("connectd to mongo instance");
});
mongoose.connection.on('error',(err)=>{
    console.log('error connecting to mongo',err);
});

app.get('/', requireAuth, (req,res) => {
    res.send(`Your email:${req.user.email}`);
});

app.listen(3000,()=>{
    console.log("listening on port");
});