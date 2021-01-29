
// document ready
$(document).ready(function() {
  // event handler for keyup
  $('textarea').keyup(function() {
    
    let remaining = 140 - $(this).val().length;
    // green for positive
    if (remaining >= 0) {
      $('output').replaceWith(`<output name="counter" class="counter" for="tweet-text">${remaining}</output>`);
      // red for negative
    } else {
      $('output').replaceWith(`<output style= "background-color: red;
      color: white;" name="counter" class="counter" for="tweet-text">${remaining}</output>`);
    }
  });
});