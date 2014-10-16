import Ember from 'ember';
import UploadMixin from 'web/libs/upload';
import FileObject from 'web/libs/file';


export default Ember.Controller.extend(UploadMixin, {
    isDone: false,
       /*uploadUrl: 'http://bns-proxy.herokuapp.com/upload',*/
    uploadUrl: 'http://localhost:3000/upload',
    actions: {
      done: function() {
        this.set('isDone', true);
      }
    }
});
