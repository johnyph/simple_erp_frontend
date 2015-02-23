import Ember from "ember";  
import Session from "simple-auth/session";

export default {  
  name: "session",
  before: "simple-auth",
  initialize: function(container) {
    
    Session.reopen({
      setCurrentUser: function() {
        var id = this.get("id");
        var self = this;
        if (!Ember.isEmpty(id)) {
          return container.lookup("store:main").find("user", id).then(function(user) {
            self.set("current_user", user);
          });
        }
      }.observes("id")
    });
  }
};