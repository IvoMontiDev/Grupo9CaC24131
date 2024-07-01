const Movie = require('../models/Movie');

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMovie = async (req, res) => {
    const movieId = req.params.id;
    const { title, description, release_date, poster_path } = req.body;

    try {
        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        // Actualizar solo los campos que se hayan enviado en la solicitud
        if (title) movie.title = title;
        if (description) movie.description = description;
        if (release_date) movie.release_date = release_date;
        if (poster_path) movie.poster_path = poster_path;

        await movie.save();
        res.status(200).json(movie);
    } catch (error) {
        console.error('Error al actualizar película:', error);
        res.status(500).json({ error: 'Error al actualizar película' });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Movie.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json({ message: 'Movie deleted successfully' });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie,
};
