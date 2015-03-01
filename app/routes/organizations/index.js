import Ember from 'ember';
import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';

export default Ember.Route.extend({
  model: function(params){
    return PagedRemoteArray.create({modelName: 'organization', 
                                    store: this.store,
                                    page: params.page || 1,
                                    perPage: params.per_page || 10});
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('name', '');
    controller.set('afm', '');
    controller.set('sort', 'name');
    controller.set('direction', 'asc');
  },

  actions: {
    search: function(){
      var controller = this.controllerFor('organizations.index');

      var name = controller.get('name');
      var afm = controller.get('afm');
      var page = controller.get('page');
      var sort = controller.get('sort') || 'name';
      var direction = controller.get('direction') || 'asc';

      PagedRemoteArray.create({modelName: 'organization', 
                                    store: this.store,
                                    page: page || 1,
                                    perPage: 10,
                                    otherParams: {
                                      name: name, 
                                      afm: afm,
                                      sort: sort,
                                      direction: direction
                                    }
                                  }).then(function(response){
                                      controller.set('content', response);
                                    });
    }
  }
});
