datum = new Date();
var letters = 160;
var note = "";


var text1 = "Create new note"; var splitText1 = text1.split("");
var text2 = "View the saved notes"; var splitText2 = text2.split("");
var text3 = "View the Addressbook"; var splitText3 = text3.split("");
var text4 = "View your bookmarks"; var splitText4 = text4.split("");
var text5 = "Expand working space"; var splitText5 = text5.split("");
var text6 = "Expand Header"; var splitText6 = text6.split("");
var text7 = "Manage settings";  var splitText7 = text7.split("");
var text8 = "Collapse settings";  var splitText8 = text8.split("");
var text9 = "Save this note";  var splitText9 = text9.split("");
var text10 = "Reset current note";  var splitText10 = text10.split("");
var text11 = "Show info";  var splitText11 = text11.split("");
var text12 = "Collapse section";  var splitText12 = text12.split("");
var text13 = "Delete selected note";  var splitText13 = text13.split("");
var text14 = "View the selected note";  var splitText14 = text14.split("");
var text15 = "Deselect note";  var splitText15 = text15.split("");
var text16 = "Expand/Collapse list";  var splitText16 = text16.split("");

//  FUNCTION:Typing

var x = 0;
		
function typing(splitText) {
			
	var br = 0;
	x = setInterval(function() {
		$(".textInput").append(splitText[br]);
		br++;

		if (splitText.length == br)
			clearInterval(x);
	},10);
}

//  FUNCTION: end


Template.body.events({

	"mouseleave .jq-mouseleave":function() {
		$(".textInput").text("TASK: ");
		clearInterval(x);
	},
		
	"mouseenter #notesButton1": function(event) {
		clearInterval(x);
		typing(splitText1);
	},

	"mouseenter #notesButton2": function(event) {
		clearInterval(x);
		typing(splitText2);
	},

	"mouseenter #notesButton3": function(event) {
		clearInterval(x);
		typing(splitText3);
	},

	"mouseenter #notesButton4": function(event) {
		clearInterval(x);
		typing(splitText4);
	},

	"mouseenter #notesButton5": function(event) {
		clearInterval(x);
		typing(splitText5);
	},

	"mouseenter #notesButton6": function(event) {
		clearInterval(x);
		typing(splitText6);
	},
		
	"mouseenter #footerBtn1": function(event) {
		clearInterval(x);
		typing(splitText7);
	},

	"mouseenter #footerBtn2": function(event) {
		clearInterval(x);
		typing(splitText8);
	},

	"mouseenter #footerBtn3": function(event) {
		clearInterval(x);
		typing(splitText9);
	},

	"mouseenter #footerBtn4": function(event) {
		clearInterval(x);
		typing(splitText10);
	},

	"mouseenter #footerBtn5": function(event) {
		clearInterval(x);
		typing(splitText11);
	},

	"mouseenter #footerBtn6": function(event) {
		clearInterval(x);
		typing(splitText12);
	},

	"mouseenter #footer2Btn1": function(event) {
		clearInterval(x);
		typing(splitText7);
	},

	"mouseenter #footer2Btn2": function(event) {
		clearInterval(x);
		typing(splitText8);
	},

	"mouseenter #footer2Btn5": function(event) {
		clearInterval(x);
		typing(splitText11);
	},

	"mouseenter #footer2Btn6": function(event) {
		clearInterval(x);
		typing(splitText12);
	},

	"click #footerBtn4": function(event) {
		$("textarea").val("");
			letters = 160;
			$("#ni4").html("<i>Maximum characters allowed: <strong>" + letters + "</strong></i>");
	},

	"click #footerBtn3": function(event) {
		note = $("textarea").val();
			NotesList.insert({ note: note, createdBy: Meteor.userId(), month: month, day: date1, hour: hours, minutes: minutes });
			$("textarea").val("");
			letters = 160;
			$("#ni4").html("<i>Maximum characters allowed: <strong>" + letters + "</strong></i>");

			$(".pin").toggleClass("hidden");
			$('#sounds1').attr('src','chain.mp3');
			$('#sounds1').prop("volume", 1);
			$('#sounds1').get(0).play();

			var success = "Saved Successfully!";
			var splitSuccess = success.split("");

			var br1 = 0;
			 var x1 = setInterval(function() {
				$("#success").append(splitSuccess[br1]);
				br1++;
							
				if (splitSuccess.length == br1)
					clearInterval(x1);
			},75);
		},

		"keydown textarea": function(event) {
			letters--;
			
			if (letters > 0) 
				$("#ni4").html("<i>Maximum characters allowed: <strong>" + letters + "</strong></i>");
				
			else if (letters <= 0) {
				$("#ni4").html("Maximum characters allowed: " +  "<span style='background:red;padding-left:2%;padding-right:2%;'>0</span>");
				alert("Maximum length reached! The following note can be saved: ");
				alert($("textarea").val());
			}

		},

		"focus textarea":function() {

			if ($(".pin").is(":visible")) {
				$(".pin").toggleClass("hidden");
				$("#success").empty();
			}
		
			$("#ni3").html("<i>Time:</i> " + sat);
	},
		
		"blur textarea":function() {
			$("#ni3").text("Time: ");

		},

		"mouseover #olderFa":function(event) {
			clearInterval(x);
		typing(splitText16);
			$("#olderFa").css("color", "red");
		},

		"mouseout #olderFa":function(event) {
			$("#olderFa").css("color", "black");
		},

		"mouseover #todayFa":function(event) {
			clearInterval(x);
		typing(splitText16);
			$("#todayFa").css("color", "red");
		},

		"mouseout #todayFa":function(event) {
			$("#todayFa").css("color", "black");
		},

		"click #todayFa":function(event) {
			$(".ul1").fadeToggle("slow");
		},

		"click #olderFa":function(event) {
			$(".ul2").fadeToggle("slow");
		},

/*
		$(".notesList").on("mouseover", "#olderFa", function() {
		
			$("#olderFa").css("color", "red");
		}).on("mouseleave", "#olderFa", function() {
		
			$("#olderFa").css("color", "black");
		});
		
		
		$(".notesList").on("click", "#todayFa", function() {
			$(".ul1").fadeToggle("slow");
		});
		
		$(".notesList").on("click", "#olderFa", function() {
			$(".ul2").fadeToggle("slow");
		});

*/

/*
	$("#footerBtn4").click(function() {
			$("textarea").val("");
			letters = 160;
			$("#ni4").html("<i>Maximum characters allowed: <strong>" + letters + "</strong></i>");
		});*/
/*
		$("#dugmad1").on("click", "#footerBtn3", function(event) {
			note = $("textarea").val();
			NotesList.insert({ note: note, createdBy: Meteor.userId(), month: month, day: date1, hour: hours, minutes: minutes });
			$("textarea").val("");
			letters = 160;
			$("#ni4").html("<i>Maximum characters allowed: <strong>" + letters + "</strong></i>");

			$(".pin").toggleClass("hidden");
			$('#sounds1').attr('src','chain.mp3');
			$('#sounds1').prop("volume", 1);
			$('#sounds1').get(0).play();

			var success = "Saved Successsfully!";
			var splitSuccess = success.split("");

			var br1 = 0;
			x1 = setInterval(function() {
				$("#success").append(splitSuccess[br1]);
				br1++;
							
				if (splitSuccess.length == br1)
					clearInterval(x1);
			},75);
			
		});
*/
});
	
