var temp1 = new Date ();
var danas = temp1.getDate();

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
	},

	"click #confirmDbChangeBtn": function() {
		if ($("#dbEmpty1").is(":checked")) {
			$("#hide1").removeClass("hidden");
	

		}
		if ($("#dbEmpty2").is(":checked")) {
			$("#hide2").removeClass("hidden");

		}
		if ($("#dbEmpty3").is(":checked")) {
			$("#hide3").removeClass("hidden");

		}
		if ($("#dbEmpty4").is(":checked")) {
			$("#hide4").removeClass("hidden");


		}
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
			alert(danas);
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

	"editCheck": function() {
		var temp = Session.get("address");

		var temp2 = this._id;
		if (temp == this._id) {
			return true;
		}
		else {
			return false;
		}
	},
		
	"returnTypeOfContact": function() {

		if (this.contact == "friends")
			return "<img src='images/friends.png' style='margin-left: 2%;'>";
		if (this.contact == "family") 
			return "<img src='images/family.png' style='margin-left: 2%;'>";
		if (this.contact == "love")
			return "<img src='images/love.png' style='margin-left: 2%;'>";
		if (this.contact == "business")
			return "<img src='images/business.png' style='margin-left: 2%;'>";
		else
			return "<img src='images/question.png' style='margin-left: 2%;'>";
	},

	"commentCheck": function(e) {
		if(this.comment != "")
			return true;
	},

	"returnAddressClass": function() {
		var temp = this._id;

		if (temp == Session.get("address"))
			return "selectedAddress";
		else
			return false;
	}


});

	Template.addressbook.helpers({
		
		"returnVip": function() {
			var temp = Session.get("address");
			var tempVar = Addresses.findOne({ _id: temp });
			if (this.vip == "yes") {

				return true;
			}
			else {

				return false;

			}
		},

		"editAddress": function() {
			var temp = Session.get("address");
			var x = Addresses.findOne({ _id: temp });
			return x;
		},

		"returnComment": function() {
			var temp = Session.get("address");
			var x = Addresses.findOne({ _id: temp });
			return x;
		}

	})

Template.addressbook.events({

	"click .contactsFullName": function (event) {

		Session.set("address", this._id);
	},

	"click .comm4": function(e) {
		$(e.target).toggleClass("hidden");  //comm4		
		$(e.target).parent().next().toggleClass("hidden")  //form
		$(e.target).parent().prev().prev().toggleClass("hidden");  //name
		$(e.target).parent().prev(".commentInput").addClass("hidden");  //tekst komentara
	},

	"click .clicked": function(e) {
	/*	$(e.target).toggleClass("hidden");*/
		$(e.target).parent().parent().toggleClass("hidden");//form
		$(e.target).parent().parent().prev().children().toggleClass("hidden"); //comm4
		$(e.target).parent().parent().prev().prev().prev().toggleClass("hidden"); //name
		$(e.target).parent().parent().prev().prev().toggleClass("hidden");
	},





/*
			$(this).parent().parent().parent().prev().children().toggleClass("hidden");  //com4
			$(this).parent().parent().parent().prev().prev().prev().toggleClass("hidden");
			$(this).parent().parent().parent().prev().prev(".commentInput").toggleClass("hidden");
			$(this).parent().parent().parent().toggleClass("hidden"); // NAME
*/
	"click .comm6": function(e) {
		$(e.target).parent().next().val("");
	},


	"submit #addressbookComment": function(e) {
		var temp = Session.get("address");
		e.preventDefault();
		Addresses.update({ _id: temp}, { $set: {comment: e.target.commentBox.value} });
		/*$(e.target).addClass("hidden");*/
		$(e.target).parent().removeClass("hidden");

	},

	"submit #submitAddress": function(event) {
		event.preventDefault();
		var typeAdd = event.target.selectType1.value;
		var vip = event.target.selectType2.value;
		var fullName = event.target.contactsName.value;
		var email = event.target.contactsEmail.value;
		var telNum = event.target.telephoneNumber.value;
		var comment = event.target.newContactComment.value;
		Addresses.insert({ contact: typeAdd, vip: vip, name: fullName, email: email, telephone: telNum, comment: comment});
		$("#editMessage11").append("Successfuly added!");
		event.target.selectType1.value = "";
		event.target.selectType2.value = "";
		event.target.contactsName.value = "";
		event.target.contactsEmail.value = "";
		event.target.telephoneNumber.value ="";
		event.target.newContactComment.value ="";
	},
	
	"submit #submitEditedAddress": function (event) {

		event.preventDefault();
		var temp = Session.get("address");
		var typeAdd = event.target.selectType1.value;
		var vip = event.target.selectType2.value;
		var fullName = event.target.contactsName.value;
		var email = event.target.contactsEmail.value;
		var telNum = event.target.telephoneNumber.value;
		var comment = event.target.newContactComment.value;
		alert(event.target.newContactComment.value);
		Addresses.update({ _id:temp},  { contact: typeAdd, vip: vip, name: fullName, email: email, telephone: telNum, comment: comment});
		$("#editMessage12").append("Successfuly edited!");
	},
	
	"click #editAddress": function(event) {
		$("#editMessage12").text("");
		var temp = Session.get("address");
		var x = Addresses.findOne({ _id: temp });
	},
	
	"click #closeBtnAddress1":function() {
		$("#editMessage11").text("");
	},

	"click #closeBtnAddress2":function() {
		$("#editMessage12").text("");
	},

	"click #footer4Btn6": function() {
		Addresses.remove({ _id: Session.get("address")});
	},

	"click #footer4Btn7": function() {
		Session.set("address", null)
	}
});

