const text = "Smart Industries.";
const delay = 300;

window.addEventListener("load", (event) => {
    startTypingAnimation();
});

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        document.querySelector("#ht").innerHTML = text.substring(0, i + 1);
        setTimeout(function () {
            typeWriter(text, i + 1, fnCallback);
        }, delay);
    } else {
        fnCallback();
    }
}

function startTypingAnimation() {
    typeWriter(text, 0, function () {
        setTimeout(startTypingAnimation, 100000);
    });
}

$(function(){
    $("#navbar-industries").load("includes/navbar.html"); 
});