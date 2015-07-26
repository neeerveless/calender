function XMLHttpRequestCreate(){
  /*
   * XMLHttpRequest オブジェクトを作成
   */
  try{
    return new XMLHttpRequest();
  }catch(e){}
  /*
   * IE用
   */
  try{
    return new ActiveXObject('MSXML2.XMLHTTP.6.0');
  }catch(e){}
  try{
    return new ActiveXObject('MSXML2.XMLHTTP.3.0');
  }catch(e){}
  try{
    return new ActiveXObject('MSXML2.XMLHTTP');
  }catch(e){}
  // 未対応
  return null;
}
/*
 * urlからのレスポンスが来たらリロード
 */
function listen(xhr, url){
  xhr.open('POST', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 3 && xhr.status == 200) {
      drawWeather(xhr.responseText);
      console.log(parseJson(xhr.responseText));
    }
  }
  xhr.send(null);
}

$(document).ready(function() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': $("#place").text(), 'language': 'ja'}, onGetLatLngListener);
});

function onGetLatLngListener(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    latLng = results[0].geometry.location;
    getWeather(latLng.lat(), latLng.lng());
  } else {
    console.log("error1");
  }
}

function getWeather(lat, lng) {
  var url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lng + "&mode=json&cnt=17";
  var xhr = XMLHttpRequestCreate();
  listen(xhr, url);
}

function drawWeather(jsonObj) {
  var json = parseJson(jsonObj);
  json.list.forEach(function(element, index, array) {
    console.log(new Date(element.dt*1000).getFullYear());
    console.log(new Date(element.dt*1000).getMonth()+1);
    console.log(new Date(element.dt*1000).getDate());
    console.log(new Date(element.dt*1000).getHours());
    console.log(new Date(element.dt*1000).getMinutes());
    console.log(new Date(element.dt*1000).getSeconds());
  });
  console.log(json.list[1].dt);
  console.log(new Date(2015,7-1,27).getTime());
}

function parseJson(jsonObj) {
  return JSON.parse(jsonObj);
}

// var ajax = function(url) {
//   this.url = url;
//   this.xhr = this.createXMLHttpRequest();
// };
//
// ajax.prototype = {
//   createXMLHttpRequest: function() {
//     /*
//      * XMLHttpRequest オブジェクトを作成
//      */
//     try{
//       console.log(215);
//       return new XMLHttpRequest();
//     }catch(e){}
//     /*
//      * IE用
//      */
//     try{
//       return new ActiveXObject('MSXML2.XMLHTTP.6.0');
//     }catch(e){}
//     try{
//       return new ActiveXObject('MSXML2.XMLHTTP.3.0');
//     }catch(e){}
//     try{
//       return new ActiveXObject('MSXML2.XMLHTTP');
//     }catch(e){}
//     console.log(222);
//     // 未対応
//     return null;
//   },
//   request: function() {
//     this.xhr.open('POST', this.url, true);
//     this.xhr.onreadystatechange = function() {
//       if (this.xhr.readyState == 3 && this.xhr.status == 200) {
//         console.log(1111);
//       }
//     }
//     this.xhr.send(null);
//   }
// };
