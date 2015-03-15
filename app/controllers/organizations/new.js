import Ember from 'ember';
import Notify from 'ember-notify';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin,{
  validations: {
    name: {
      presence: { if: 'canValidate', message: 'Το όνομα δεν πρέπει να είναι κενό'},
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
    },
    address: {
      presence: { if: 'canValidate', message: 'Η διεύθυνση δεν πρέπει να είναι κενό'}  
    },
    city: {
      presence: { if: 'canValidate', message: 'Η πόλη δεν πρέπει να είναι κενό'}  
    },
    zipcode: {
      presence: { if: 'canValidate', message: 'Το ΤΚ δεν πρέπει να είναι κενό'}  
    },
  },

  actions: {
    create: function(){
      var self = this;
      this.set('canValidate', true);

      var organization = this.store.createRecord('organization',{
        name: self.get('name'),
        afm: self.get('afm'),
        phone: self.get('phone'),
        email: self.get('email'),
        address: self.get('address'),
        city: self.get('city'),
        zipcode: self.get('zipcode'),
        description: self.get('description')
      });

      this.validate().then(function(){
        organization.save().then(function(){

          self.set('name', '');
          self.set('afm', '');
          self.set('phone', '');
          self.set('email', '');
          self.set('address', '');
          self.set('city', '');
          self.set('zipcode', '');
          self.set('description', '');

          self.set('canValidate', false);
          self.transitionTo('organizations.index');
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
