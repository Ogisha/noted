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

	"mousemove #page": function(event) {
		if ($("#ni1").html() == "<i>Day: </i>") {
			$("#ni1").append(dan);
			$("#ni2").append(datum);
		}
	},

	"click .showOptions": function(event) {
		$("#section1").css("position", "absolute").animate({top: "0"}, 1500);
	},

	"click .hideOptions": function(event) {
		$("#section1").css("position", "relative").animate({top: "0"}, 1500);
	},

	"click #confirmDbChangeBtn": function() {
		if ($("#dbEmpty1").is(":checked")) 
			$("#hide1").removeClass("hidden");

		if ($("#dbEmpty2").is(":checked")) 
			$("#hide2").removeClass("hidden");

		if ($("#dbEmpty3").is(":checked")) 
			$("#hide3").removeClass("hidden");

		if ($("#dbEmpty4").is(":checked"))
			$("#hide4").removeClass("hidden");
	},

	"change input[type='checkbox']": function() {
		if($("input[type='checkbox']").is(":checked"))
			$("#confirmDbChangeBtn").removeAttr("disabled");
		else
			$("#confirmDbChangeBtn").attr("disabled", "disabled");
	},

	"click .confirmDeleteDb": function(e) {
		$(event.target).next().toggleClass("hidden2");
	},

	"click .confirmDeleteDb": function(e) {
		$(event.target).next().toggleClass("hidden2");
	},

	"click #definite1":function() {
		NotesList.remove({createdBy: Meteor.userId()});
		$(event.target).next().toggleClass("hidden2");
	},

	"click #definite2":function() {
		Addresses.remove({createdBy: Meteor.userId()});
		$(event.target).next().toggleClass("hidden2");
	},

	"click #definite3":function() {
		Favourites.remove({createdBy: Meteor.userId()});
		$(event.target).next().toggleClass("hidden2");
	},

	"click #definite4":function() {
		NotesList.remove({createdBy: Meteor.users().this._id});
		Addresses.remove({createdBy: Meteor.users().this._id});
		Favourites.remove({createdBy: Meteor.users().this._id});
		$(event.target).next().toggleClass("hidden2");
	},

	"click #closeDbModal": function() {
		$(".tempP").addClass("hidden");
		$(".proceedBtn").addClass("hidden2");
		$("input[type=checkbox]").removeAttr("checked");
		$("#confirmDbChangeBtn").attr("disabled", "disabled");
	}
});
