NotesList = new Mongo.Collection("notes");
Addresses = new Mongo.Collection("addresses");
Favourites = new Mongo.Collection("favourites");
Versions = new Mongo.Collection("versions");



Meteor.methods({
	"createSomething": function() {
		console.log("Nadam se da radi :-)");
	}
});