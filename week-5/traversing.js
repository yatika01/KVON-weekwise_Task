let selected;

    $('li').click(function (e) {
      e.stopPropagation();
      $('li').css('background', ''); 
      $(this).css('background', 'yellow');
      selected = $(this);
      $('#output').html("You selected: <b>" + $(this).text() + "</b>").fadeIn();
    });

    $('#parent').click(function () {
      selected.parent().css('background', '#c2f0c2');
      $('#output').html("Parent: " + selected.parent().prop("nodeName")).slideDown();
    });

    $('#children').click(function () {
      selected.children().css('background', '#add8e6');
      $('#output').html("Children: " + selected.children().length + " item(s)").fadeIn();
    });

    $('#siblings').click(function () {
      selected.siblings().css('background', '#ffcccb');
      $('#output').html("Siblings found: " + selected.siblings().length).fadeIn();
    });

    $('#find').click(function () {
      selected.find('li').css('background', '#e0bbff');
      $('#output').html("Found inner <li> tags: " + selected.find('li').length).fadeIn();
    });

    $('#closest').click(function () {
      selected.closest('ul').css('background', '#d9edf7');
      $('#output').html("Closest UL highlighted.").fadeIn();
    });

    $('#clear').click(function () {
      $('li, ul').css('background', '');
      $('#output').html("Cleared all highlights.");
    });