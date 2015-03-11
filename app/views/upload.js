import Ember from 'ember';
import config from '../config/environment';


export default Ember.View.extend({
  tagName: 'input',
  classNames: 'files',
  attributeBindings: ['type', 'multiple', 'accept'],
  accept: 'image/*',
  type: 'file',
  multiple: 'multiple',
  validate_data: function() {
    var controller = this.get('controller');
    var name = controller.get('name');
    var email = controller.get('email');
    var relationship = controller.get('relationship');
    var message = '';
    if (!name) {
      message = 'Please input your name';
    }
    else if (!relationship) {
      message = 'Please input your relationship';
    }
    return message;
  },
  change: function(e) {
    var viewObject = this;
    var message = viewObject.validate_data();
    var controller = this.get('controller');
    controller.set('message', message);
    if (!message) {
      var friend_data = new FormData();
      friend_data.append('name', controller.get('name'));
      friend_data.append('email', controller.get('email'));
      friend_data.append('relationship', controller.get('relationship'));
      var code = controller.get('model').get('code');

      Ember.$.ajax({
        url: config.APP.API_URL + '/labs/code/' + code + '/friend/',
        type: "POST",
        data: friend_data,
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
