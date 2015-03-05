import Ember from 'ember';
import config from '../config/environment';


export default Ember.View.extend({
    click: function() {
        var name = this.get('controller').get('name');
        var email = this.get('controller').get('email');
        var relationship = this.get('controller').get('relationship');
        if (!name) {
            this.get('controller').set('message', 'Please input your name');
            return;
        }
        else if (!relationship) {
            this.get('controller').set('message', 'Please input your relationship');
            return;
        }

        var fd = new FormData();
        fd.append('name', name);
        fd.append('email', email);
        fd.append('relationship', relationship);
        var code = this.get('controller').get('model').get('code');
        Ember.$('#friend_info')[0].innerHTML = '<p class="message">Thank you!</p>';
        Ember.$.ajax({
            url: config.APP.API_URL + '/labs/code/' + code + '/update/',
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
        });
    }
});