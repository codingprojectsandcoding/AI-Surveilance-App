objects = [];
video = "";
status1 = "";
function preload() {
video = createVideo("video.mp4");
video.hide();
}
function setup() {
canvas = createCanvas(480, 380);
canvas.center();
}
function draw() {
image(video, 0, 0, 480, 380);
if (status1 != "") {
objectDetector.detect(video, gotResult);
for (i = 0; i < objects.length; i++) {
document.getElementById("status1").innerHTML = "Status - Objects Detected";
document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected Are -" + objects.length;
fill("#FF0000");
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent  + "%", objects[i].x + 10, objects[i].y + 10);
noFill();
stroke("#FF0000");
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}
}
function gotResult(error, results) {
if (error) {
console.log(error);
}
else {
console.log(results);
objects = results;
}
}
}
function start() {
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status1").innerHTML = "Status - Detecting Objects";
}
function modelLoaded() {
console.log("CoCoSSD Is Initialized");
status1 = true;
video.loop();
video.speed(1);
video.volume(0);
}