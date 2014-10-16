import Ember from 'ember';
import {UploadInputView} from 't17-ember-upload';


export default UploadInputView.extend({
  MultipleImageInput: Ember.View.extend({
    tagName: 'input',
    classNames: 'files',
    attributeBindings: ['type', 'multiple', 'accept'],
    accept: 'image/*',
    type: 'file',
    multiple: 'multiple',
    change: function(e) {
      var input = e.target;
      this.get('parentView.controller').send('filesDropped', input.files);
    }
  }),
});
