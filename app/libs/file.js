import Ember from 'ember';


var UPLOAD_STATE_INIT = 0,
    UPLOAD_STATE_UPLOADING = 1,
    UPLOAD_STATE_FINISHED = 2;


var FileObject = Ember.Object.extend({
  fileToUpload: null,
  uploadPromise: null,
  uploadProgress: null,
  uploadState: null,
  serverUrl: null,

  init: function() {
    this._super();
    this.set('uploadPromise', Ember.RSVP.defer());
    this.set('uploadState', UPLOAD_STATE_INIT);
  },

  isUploading: function() {
    return this.get('uploadState') === UPLOAD_STATE_UPLOADING;
  }.property('uploadState'),

  progressStyle: function() {
    return 'width: %@%'.fmt(this.get('progress'));
  }.property('progress'),

  uploadTo: function(url) {
    if(this.isUploading) {
      return this.get('uploadPromise');
    }

    this.set('uploadState', UPLOAD_STATE_UPLOADING);
    this.set('progress', 0);

    var fileToUpload = this.get('fileToUpload');
    var fd = new FormData();
    var self = this;

    fd.append('Content-Type', fileToUpload.type);
    fd.append('file', fileToUpload);

    $.ajax({
      url: url,
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      xhr: function() {
        var xhr = $.ajaxSettings.xhr() ;
        // set the onprogress event handler
        xhr.upload.onprogress = function(evt) {
          self.set('progress', (evt.loaded/evt.total*100));
        };
        return xhr ;
      }
    }).done(function(data) {
      if (data.error !== undefined) {
        self.uploadTo(url);
      } else {
        self.set('uploadState', UPLOAD_STATE_FINISHED);
        self.set('serverUrl', data.url + '?w=65&h=65');
      }
    }).fail(function() {
      self.uploadTo(url);
    });

    return this.get('uploadPromise');
  },

});

export default FileObject;
