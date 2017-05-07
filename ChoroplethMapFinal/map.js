// create map object, "mapid" is the element in the html file
var map = L.map("mapid");

// create a leaflet layer object, in this case, a tile layer
// we use the tile service provided by Mapzen and use
// Tangram to render the maps
var layer = Tangram.leafletLayer({
    scene: "https://mapzen.com/carto/bubble-wrap-style/bubble-wrap-style.zip",
    attribution: "<a href='https://mapzen.com/tangram' target='_blank'>Tangram</a> | &copy; OSM contributors | <a href='https://mapzen.com/' target='_blank'>Mapzen</a>"
});

// add layer to the map
layer.addTo(map);
map.setView([37.8, -96], 4);

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = "<h4>US Population Density</h4>" +  (props ?
    "<b>" + props.name + "</b><br />" + props.density + " people / mi<sup>2</sup>"
    : "Hover over a state");
};

info.addTo(map);


// get color depending on population density value
function getColor(d) {
  return d > 1000 ? "#d53e4f" :
         d > 500  ? "#fc8d59" :
         d > 200  ? "#fee08b" :
         d > 100  ? "#ffffbf" :
         d > 50   ? "#e6f598" :
         d > 20   ? "#99d594" :
                    "#3288bd";
}
function style(feature) {
  return {
    weight: 1,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.density)
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 2,
    color: "#666",
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  
  info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

geojson = L.geoJson(populationData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);
map.attributionControl.addAttribution("Population data &copy; <a href='http://census.gov/'>US Census Bureau</a>");


var legend = L.control({position: "bottomright"});

legend.onAdd = function (map) {

  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 20, 50, 100, 200, 500, 1000],
    labels = [],
    from, to;

  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      "<i style='background:" + getColor(from + 1) + "'></i> " +
      from + (to ? "&ndash;" + to : "+"));
  }

  div.innerHTML = labels.join("<br>");
  return div;
};

legend.addTo(map);

var scene = layer.scene;
var api_key = "mapzen-PvCT6iP";

// ensure there's an api key
scene.subscribe({
    load(event) {
        // Modify the scene config object here. This mutates the original scene
        // config object directly and will not be returned. Tangram does not expect
        // the object to be passed back, and will render with the mutated object.
        injectAPIKey(event.config, api_key);
    }
});


// API key enforcement

// regex to detect a mapzen.com url
var URL_PATTERN = /((https?:)?\/\/(vector|tile).mapzen.com([a-z]|[A-Z]|[0-9]|\/|\{|\}|\.|\||:)+(topojson|geojson|mvt|png|tif|gz))/;

function isValidMapzenApiKey(string) {
    return (typeof string === "string" && string.match(/[-a-z]+-[0-9a-zA-Z_-]{7}/));
}

function injectAPIKey(config, apiKey) {
    var didInjectKey = false;

    Object.keys(config.sources).forEach((key) => {

        var value = config.sources[key];
        var valid = false;

        // Only operate on the URL if it's a Mapzen-hosted vector tile service
        if (!value.url.match(URL_PATTERN)) return;

        // Check for valid API keys in the source.
        // First, check theurl_params.api_key field
        // Tangram.js compatibility note: Tangram >= v0.11.7 fires the `load`
        // event after `global` property substitution, so we don't need to manually
        // check global properties here.
        if (value.url_params && value.url_params.api_key &&
            isValidMapzenApiKey(value.url_params.api_key)) {
            valid = true;
            // Next, check if there is an api_key param in the query string
        } else if (value.url.match(/(\?|&)api_key=[-a-z]+-[0-9a-zA-Z_-]{7}/)) {
            valid = true;
        }
        if (!valid) {
            // Add a default API key as a url_params setting.
            // Preserve existing url_params if present.
            var params = Object.assign({}, config.sources[key].url_params, {
                api_key: apiKey
            });

            // turn off overlays for walkabout
            var params2 = Object.assign({}, config.global, {
                sdk_bike_overlay: false,
                sdk_path_overlay: false
            });

            // Mutate the original on purpose.
            config.sources[key].url_params = params;
            config.global = params2;

            didInjectKey = true;
        }
    });
    return didInjectKey;
}
