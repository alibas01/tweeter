/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {

  const htmlUnit = `
  <p>
  <article>
    <header>
            <img class="man-image" src="/images/man.jpg"> 
            <h4>${tweetObj.user.name}</h4>
            <h5 class="username">${tweetObj.user.handle}</h5>
    </header>
    <body><div class='tweet-body'>
            ${escape(tweetObj.content.text)}
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
  `;
  return htmlUnit;
};

const renderTweets = function(tweetObj) {
  // Create a loop to render the HTML elements
  for (let tweet of tweetObj) {
    const newHtmlUnit = createTweetElement(tweet);
    // Append each element to the container section class="tweet-container"
    $('.tweet-container').append(newHtmlUnit);
  }
};


const loadTweets = function() {
  const url = 'http://localhost:8080/tweets';
  $.ajax({
    url,
    method:'GET'
  })
    .done((result) => {
    // Create the HTML media element by the info pulled from Json file
      renderTweets(result);
    })
    .fail(() => console.log('fail'))
    .always(() => console.log('as always; this request is completed.'));
};

const errorMessage = function(error) {
  if (error === "empty") {
    message = "Did you say something? I didn't hear!";
  } else {
    message = "Please use maximum 140 characters!! Maan, you have a lot to say.";
  }
  const injection = `
                    <span><div class='error-message'>
                    ${message}
                    </div></span>
  `;
  return injection;
};

const uploadTweets = function(formData) {
  
  console.log('data',formData);
  $.ajax({
    method: "POST",
    url: 'http://localhost:8080/tweets',
    data: formData,
    success: function() {
      console.log('tweet successfuly added in database');
    }
  })
    .done(() => $('textarea').val(''))
    .fail(() => console.log('failed to post'))
    .always(() => loadTweets());
};


$(document).ready(function() {
  loadTweets();
  // event handler for the form => id = 'tweet-form' => submit
  $('#tweet-form').on('submit', function(event) {
    //prevent the default form submission
    event.preventDefault();
    // read the data from the text area text content, target the text area
    const tweet = $(this).children('textarea').val();
     
    //tweet validation
    if (tweet === '') {
      $('.warnings').html(errorMessage('empty')).fadeIn('fast').fadeOut(4000);
    } else if (tweet.length > 140) {
      $('.warnings').html(errorMessage('limit')).fadeIn('fast').fadeOut(4000);
    } else {
      const formData = $(this).serialize();
      uploadTweets(formData);
    }
  });

  // event handler for the write a tweet button => id = 'compose' => button
  $('#compose').on('click', function() {
    if ($("#tweet-form").first().is(":hidden")) {
      $("#tweet-form").slideDown(2000);
    } else {
      $("#tweet-form").hide(1000);
    }
  });
});








