window.onload = init;
function init(){
    const map = new ol.Map({
        view: new ol.View({
            center: [129140.13112790146,5067412.695760445],
            zoom: 14,
            // rotation: 0.5, extent, projection
        }),
        /*layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],*/
        target: "js-map"
    })
    /*map.on('click', function(e) {
        console.log(e.coordinate);
    })*/
    
    // Basemaps Layers
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: 'OSMStandard'
    })

    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'OSMHumanitarian'
    })
    const stamenTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
            attibutions:  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: false,
        title: 'StamenTerrain'
    })
    // layer group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openStreetMapStandard, openStreetMapHumanitarian, stamenTerrain
        ]
    })
    map.addLayer(baseLayerGroup);
// Layer Switcher Logic for Basemaps
const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]' );
for(let baseLayerElement of baseLayerElements){
   baseLayerElement.addEventListener('change', function(){
       let baseLayerElementValue = this.value;
       baseLayerGroup.getLayers().forEach(function(element, index, array){
       let baseLayerTitle = element.get('title');
        element.setVisible(baseLayerTitle === baseLayerElementValue); //turn visibyliry of the lAYER TO TRUE
   //console.log('baseLayerTitle:' + baseLayerTitle, 'baseLayerElementValue: ' + baseLayerElementValue)    
        })
        })
    }

// Vector Layers
const fillStyle = new ol.style.Fill({
    color: [84, 118, 255, 1]
})

const strokeStyle = new ol.style.Stroke({
    color: [46, 45, 45, 1],
    width: 1.2
})
const circleStyle = new ol.style.Circle({
    fill: new ol.style.Fill({
       color: [245, 49, 5, 1] 
    }),
    radius: 7,
    stroke: strokeStyle
})
const MontblancGeoJSON = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: './data/vector_data/map_montblanc.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title: 'MontblancGeoJSON',
    style: new ol.style.Style({
        fill: fillStyle,
        stroke: strokeStyle,
        image: circleStyle,
    })
})
map.addLayer(MontblancGeoJSON)

// Vector Feature Pouo Logic
const overlayContainerElement = document.querySelector('.overlay-container');
const overlayLayer = new ol.Overlay({
    element: overlayContainerElement
})
map.addOverlay(overlayLayer);
const overlayFeatureName = document.getElementById('feature-name');
const overlayFeatureAdditionInfo = document.getElementById('feature-additional-info');

map.on('click', function(e){
    overlayLayer.setPosition(undefined); // desapareix popup if click out
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){    
       let clickedCoordinate = e.coordinate;
       let clickedFeatureName = feature.get('name');
       let clickedFeatureAdditionalInfo = feature.get('additionalinfo');
       overlayLayer.setPosition(clickedCoordinate);
       overlayFeatureName.innerHTML = clickedFeatureName;
       overlayFeatureAdditionInfo.innerHTML = clickedFeatureAdditionalInfo;
   },
   {
       layerfilter: function(layerCandidate){
           return layerCandidate.get('title') === 'MontblancGeoJSON'
       }
   })
})
}

