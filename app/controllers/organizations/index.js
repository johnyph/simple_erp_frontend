import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['name', 'afm', 'page', 'sort', 'direction'],

  pageBinding: 'content.page',

  page: 1,

  actions: {
    sortBy: function(sort){
      if(sort = this.get('sort')){
        this.set('direction', this.get('direction') === 'asc' ? 'desc' : 'asc');
      }else{
        this.set('sort', sort);
        this.set('direction', 'asc');
      }

      this.send('search');
    }
  }
});
