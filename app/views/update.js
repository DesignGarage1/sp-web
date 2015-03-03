import Ember from 'ember';


export default Ember.View.extend({
    click: function() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var relationship = document.getElementById('relationship').value;
        var fd = new FormData();
        fd.append('name', name);
        fd.append('email', email);
        fd.append('relationship', relationship);

        $.ajax({
            url: 'http://localhost:8000/labs/code/MrbvLIQiBb/update/',
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
        }).done(function(data) {
            alert("Your information is updated successfully!");
            document.getElementById('friend_info').innerHTML = '<p class="message">Thank you!</p>';
        }).fail(function() {
            alert("Fail to update");
        });
    }
});