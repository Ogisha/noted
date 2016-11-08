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
	"click li": function checkLovedStatus(event) {
		Session.set("selected", this._id);
		var temp = Session.get("selected");
		if (temp == this._id) {
			if ((Favourites.findOne({ _id: this._id }).hasOwnProperty("love")) && (Favourites.findOne({ _id: this._id }).love == true)) {
				$("#footer4Btn5").html("<i class='notesButtons fa2 sound fa fa-heart-o fa-3x' aria-hidden='true' style='margin-left:10%'></i>");
			}
			else {
				$("#footer4Btn5").html("<i class='notesButtons fa2 sound fa fa-thumbs-o-down fa-3x' aria-hidden='true' style='margin-left:10%'></i>");
			}
		}
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
		var type1 = event.target.selectType.value;
		var title = event.target.urlTitle.value;
		var url = event.target.newUrl.value;
		var comment = event.target.newUrlComment.value;
		Favourites.update({ _id:temp},  { type: type1, title: title, url: url, comment: comment});
		$("#editMessage2").append("Successfuly edited!");
	},
	
	"click #editUrl": function(event) {
		$("#editMessage2").text("");
		var temp = Session.get("selected");
		var x = Favourites.findOne({ _id: temp });
	},
	
	"click #closeBtn1":function() {
		$("#editMessage1").text("");
	},

	"click #closeBtn2":function() {
		$("#editMessage2").text("");
	}
});