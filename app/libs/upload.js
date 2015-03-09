import Ember from 'ember';
import FileObject from 'web/libs/file';


var UploadMixin = Ember.Mixin.create({
  init: function() {
    this._super();
    Ember.assert("UploadUrl required.", !!this.get('uploadUrl'));
  },

  files: [],

  actions: {
    uploadAll: function() {
      var self = this;
      this.get('files').forEach(function(item) {
        item.uploadTo(self.get('uploadUrl'));
      });
    },

    filesDropped: function(files, friend_id){
      var self = this;
      for (var i = 0; i < files.length; i++) {
        var fileUploadModel = FileObject.create({ fileToUpload: files[i] });
        this.get('files').pushObject(fileUploadModel);
        fileUploadModel.uploadTo(
            self.get('uploadUrl'), self.get('model').get('code'), friend_id);
      }
    },
  }
});

export default UploadMixin;
