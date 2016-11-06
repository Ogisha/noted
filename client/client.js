var temp = new Date ();
var danas = temp.getDate();

	Template.body.helpers({

		"returnVersion": function(){
			return Versions.findOne({}, {sort: {createdOn: -1, limit: 1}});
		},

		"returnAllVersions": function() {
			return Versions.find({}, {sort: {createdOn: -1}});
		},

		"isLogedIn": function() {
			if (Meteor.user()) 
				return "buttons";
			else 
				return "hidden buttons";
		}
	});

	Template.body.events({
	"click .showOptions": function(event) {
		$("#section1").css("position", "absolute").animate({top: "0"}, 1500);
	},

	"click .hideOptions": function(event) {
		$("#section1").css("position", "relative").animate({top: "0"}, 1500);
	}
});
	
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
			NotesList.remove({ _id: temp });
		},
		
		"click #noteslistBtn2": function() {
			var temp = Session.get("selected");
			NotesList.update({ _id: temp}, { $set: { viewed: true } });
			return "successfuly edited!";
		},
		
		"click #noteslistBtn3":function() {
			Session.set("selected", null);
		}
	});

	Template.addressbook.helpers({
		"returnAll": function() {
			return Addresses.find({}, { sort: { name: 1}});
		},

		"returnTypeOfContact": function() {
			alert(this.type);
			if (this.typeofContact == "friends")
				return "<img src='images/friends.png' style='margin-left: 5%;'>";
			if (this.type == "family") {
				return "<img src='images/family.png' style='margin-left: 5%;'>";
			}
			if (this.type == "love")
				return "<img src='images/love.png' style='margin-left: 5%;'>";
			if (this.type == "businness")
				return "<img src='images/business.png' style='margin-left: 5%;'>";
			else
				return "<img src='images/question.png' style='margin-left: 5%;'>";
		},

		"commentCheck": function(e) {
			if(this.comment != "")
				return true;
		}
	});

	Template.addressbook.events({

		"submit #addressbookComment": function(e) {
			
			e.preventDefault();

			console.log(this._id);
			console.log(e.target.commentBox.value);

			Addresses.update({ _id: this._id}, { $set: {comment: e.target.commentBox.value} });
		

			

		}
	});

	
	
	
	Template.favs.helpers({
		
		"check": function() {
			if (Favourites.find().count() == 0)
				return true;
			else
				return false;
		},
		
		"returnFavs":function() {
			return Favourites.find({}, { sort: { love: -1, title: 1 } });
		},
		
		"returnType": function() {
			if (this.type == "sports")
				return "<i class='fa fa-futbol-o fa-2x' aria-hidden='true'></i>";
			if (this.type == "music")
				return "<i class='fa fa-music fa-2x' aria-hidden='true'></i>";
			if (this.type == "movies")
				return "<i class='fa fa-film fa-2x' aria-hidden='true'></i>";
			if (this.type == "work")
				return "<i class='fa fa-briefcase fa-2x' aria-hidden='true'></i>";
			if (this.type == "web")
				return "<i class='fa fa-anchor fa-2x' aria-hidden='true'></i>";
			if (this.type == "personal")
				return "<i class='fa fa-user fa-2x' aria-hidden='true'></i>";
			if (this.type == "education")
				return "<i class='fa fa-graduation-cap fa-2x' aria-hidden='true'></i>";
			if (this.type == "news")
				return "<i class='fa fa-newspaper-o fa-2x' aria-hidden='true'></i>";
		},
		
		"returnClass": function() {
			
			var temp = Session.get("selected");
			var tempLi = this._id;
			
			if (temp == tempLi)
				return "selected";
			else
				return false;
		},

		
		
		"editBookmark": function() {
			
			var temp = Session.get("selected");
			var x = Favourites.findOne({ _id: temp });
			
			return x;
		}
	});
	
	Template.favs.events({
		"click li": function(event) {
			Session.set("selected", this._id);
		},
		
		"click #footer4Btn6": function(event) {
			var temp = Session.get("selected");
			
			Favourites.remove({ _id: temp });
			Session.set("selected", null);
		},
		
		"click #footer4Btn5": function(event) {
			var temp = Session.get("selected");
			
			if ((Favourites.findOne({ _id: temp }).hasOwnProperty("love")) && (Favourites.findOne({ _id: temp }).love == true))
				Favourites.update({ _id: temp }, { $set: { love: false } });
		
			else
				Favourites.update({ _id: temp }, { $set: { love: true } });
		},
		
		"click #footer4Btn7": function() {
			Session.set("selected", null);
		},
		
		"submit #submitUrl": function(event) {
			
			event.preventDefault();
			
			var type = event.target.selectType.value;
			var title = event.target.urlTitle.value;
			var url = "http://" + event.target.newUrl.value;
			var comment = event.target.newUrlComment.value;
			
			Favourites.insert({ type: type, title: title, url: url, comment: comment});
			$("#editMessage1").append("Successfuly added!");
			
			event.target.selectType.value = "";
			event.target.urlTitle.value = "";
			event.target.newUrl.value = "";
			event.target.newUrlComment.value ="";
			
		},
		
		"submit #submitEditedUrl": function (event) {
			
			event.preventDefault();
			var temp = Session.get("selected");
			
			var type = event.target.selectType.value;
			var title = event.target.urlTitle.value;
			var url = event.target.newUrl.value;
			var comment = event.target.newUrlComment.value;
			
			Favourites.update({ _id:temp},  { type: type, title: title, url: url, comment: comment});
			$("#editMessage2").append("Successfuly edited!");
		},
		
		"click #editUrl": function(event) {
			$("#editMessage2").text("");
			var temp = Session.get("selected");
			var x = Favourites.findOne({ _id: temp });
		},
		
		"click #closeBtn":function() {
			$("#editMessage1").text("");
		}

	});

	Meteor.subscribe("notescol");
	Meteor.subscribe("addressescol");
	Meteor.subscribe("favcol");
