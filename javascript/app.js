
window.onload = function(){
    googleBooksSearch();
}

function googleBooksSearch(){

  var userInput, searchUrl, results;
  var outputArea = $("#bookRow");
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
        $('col-md-3').remove();
        console.log(error);
        outputArea.append("<li>" + error.responseText +"</li>");
      });

    }
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
  var bookContainer = $("<div>").addClass("col-md-3");
 
  var bookImage = $("<img>").attr("src",book.image);
  var bookTitle = $('<h4>').html(book.title);

  var bookDescription = $("<p>");
  bookDescription.html(book.description.substr(0,200));
 
  var bookAddButton = $("<a>").addClass("btn btn-info");
  bookAddButton.html("Add book");

  bookContainer.append(bookImage, bookTitle, bookDescription, bookAddButton);

  return bookContainer;
}

