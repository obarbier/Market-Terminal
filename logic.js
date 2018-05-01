const mongoose = require('mongoose'); // An Object-Document Mapper for Node.js
const assert = require('assert'); // N.B: Assert module comes bundled with Node.js.
mongoose.Promise = global.Promise; // Allows us to use Native promises without throwing error.

// Connect to a single MongoDB instance. The connection string could be that of a remote server
// We assign the connection instance to a constant to be used later in closing the connection
const db = mongoose.connect('mongodb://localhost:27017/contact-manager');

//
const request = require('request');
const API_KEY = 'PLRFTSSY19UYC9Z9';
const API_URL = 'https://www.alphavantage.co/query';
// Converts value to lowercase
function toLower(v) {
  return v.toLowerCase();
}

// Define a contact Schema
const contactSchema = mongoose.Schema({
  firstname: { type: String, set: toLower },
  lastname: { type: String, set: toLower },
  phone: { type: String, set: toLower },
  email: { type: String, set: toLower }
});

// Define model as an interface with the database
const Contact = mongoose.model('Contact', contactSchema);

/**
 * @function  [addContact]
 * @returns {String} Status
 */
const addContact = (contact) => {
  Contact.create(contact, (err) => {
    assert.equal(null, err);
    console.info('New contact added');
    mongoose.disconnect();
  });
};

/**
 * @function  [getContact]
 * @returns {Json} contacts
 */
const getContact = (name) => {
  // Define search criteria. The search here is case-insensitive and inexact.
  const search = new RegExp(name, 'i');
  Contact.find({$or: [{firstname: search }, {lastname: search }]})
  .exec((err, contact) => {
    assert.equal(null, err);
    console.info(contact);
    console.info(`${contact.length} matches`);
    mongoose.disconnect();
  });
};


const getQuote = (symbols) =>{
    let data = {
        "url": API_URL,
        "qs":{
            "function":'BATCH_STOCK_QUOTES',
            "symbols" : symbols,
            "datatype"  : "json",
            "apikey"  : API_KEY
        }
    };
    request.get(
        data,
         (error,response,body) => {
         if(error){
             console.log("Error Occured");

         }else{
             console.log(body)
             return body;
         }

         response.status = 400;
    });

};

// Export all methods
module.exports = {  addContact, getContact,getQuote };
