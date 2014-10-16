import Ember from 'ember';


export default Ember.View.extend({
  tagName: 'input',
  classNames: 'files',
  attributeBindings: ['type', 'multiple', 'accept'],
  accept: 'image/*',
  type: 'file',
  multiple: 'multiple',
  change: function(e) {
    var input = e.target;
    this.get('controller').send('filesDropped', input.files);
  }
});
