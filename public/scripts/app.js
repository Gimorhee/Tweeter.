//Database
const tweetData = [

];

//Using AJAX, loading tweets and errors
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: "GET",
    success: data => {
      $("#tweet-box").empty()
      renderTweets(data);
    },
    failure: error => {
      console.log(error);
    }
  });
}

//For each content of the tweet databases, create tweets and post it by the time of the post.
function renderTweets(tweets) {
  for(let tweet in tweets){
    let $tweet = createTweetElement(tweets[tweet]);
    $('#tweet-box').prepend($tweet);
  }
}

//Appending all attributes to the tweet container where the tweet will be posted.
function createTweetElement(tweetData) {

  let section = $("<section>").addClass("tweet-container");
  let article = $("<article>").addClass("tweet-article");
  let header = $("<header>").addClass("tweet-header");
  let img = $("<img>").addClass("tweet-image");
  let h2 = $("<h2>").addClass("tweetname");
  let spanOne = $("<span>").addClass("username");
  let p = $("<p>").addClass("tweet-content");
  let footer = $("<footer>").addClass("tweet-footer");
  let spanTwo = $("<span>").addClass("tweet-footer-content");
  let iOne = $("<i>").addClass("fas fa-flag");
  let iTwo = $("<i>").addClass("fas fa-sync");
  let iThree = $("<i>").addClass("fas fa-heart");

  footer.append(iOne);
  footer.append(iTwo);
  footer.append(iThree);
  footer.append(spanTwo);
  header.append(img);
  header.append(h2);
  header.append(spanOne);
  article.append(header);
  article.append(p);
  article.append(footer);
  section.append(article);

  img.attr("src", tweetData.user.avatars.small);
  h2.text(tweetData.user.name);
  spanOne.text(tweetData.user.handle);
  p.text(tweetData.content.text);
  spanTwo.text(moment(tweetData.created_at).fromNow());

  return section;
}

//When the document is ready, load all of original tweets. Tweet box is hidden and show up again when the compose button is clicked.
//Checking up tweet-validation and posting/loading the tweets by using AJAX.
$(() => {
  loadTweets();
  $("#new-tweetbox").hide();
  $("#nav-button").on("click", () => {
    $("#new-tweetbox").slideToggle('slow');
    $("#tweet-input").focus();
  });

  $(".error-container").hide();


  $("#tweet-box").on("click", ".fa-heart", (event) => {
    $(event.target).toggleClass("likeColor");
  });

  let $form = $('#tweet-form');
  $form.on("submit", () => {
    event.preventDefault();
    let inputLength = $("#tweet-input").val().length;
    if(inputLength === 0 || inputLength === null) {
      $(".error-container").slideDown();
      $(".error-message").html("<i class='fas error fa-exclamation-circle'></i> <span>Invalid Error: you must type something to tweet!</span>");
    } else if (inputLength > 140) {
      $(".error-container").slideDown();
      $(".error-message").html("<i class='fas error fa-exclamation-circle'></i> <span>Your tweet is too long! Please shorten it and try again!</span>");
    } else {
      $(".error-container").slideUp();
      let $formData = $form.serialize();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $formData,
        success: data => {
          loadTweets();
        },
        failure: error => {
          console.log(error);
        }
      });
    }
  });
});




