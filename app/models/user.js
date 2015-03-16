import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr(),
  isAdmin: DS.attr(),
  first_name: DS.attr(),
  last_name: DS.attr(),
  afm: DS.attr(),
  phone: DS.attr(),
  password: DS.attr(),
  password_confirmation: DS.attr(),
  organization_id: DS.attr(),
  full_name: function(){
    return this.get('last_name') + ' ' + this.get('first_name');
  }.property('first_name', 'last_name')
});
