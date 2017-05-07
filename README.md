# Web Mapping Workshop
## Preliminary
Since we are only dealing with client side in this case, we will need to prepare our HTML page, CSS and JavaScript code. HTML, which stands for Hypertext Markup Language, is a standard markup language for creating webpages which show texts, forms, images and some interactive elements. JavaScript is a scripting language which is usually used in addition to HTML to change the behavior and content of the webpages. CSS is used to define the style and layout of the webpages.
### Setting up
First, let's create a default HTML page to show our webmap. Create an empty file using your favorate text editor and name it "index.html". You can copy the content below into your "index.html".
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>US Population Density Map</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">
    <script src="https://mapzen.com/js/mapzen.min.js"></script>
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
<link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">
``` 
tells the page to include the style sheet defined in the Mapzen library so that the map styles and components can be displayed correctly. 
```html
<script src="https://mapzen.com/js/mapzen.min.js"></script>
``` 
tells the page to include the Mapzen JavaScript file so that we can use the methods provided by the library in our JavaScript code.
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

## About
This is a brief tutorial for web mapping using [Mapzen](https://mapzen.com/products/maps/ "Mapzen") API presented on May 11th, 2017 during the weekly meeting of the Geography Club at UCSB. The purpose of this tutorial is to introduce the state-of-the-art web mapping technologies to students who are unfamiliar with web mapping. It is based on the [Leaflet tutorials](http://leafletjs.com/examples.html "leaflet").
## Credits
[Bo Yan](https://github.com/BoYanSTKO "Bo Yan")

PhD student in [STKO Lab](http://stko.geog.ucsb.edu "STKO") in the [Department of Geography](http://geog.ucsb.edu "geog") at [UC Santa Barbara](http://www.ucsb.edu/ "UCSB")
