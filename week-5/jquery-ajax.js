  // GET Request
  $('#loadPosts').click(function () {
    $('#loader').show(); // show loader
    $('#posts').html("");
  
    $.get('https://jsonplaceholder.typicode.com/posts?_limit=3', function (data) {
      let output = '<ul>';
      $.each(data, function (i, post) {
        output += `<li><strong>${post.title}</strong><br>${post.body}</li>`;
      });
      output += '</ul>';
      $('#posts').html(output);
    }).always(function () {
      $('#loader').hide(); 
    });
  });
  
      // POST Request
      $('#submitComment').click(function () {
        let name = $('#name').val();
        let comment = $('#comment').val();
  
        if (!name || !comment) {
          $('#response').html("Please fill in all fields.");
          return;
        } 
        $.post('https://jsonplaceholder.typicode.com/comments', {
          name: name,
          body: comment
        }, function (data) {
          $('#response').html("✅ Comment submitted!<br>ID: " + data.id);
        });
      });