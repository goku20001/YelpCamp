const mongoose = require('mongoose')
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 1000; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[rand1000].city} ${cities[rand1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude
                ]
            },
            author: "624e745e558fca9e6e5bf909",
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab cumque dolorum quas debitis quisquam voluptas qui, odit dolorem illum tempora ullam facere, porro corporis non eos officia ipsum natus! Tenetur.",
            images: [{
                    url: 'https://res.cloudinary.com/dcaukhohp/image/upload/v1650080257/yelpcamp/y0izhs0fqcy55etwetr7.jpg',
                    filename: 'yelpcamp/y0izhs0fqcy55etwetr7',
                },
                {
                    url: 'https://res.cloudinary.com/dcaukhohp/image/upload/v1650080256/yelpcamp/otrj3f8l3dzjzczggetv.jpg',
                    filename: 'yelpcamp/otrj3f8l3dzjzczggetv',
                },
            ],
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})