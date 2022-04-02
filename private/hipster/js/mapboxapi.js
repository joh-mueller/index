//Change color of active/selected city-button

// Get the container element
var btnContainer = document.getElementById("button-container");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("city-button");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


//Maybe not necessary after rearranging header. It determines that the height of the two div tag are equal in the header.
$("#title").height($("#global-menu-container").height());
$("#img_sh").height($("#img_jo").height());



//mapbox token
mapboxgl.accessToken='pk.eyJ1Ijoic2hpaDAwMCIsImEiOiJjamtubGNpd3kwOGhtM3ZwMmRjMXgzd2NuIn0.wNTCjYererFafy4yChuKdw'; 

//starting position -->NYC
var position = new mapboxgl.LngLat(-73.993080,40.746279).wrap();

//map instance
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/shih000/cjlg7flfn4fiz2sl8101fx5rj',
    center: [position.lng, position.lat], 
    // zoom: 12 //starting zoom
    minZoom: 11.5,
    maxZoom: 15
});

// adding starbucks/hipsters data source and mapping
map.on('load', function() {
    map.addLayer({
	'id': 'starbucks',
  	'type': 'circle',
    'source': {
        'type': 'geojson',
        'data': './data/sb-locations.geojson'
        },
    'paint': {
        'circle-radius': [
            "interpolate", ["linear"], ["zoom"],
            11.5, 5.5, 15, 8.5,
        ],
        'circle-color': '#00704a',
        'circle-opacity': 0.6
        }
    }); 
  
    map.addLayer({
    'id': 'hipster',
    'type': 'circle',
    'source': {
        'type': 'geojson',
        'data': './data/all_hipster.geojson'
        },
    'paint': {
        'circle-radius': [
            "interpolate", ["linear"], ["zoom"],
            11.5, 5.5, 15, 8.5,
        ],
        'circle-color': '#6AADFA',
        'circle-opacity': 0.7
        }
    });

    // popup for hipster cafes
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'hipster', function(e) {
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

    map.on('mouseleave', 'hipster', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });


    //adding heatmaps from same source.
    
    map.addLayer({
        "id": "Heatmap_S",
        "type": "heatmap",
        "layout":{
            "visibility":'none'
        },
        "source": {
                "type": "geojson",
                "data": "data/sb-locations.geojson"
        },
        "paint": {
            "heatmap-intensity": [
                "interpolate", ["linear"], ["zoom"],
                0, 1, 9, 3
            ],
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(237,248,251,0)",
                0.2, "rgb(204,236,230)",
                0.4, "rgb(153,216,201)",
                0.6, "rgb(102,194,164)",
                0.8, "rgb(44,162,95)",
                1, "rgb(0,109,44)"
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
                "interpolate", ["linear"],["zoom"],
                11.5, 18, 15, 10
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                11.5, 0.7, 14.5, 0
            ],
        }
    });
    map.addLayer({
        "id": "Heatmap_H",
        "type": "heatmap",
        "layout":{
            "visibility":'none'
        },
        "source": {
            "type": "geojson",
            "data": "data/all_hipster.geojson"
        },
        "paint": {
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
                "interpolate", ["linear"], ["zoom"],
                0, 1, 9, 3
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
                "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(239,243,255,0)",
                0.2, "rgb(198,219,239)",
                0.4, "rgb(158,202,225)",
                0.6, "rgb(107,174,214)",
                0.8, "rgb(49,130,189)",
                1, "rgb(8,81,156)"
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
                "interpolate", ["linear"],["zoom"],
                11.5, 25, 15, 16
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                11.5, 0.7, 14.5, 0
            ],
        }
    });
});
/*document.getElementById('heatmap-button').addEventListener('click',function(){
});*/


/*var toggleableLayerIds = [ 'heatmap' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;
*/
/*
    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
*/

    document.getElementById('heatmap-button').addEventListener('click',function(e){
        var visibility = map.getLayoutProperty(['Heatmap_H'], 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(['Heatmap_H'], 'visibility', 'none');
            map.setLayoutProperty(['Heatmap_S'], 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(['Heatmap_H'], 'visibility', 'visible');
            map.setLayoutProperty(['Heatmap_S'], 'visibility', 'visible');
        }
    });

/*
    var layers = document.getElementById('heatmap-button');
    layers.appendChild(link);
}
*/


//Center to other cities when clicking on according button

document.getElementById('nyc-button').addEventListener('click',function (e){
    map.setCenter([-73.993080,40.746279]);
});

document.getElementById('sfc-button').addEventListener('click',function (e){
    map.setCenter([-122.416,37.77]);
});

document.getElementById('sea-button').addEventListener('click',function (e){
    map.setCenter([-122.333027,47.602745]);
});

document.getElementById('ldn-button').addEventListener('click',function (e){
    map.setCenter([-0.128734,51.507026]);
});

document.getElementById('sgp-button').addEventListener('click',function (e){
    map.setCenter([103.837289,1.289778]);
});



// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());