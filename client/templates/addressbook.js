var text1 = "Manage settings"; var splitText11 = text1.split("");
var text2 = "Collapse settings"; var splitText22 = text2.split("");
var text3 = "Save new contact"; var splitText33 = text3.split("");
var text4 = "Edit this contact"; var splitText44 = text4.split("");
var text5 = "Delete this contact"; var splitText55 = text5.split("");
var text6 = "Deselect"; var splitText66 = text6.split("");
var text7 = "Show info";  var splitText77 = text7.split("");
var text8 = "Collapse section";  var splitText88 = text8.split("");
var text9 = "Reset comment";  var splitText99 = text9.split("");
var text10 = "Save comment";  var splitText100 = text10.split("");
var text11 = "Add/edit comment";  var splitText111 = text11.split("");
var x1 = 0;
		
function typing(splitText) {
			
	var br = 0;
	x1 = setInterval(function() {
		$(".textInput").append(splitText[br]);
		br++;

		if (splitText.length == br)
			clearInterval(x1);
	},10);
}


Template.addressbook.helpers({

	"returnAll": function() {
		
		return Addresses.find({}, { sort: { name: 1}});
	},

	"editCheck": function() {
		var temp = Session.get("address");
		var temp2 = this._id;
		if (temp == this._id) 
			return true;
		else 
			return false;
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
	},
		
	"returnVip": function() {
		var temp = Session.get("address");
		var tempVar = Addresses.findOne({ _id: temp });
		if (this.vip == "yes") 
			return true;
		else 
			return false;
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
});

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
		$(e.target).parent().parent().toggleClass("hidden");//form
		$(e.target).parent().parent().prev().children().toggleClass("hidden"); //comm4
		$(e.target).parent().parent().prev().prev().prev().toggleClass("hidden"); //name
		$(e.target).parent().parent().prev().prev().toggleClass("hidden");
	},

	"click .comm6": function(e) {
		$(e.target).parent().next().val("");
	},

	"submit #addressbookComment": function(e) {
		var temp = Session.get("address");
		e.preventDefault();
		Addresses.update({ _id: temp}, { $set: {comment: e.target.commentBox.value} });
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

	"click #footer4Btn5": function() {
		Addresses.remove({ _id: Session.get("address")});
	},

	"click #footer4Btn6": function() {
		Session.set("address", null)
	},

	"mouseleave .jq-mouseleave":function() {
		$(".textInput").text("TASK: ");
		clearInterval(x1);
	},
		
	"mouseenter #footer4Btn1": function(event) {
		clearInterval(x);
		typing(splitText11);
	},

	"mouseenter #footer4Btn2": function(event) {
		clearInterval(x);
		typing(splitText22);
	},

	"mouseenter #footer4Btn3": function(event) {
		clearInterval(x1);
		typing(splitText33);
	},

	"mouseenter #footer4Btn4": function(event) {
		clearInterval(x1);
		typing(splitText44);
	},

	"mouseenter #footer4Btn5": function(event) {
		clearInterval(x1);
		typing(splitText55);
	},

	"mouseenter #footer4Btn6": function(event) {
		clearInterval(x1);
		typing(splitText66);
	},
		
	"mouseenter #footer4Btn7": function(event) {
		clearInterval(x1);
		typing(splitText77);
	},

	"mouseenter #footer4Btn8": function(event) {
		clearInterval(x1);
		typing(splitText88);
	},

	"mouseenter .comm4": function(event) {
		clearInterval(x1);
		typing(splitText111);
	},

	"mouseenter .comm6": function(event) {
		clearInterval(x1);
		typing(splitText99);
	},

	"mouseenter .clicked": function(event) {
		clearInterval(x1);
		typing(splitText100);
	}
});