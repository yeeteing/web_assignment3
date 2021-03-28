var assert = require('assert');
const request = require('request');

var myurl = 'http://localhost:3000';
describe('Testing the Book API', function(){
    it('POST - Book', function(done){
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
    it('PUT - Book', function(done){
        let b = {"id":1, "name": "Harry Potter 2", "year":1998, "authors":"JK Rowling", "publisher":"Bloomsbery"}
        request.put({
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/books/'+b.id,
                        body: JSON.stringify(b)
                    }, function(error, response, body){
                            if (error) console.dir(error);
                            assert.strictEqual(JSON.parse(body).msg, "client-side: The book was correctly updated");
                            done();
                    });
    });
    it("GET - Book", function(done){
        request.get({   
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/books/1'
                    }, function (error, response, body){
                        if (error) console.dir(err);
                        assert.strictEqual(JSON.parse(body).msg, "client-side: The Book was correctly retrieved from the Database");
                        done();
                    });
    });
    it("GET - Books", function(done){
        request.get({   
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/books'
                    }, function (error, response, body){
                        if (error) console.dir(err);
                        assert.strictEqual(JSON.parse(body).msg, "client-side: The Books were correctly retrieved");
                        done();
                    });
    });
    it("DELETE - Book", function(done){
        request.delete({    
                        headers: {'content-type': 'application/json'},
                        url: myurl+'/books/1'
                    }, function(error, response, body){
                        assert.strictEqual(JSON.parse(body).msg, "client-side: The Book was deleted");
                        done();
                    });
    });
});