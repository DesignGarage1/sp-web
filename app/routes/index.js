import Ember from "ember";


export default Ember.Route.extend({
    model: function() {
      return Ember.Object.create({
        member: {
          name: "Matt Sullivan"
        },
        book: {
          name: "Adventures in Hawaii",
          created: "October 2014"
        },
      });
    }
});
