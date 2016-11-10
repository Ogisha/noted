var temp1 = new Date ();
var danas = temp1.getDate();

Template.notebook.helpers({
		
	"check": function() {
		if (NotesList.find({ createdBy: Meteor.userId() }).count() == 0) {
			Session.set("selected", null);
			return true;
		}
	},

	"returnNotes": function() {
		return NotesList.find({ createdBy: Meteor.userId() });
	},
	
	"checkAll": function() {
		return NotesList.find({ createdBy: Meteor.userId() }).count();
	},
	
	"checkToday": function() {
		return NotesList.find({ day: danas, createdBy: Meteor.userId() }, { sort: { viewed: true, hours: -1, minutes: -1  }});
	},
	
	"checkTodayNo": function() {
		return NotesList.find({ day: danas, createdBy: Meteor.userId(), viewed: {$ne: true} }).count();
	},
		
	"checkOld": function() {
		return NotesList.find({ day: {$ne: date1 }, createdBy: Meteor.userId() }, { sort: {month: -1, day: -1} });
	},
	
	"viewed": function() {
		 if (this.viewed == true )
			return true;
	},
	
	"selected": function() {
		var temp = this._id;
		var tempLi = Session.get("selected");
		if (tempLi == temp) 
			return "selected2";
	}	
});

Template.notebook.events({
		
	"click li": function(e) {
		Session.set("selected", this._id);
	},
	
	"click #noteslistBtn1": function() {
		var temp = Session.get("selected");
		NotesList.remove({ _id: temp});
	},
	
	"click #noteslistBtn2": function() {
		var temp = Session.get("selected");
		NotesList.update({ _id: temp }, { $set: { viewed: true } });
		return "successfuly edited!";
	},
	
	"click #noteslistBtn3":function() {
		Session.set("selected", null);
	}	
});