var assert = require('assert');
const request = require('request');

var myurl = 'http://localhost:3000';
describe('Testing the Loan API', function(){
    before(function(done){
        let b = {id:1, name: "Harry Potter", year: 1997, authors: "JK Rowling", publisher: "Bloomsbery"}
        request.post({
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/books',
                        body: JSON.stringify(b)
                    }, function(error, response, body){
                            if (error) console.dir(error);
                            assert.strictEqual(JSON.parse(body).msg, "client-side: The Book was correctly inserted in the Database");
                            done();
                    });
    });
    after(function(done){
        request.delete({    
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/books/1'
                     }, function(error, response, body){
                        assert.strictEqual(JSON.parse(body).msg, "client-side: The Book was deleted");
                        done();
                     });
    });
    it('POST - Loan', function(done){
        let l = {id:1, book_id: 1, date: "06/03/2021", client_name: "Amilcar Soares", was_returned: false, date_of_return: null}
        request.post({
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/loans',
                        body: JSON.stringify(l)
                    }, function(error, response, body){
                            if (error) console.dir(error);
                            assert.strictEqual(JSON.parse(body).msg, "client-side: The Loan was correctly inserted in the Database");
                            done();
                    });
    });
    it("GET - Loan - Open", function(done){
        request.get({   
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/loans/open'
                    }, function (error, response, body){
                        if (error) console.dir(err);
                        assert.strictEqual(JSON.parse(body).msg, "client-side: The Open Loans were correctly retrieved from the Database");
                        done();
                    });
    });
    it('PUT - Loan', function(done){
        let l = {id:1, book_id: 1, date: "06/03/2021", client_name: "Amilcar Soares", was_returned: true, date_of_return: "08/03/2021"}
        request.put({
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/loans/'+l.id,
                        body: JSON.stringify(l)
                    }, function(error, response, body){
                            if (error) console.dir(error);
                            assert.strictEqual(JSON.parse(body).msg, "client-side: The loan was correctly updated");
                            done();
                    });
    });
    it("GET - Loan - Closed", function(done){
        request.get({   
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/loans/closed'
                    }, function (error, response, body){
                        if (error) console.dir(err);
                        assert.strictEqual(JSON.parse(body).msg, "client-side: The Closed Loans were correctly retrieved from the Database");
                        done();
                    });
    });
    it("GET - Loan", function(done){
        request.get({   
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/loans/1'
                    }, function (error, response, body){
                        if (error) console.dir(err);
                        assert.strictEqual(JSON.parse(body).msg, "client-side: The Loan was correctly retrieved from the Database");
                        done();
                    });
    });
    it("GET - Loans", function(done){
        request.get({   
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/loans'
                    }, function (error, response, body){
                        if (error) console.dir(err);
                        assert.strictEqual(JSON.parse(body).msg, "client-side: The Loans were correctly retrieved from the Database");
                        done();
                    });
    });
    it("DELETE - Loan", function(done){
        request.delete({    
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/loans/1'
                    }, function(error, response, body){
                        assert.strictEqual(JSON.parse(body).msg, "client-side: The Loan was deleted");
                        done();
                    });
    });
});