var map;
var directionsRenderer;
var directionsService = new google.maps.DirectionsService();
var dst;
var src;

function reRender() {
  var myTravelMode =
    (document.getElementById('TravelMode').value == 'DRIVING')
    ? google.maps.DirectionsTravelMode.DRIVING :
    google.maps.DirectionsTravelMode.WALKING;
  directionsService.route({
    origin: src,
    destination: dst,
    travelMode: myTravelMode,
  }, onGetRoute );
}

function onGetRoute(result, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    directionsRenderer.setDirections(result);
  } else {
    alert('ルート検索できませんでした');
  }
}

function putMarker(latLng, label) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    label: label || "",
  });
  marker.setMap(map);

  reRender();
}

$(document).ready(function() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': $("#place").text(), 'language': 'ja'}, onGetLatLngListener);
});

function drawMap(latLng) {
  var opts = {
    zoom: 16,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    scaleControl: true,
    navigationControlOptions: true,
    zIndex: 0
  };
  map = new google.maps.Map
    (document.getElementById("map_canvas"),opts);

  directionsRenderer = new google.maps.DirectionsRenderer ({
    map: map, suppressMarkers: true
  });
  putMarker(latLng, 'G');
}

function onGetLatLngListener(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    dst = results[0].geometry.location;
    drawMap(dst);
    getCurrentPosition();
  } else {
    console.log("error1");
  }
}

function getCurrentPosition() {
  if(navigator.geolocation){
    console.log("あなたの端末では、現在位置を取得することができます。");
    var opt = { "enableHighAccuracy": true };
    navigator.geolocation.getCurrentPosition(onSuccess,onError,opt);
  }else{
    console.log("あなたの端末では、現在位置を取得できません。");
  }
}

function onSuccess(position){
  src = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  putMarker(src, 'S');
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function onError(error){
  var errorMessage = {
    0: "原因不明のエラーが発生しました…。",
    1: "位置情報の取得が許可されませんでした…。",
    2: "電波状況などで位置情報が取得できませんでした…。",
    3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。",
  };
  console.log(errorMessage[error.code]);
}
