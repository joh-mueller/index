//mapbox token
mapboxgl.accessToken='pk.eyJ1Ijoiam9qb2hhbm5lcyIsImEiOiJjajA3cDN6ZnQwMW40MndwN3Zwa2VqaHh4In0.l2hCbSnDKpWqbyek7xQOIQ'; 

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jojohannes/cjt6nx4gx394w1fp8bjaw3a6s',
    center: [137,-8],
    zoom: 2,
    minZoom: 2,
    maxZoom: 4.5
});



map.on('load', function () {
 
    map.addLayer({
    id: "points",
    type: "circle",
    source: {
        "type": "geojson",
        "data": './data/spots.geojson'
        },
    paint: {
        "circle-color":"#279"
    }

    });

    var popup = new mapboxgl.Popup({closeButton:false,closeOnClick:false})

    map.on('mouseenter', 'points', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties.name;
        map.getCanvas().style.cursor = 'pointer';

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
     
        popup.setLngLat(coordinates)
            .setHTML(name)
            .addTo(map);
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    /*map.on('click','points',function (e) {
        var pointIdentifier = e.features[0].properties.id
        //document.getElementById('pointID').innerHTML = pointIdentifier;
    });*/

});

//starting position -->NYC
//var position = new mapboxgl.LngLat(-73.993080,40.746279).wrap();

/*//map instance
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/shih000/cjlg7flfn4fiz2sl8101fx5rj',
    center: [position.lng, position.lat], 
    // zoom: 12 //starting zoom
    minZoom: 11.5,
    maxZoom: 15
});
*/
/*
map.on('load', function() {
    map.addLayer({
	'id': 'natural',
  	'type': 'circle',
    'source': {
        'type': 'geojson',
        'data': 'natural.geojson'
        },
    'paint': {
        'circle-color': '#000000'
        //'circle-opacity': 0
        }
    }); 
});
*/
/*
map.on('load', function () {
 
map.addLayer({
"id": "points",
"type": "symbol",
"source": {
"type": "geojson",
"data": 

{
   "type": "FeatureCollection",
   "features": [
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [1.307499,103.796085]
    },
    "properties": {
    "name": "Blessed",
    "id": 1
    }
  }
  ]
}

},
"layout": {
"icon-image": "{icon}-15",
"text-field": "{title}",
"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
"text-offset": [0, 0.6],
"text-anchor": "top"
}
});
});
*/
/*

    // popup for hipster cafes
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'natural', function(e) {
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.name; //Here's the link to the 'name' variable

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('mouseleave', 'natural', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});
*/
