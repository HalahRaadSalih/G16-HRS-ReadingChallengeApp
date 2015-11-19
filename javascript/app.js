
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
        results = data.items;
         $('li').remove();
        results.forEach(function(item){
        outputArea.append("<li>" + item.volumeInfo.title +"</li>");
        });
      });

      googleBooksAPIRequest.fail(function(error){
        $('li').remove();
        console.log(error);
        outputArea.append("<li>" + error.responseText +"</li>");
      });

    }
  });
  
}

