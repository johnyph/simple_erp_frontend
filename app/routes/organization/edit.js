import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.modelFor('organization');
  },
  setupController: function(controller, model){
    controller.set('canValidate', false);
    controller.set('organization', model);
  }
});
