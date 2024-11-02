const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initdata = require("./data.js");

const MongoURL = "mongodb://127.0.0.1:27017/CheckInnNow";
main()
.then(()=>{
    console.log("Connected to Database.");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect(MongoURL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"6719ed4ec4cf161a013bb24f"})); //return new array
    Listing.insertMany(initdata.data);
    console.log("data was initialized.");
}
initDB();

