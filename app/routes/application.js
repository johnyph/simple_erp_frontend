import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  activate: function()
  {
    this._super();
    if (!this.get('session').isAuthenticated ){
      //add login body class
      Ember.$('body').addClass('login-layout blur-login');
    }
  },
  
  actions: {
    sessionAuthenticationSucceeded: function(){
      this.transitionTo('protected.dashboard');
    }
  }
});
