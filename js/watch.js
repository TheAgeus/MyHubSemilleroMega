// Función para buscar la película o serie en el objeto data
function findItemByTitle(title) {
  for (let category in data) {
    const foundItem = data[category].find(item => item.title === title);
    if (foundItem) return foundItem;
  }
  return null;
}

// Función para obtener los parámetros de la URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params.entries());
}

// Ejecutar la lógica al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const queryParams = getQueryParams();
  const title = queryParams.title ? decodeURIComponent(queryParams.title) : '';
  const item = findItemByTitle(title);
  renderShow(item);
});

// Función para renderizar los detalles en la página
function renderShow(item) {
  const detailContent = document.getElementById('mainContent');
  if (!item) {
    detailContent.innerHTML = '<p>No se encontró la información solicitada.</p>';
    return;
  }
  detailContent.innerHTML = `
    <video  controls>
    <source src="../videos/video.mp4" type="video/mp4">
  </video>
  `;
}