Meteor.publish("notescol", function() {
	var currentUserId = this.userId;
	console.log(currentUserId);
	return NotesList.find({ createdBy: currentUserId });
});

Meteor.publish("adressescol", function() {
	return Addresses.find({ createdBy: this.userId});
});

Meteor.publish("favcol", function() {
	return Favourites.find({ createdBy: this.userId});
});