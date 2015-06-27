---
---
;{% include js/jquery.min.js %}

var SITE_PROP_LIB = {
  baseURL: {% raw %}"{{site.baseurl}}"{% endraw %}
}

var AnnaPostMap = function (){
  this.map;
  this.data = {
    type: 'FeatureCollection',
    features: [
      {% for post in site.posts %}{
        'type': 'Feature',
        'properties': {
          title: '{{ post.title }}',
          image: processImageLink(('{{post.image }}'),
          link: '{{site.baseurl}}{{post.url}}',
          teaser: '{{post.teaser}}',
          popupContent: '{{post.popupContent}}',
          date: '{{post.date}}'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            {{ post.lng }},
            {{ post.lat }}
          ]
        }
      },{% endfor %}
    ]
  };
  this._createMap();
}

function processImageLink = function(imageLink){
  console.log(imageLink.replace(SITE_PROP_LIB[baseURL], '{{site.baseURL}}'));
  return imageLink.replace(SITE_PROP_LIB[baseURL], '{{site.baseURL}}');
}

AnnaPostMap.prototype._createMap = function(){
  this.map = L.map( 'map', {
    center: [35.078770, 33.263956],
    zoom: 9,
    scrollWheelZoom: false
  });
  L.tileLayer( '{{ site.map-tileset }}', {
    scrollWheelZoom: false,
  }).addTo( this.map );
  console.log(this.data);
  this.geojson = L.geoJson(this.data, {
    onEachFeature: this._onEachFeature.bind(this)
  }).addTo( this.map );
  // this.map.fitBounds(this.geojson.getBounds());
};

AnnaPostMap.prototype._onEachFeature = function(feature, layer){
  // does this feature have a property named popupContent?
  console.log(feature);
  if (feature.properties && feature.properties.popupContent){
    console.log(this);
    var popupContent = this._generatePopupContent(feature);
    layer.bindPopup(popupContent);
  }
};

AnnaPostMap.prototype._generatePopupContent = function(feature){
  return "<div class='map-popup'>" +
            "<a href='" + feature.properties.link + "'>" +
              "<h3 class='title'>" + feature.properties.title + "</h3>" +
              "<h4 class='date'>" + feature.properties.date + "</h4>" +
              "<img src='" + feature.properties.image + "'/>" +
              "<p>" + feature.properties.teaser + "</p>" +
            "</a>" +
          "</div>";
};

(function(){
  var postMap = new AnnaPostMap();  
  console.log("HELLLLLLOOOO");
})();