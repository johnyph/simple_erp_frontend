import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function(){
    //remove login body class
    Ember.$('body').removeClass('login-layout blur-login');
    Ember.$('body').addClass('no-skin');
      
    return this.store.find('user', this.get('session.id'));
  },

  afterModel: function(){
    this.transitionTo('protected.dashboard');
    console.log(this.get('session.current_user'));
  },
});