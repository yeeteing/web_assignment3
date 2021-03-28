const Validator = require("validatorjs")
const Book = require("../models/book")

async function _get_loans_collection (db){
    try{
		return await db.collection('loans');
	}catch(err){
		throw err;
	}    
};

class Loan {
	constructor(id, book_id, date, client_name, was_returned, date_of_return) {
		this._id  			= id
		this.book_id      	= book_id
		this.date   		= date
		this.client_name    = client_name
		this.was_returned 	= was_returned
		this.date_of_return = date_of_return
	}
	
	async save(db) {
		let loan =  this;
		return new Promise(async function (resolve, reject){
			let collection = await _get_loans_collection(db);
			Book.getBookById(db, loan.book_id).
				then(function(book_obj){
					collection.insertOne(loan, (err, obj) => {
						if (err) return reject(err);
						console.log('server-side: The Loan was inserted in the database');
						resolve({msg:'client-side: The Loan was correctly inserted in the Database'});
					});
				}).
				catch(function(err){
					reject(err);
				});			
		});
	};

	static async update(db, id, date, client_name, was_returned, date_of_return) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_loans_collection(db);
			let new_vals = {$set: {'date': date, 'client_name': client_name, 'was_returned': was_returned, 'date_of_return': date_of_return}};
			collection.updateOne({'_id': parseInt(id)}, new_vals, (err, obj) => {
				if (err) return reject(err);
				if (obj.modifiedCount > 0){
					console.log("server-side: 1 document updated");
					resolve({msg: 'client-side: The loan was correctly updated'});
				} else {
					console.log("server-side: The loan was not updated");
					resolve({msg:'client-side: The new loan data is not valid or is the same'});
				} 
			});				
		});
	};

	static async delete(db, id) {
		var id_delete = id;
		return new Promise(async function (resolve, reject){
			let collection = await _get_loans_collection(db);
			collection.deleteOne({'_id': parseInt(id_delete)}, (err, obj) => {
				if (err) return reject(err);
				if (obj.result.n > 0){
					console.log("server-side: 1 Loan was deleted");
					resolve({msg:'client-side: The Loan was deleted'});
				} else {
					resolve({msg:'client-side: The Loan was not found'});
				}
			});
		});
		
	};
	
	static async getLoanById(db, id) {
		var id_get = id;
		return new Promise(async function (resolve, reject){
			let collection = await _get_loans_collection(db);
			collection.findOne({'_id': parseInt(id_get)}, (err, obj) => {
				if (err) return reject(err);
				console.log('1 Loan was successfully retrieved');
				resolve({loan: obj, msg: 'client-side: The Loan was correctly retrieved from the Database'});
			});
		});
	};

	static async getLoans(db) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_loans_collection(db);
			collection.find({}).toArray((err, items)=> {
				if (err) return reject(err);
				resolve({loans: items, msg: 'client-side: The Loans were correctly retrieved from the Database'});
			});
		});
	};
	
	static async getOpenLoans(db) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_loans_collection(db);
			collection.find({was_returned: false}).toArray((err, items)=> {
				if (err) return reject(err);
				resolve({loans: items, msg: 'client-side: The Open Loans were correctly retrieved from the Database'});
			});
		});
	};
	static async getClosedLoans(db) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_loans_collection(db);
			collection.find({was_returned: true}).toArray((err, items)=> {
				if (err) return reject(err);
				resolve({loans: items, msg: 'client-side: The Closed Loans were correctly retrieved from the Database'});
			});
		});
	};
}

module.exports = Loan
