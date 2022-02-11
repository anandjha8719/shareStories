const mongoose = require('mongoose');


const connectDB = async () => {
        const url = process.env.MONGO_URI;
        const connectionParams={
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, connectionParams)

        console.log('Connected to database MongoDB');
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;

// const mongoose = require('mongoose');


//     const url = process.env.MONGO_URI;
//     const connectionParams={
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology: true 
//     }

//     mongoose.connect(url,connectionParams);



// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });


// module.exports = db;