module.exports = function (router) {
  // Homepage
  router.get('/', function (req, res) {
    res.render('index');
  });

  router.get('/start', function (req, res) {
    res.render('start');
  });

  // Choose destination
  router.get('/choose-destination', function (req, res) {
    res.render('choose-destination');
  });

  router.post('/enter-details', function (req, res) {
    const destination = req.body.destination;

    if (!destination) {
      return res.render('choose-destination', { error: true });
    }

    req.session.data.destination = destination;
    res.render('enter-details', { data: req.session.data });
  });

  // Enter details
  router.post('/check-answers', function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const errors = {};

    if (!name) errors.name = true;
    if (!address) errors.address = true;

    if (Object.keys(errors).length > 0) {
      return res.render('enter-details', {
        errors,
        data: { name, address }
      });
    }

    req.session.data.name = name;
    req.session.data.address = address;
    res.render('check-answers', { data: req.session.data });
  });

  // Confirmation
  router.post('/confirmation', function (req, res) {
    res.render('confirmation');
  });
};
