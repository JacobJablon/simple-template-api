const controllers = require('./controllers');

const router = (app) => {
  app.get('/', controllers.index);

  app.get('/results', controllers.getResults);

  app.get('/*', controllers.notFound);
};

module.exports = router;
