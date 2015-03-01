import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('protected', { path: '/' }, function(){
    this.route('dashboard');
    this.resource('organizations', function() {
      this.route('index');
      this.route('new');
    });
  });
  this.route('about', { path: '/about'});
});

export default Router;
