
window.onload = function(){
    googleBooksSearch();
}

function googleBooksSearch(){

  var userInput, searchUrl, results;
  var outputArea = $("#main");
  var googleBooksAPIRequest;

  userInput = $('#searchBooks');

  userInput.data('oldVal', userInput.val());
  // setInterval(function() { ObserveInputValue($('#searchBooks').val()); }, 100);

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
  // userInput.bind('propertychange change input', _.throttle(function(){
  //   , 800));

  // userInput.bind('propertychange keyup input', function(event){

  //   //if search field is clear, remove li elements from screen
    
  //   }
    
 

  // });

  
}