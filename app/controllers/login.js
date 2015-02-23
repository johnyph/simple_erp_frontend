import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  needs: ['application'],

  authenticator: 'simple-auth-authenticator:oauth2-password-grant'
});
