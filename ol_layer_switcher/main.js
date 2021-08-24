window.onload = init;
function init(){
    const map = new ol.Map({
        view: new ol.View({
            center: [229833.59299317934, 5062416.435482076],
            zoom: 7,
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
        visible: false,
        title: 'OSMStandard'
    })

    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: true,
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
}