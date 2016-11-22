const models = require('../models');

const Button = models.Button;

const index = (req, res) => {
  if (!req.session.account) {
    return res.render('index', {
      account: req.session.account,
      csrfToken: req.csrfToken(),
    });
  }
  return Button.ButtonModel.findByOwner(req.session.account._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    if (doc) {
      return res.render('index', {
        account: req.session.account,
        csrfToken: req.csrfToken(),
        makePage: false,
      });
    }
    return res.render('index', {
      account: req.session.account,
      csrfToken: req.csrfToken(),
      makePage: true,
    });
  });
};

const button = (req, res) => {
  Button.ButtonModel.findByOwner(req.session.account._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    if (doc) {
      return res.render('button', {
        account: req.session.account,
        csrfToken: req.csrfToken(),
        makePage: false,
      });
    }
    return res.render('button', {
      account: req.session.account,
      csrfToken: req.csrfToken(),
      makePage: true,
    });
  });
};

const viewButton = (req, res) => {
  Button.ButtonModel.findByOwner(req.session.account._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    if (doc) {
      return res.render('viewButton', {
        account: req.session.account,
        csrfToken: req.csrfToken(),
        button: doc,
        makePage: false,
      });
    }
    return res.render('viewButton', {
      account: req.session.account,
      csrfToken: req.csrfToken(),
      makePage: true,
    });
  });
};

const removeButton = (req, res) => {
  Button.ButtonModel.removeByOwner(req.session.account._id, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    return res.redirect('redirect');
  });
};

const makeButton = (req, res) => {
  if (!req.body.name || !req.body.buttonText) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const buttonData = {
    name: req.body.name,
    presses: 0,
    innerText: req.body.buttonText,
    fillColor: '#FF6633',
    textColor: '#3366FF',
    borderColor: '#F6F3F6',
    borderWidth: '5px',
    owner: req.session.account._id,
  };

  const newButton = new Button.ButtonModel(buttonData);

  return newButton.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ redirect: '/viewButton' });
  });
};

module.exports.makeButton = makeButton;
module.exports.button = button;
module.exports.home = index;
module.exports.viewButton = viewButton;
module.exports.removeButton = removeButton;
