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
 
  // ✅ Step 1: Add source with ID "points"
  map.addSource('points', {
    type: 'geojson',
    data: './data/spots.geojson'
  });

  // ✅ Step 2: Add layer using that source
  map.addLayer({
    id: 'points',
    type: 'circle',
    source: 'points',
    paint: {
      'circle-color': '#279'
    }
  });

  // ✅ Step 3: Store the source reference globally
  window.pointsSource = map.getSource('points');

  // ✅ Step 4: Popups
  const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

  map.on('mouseenter', 'points', function (e) {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const name = e.features[0].properties.name;
    map.getCanvas().style.cursor = 'pointer';

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup.setLngLat(coordinates).setHTML(name).addTo(map);
  });

  map.on('mouseleave', 'points', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

});
