const API_SERVER = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    if (movieId) {
        // Hacer una solicitud al servidor para obtener los detalles de la película con el ID proporcionado
        fetch(`${API_SERVER}/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                const { title, release_date, genres = [], description, directors = [], trailer, status, language, budget, revenue, poster_path } = data;

                // Actualizar el DOM con los datos de la película
                document.getElementById('titulo').textContent = title || 'Título no disponible';
                document.getElementById('poster').setAttribute('src', `../${poster_path}`);
                document.getElementById('fechaGeneros').textContent = `Fecha de lanzamiento  ${release_date  || 'Fecha no disponible'} • ${genres.join(', ')}`;
                document.getElementById('descripcion').textContent = description || 'Descripción no disponible';

                // Actualizar directores (si hay más de uno)
                const directoresHTML = directors.map(director => `<div><h3>${director}</h3><p>Director</p></div>`).join('');
                document.getElementById('directores').innerHTML = directoresHTML || '<p>Directores no disponibles</p>';

                // Actualizar trailer
                if (trailer) {
                    document.getElementById('trailer').innerHTML = `<iframe width="560" height="315" src="${trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                } else {
                    document.getElementById('trailer').innerHTML = '<p>Trailer no disponible</p>';
                }

                // Actualizar info
                document.getElementById('status').textContent = status || 'No disponible';
                document.getElementById('language').textContent = language || 'No disponible';
                document.getElementById('budget').textContent = budget || 'No disponible';
                document.getElementById('revenue').textContent = revenue || 'No disponible';
            })
            .catch(error => console.error('Error al obtener los detalles de la película:', error));
    }
});
