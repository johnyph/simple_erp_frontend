import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Controller.extend({
  
  actions:{
    save: function(){
      var self = this;
      this.set('canValidate', true);

      this.get('organization').save().then(function(){
        self.set('canValidate', false);
        Notify.success('Η αποθήκευση ολοκληρώθηκε με επιτυχία');
      }, function(response){
        self.set('canValidate', false);
        self.get('organization').rollback();
        Notify.alert(response, {
          closeAfter: 10000 // or set to null to disable auto-hiding
        });
      });
    }
  }
});
