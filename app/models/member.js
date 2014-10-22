import Ember from "ember";


var Member = Ember.Object.extend({});

Member.reopenClass({

  find: function(code) {
    var url = "http://stage.getsimpleprints.com/labs/code/" + code + "/";
    return $.getJSON(url).then(function(data) {
      data.code = code;
      return Member.create(data);
    });
  }

});


export default Member;

