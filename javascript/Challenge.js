/*
	Challenge object has the following variables
	name : the name of the challenge,
	description: the challenge description
	duration : how long it takes to finish the challenge,
	books : the list of books 
*/
var Challenge = function(name, description, duration){
	this.name = name;
	this.description = description;
	this.duration = duration;

	//bookcounter is initially empty
	this.bookCounter = 0;

	//books are initially empty
	this.books = [];

	//challenge initial status is unfinished;
	this.status = false;
}

// Role : addes a new book to books
Challenge.prototype.addBook = function(book) {
	// check it already exists before adding it
	if(this.books.indexOf(book) === -1){
		this.books.push(book);

		//update bookcounter
		this.bookCounter++;
	}
	
};

// Role : removes a book from books
Challenge.prototype.removeBook = function(book){
	//remove book from books
	this.books.splice(this.books.indexOf(book),1);

	//update bookcounter
	this.bookCounter--;
}

// Role : finish a book 
Challenge.prototype.finishBook = function(book) {
	book.read = true;
};

// Role : finish a challenge
Challenge.prototype.finish = function(){
	// check if all books statuses are true
	function isRead(book, index, array) {
  	
  		return book.read === true;
	}

	if(this.books.every(isRead)){
		// change status to true
		this.status = true;
	}
	
}