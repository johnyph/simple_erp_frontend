import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Controller.extend({
 actions:{
    save: function(){
      var self = this;
      this.set('canValidate', true);

      this.get('user').save().then(function(){
        self.set('canValidate', false);
        Notify.success('Η αποθήκευση ολοκληρώθηκε με επιτυχία');
      }, function(response){
        self.set('canValidate', false);
        self.get('user').rollback();
        Notify.alert(response, {
          closeAfter: 10000 // or set to null to disable auto-hiding
        });
      });
    },

    delete: function(){
      var self = this;
      this.set('canValidate', true);

      this.get('user').destroyRecord().then(function(){
        Notify.success('Η διαγραφή ολοκληρώθηκε με επιτυχία');
        self.transitionToRoute('organization.edit');
      }, function(response){
        self.set('canValidate', false);
        self.get('user').rollback();
        Notify.alert(response, {
          closeAfter: 10000 // or set to null to disable auto-hiding
        });
      });
    }
  }
});
