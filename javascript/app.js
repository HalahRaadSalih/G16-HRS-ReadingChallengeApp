
var LIST_OF_BOOKS = [];

window.onload = function(){
    googleBooksSearch();

}

function googleBooksSearch(){

  // define variables
  var userInput, searchUrl;

  // save the books row in a variable
  var outputArea = $("#challengeBookRow");

  var googleBooksAPIRequest;

  // set the user input to searchBooks item
  userInput = $('#searchBooks');

  //on change of text input, prevent default behvior
  userInput.on('change', function(event){

    event.preventDefault();
    // if the text field is empty, clear the screen
    if( !$(this).val() ) {
      $('col-md-4').remove();
    }

    //else, query for the user input
    else{
      searchUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + userInput.val();

      googleBooksAPIRequest = $.ajax({
        type:'GET',
        dataType:'json',
        url:searchUrl,
      });

      googleBooksAPIRequest.done(function(data){
        //initialize results

        // remove previous item on screen
        $('col-md-4').remove();

        //for each item, create new book object and push it to books
        data.items.forEach(function(item){

          var volumeInfo = item.volumeInfo;
          var book = makeBook(volumeInfo);

          outputArea.append(makeBookLayout(book));

        });
       
      });

      googleBooksAPIRequest.fail(function(error){
        // remove existing divs 
        $('col-md-4').remove();

        console.log(error);
        outputArea.append("<li>" + error.responseText +"</li>");
      });

    }


  });

  // prevent default behaior for the create challenge button
  $('#createChallenge').on('click', function(event){
    event.preventDefault();

  });
  
  
}

// this function responsibilty is to create new book object from the info parameter
// sent
function makeBook(info){

   return new Book(info.title, info.imageLinks.thumbnail,info.description);
}

// this funtion creates the layout for every book
// untested yet
function makeBookLayout (book) {
  //create  a new div of class col-md-4
  var bookContainer = $("<div>").addClass("col-md-4");
 
  //create new image and add the book image as src
  var bookImage = $("<img>").attr("src",book.image);

  //craete new h4 elemet for book title and set it to book title
  var bookTitle = $('<h4>').html(book.title);

  // create new p element for book description
  var bookDescription = $("<p>");
  bookDescription.html(book.description.substr(0,200));
 
  // create new anchor element and add button class to it
  var bookAddButton = $("<a>").addClass("btn btn-info");
  bookAddButton.html("Add book");

  //on clicking add book, animate removing the boo with an animation
  // add the book to the book list
  bookAddButton.on('click', function(event){
    event.preventDefault();
    bookContainer.animate({
      opacity: 0.25,
      right: "+=50",
      height:"toggle"
    },
    400,
    "linear",
    function(){
      bookContainer.remove();
      LIST_OF_BOOKS.push(book);
    });

  });

  // append those elements to the book container
  bookContainer.append(bookImage, bookTitle, bookDescription, bookAddButton);

  return bookContainer;
}

function createChallenge(){
  // get challenge name from input field
   var challengeName = $('#challengeName').val();

   //get challenge description from text area field
   var challengeDescription = $('#challengeDescription').val();

   //get duration from challenge selection element
   var challengeDuration = $('#challengeDuration');

   // create new challenge object
   var challenge = new Challenge(challengeName, challengeDescription, challengeDuration);

   //add books to this challenge
   LIST_OF_BOOKS.forEach(function(book){
    challenge.addBook(book);
   });
}