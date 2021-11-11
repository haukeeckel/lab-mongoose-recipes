const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    // return Recipe.create(data[0]);
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then((data) => {
    console.log(`Database Updated ${data.title}`);
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })
  .then(() => {
    mongoose.connection.close();
  })
  .then(() => {
    console.log('connection closed');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
