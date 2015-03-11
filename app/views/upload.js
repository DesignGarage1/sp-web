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

    this.get('controller').set('message', message);
    if (!message) {
      var friend_data = new FormData();
      friend_data.append('name', this.get('controller').get('name'));
      friend_data.append('email', this.get('controller').get('email'));
      friend_data.append('relationship', this.get('controller').get('relationship'));
      var code = this.get('controller').get('model').get('code');

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

        var send_email_data = new FormData();
        send_email_data.append('friend_id', friend_id);
        Ember.$.ajax({
          url: config.APP.API_URL + '/labs/code/' + code + '/send/',
          type: "POST",
          data: send_email_data,
          processData: false,
          contentType: false,
        }).done(function() {
          console.log('Send email to Landen successfully!');
        });
      });
    }
  }
});
