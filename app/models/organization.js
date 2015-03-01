import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  afm: DS.attr(),
  description: DS.attr(),
  email: DS.attr(),
  phone: DS.attr(), 
  address: DS.attr(), 
  zipcode: DS.attr(),
  city: DS.attr(),
  users: DS.hasMany('user')
});
