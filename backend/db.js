const mongoose = require('mongoose');
const MONGO = async ()=>{
    await mongoose.connect('mongodb+srv://suarim:suarim@cluster0.sbmoe8u.mongodb.net/gofoodmern').then(async ()=>{
        console.log("done");
        const fetched_data = await mongoose.connection.db.collection("food_items")
        const food_items_data = await fetched_data.find({}).toArray();
        global.food_items = food_items_data;
        const fetched_data1 = await mongoose.connection.db.collection("foodCategory")
            const food_category_data = await fetched_data1.find({}).toArray();
            global.food_category = food_category_data;
            // console.log(global.food_items);
        })
    }

// MONGO()
module.exports = MONGO