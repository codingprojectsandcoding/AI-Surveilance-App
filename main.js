status1 = "";
sound = "";
objects = [];
function setup() {
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380, 380);
video.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status - Detecting Objects";
}
function preload() {
sound = loadSound("iphone_alarm.mp3");
}
function draw() {
image(video, 0, 0, 380, 380);
r = random(255);
g = random(255);
b = random(255);
if (status1 != "") {
for (i=0; i<objects.length; i++) {
document.getElementById("status").innerHTML = "Status: Object Detected";
document.getElementById("number_of_objects").innerHTML = "Number of objects detected are -" + objects.length;
fill(r, g, b);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 12);
noFill();
stroke(r, g, b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if (objects[i].label == "person") {
document.getElementById("baby_status").innerHTML = "Baby Found";
sound.stop();
}
else {
    document.getElementById("baby_status").innerHTML = "Baby Not Found";
    sound.play();
}
}
if (objects.length == 0) {
    document.getElementById("baby_status").innerHTML = "Baby Not Found";
    sound.play();
    
}
}
}
function modelLoaded() {
console.log(" Cocossd Is Initialized");
status1 = true;
objectDetector.detect(video, gotResult);
}
function gotResult(error, results) {
if (error) {
console.error(error);
}
else {
console.log(results);
objects = results;
}
}