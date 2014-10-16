import Ember from 'ember';
import {UploadMixin, FileObject} from 't17-ember-upload';


export default Ember.Controller.extend(UploadMixin, {
    isDone: false,
    uploadUrl: 'http://bns-proxy.herokuapp.com/upload',
    actions: {
      done: function() {
        this.set('isDone', true);
      },
      filesDropped: function(files){
        for (var i = 0; i < files.length; i++) {
          var fileUploadModel = FileObject.create({ fileToUpload: files[i] });
          this.get('files').pushObject(fileUploadModel);
          this.send('uploadFile', fileUploadModel);
        }
      },
    }
});
