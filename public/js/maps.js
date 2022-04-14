"use strict"

var latitude = document.getElementById("latitude"); 
var longitude = document.getElementById("longitude"); 

var validLatitude = 46.813878;
var validLongitude = -71.207981;

if(latitude && latitude.value != null && latitude.value != 120)
    validLatitude = document.getElementById("latitude").value;

if(longitude && longitude.value != null && longitude.value != 120)
    validLongitude = document.getElementById("longitude").value;

$('#us2').locationpicker({
    location: {
        latitude: validLatitude,
        longitude: validLongitude
    },
    radius: 300,
    inputBinding: {
        latitudeInput: $('#us2-lat'),
        longitudeInput: $('#us2-lon')
    },
    enableAutocomplete: true,
    autocompleteOptions: {
        types: ['(cities)'],
        componentRestrictions: {country: 'ca'}
    },
    onchanged: function (currentLocation, radius, isMarkerDropped) {
        let mapContext = $(this).locationpicker('map');
        $('#coordinates').val(`${mapContext.location.latitude},${mapContext.location.longitude}`)
    }
});