$(function() {
  $('#contact-form').on('submit', function(event) {
    event.preventDefault();
    var name = $('input[name="name"]').val();
    var company = $('input[name="company"]').val();
    var email = $('input[name="email"]').val();
    var phone = $('input[name="phone"]').val();
    var message = $('textarea[name="message"]').val();
    $.ajax({
      url: '/',
      method: "POST",
      contentType: 'application/json',
      data: JSON.stringify({
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message
      }),
      success: function(response) {
        console.log(response);
      },
      fail: function(error) {
        console.log(error);
      }
    });
  });
});