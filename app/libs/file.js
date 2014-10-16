import Ember from 'ember';


var FileObject = Ember.Object.extend({
  name: '',
  size: 0,
  didError: false,
  errorMessage: null,

  // {Property} Will be an HTML5 File
  fileToUpload: null,

  // {Property} Will be a $.ajax jqXHR
  uploadJqXHR: null,

  // {Property} Promise for when a file was uploaded
  uploadPromise: null,

  // {Property} Upload progress 0-100
  uploadProgress: null,

  // {Property} If a file is currently being uploaded
  isUploading: false,

  // {Property} If the file was uploaded successfully
  didUpload: false,

  // {{Property}} URL of image after uploaded
  serverUrl: null,

  init: function() {
    this._super();
    this.set('uploadPromise', Ember.RSVP.defer());
  },

  readFile: function() {
    var self = this;
    var fileToUpload = this.get('fileToUpload');
    this.set('name', fileToUpload.name);
    this.set('size', fileToUpload.size);

    // Don't read anything bigger than 5 MB
    if (fileToUpload.size < 2 * 1024 * 1024) {
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log("start read file " + self.get('name'));
        self.set('base64Image', e.target.result);
        console.log("end read file " + self.get('name'));
      };
      reader.readAsDataURL(fileToUpload);
    }

  },

  uploadTo: function(url) {
    if(this.get('isUploading') || this.get('didUpload') || this.get('didError')) {
      return this.get('uploadPromise');
    }

    var fileToUpload = this.get('fileToUpload');
    var fd = new FormData();
    var self = this;

    fd.append('Content-Type', fileToUpload.type);
    fd.append('file', fileToUpload);

    this.set('isUploading', true);

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
    }).done(function(data, textStatus, jqXHR) {
      if (data.error !== undefined) {
        self.set('isUploading', false);
        self.set('progress', 0);
        self.uploadTo(url);
      } else {
        self.set('serverUrl', data.s3Url);
      }
      self.set('isUploading', false);
      self.set('didUpload', true);
      self.get('uploadPromise').resolve(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      self.set('isUploading', false);
      self.set('didError', true);
      self.get('uploadPromise').reject(errorThrown);
    });

    return this.get('uploadPromise');
  },

  progressStyle: function() {
      return 'width: %@%'.fmt(this.get('progress'));
  }.property('progress')
});


export default FileObject;
