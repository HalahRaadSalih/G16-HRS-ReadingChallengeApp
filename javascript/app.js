
var LIST_OF_BOOKS = [];
var challengeBooks;
var bookList;

window.onload = function(){

  // get challenge book row
  challengeBooks = $("#challengeBookRow");

  // get book list row
  bookList = $('#bookList');

  //search for books
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

  
  userInput.keypress(function(event){

    // remove prev. items on screen
    $('.col-md-4').remove();

    // on enter press, seach for book of that user inpu title
    // enter key  === 13
    if(event.which === 13){
       //else, query for the user input
      searchUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + userInput.val();

      googleBooksAPIRequest = $.ajax({
        type:'GET',
        dataType:'json',
        url:searchUrl,
        });

      googleBooksAPIRequest.done(function(data){

        // remove previous items on screen
        $('.col-md-4').remove();

          //for each item, create new book object and push it to books
        data.items.forEach(function(item){

          var volumeInfo = item.volumeInfo;
          var book = makeBook(volumeInfo);

          outputArea.append(makeBookLayout(book));

        });
       
      });

      googleBooksAPIRequest.fail(function(error){
          // remove existing divs 
        $('.col-md-4').remove();

        console.log(error);
        outputArea.append("<li>" + error.responseText +"</li>");
      });
    }

  });

  // prevent default behaior for the create challenge button
  // create challenge
  $('#createChallenge').on('click', function(event){
    event.preventDefault();
    if(createChallenge()){
      // display success
      // head back to the main page
      // window.location.replace("timeline.html");

    }
  });
  
  
}

// this function responsibilty is to create new book object from the info parameter
// sent
function makeBook(info){

   return new Book(info.title, "http://placehold.it/260/200","Letterpress deep v waistcoat, +1 pour-over squid banh mi pinterest kinfolk YOLO. Ethical leggings letterpress photo booth bushwick 8-bit. Master cleanse brooklyn four loko tumblr actually you probably haven't heard of them, sriracha flexitarian cronut before they sold out tattooed 90's quinoa salvia");
}

// this funtion creates the layout for every book
// untested yet
function makeBookLayout (book) {
  //create  a new div of class col-md-4
  var bookContainer = $("<div>").addClass("col-md-4");
 
  //create new image and add the book image as src
  var bookImage = $("<img>").attr("src",book.image);

  //craete new h4 elemet for book title and set it to book title
  var bookTitle = $('<h4>').html(book.bookTitle);

  // create new p element for book description
  var bookDescription = $("<p>");
  bookDescription.html(book.bookDescription.substr(0,200));
 
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

      // display newly added book underneath the form
      $('#bookList').append(makeListOfBooksLayout(book));
    });

  });

  // append those elements to the book container
  bookContainer.append(bookImage, bookTitle, bookDescription, bookAddButton);

  return bookContainer;
}

function makeListOfBooksLayout(book){
  var bookContainer = $("<div>").addClass("col-md-4");
 
  //create new image and add the book image as src
  var bookImage = $("<img>").attr("src",book.image);

  //craete new h4 elemet for book title and set it to book title
  var bookTitle = $('<h4>').html(book.bookTitle);

  // create new p element for book description
  var bookDescription = $("<p>");
  console.log('hahahahahah' + book.bookDescription);
  bookDescription.html(book.bookDescription.substr(0,200));
 
  // create new anchor element and add button class to it
  var bookRemoveButton = $("<a>").addClass("btn btn-info");
  bookRemoveButton.html("Remove book");

  //on clicking add book, animate removing the boo with an animation
  // add the book to the book list
  bookRemoveButton.on('click', function(event){
    event.preventDefault();
    bookContainer.animate({
      opacity: 0.25,
      right: "+=50",
      height:"toggle"
    },
    400,
    "linear",
    function(){
      // remove book element
      bookContainer.remove();
      //remove book from list
      LIST_OF_BOOKS.splice(LIST_OF_BOOKS.indexOf(book),1);
      challengeBooks.append(makeBookLayout(book));

    });
  });

  bookContainer.append(bookImage, bookTitle, bookDescription, bookRemoveButton);

  return bookContainer
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

   return challenge;
}