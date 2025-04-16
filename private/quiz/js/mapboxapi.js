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
    map.addSource("points", {
        type: "geojson",
        data: "../data/spots.geojson"
      });
      window.pointsSource = map.getSource("points");

    // Base layer: all points
    map.addLayer({
        id: "all-points",
        type: "circle",
        source: "points",
        paint: {
        "circle-radius": 6,
        "circle-color": "#4264fb"
        }
    });

      // Highlight layer (only one point at a time)
    map.addSource("highlight", {
        type: "geojson",
        data: {
        type: "FeatureCollection",
        features: []
        }
    });

    map.addLayer({
        id: "highlight-circle",
        type: "circle",
        source: "highlight",
        paint: {
          "circle-radius": 12,
          "circle-color": "#e63946",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff"
        }
      });
    
      // Optional: Add a label layer
      map.addLayer({
        id: "highlight-label",
        type: "symbol",
        source: "highlight",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 14,
          "text-anchor": "top"
        },
        paint: {
          "text-color": "#000",
          "text-halo-color": "#fff",
          "text-halo-width": 1.5
        }
      });

    var popup = new mapboxgl.Popup({closeButton:false,closeOnClick:false})

    map.on('mouseenter', 'all-points', function (e) {
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
    map.on('mouseleave', 'all-points', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    map.on('load', function () {
        window.pointsSource = map.getSource('all-points');
      });


});
