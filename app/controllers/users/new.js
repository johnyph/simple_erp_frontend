import Ember from 'ember';
import Notify from 'ember-notify';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin,{
  validations: {
    first_name: {
      presence: { if: 'canValidate', message: 'Το όνομα δεν πρέπει να είναι κενό'},
      length: { if: 'canValidate', minimum: 3, message: 'Τουλάχιστον 3 γράμματα' }
    },
    last_name: {
      presence: { if: 'canValidate', message: 'Το επώνυμο δεν πρέπει να είναι κενό'},
      length: { if: 'canValidate', minimum: 3, message: 'Τουλάχιστον 3 γράμματα' }
    },
    afm: {
      presence: { if: 'canValidate', message: 'Το ΑΦΜ δεν πρέπει να είναι κενό'},
      length: { if: 'canValidate', minimum: 9, maximum: 9, message: '9 ψηφία' }
    },
    phone: {
      presence: { if: 'canValidate', message: 'Το τηλέφωνο δεν πρέπει να είναι κενό'}  
    },
    email: {
      presence: { if: 'canValidate', message: 'Το email δεν πρέπει να είναι κενό'}  
    }
  },

  actions: {
    create: function(){
      var self = this;
      this.set('canValidate', true);
      var organization = this.get('organization');

      var user = this.store.createRecord('user',{
        first_name: self.get('first_name'),
        last_name: self.get('last_name'),
        afm: self.get('afm'),
        phone: self.get('phone'),
        email: self.get('email'),
        password: self.get('password'),
        password_confirmation: self.get('password'),
        organization_id: organization.get('id')
      });


      this.validate().then(function(){
    
        user.save().then(function(){
          organization.get('users').pushObject(user);

          self.set('first_name', '');
          self.set('last_name', '');
          self.set('afm', '');
          self.set('phone', '');
          self.set('email', '');
          self.set('password', '');
          self.set('password_confirmation', '');
          self.set('canValidate', false);
          self.transitionToRoute('users.index');
          Notify.success('Η αποθήκευση ολοκληρώθηκε με επιτυχία');
        }, function(error){
          self.set('canValidate', false);
          organization.rollback();
          Notify.alert('Η αποθήκευση ΔΕΝ ολοκληρώθηκε !', {
            closeAfter: 10000 // or set to null to disable auto-hiding
          });
        });
      }, function(){
        self.set('canValidate', false);
        organization.rollback();
      });
    }
  }
});
