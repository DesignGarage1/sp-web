import Ember from 'ember';
import config from '../config/environment';


var Member = Ember.Object.extend({});

Member.reopenClass({

  find: function(code) {
    var url = config.APP.API_URL + '/labs/code/' + code + '/';
    return $.getJSON(url).then(function(data) {
      data.code = code;
      return Member.create(data);
    });
  }

});


export default Member;
