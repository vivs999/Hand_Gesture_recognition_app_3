Webcam.set({
    height:300,
    width:350 ,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");

Webcam.attach('#camera');

function check(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/i1tkr2MkE/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speek_data = "The first prediction is "+prediction_1+"and the second prediction is "+prediction_2;
    var mutterThis = new SpeechSynthesisUtterance(speek_data);
    synth.speak(mutterThis);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion_1").innerHTML = results[0].label;
        document.getElementById("emotion_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label=="Ok"){
            document.getElementById("emoji_1").innerHTML = "&#128076;"
        }
        else if(results[0].label=="Thums Up"){
            document.getElementById("emoji_1").innerHTML = "&#128077;"
        }
        else if(results[0].label=="Victory"){
            document.getElementById("emoji_1").innerHTML = "&#9996;"
        }

        if(results[1].label=="Ok"){
            document.getElementById("emoji_2").innerHTML = "&#128076;"
        }
        else if(results[1].label=="Thums Up"){
            document.getElementById("emoji_2").innerHTML = "&#128077;"
        }
        else if(results[1].label=="Victory"){
            document.getElementById("emoji_2").innerHTML = "&#9996;"
        }

    }
}