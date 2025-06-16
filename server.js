const express = require('express');
const cors = require('cors');
const { addonBuilder } = require('stremio-addon-sdk');

const app = express();
app.use(cors());

const manifest = {
  id: 'community.stremio.customaddon',
  version: '1.0.0',
  name: 'Addon Personalizado',
  description: 'Addon con películas y series personalizadas',
  resources: ['catalog', 'stream'],
  types: ['movie', 'series'],
  catalogs: [
    { type: 'movie', id: 'top' },
    { type: 'series', id: 'top' }
  ],
  idPrefixes: ['tt']
};

const movies = [
  {
    id: "tt0133093",
    type: "movie",
    name: "Matrix",
    year: 1999,
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    description: "Un hacker descubre que el mundo es una simulación y debe elegir entre la realidad o la ilusión."
  },
  {
    id: "tt1375666",
    type: "movie",
    name: "El Origen YT",
    year: 2010,
    poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    description: "Un ladrón roba secretos a través de los sueños y ahora debe implantar una idea."
  },
  {
    id: "tt4154796",
    type: "movie",
    name: "Vengadores: Endgame Yt",
    year: 2019,
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    description: "Los Vengadores intentan revertir las acciones de Thanos."
  }
];

const series = [
  {
    id: "tt0903747",
    type: "series",
    name: "Breaking Bad",
    year: 2008,
    poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    description: "Un profesor de química entra al mundo de las drogas tras un diagnóstico de cáncer."
  },
  {
    id: "tt0944947",
    type: "series",
    name: "Juego de Tronos",
    year: 2011,
    poster: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    description: "Nueve familias luchan por el control de Westeros mientras una amenaza regresa."
  },
  {
    id: "tt4574334",
    type: "series",
    name: "Stranger Things",
    year: 2016,
    poster: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    description: "Un niño desaparece y se descubre un misterio sobrenatural en un pueblo pequeño."
  },
  {
    id: "tt0229889",
    type: "series",
    name: "El Chavo del 8",
    year: 1971,
    poster: "https://m.media-amazon.com/images/M/MV5BYmJkNDAxYTQtNjJlNS00MjVlLWFhOTAtOTdlOTdmZjYyMjhiXkEyXkFqcGc@._V1_.jpg",
    description: "Las aventuras del Chavo y sus amigos en una vecindad."
  }
];

const streams = {
  "tt0133093": [{ title: "1080p", url: "http://127.0.0.1:11470/a66defe775545b766e54f0a962fe136a7d77d71a/The.matrix.1999.1080p-dual-lat-cinecalidad.is.mp4" }],
  "tt1375666": [{ title: "1080p", url: "https://superpaso.cl/heidi.php" }],
  "tt4154796": [{ title: "1080p", url: "https://fliz.wuaze.com/sinquerer.php" }],
  "tt0903747:1:1": [{ title: "Ep 1", url: "https://ia801806.us.archive.org/9/items/elchavo_201709/El%20Chavo%20del%208%20-%20Vacaciones%20en%20Acapulco.mp4" }],
  "tt0903747:1:2": [{ title: "Ep 2", url: "https://sample-videos.com/zip/10/mp4/mp4-sample.mp4" }],
  "tt0944947:1:1": [{ title: "Ep 1", url: "https://sample-videos.com/zip/10/mp4/mp4-sample.mp4" }],
  "tt0944947:1:2": [{ title: "Ep 2", url: "https://sample-videos.com/zip/10/mp4/mp4-sample.mp4" }],
  "tt4574334:1:1": [{ title: "Ep 1", url: "https://sample-videos.com/zip/10/mp4/mp4-sample.mp4" }],
  "tt4574334:1:2": [{ title: "Ep 2", url: "https://sample-videos.com/zip/10/mp4/mp4-sample.mp4" }],
  "tt0229889:1:1": [{ title: "Ep 1", url: "https://ia801806.us.archive.org/9/items/elchavo_201709/El%20Chavo%20del%208%20-%20Vacaciones%20en%20Acapulco.mp4" }]
};

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(({ type, id }) => {
  if (type === 'movie') return Promise.resolve({ metas: movies });
  if (type === 'series') return Promise.resolve({ metas: series });
  return Promise.resolve({ metas: [] });
});

builder.defineStreamHandler(({ id }) => {
  return Promise.resolve({ streams: streams[id] || [] });
});

app.get("/manifest.json", (req, res) => {
  res.json(builder.getInterface().manifest);
});

app.use("/", builder.getInterface().getRouter());

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log("Addon corriendo en http://localhost:" + port);
});