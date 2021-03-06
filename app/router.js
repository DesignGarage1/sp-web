import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('error', { path: '/' });
  this.resource('index', { path: '/:code' });
})

export default Router;
