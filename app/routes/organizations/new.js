import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Route.extend({
  model: function(){
    return this.store.createRecord('organization');
  },

  actions: {
    create: function(){
      var self =this;

      this.controller.get('model').save().then(function(){
        self.transitionTo('organizations.index');
        Notify.success('Η αποθήκευση ολοκληρώθηκε με επιτυχία');
      }, function(error){
        Notify.alert('Η αποθήκευση ΔΕΝ ολοκληρώθηκε !', {
          closeAfter: 10000 // or set to null to disable auto-hiding
        });
      });
    }
  }
});
