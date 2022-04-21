const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

//Uses config.env file
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connection successful!');
	});

//------------------ Mongoose Schema-------------------------//
//When using Mongoose we use what is called a model. Models / Schemas are similar to classes in
//javascript its  like a blueprint that can be used to do CRUD operations for example.
const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A tour must have a name'],
		unique: true,
	}, //<- this object is a schema type object of options. We do not need the object but its only to use
	//      pass in options.
	rating: {
		type: Number,
		default: 4.5,
	},
	price: {
		type: Number,
		required: [true, 'A tour must have a price'],
	},
});

//Naming convention is to always use Uppercase on mongoose model variables.
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
	name: 'The Park Camper',
	price: 997.0,
});

//If we want to save something to the database we just use .save() this is also a promise so we
//will recieve a response object (document in the database).
testTour
	.save()
	.then((doc) => {
		console.log(doc);
	})
	.catch((err) => {
		console.log('ERROR 💥:', err);
	});
//----------------------Server-------------------------//
const port = 3000;

app.listen(port, () => {
	console.log(`App running on port --> ${port} <--`);
});
