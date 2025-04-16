//mapbox token
mapboxgl.accessToken='pk.eyJ1Ijoiam9qb2hhbm5lcyIsImEiOiJjajA3cDN6ZnQwMW40MndwN3Zwa2VqaHh4In0.l2hCbSnDKpWqbyek7xQOIQ'; 

window.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jojohannes/cjt6nx4gx394w1fp8bjaw3a6s',
    center: [137, -8],
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

    map.on('load', function () {
        // existing code...
      
        window.pointsSource = map.getSource('points');
      });
    /*map.on('click','points',function (e) {
        var pointIdentifier = e.features[0].properties.id
        //document.getElementById('pointID').innerHTML = pointIdentifier;
    });*/

});
