$(document).ready(function(){
 	console.log("ready");

 // Initialize Firebase
   var config = {
    apiKey: "AIzaSyCfFLf-le2syecAg9-IBIbmphNwz45jeD4",
    authDomain: "hannahjuddawesome.firebaseapp.com",
    databaseURL: "https://hannahjuddawesome.firebaseio.com",
    projectId: "hannahjuddawesome",
    storageBucket: "hannahjuddawesome.appspot.com",
    messagingSenderId: "621762104951"
  };
  firebase.initializeApp(config);

var db = firebase.database();

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


$("#currentTime").text(currentTime);


$("#submitButton").on("click", function(){
	console.log("submit button working");
	event.preventDefault();
	var trainName = $("#add-train").val().trim();
	var destination= $("#destination").val();
	var firstTrain = $("#firstTrain").val();
	var frequency = $("#frequency").val();

	db.ref("/schedule").push({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});
});


db.ref("schedule").on("child_added", function(snapshot){
	var data = snapshot.val();
	var frequency = data.frequency;
	var firstTime = data.firstTrain;
	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = diffTime % frequency;
    var MinutesTillTrain = frequency - remainder;
    var nextTrain = moment().add(MinutesTillTrain, "minutes");


	$("#table-body").append(`<tr><td>${data.trainName}</td><td>${data.destination}</td><td>${data.frequency}</td><td>${nextTrain}</td><td>${MinutesTillTrain}</td></tr>`)
});



	// this is the document.ready end bracket
});