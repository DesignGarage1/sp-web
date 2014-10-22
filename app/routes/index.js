import Ember from "ember";
import Member from "web/models/member"


export default Ember.Route.extend({
  model: function(params) {
    return Member.find(params.code);
  }
});
