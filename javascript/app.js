
window.onload = function(){
    googleBooksSearch();
}

function googleBooksSearch(){

  var userInput, searchUrl, results;
  var outputArea = $("#main");
  var googleBooksAPIRequest;

  userInput = $('#searchBooks');

  userInput.data('oldVal', userInput.val());

  userInput.on('change', function(event){
    event.preventDefault();
    if( !$(this).val() ) {
      $('li').remove();
    }

    else{
      searchUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + userInput.val();

      googleBooksAPIRequest = $.ajax({
        type:'GET',
        dataType:'json',
        url:searchUrl,
      });

      googleBooksAPIRequest.done(function(data){
        // console.log(data.items);

        results = data.items;
         $('li').remove();

        data.items.forEach(function(item){
          outputArea.append("<li>" + item.volumeInfo.title +"</li>");

          var volumeInfo = item.volumeInfo;
          var book = makeBook(volumeInfo);

          results.push(book);
          });

        console.log(results);

        });

      googleBooksAPIRequest.fail(function(error){

        $('li').remove();
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
function makeProductLayout (book) {
  var productContainer = $("<div>").addClass("col-md-3");
 
  var productImage = $("<img>").attr("src",image);
 
  var productDescription = $("<p>");
  productDescription.html(description);
 
  var productAddButton = $("<a>").addClass("btn btn-info");

  productContainer.append(productImage, productDescription, productLikeButton, productBuyButton);

  return productContainer;
}

