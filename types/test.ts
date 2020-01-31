const map = L.map("map-id", {
  editable: true
});

const polygon = L.polygon([]);
polygon.addTo(map);
polygon.enableEdit();

polygon.disableEdit();
