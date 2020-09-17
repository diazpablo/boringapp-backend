const express = require('express');
const activity = require('../routes/activity');
const types = require('../routes/types');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function(app) {
  app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/api/types', types);
	app.use('/api/activity', activity);
	app.use('/api/users', users);
	app.use('/api/auth', auth);
}