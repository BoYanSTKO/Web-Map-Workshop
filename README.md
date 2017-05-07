# Web Map Tutorial
## Preliminary
Since we are only dealing with client side in this case, we will need to prepare our HTML page, CSS and JavaScript code. HTML, which stands for Hypertext Markup Language, is a standard markup language for creating webpages which show texts, forms, images and some interactive elements. JavaScript is a scripting language which is usually used in addition to HTML to change the behavior and content of the webpages. CSS is used to define the style and layout of the webpages.
### Setting up
First, let's create a default HTML page to show our webmap. Create an empty file using your favorate text editor and name it "index.html". You can copy the content below into your "index.html" or you can download the file [here](index.html "index.html").
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>US Population Density Map</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" integrity="sha512-07I2e+7D8p6he1SIM+1twR5TIrhUQn9+I6yjqD53JQjFiMf8EtC93ty0/5vJTZGF8aAocvHYNEDJajGdNx1IsQ==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js" integrity="sha512-A7vV8IFfih/D732iSSKi20u/ooOfj/AGehOKq0f4vLT1Zr2Y+RX7C+w8A1gaSasGtRUZpF/NZgzSAu4/Gc41Lg==" crossorigin=""></script>
    <script src="https://mapzen.com/tangram/tangram.min.js"></script>
    <style>
      #mapid {
        height: 100%;
        width: 100%;
        position: absolute;
      }
      html,body{margin: 0; padding: 0;}
    </style>
  </head>
  <body>
    <div id="mapid"></div>
    <script src="map.js"></script>
  </body>
</html>
```
There are a lot of information in this code. 
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" integrity="sha512-07I2e+7D8p6he1SIM+1twR5TIrhUQn9+I6yjqD53JQjFiMf8EtC93ty0/5vJTZGF8aAocvHYNEDJajGdNx1IsQ==" crossorigin=""/>
``` 
tells the page to include the style sheet defined in the Leaflet library so that the map styles and components can be displayed correctly. 
```html
<script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js" integrity="sha512-A7vV8IFfih/D732iSSKi20u/ooOfj/AGehOKq0f4vLT1Zr2Y+RX7C+w8A1gaSasGtRUZpF/NZgzSAu4/Gc41Lg==" crossorigin=""></script>
``` 
tells the page to include the Leaflet JavaScript file so that we can use the methods provided by the library in our JavaScript code.
```html
<script src="https://mapzen.com/tangram/tangram.min.js"></script>
```
tells the page to include [Tangram](https://mapzen.com/documentation/tangram/ "Tangram") JavaScript API. This API differs from the Leaflet API in that it will render 2D or 3D maps from vector files. It can also access various predefined [basemap styles](https://mapzen.com/documentation/cartography/styles/ "styles") provided by [Mapzen](https://mapzen.com/ "Mapzen"). You will also be able to [customize your map styles](https://mapzen.com/documentation/tangram/walkthrough/ "Tangram") and use the customized basemap.
```html
<style>
  #mapid {
    height: 100%;
    width: 100%;
    position: absolute;
  }
  html,body{margin: 0; padding: 0;}
</style>
```
defines the styles for this html page. The map content will be displayed on the whole page and there will be no margin and no padding on the page.
```html
<body>
  <div id="mapid"></div>
  <script src="map.js"></script>
</body>
```
tells the page that "mapid" is the id for the map content and the html page will look for the "map.js" javascript file. This is the file that we will be editing to do all the web mapping magic.
### Choosing basemap
You can download the simplistic example JavaScript file [here](map.js "example").

## About
This is a brief tutorial for web mapping using [Mapzen](https://mapzen.com/products/maps/ "Mapzen") API presented on May 11th, 2017 during the weekly meeting of the Geography Club at UCSB. The purpose of this tutorial is to introduce the state-of-the-art web mapping technologies to students who are unfamiliar with web mapping. It is based on the [Leaflet tutorials](http://leafletjs.com/examples.html "leaflet").
## Credits
[Bo Yan](https://github.com/BoYanSTKO "Bo Yan")

PhD student in [STKO Lab](http://stko.geog.ucsb.edu "STKO") in the [Department of Geography](http://geog.ucsb.edu "geog") at [UC Santa Barbara](http://www.ucsb.edu/ "UCSB")
