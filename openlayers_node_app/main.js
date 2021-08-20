import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({   // https://openlayers.org/en/latest/apidoc/module-ol_View-View.html
    center: [
      227810.49788941635,
      5061015.614808859
  ],
    zoom: 9
  })
});

 // get coordinates x,y
map.on('click', function(e){
  alert(e.coordinate)
})