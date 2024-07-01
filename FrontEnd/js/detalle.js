// detalle.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    if (movieId) {
        // Hacer una solicitud al servidor para obtener los detalles de la película con el ID proporcionado
        fetch(`http://localhost:3000/api/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                const { title, release_date, genres, description, directors, trailer, status, language, budget, revenue } = data;

                // Actualizar el DOM con los datos de la película
                document.getElementById('titulo').textContent = title;
                document.getElementById('poster').setAttribute('src', `../assets/img/${movieId}.jpg`);
                document.getElementById('fechaGeneros').textContent = `${release_date} • ${genres.join(', ')}`;
                document.getElementById('descripcion').textContent = description;

                // Actualizar directores (si hay más de uno)
                const directoresHTML = directors.map(director => `<div><h3>${director}</h3><p>Director</p></div>`).join('');
                document.getElementById('directores').innerHTML = directoresHTML;

                // Actualizar trailer
                document.getElementById('trailer').innerHTML = `<iframe width="560" height="315" src="${trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

                // Actualizar info
                document.getElementById('status').textContent = status;
                document.getElementById('language').textContent = language;
                document.getElementById('budget').textContent = budget;
                document.getElementById('revenue').textContent = revenue;
            })
            .catch(error => console.error('Error al obtener los detalles de la película:', error));
    }
});
