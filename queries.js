/* Add all the required libraries*/
var mongoose = require('mongoose'),
    ListingSchema = require('./ListingSchema.js'),
    config = require('./config');
/* Connect to your database using mongoose - remember to keep your key secret*/

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html
mongoose.connect(config.db.uri, {useNewUrlParser: true});

var findLibraryWest = async function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
   ListingSchema.findOne({ name : "Library West"}
   ).then(info => console.log(`Found Library West: ${info}`));
};
var removeCable = async function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
   ListingSchema.deleteOne({ code : "CABL"}
 ).then(() => console.log('Deleted CABL. '));
};
var updatePhelpsLab = async function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */
  ListingSchema.updateOne(
      {name : {$regex : ".*Phelps Laboratory.*"}},
      {address : "1953 Museum Rd, Gainesville, FL 32603, United States"}
    ).then(info => console.log('Updated Phelps Laboratory Address.'));
};
var retrieveAllListings = async function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
   var cursor = ListingSchema.find({}).cursor();
    cursor.on('data', function(listing) {
      console.log(listing);
    });
    cursor.on('close', function() {
      console.log('Done Retreiving. ');
    });
};

var doQuerries = async function() {
  await Promise.all([findLibraryWest(),
                         removeCable(),
                     updatePhelpsLab()]);
  await console.log('Printing All Lisitngs.')
  retrieveAllListings();
};

doQuerries();
