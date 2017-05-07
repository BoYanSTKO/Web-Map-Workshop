// create map object, "mapid" is the element in the html file
var map = L.map('mapid');

// create a leaflet layer object, in this case, a tile layer
// we use the tile service provided by Mapzen and use
// Tangram to render the maps
var layerBubbleStyle = Tangram.leafletLayer({
    scene: "scene"
    attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
});

// add layer to the map
layer.addTo(map);

var scene = layer.scene;
var api_key = "your api key";

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
  return (typeof string === 'string' && string.match(/[-a-z]+-[0-9a-zA-Z_-]{7}/));
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
                sdk_bike_overlay : false,
                sdk_path_overlay : false
            });

            // Mutate the original on purpose.
            config.sources[key].url_params = params;
            config.global = params2;

            didInjectKey = true;
        }
    });
    return didInjectKey;
}
