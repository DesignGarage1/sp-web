import Ember from 'ember';
import UploadMixin from 'web/libs/upload';


export default Ember.Controller.extend(UploadMixin, {
    isDone: false,
    uploadUrl: 'http://sp-proxy.herokuapp.com/upload',
    actions: {
      done: function() {
        this.set('isDone', true);
      },
    }
});
