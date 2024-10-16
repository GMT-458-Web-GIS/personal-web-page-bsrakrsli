// OpenLayers Haritasını Başlatma
const myMap = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM() // OpenStreetMap katmanı
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([35.2433, 38.9637]),  // Türkiye'nin koordinatları
      zoom: 6
    })
  });
  
  // Konumlar: [Enlem, Boylam] formatında
  const locations = [
    { name: "Ankara", coordinates: [32.8597, 39.9334] },
    { name: "İstanbul", coordinates: [28.9784, 41.0082] },
    { name: "İzmir", coordinates: [27.1384, 38.4237] }
  ];
  
  // Marker Katmanı Oluşturma
  const markers = locations.map((loc) => {
    const markerFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(loc.coordinates)),
      name: loc.name
    });
  
    markerFeature.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // İşaretçi ikonu
        scale: 0.07
      })
    }));
    return markerFeature;
  });
  
  const vectorSource = new ol.source.Vector({
    features: markers
  });
  
  const markerLayer = new ol.layer.Vector({
    source: vectorSource
  });
  
  myMap.addLayer(markerLayer);
  
  // Marker üzerine tıklanınca bilgi göstermek
  myMap.on('singleclick', function (event) {
    myMap.forEachFeatureAtPixel(event.pixel, function (feature) {
      alert(feature.get('name'));
    });
  });
  