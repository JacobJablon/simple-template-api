const hostIndex = (req, res) => {
  res.render('index');
};

const fs = require('fs');

const movies = JSON.parse(fs.readFileSync(`${__dirname}/../../data/movies.json`));
// {
//   title: 'Capture of Boer Battery by British',
//   year: 1900,
//   cast: [],
//   genres: [ 'Short', 'Documentary' ]
// }

const getResults = (req, res) => {
  const { title, year, starring } = req.query;

  let results = movies;
  if (title) {
    const searchTitle = title.toLowerCase();

    //use title to filter down movies, only keeping the ones that match the title
    results = results.filter(movie => {
      const movieTitle = movie.title.toLowerCase();
      return movieTitle.includes(searchTitle) ||
        searchTitle.includes(movieTitle);
    });
  }

  if (year) {
    const searchYear = +year;

    results = results.filter(movie => {
      return movie.year === searchYear;
    })
  }

  results.forEach(movie => {
    movie.cast = movie.cast.map(member => {
      return {
        name: member,
        isStarring: starring.includes(member)
      }
    })
  })

  // res.json(results);
  //{"title":"After Dark in Central Park","year":1900,"cast":[],"genres":[]}
  res.render('results', {
    query: {
      title,
      year,
      starring
    },
    movies: results
  });
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  notFound,
  getResults,
};
