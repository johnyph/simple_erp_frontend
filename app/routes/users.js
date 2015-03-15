import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.modelFor('organization').get('users');
  },

  setupController: function(controller, model){
    controller.set('users', model);
  }
});
