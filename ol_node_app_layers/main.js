import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import Group from 'ol/layer/Group';

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
      }),
      new TileLayer({
        source: new OSM()
      })
     ]
    })],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

