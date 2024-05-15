let myLatLng = { lat: 27.8999801, lng: -102.8751215 };
let mapOptions = {
    center: myLatLng,
    zoom: 5.8,

    mapTypeId: google.maps.MapTypeId.ROADMAP
};

let map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);


let directionsService = new google.maps.DirectionsService();

let directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

function calcRoute() {

    let request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }


    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            let output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>Desde: " + document.getElementById("from").value + ".<br />Hasta: " + document.getElementById("to").value + ".<br /> Distancia a recorrer <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duración <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            overlay.style.display = "block";
            overlay.addEventListener("click", function() {
                overlay.style.display = "none";
                output.innerHTML = "";
            })
            var alertDiv = output.querySelector(".alert-info");
            alertDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            alertDiv.style.color = "white";
            alertDiv.style.padding = "10px";
            directionsDisplay.setDirections(result);

        } else {
            directionsDisplay.setDirections({ routes: [] });
            map.setCenter(myLatLng);
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Ingrese de nuevo los datos.</div>";
            overlay.style.display = "block";

            overlay.addEventListener("click", function() {
                overlay.style.display = "none";
                output.innerHTML = ""; // Limpiar contenido del output
            });
            var alertDiv = output.querySelector(".alert-danger");
            alertDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            alertDiv.style.color = "white";
            alertDiv.style.padding = "10px";
        }
    });
}
var output = document.getElementById("output");
var overlay = document.getElementById("overlay");







let options = {
    types: ['(cities)']
}

let input1 = document.getElementById("from");
let autocomplete1 = new google.maps.places.Autocomplete(input1, options);

let input2 = document.getElementById("to");
let autocomplete2 = new google.maps.places.Autocomplete(input2, options);
