const Validator = require("validatorjs")

async function _get_books_collection (db){
    try{
		return await db.collection('books');
	}catch(err){
		throw err;
	}    
};

class Book {
	constructor(id, name, authors, year, publisher) {
		this._id        = id
		this.name      = name
		this.authors   = authors
		this.year      = year
		this.publisher = publisher
	}

	isValid(){
		const rules = {
			_id: 	   'required|integer',
			name:      'required|string',
			authors:   'required|string',
			year:      'required|integer',
			publisher: 'required|string',
		}
		const validation = new Validator(this, rules);
		return validation.passes();		
	};
	
	async save(db) {
		var book =  this;
		return new Promise(async function (resolve, reject){
			let collection = await _get_books_collection(db);
			collection.insertOne(book, (err, obj) => {
				if (err) return reject(err);
				console.log('server-side: The Book was inserted in the database');
				resolve({msg:'client-side: The Book was correctly inserted in the Database'});
			});
		});
	};

	static async update(db, id, name, authors, year, publisher) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_books_collection(db);
			let new_vals = {$set: {'name': name, 'authors': authors, 'year': year, 'publisher': publisher}};
			collection.updateOne({'_id': parseInt(id)}, new_vals, (err, obj) => {
				if (err) return reject(err);
				if (obj.modifiedCount > 0){
					console.log("server-side: 1 document updated");
					resolve({msg: 'client-side: The book was correctly updated'});
				} else {
					console.log("server-side: The book was not updated");
					resolve({msg:'client-side: The new book data is not valid or is the same'});
				} 
			});				
		});
	};

	static async delete(db, id) {
		var id_delete = id;
		return new Promise(async function (resolve, reject){
			let collection = await _get_books_collection(db);
			collection.deleteOne({'_id': parseInt(id_delete)}, (err, obj) => {
				if (err) return reject(err);
				if (obj.result.n > 0){
					console.log("server-side: 1 Book was deleted");
					resolve({msg:'client-side: The Book was deleted'});
				} else {
					resolve({msg:'client-side: The Book was not found'});
				}
			});
		});
		
	};
	
	static async getBookById(db, id) {
		var id_get = id;
		return new Promise(async function (resolve, reject){
			let collection = await _get_books_collection(db);
			collection.findOne({'_id': parseInt(id_get)}, (err, obj) => {
				if (err) return reject(err);
				console.log('1 Book was successfully retrieved');
				resolve({book: obj, msg: 'client-side: The Book was correctly retrieved from the Database'});
			});
		});
	};

	static async getBooks(db) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_books_collection(db);
			collection.find({}).toArray((err, items)=> {
				if (err) return reject(err);
				resolve({books: items, msg: 'client-side: The Books were correctly retrieved'});
			});
		});
	};

	static async getBooksByYear(db, year) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_books_collection(db);
			collection.find({'year': year}).toArray((err, items)=> {
				if (err) return reject(err);
				resolve({books: items, msg: 'client-side: The Book was correctly inserted in the Database'});
			});
		});
	};
	
}

module.exports = Book
