$(document).ready(function () {
    const colors = ["#f54291", "#4287f5", "#42f554", "#f5a142", "#8e44ad", "#16a085"];
    let targetColor = "";

    // Function to shuffle and choose target
    function newGame() {
      $('#result').hide();
      const shuffled = colors.sort(() => 0.5 - Math.random());
      $('#buttons').empty();

      shuffled.forEach(color => {
        const btn = $('<button></button>')
          .addClass('color-btn')
          .css('background-color', color)
          .attr('data-color', color);
        $('#buttons').append(btn);
      });

      targetColor = shuffled[Math.floor(Math.random() * shuffled.length)];
      $('#targetColor span').text(targetColor).css('color', targetColor);
    }

    // Button click event
    $('#buttons').on('click', '.color-btn', function () {
      const selectedColor = $(this).attr('data-color');
      if (selectedColor === targetColor) {
        $('body').css('background-color', selectedColor);
        $('#result').text("🎉 Correct!").css('color', selectedColor).fadeIn();
      } else {
        $('#result')
          .text("❌ Try Again!")
          .css('color', 'red')
          .fadeIn()
          .fadeOut()
          .fadeIn();
      }
    });

    newGame(); 
    setInterval(newGame, 5000);
  });