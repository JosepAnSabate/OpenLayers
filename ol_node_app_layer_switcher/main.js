import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import Group from 'ol/layer/Group';
import ZoomSlider from 'ol/control/ZoomSlider'


const map = new Map({
  target: 'map',
  layers:  [new Group({
    'title': 'Base maps',
    layers: [
     // new TileLayer({
      new TileLayer({
        source: new Stamen({
          layer: 'watercolor',
        }),
        title: 'waterColor'
      }),
      new TileLayer({
        source: new OSM(),
        title: 'OSM'
      })
     ]
    })],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const baseLayerGroup = new Group({
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'watercolor',
      }),
      title: 'waterColor'
    }),
    new TileLayer({
      source: new OSM(),
      title: 'OSM'
    })
  ]
})
map.addLayer(baseLayerGroup);

// Layer Switcher Logic for Basemaps
const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
for(let baseLayerElement of baseLayerElements){
  baseLayerElement.addEventListener('change', function() {
   let baseLayerElementValue = this.value;
   baseLayerGroup.getLayers().forEach(function(element, index, array) {
     let baseLayerTitle = element.get(title);
     element.setVisible(baseLayerTitle === baseLayerElementValue);
     console.log('baseLayerTitle:' + baseLayerTitle, 'baseLayerElementValue: ' + baseLayerElementValue)
   })
})
}

//Añadimos un control de zoom 
map.addControl(new ZoomSlider()); 