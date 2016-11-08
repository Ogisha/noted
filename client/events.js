Template.body.events({

	"click #notesButton1": function() {
		if ($("#note").is(":hidden")) {
			$("#note").toggleClass("hidden");
			$(".buttons").show("slow");
		}

		if ($(".notesList").is(":visible")) {
			$(".notesList").toggleClass("hidden");
			$(".btn2").hide();
		}
			
		if ($(".address").is(":visible")) {
			$(".address").toggleClass("hidden");
			$(".btn3").hide();
		}

		if ($("#favourites").is(":visible")) {
			$("#favourites").toggleClass("hidden");
			$(".btn4").hide();
		}
	},

	"click #notesButton2": function() {
		if ($(".notesList").is(":hidden")) {
			$(".notesList").toggleClass("hidden");
			$(".btn2").show("slow");
		}
		
		if ($("#note").is(":visible")) {
			$("#note").toggleClass("hidden");
			$(".buttons").hide();
		}
		
		if ($(".address").is(":visible")) {
			$(".address").toggleClass("hidden");
			$(".btn3").hide();
		}
		
		if ($("#favourites").is(":visible")) {
			$("#favourites").toggleClass("hidden");
			$(".btn4").hide();
		}
	},

	"click #notesButton3": function() {
		if ($(".address").is(":hidden")) {
			$(".address").toggleClass("hidden");
			$(".btn3").show("slow");
		}
		
		if ($("#note").is(":visible")) {
			$("#note").toggleClass("hidden");
			$(".buttons").hide();
		}
		
		if ($(".notesList").is(":visible")) {
			$(".notesList").toggleClass("hidden");
			$(".btn2").hide();
		}
		
		if ($("#favourites").is(":visible")) {
			$("#favourites").toggleClass("hidden");
			$(".btn4").hide();
		}
	},

	"click #notesButton4": function() {
		if ($("#favourites").is(":hidden")) {
			$("#favourites").toggleClass("hidden");
			$(".btn4").show("slow");
		}
		
		if ($("#note").is(":visible")) {
			$("#note").toggleClass("hidden");
			$(".buttons").hide();
		}
		
		if ($(".notesList").is(":visible")) {
			$(".notesList").toggleClass("hidden");
			$(".btn2").hide();
		}
		
		if ($(".address").is(":visible")) {
			$(".address").toggleClass("hidden");
			$(".btn3").hide();
		}
	},

	"click #vertBtn1": function() {
		$("#fontSettings").attr("class", "collapse");
		$("#databaseSettings").attr("class", "collapse");
		$("#languageSettings").attr("class", "collapse");
	},

	"click #vertBtn2": function() {
		$("#soundSettings").attr("class", "collapse");
		$("#databaseSettings").attr("class", "collapse");
		$("#languageSettings").attr("class", "collapse");
	},

	"click #vertBtn3": function() {
		$("#fontSettings").attr("class", "collapse");
		$("#soundSettings").attr("class", "collapse");
		$("#languageSettings").attr("class", "collapse");
	},

	"click #vertBtn4": function() {
		$("#fontSettings").attr("class", "collapse");
		$("#databaseSettings").attr("class", "collapse");
		$("#soundSettings").attr("class", "collapse");
	},

	"click .showOptions": function(event) {
		$(".hideOptions").removeClass("hidden");
		$(".showOptions").addClass("hidden");
		$("#section1").css("position", "absolute").animate({top: "0"}, 500).slideDown();
	},

	"click .hideOptions": function(event) {
		$(".hideOptions").addClass("hidden");
		$(".showOptions").removeClass("hidden");
		$("#section1").css("position", "inherit").animate({top: "-200%"}).slideUp();
	},

	"click .showInfo": function(event) {
		$(".hideInfo").removeClass("hidden");
		$(".showInfo").addClass("hidden");
		$("#section3").css("position", "absolute").animate({top: "0"}, 500).slideDown();
	},

	"click .hideInfo": function(event) {
		$(".hideInfo").addClass("hidden");
		$(".showInfo").removeClass("hidden");
		$("#section3").css("position", "inherit").animate({top: "-200%"}).slideUp();
	},

	"click #settingsYes": function(event) {
		if ($(".singleSetting").is(":hidden")) 
			$(".singleSetting").fadeIn(250).toggleClass("hidden");
	},

	"click #settingsNo": function(event) {
		$(".singleSetting").addClass("hidden");
	},

//  SOUND PROPERTIES

	"change #check1": function() {
			$("select").addClass("hidden2");
			$("#submitSound").removeClass("disabled");
			$("#resetSoundChangeBtn").removeClass("disabled");
	},

	"change #check2": function() {
			$("select").removeClass("hidden2");
			$("#submitSound").addClass("disabled");
	},

	"change select": function() {
			$("#submitSound").removeClass("disabled");
			$("#resetSoundChangeBtn").removeClass("disabled");
	},

	"submit #confirmSoundChangeBtn": function() {
			$("#submitSound").addClass("disabled");

			if ($("#check1").is(":checked")) {
				$("body").append("<audio id='sounds'></audio>");
				$("body").append("<audio id='sounds1'></audio>");
				alert("All your sounds have been successfully restored!");
				$("#submitSound").removeClass("disabled");
			}

			if ($("#check2").is(":checked")) {
				$("#submitSound").removeClass("disabled");

				if ($("#confirmSoundChangeBtn select").val() == "click") {
					$("#sounds").remove();
					alert("All the hovering/clicking sounds have been muted.");
				}

				if ($("#confirmSoundChangeBtn select").val() == "saved") {
					$("#submitSound").removeClass("disabled");
					$("#sounds1").remove();
					alert("All the note sounds have been muted.");
				}

				if ($("#confirmSoundChangeBtn select").val() == "allSounds") {
					$("#sounds").remove();
					$("#sounds1").remove();
					alert("All the program sounds have been muted.");
				}
			}
		return false;
	},

	"click #resetSoundChangeBtn": function(event) {
		$("#resetSoundChangeBtn").addClass("disabled");
		$("#submitSound").addClass("disabled");
		alert("All changes have been discarded.");
	},

	"mouseenter .sound": function() {
		$('#sounds').attr('src','blip.mp3');
		$('#sounds').prop("volume", .1);
		$('#sounds').get(0).play();
	},

	"click .sound": function() {
		$('#sounds').attr('src','button.mp3');
		$('#sounds').prop("volume", .5);
		$('#sounds').get(0).play();
	}
});
	
