if (Meteor.isClient) {

	Template.body.events({

		//  SHOW/HIDE SIDE MENUS

	"click .showOptions": function(event) {
		$(".hideOptions").removeClass("hidden");
		$(".showOptions").addClass("hidden");
		$("#section1").css("position", "absolute").animate({top: "0"}, 1500);
	},

	"click .hideOptions": function(event) {
		$(".hideOptions").addClass("hidden");
		$(".showOptions").removeClass("hidden");
		$("#section1").css("position", "inherit").animate({top: "-50%"});
	},

	"click .showInfo": function(event) {
		$(".hideInfo").removeClass("hidden");
		$(".showInfo").addClass("hidden");
		$("#section3").css("position", "absolute").animate({top: "0", right: "0"}, 1500);
	},

	"click .hideInfo": function(event) {
		$(".hideInfo").addClass("hidden");
		$(".showInfo").removeClass("hidden");
		$("#section3").css("position", "inherit").animate({top: "-50%"});
	},

		//

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

	"click #resetSoundChangeBtn": function() {
				$("#resetSoundChangeBtn").addClass("disabled");
				$("#submitSound").addClass("disabled");
				alert("All changes have been discarded.");
	}

		//
});
	
}