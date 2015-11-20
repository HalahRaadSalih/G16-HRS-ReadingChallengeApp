
window.onload = function(){
    googleBooksSearch();
}

function googleBooksSearch(){

  var userInput, searchUrl, results;
  var outputArea = $("#challengeBookRow");
  var googleBooksAPIRequest;

  userInput = $('#searchBooks');

  userInput.data('oldVal', userInput.val());

  userInput.on('change', function(event){
    //on change of text input, prevent default behvior
    event.preventDefault();
    // if the text field is empty, clear the screen
    if( !$(this).val() ) {
      $('col-md-3').remove();
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
        results = [];
        // remove previous item on screen
        $('col-md-3').remove();

        //for each item, create new book object and push it to results
        data.items.forEach(function(item){

          var volumeInfo = item.volumeInfo;
          var book = makeBook(volumeInfo);

          outputArea.append(makeBookLayout(book));

          });
        });

      googleBooksAPIRequest.fail(function(error){
        // remove existing divs 
        $('col-md-3').remove();

        console.log(error);
        outputArea.append("<li>" + error.responseText +"</li>");
      });

    }
  });

  // prevent default behaior for the create challenge button
  $('#createChallenge').on('click', function(event){
    event.preventDefault();
  })
  
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

  // append those elements to the book container
  bookContainer.append(bookImage, bookTitle, bookDescription, bookAddButton);

  return bookContainer;
}

