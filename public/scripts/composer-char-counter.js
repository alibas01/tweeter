$(document).ready(function() {
  
  $('textarea').keyup( function() {
    
    let remaining = 140 - $(this).val().length;
    // console.log($(this).val());

    if (remaining >= 0 ) {
    $('output').replaceWith(`<output name="counter" class="counter" for="tweet-text">${remaining}</output>`);
    } else {
    $('output').replaceWith(`<output style= "background-color: red;
    color: white;" name="counter" class="counter" for="tweet-text">${remaining}</output>`);
    }
  })
  
  
});