/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createHtmlUnit = function(tweetObj) {
  const htmlUnit = `
  <p>
  <article>
    <header>
            <img class="man-image" src="/images/man.jpg"> 
            <h4>${tweetObj.user.name}</h4>
            <h5 class="username">${tweetObj.user.handle}</h5>
    </header>
    <body><div class='tweet-body'>
            ${tweetObj.content.text}
    </div></body>
    <footer>
      <div class="timestamp">
        <label>${tweetObj.created_at}</label>
      </div>
      <div class="like-buttons">
        <button type="submit" method='POST' action="/tweets/" >💖</button>
        <button type="submit" method='POST' action="/tweets/" >🔃</button>
        <button type="submit" method='POST' action="/tweets/" >📝</button>
      </div>
    </footer>
  </article> 
  </p>
  `
  return htmlUnit;
}

const renderHtmlUnits = function(tweetObj) {
  for (let tweet of tweetObj) {
    const newHtmlUnit = createHtmlUnit(tweet);
    $('.tweet-container').append(newHtmlUnit);
  }
}


const getTweetObj = function() {
  const url = 'http://localhost:8080/tweets';
  $.ajax({
    url,
    method:'GET'
  })
  .done((result) => {
    // Create the HTML media element by the info pulled from Json file
    renderHtmlUnits(result);
  })
  .fail(() => console.log('fail'))
  .always(() => console.log('as always; this request is completed.'));
}

//createTweetElement
$(document).ready(function() {
  getTweetObj();
// event handler for the form => id = 'tweet-form' => submit
  // $('#tweet-form').on('submit', function(event) {
  //   //prevent the default form submission
  //   event.preventDefault();
  //   // read the data from the text area text content, target the text area
  //   const tweet = $(this).children('textarea').val();

  //   // Make a request to json file and get the data back
  //   getTweetObj(tweet);
    
  // })  
  

});





// Create a loop to render the HTML elements
// Append each element to the container section class="tweet-container"

