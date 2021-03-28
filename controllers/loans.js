const Loan = require("../models/loan.js")

const create = async (req, res) => {
	const new_loan = new Loan(parseInt(req.body.id), parseInt(req.body.book_id), req.body.date, req.body.client_name, req.body.was_returned, req.body.date_of_return);
	console.log(new_loan);
	let db = req.db;
	try{
		let msg = await new_loan.save(db);
		res.send(msg);
	}catch(err){
		res.send('There was an error while saving your Loan. (err:'+err+')');
		throw new Error(err);
	}	
}

const getOne = async (req, res) => {
	const loan_to_get = req.params.id;
	let db = req.db;
	try{
		let obj = await Loan.getLoanById(db, loan_to_get);
		console.log(obj);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving your Loan. (err:'+err+')');
		throw new Error(err);
	}	
}

const updateOne = async (req, res) => {
	const loan_to_update = req.body
	const loan_id = req.params.id
	let db = req.db;
	try{
		let msg = await Loan.update(db, loan_id, loan_to_update.date, loan_to_update.client_name, loan_to_update.was_returned, loan_to_update.date_of_return);
		res.send(msg);
	}catch(err){
		res.send('There was an error while updating your Loan. (err:'+err+')');
		throw new Error(err);
	}	
}

const deleteOne = async (req, res) => {
	const loan_id = req.params.id;
	let db = req.db;
	try{
		let msg = await Loan.delete(db, loan_id);
		res.send(msg);	
	}catch(err){
		res.send('There was an error while deleting your Loan. (err:'+err+')');
		throw new Error(err);
	}		
}

const all = async (req, res) => {
	let db = req.db;
	try{
		let obj = await Loan.getLoans(db);
		console.log('server-side: '+obj.loans.length+' loan(s) were returned');
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving all Loans. (err:'+err+')');
		throw new Error(err);
	}
		
}

const getOpenLoans = async (req, res) => {
	let db = req.db;
	try{
		let obj = await Loan.getOpenLoans(db);
		console.log('server-side: '+obj.loans.length+' open loan(s) were returned');
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving all Loans. (err:'+err+')');
		throw new Error(err);
	}
		
}

const getClosedLoans = async (req, res) => {
	let db = req.db;
	try{
		let obj = await Loan.getClosedLoans(db);
		console.log('server-side: '+obj.loans.length+' closed loan(s) were returned');
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving all Loans. (err:'+err+')');
		throw new Error(err);
	}
		
}

// Make all methods available for use.
module.exports = {
	create,
	getOne,
	updateOne,
	deleteOne,
	all,
	getOpenLoans,
	getClosedLoans
}
