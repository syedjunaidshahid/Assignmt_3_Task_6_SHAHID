require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/renderers/SimpleRenderer",
  "esri/PopupTemplate",
  "dojo/domReady!"
], function(Map, MapView, FeatureLayer, SimpleMarkerSymbol, SimpleRenderer, PopupTemplate) {

  // Create a FeatureLayer for traffic collisions
  var fl = new FeatureLayer({
    url: "https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Traffic_Collisions/FeatureServer",
    outFields: ["*"],

    // Define a popup template
    popupTemplate: new PopupTemplate({
      title: "What Happened?",
      content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "CollisnTyp",
          label: "Collision Type",
          visible: true
        }]
      }]
    }),

    // Define a renderer to change symbology
    renderer: new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        style: "square",
        color: "blue",
        size: 8,
        outline: {
          color: "white",
          width: 1
        }
      })
    })
  });

  // Creating a map with the streets basemap
  var map = new Map({
    basemap: "streets",
    layers: [fl] // Add the FeatureLayer to the map
  });

  // Creating a MapView with an extent centered around California
  var view = new MapView({
    container: "viewDiv",
    map: map,
    extent: {
      xmin: -118.264858634618,
      ymin: 33.5444932701483,
      xmax: -117.299011374275,
      ymax: 35.0054716855699,
      spatialReference: 4326
    }
  });
});
