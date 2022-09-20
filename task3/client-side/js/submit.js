// enter the URL of your web server!
var url = "http://localhost/cosc260/a3/server-side/register.php";

$(function() {
  $('#registration').submit(function(e) {
    e.preventDefault();
    send_request();
  });
});

// send POST request with all form data to specified URL
function send_request() {
  // remove messages
  remove_msg();

  // make request
  $.ajax({
    url: url,
    method: 'POST',
    data: $('#registration').serialize(),
    dataType: 'json',
    success: function(data) {     
      // display user_id on page
      $('#server_response').addClass('success');
      $('#server_response span').text('Temporary password: ' + data.password);
    },
    error: function(jqXHR) {

      // parse JSON
      try {
        var $e = JSON.parse(jqXHR.responseText);
        
        // log error to console
        console.log('Error from server: '+ $e.error);
        
        // display error on page
        $('#server_response').addClass('error');
        $('#server_response span').text('Error from server: ' + $e.error);
      }
      catch (error) {
        console.log('Could not parse JSON error message: ' + error);
      }
    }
  });
}


// remove all messages displayed on page
function remove_msg() {
  var $server_response = $('#server_response');
  if ($server_response.hasClass('success')) {
    $server_response.removeClass('success');
  }
  else if ($server_response.hasClass('error')) {
    $server_response.removeClass('error');
  }
  $('#server_response span').text('');
}