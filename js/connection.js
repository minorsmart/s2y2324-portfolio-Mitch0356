$(document).ready(function () {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?id=2759661&appid=a12cbb39ac5de9c27821c4d4f1dddba3',
        method: 'GET',
        success: function (response) {
            console.log(response);
            document.getElementById('temp').innerHTML = Math.round(parseFloat(response.main.temp) - 273.15);
            document.getElementById('place').innerHTML = response.name;
            weather = document.getElementById('weather');
            var description = response.weather[0].description;
            if (description.indexOf('rain') > 0) {
                description = 'Regen';
            } else if (description.indexOf('cloud') > 0) {
                description = 'Bewolkt';
            } else if (description.indexOf('sunny') > 0) {
                description = 'Zonnig';
            }
            document.getElementById('status').innerHTML = description;
        },
        error: function (error) {
            console.log(error);
        }
    });
});


$(document).ready(function () {
    const currentDate = new Date().toISOString().slice(0, 10);
    $("#input-day").attr("min", "1995-06-16");
    $("#input-day").attr("max", currentDate);
    $("#weather-button").click(function () {
        var city = $("#input-city").val()
        if (city) {
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a12cbb39ac5de9c27821c4d4f1dddba3',
                method: 'GET',
                success: function (response) {
                    console.log(response);
                    $("#temp").html(Math.round(parseFloat(response.main.temp) - 273.15));
                    $("#place").html(response.name);
                    weather = document.getElementById('weather');
                    var description = response.weather[0].description;
                    if (description.indexOf('rain') > 0) {
                        description = 'Regen';
                    } else if (description.indexOf('cloud') > 0) {
                        description = 'Bewolkt';
                    } else if (description.indexOf('sunny') > 0) {
                        description = 'Zonnig';
                    }

                    $("#status").html(description);
                    $("#city-name").html(response.name);
                    $("#input-city").attr("placeholder", response.name);
                    $("#input-city").val("")
                },
                error: function (error) {
                    alert("Stad niet gevonden.");
                }
            });
        } else {
            alert("Misschien iets invullen?");
        }
    });
    //


    $("#nasa-button").click(function () {
        var date = $("#input-day").val()
        if (date && date <= currentDate) {
            $.ajax({
                url: "https://api.nasa.gov/planetary/apod?api_key=bsPRpZDc6DamuGnYCn9bHa5cbKr5gqjxVKafECXQ&date=" + date + "",
                method: 'GET',
                success: function (response) {
                    $("#nasa-title").html(response.title);
                    $("#nasa-content").html(response.explanation);
                    $("#small-date").html(response.date);
                    if (response.media_type === "image") {
                        $("#content-container").html(`
                            <img src="` + response.url + `" class="img-fluid rounded-top" alt="` + response.title + `" />
                        `);
                    } else {
                        $("#content-container").html(`
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="` + response.url + `"></iframe>
                            </div>
                        `);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        } else {
            alert("Misschien iets invullen of iets goeds invullen?");
        }
    });
});

$(function(){
    $("#navbar-industries").load("includes/navbar.html"); 
});
