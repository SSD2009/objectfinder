appstatus = "";
objects = [];
Video = "";
detector = "";
findobject = "";
speak_data = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
    Video = createCapture(VIDEO);
    Video.hide();
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(650, 300);
}

function draw() {
    image(Video, 0, 0, 400, 400);

    if (appstatus == true) {
        detector.detect(Video, gotresult);

        console.log(objects.length);
        r = random(255);
        g = random(255);
        b = random(255);

        for (i = 0; i < objects.length; i++) {
            console.log(findobject);
            console.log(objects[i].label);

            if (objects[i].label == findobject) {
                document.getElementById("status").innerHTML = "Status : " + findobject + " found";
                var synth = window.speechSynthesis;

                var utterThis = new SpeechSynthesisUtterance(speak_data);

                synth.speak(utterThis);
                
            }else{
                document.getElementById("status").innerHTML = "Status : " + findobject + " not found";
            }

            console.log(i);

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function modelLoaded() {
    console.log("Model loaded!");
    appstatus = true;
}

function surveillance() {
    findobject = document.getElementById("object").value;
    speak_data = findobject + " found";
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}