import Ember from 'ember';
import config from '../config/environment';


export default Ember.View.extend({
  tagName: 'input',
  classNames: 'files',
  attributeBindings: ['type', 'multiple', 'accept'],
  accept: 'image/*',
  type: 'file',
  multiple: 'multiple',
  change: function(e) {
    var viewObject = this;
    var name = this.get('controller').get('name');
    var email = this.get('controller').get('email');
    var relationship = this.get('controller').get('relationship');
    if (!name) {
      this.get('controller').set('message', 'Please input your name');
    }
    else if (!relationship) {
      this.get('controller').set('message', 'Please input your relationship');
    }
    else {
      this.get('controller').set('message', '');
      var fd = new FormData();
      fd.append('name', name);
      fd.append('email', email);
      fd.append('relationship', relationship);
      var code = this.get('controller').get('model').get('code');

      Ember.$.ajax({
        url: config.APP.API_URL + '/labs/code/' + code + '/friend/',
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
      }).done(function(data) {
        var friend_id = null;
        if (data.hasOwnProperty('pk')) {
          friend_id = data['pk'];
        }
        var input = e.target;
        viewObject.get('controller').send('filesDropped', input.files, friend_id);
      });
    }
  }
});
