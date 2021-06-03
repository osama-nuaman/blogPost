const mongoose = require('mongoose');

module.exports = () => {
    const databaseURL = 'mongodb://localhost/BLog-Post';

    //connect to database
    mongoose.connect(databaseURL, { useNewUrlParser: true , useUnifiedTopology: true} ,(error) => {
        if (error){
        console.log(error);
        }else{
        console.log('database running ...');
        }
    })
  

}