import Ember from 'ember';
import config from '../config/environment';
import UploadMixin from 'web/libs/upload';


export default Ember.Controller.extend(UploadMixin, {
  isDone: false,
  uploadUrl: config.APP.PROXY_URL + '/upload',
  actions: {
    done: function() {
      this.set('isDone', true);
    },
  }
});
