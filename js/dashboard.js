function generateCoverItemHTML(item) {
  return `
    <div class="coverItem">
      <div class="img">
        <img src="${item.imgSrc}" alt="Cover ${item.title}">
      </div>
      <div class="textPart">
        <div class="title">${item.title}</div>
        <div class="desc">${item.description}</div>
        <div class="controls">
          <a class="btn" href="../views/ver.html?title=${item.title}">Ver</a>
          <div class="btn" onclick="displayDetail('${item.title}')">Detalle</div>
        </div>
      </div>
    </div>
  `;
}

function generateDetailItemHTML(item) {
  return `
    <div class="coverItemDetail">
      <div class="imgDetail">
        <img src="${item.imgSrc}" alt="Cover ${item.title}">
      </div>
      <div class="textPartDetail">
        <div class="titleDetail">${item.title}</div>
        <div class="largeDescription">${item.largeDescription}</div>
        <div class="controls">
          <a href="../views/ver.html?title=${item.title}" class="btn">Ver</a>
        </div>
      </div>
    </div>
  `;
}

function displayDetail(title) {
  const item = findItemByTitle(title);
  htmlContent = generateDetailItemHTML(item);
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = ''; 
  mainContent.innerHTML = htmlContent; 
}

function findItemByTitle(title) {
  for (let category in data) {
    const foundItem = data[category].find(item => item.title === title);
    if (foundItem) return foundItem;
  }
  return null;
}


// Función para generar el HTML de cada wrapper y su contenido
function generateWrapperHTML(categoryName, items) {
  const itemsHTML = items.map(generateCoverItemHTML).join('');
  return `
    <div class="contentWrapper"> 
      <h2>${categoryName}</h2>
      <div class="coverItemsWrapper">
        ${itemsHTML}
      </div>
    </div>
  `;
}

// Función para renderizar una categoría específica
function renderCategory(category) {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = ''; // Limpiar el contenido existente
  
  let contentHTML = '';

  switch(category) {
    case 'actionMovies':
      contentHTML = generateWrapperHTML('Películas de Acción', data.actionMovies);
      break;
    case 'comedyMovies':
      contentHTML = generateWrapperHTML('Películas de Comedia', data.comedyMovies);
      break;
    case 'dramaMovies':
      contentHTML = generateWrapperHTML('Películas de Drama', data.dramaMovies);
      break;
    case 'fantasySeries':
      contentHTML = generateWrapperHTML('Series de Fantasía', data.fantasySeries);
      break;
    case 'actionSeries':
      contentHTML = generateWrapperHTML('Series de Acción', data.actionSeries);
      break;
    case 'watchingNow':
      contentHTML = generateWrapperHTML('Viendo Ahora', data.watchingNow);
      break;
    case 'favorites':
      contentHTML = generateWrapperHTML('Favoritos', data.favorites);
      break;
    case 'recomendations':
      contentHTML = generateWrapperHTML('Recomendaciones', data.recomendations);
      break;
    default:
      break;
  }

  // Insertar el HTML generado en el contenedor principal
  mainContent.innerHTML = contentHTML;
}

// Agregar event listeners a los ítems del menú
document.querySelectorAll('.menuClicable').forEach(item => {
  item.addEventListener('click', (event) => {
    const category = event.target.getAttribute('data-category');
    renderCategory(category);
  });
});



// Renderizar por defecto la primera categoría (opcional)
document.addEventListener('DOMContentLoaded', () => renderCategory('actionMovies'));