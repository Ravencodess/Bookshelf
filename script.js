// initialize the library to an empty array
const myLibrary = [];

// create a constructor function to create new book instances
function Book(title, author, pages, read) {
  this.Title = title;
  this.Author = author;
  this.Pages = pages;
  this.Read = read;
}

// add a prototype function to toggle the book read status
Book.prototype.readToggle = function(input) {
  if(input){
    this.Read = 'no';
  }else{
    this.Read = 'yes';
  }
}

// create a function that creates a new book from the users input and pushes it to the library
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book)
  console.log(myLibrary);
}

// i created template books to visualize the table 
const book1 = new Book('The Lord Of The Rings', 'GGR Martins', 478, 'yes');
const book2 = new Book('Fifty Shades Of Grey', 'Camila Ceballo', 350, 'no');
const book3 = new Book('Harry Potter and the sorcerer\'s stone', 'JK Rowling', 597, 'yes');
const book4 = new Book('A Tale Of Fire And Ice', 'Martin Scorsecee', 862, 'yes');

myLibrary.push(book1, book2, book3, book4);


// create the table header using javascript and append it to the html table div
const books = myLibrary[0];
const tableWrapper = document.querySelector('.table-wrapper')
const table = document.createElement('table');
const headRow = document.createElement('tr');
const headRowData =  Object.keys(books)
headRowData.forEach(data => {
  const tableHead = document.createElement('th');
  tableHead.append(data)
  headRow.appendChild(tableHead)
  table.appendChild(headRow)
})
tableWrapper.appendChild(table);

// create a function that selects the last item on the libray and append it to the end of the table
function displayNewBook(){
  const book = myLibrary.slice(-1)[0]
  console.log(book);
  const tableRow = document.createElement('tr');
  const titleData = document.createElement('td');
  const authorData = document.createElement('td');
  const pagesData = document.createElement('td');
  const readStatus = document.createElement('td');

  tableRow.style = "border-bottom: 1px solid #000;"
  titleData.textContent = book.Title;
  authorData.textContent = book.Author;
  pagesData.textContent = book.Pages;
  readStatus.textContent = book.Read;
  readStatus.style = 'text-transform: uppercase;'   
  
  // create a read button to toggle the read status of the current book
  const readButton = document.createElement('button');
  readButton.classList.add('toggle')
  readButton.textContent = 'completed'
  readButton.addEventListener('click', () => {
    if(book.Read === 'yes'){
      book.readToggle(true)
      readStatus.textContent = 'no'
    } else{
      book.readToggle(false)
      readStatus.textContent = 'yes'
    }
  })
   

  // create a remove button to remove the current book 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove book'
  removeButton.addEventListener('click', () =>{
    table.removeChild(tableRow)
  })

  tableRow.appendChild(titleData);
  tableRow.appendChild(authorData);
  tableRow.appendChild(pagesData);
  tableRow.appendChild(readStatus);
  tableRow.appendChild(readButton);
  tableRow.appendChild(removeButton);
  
  table.appendChild(tableRow)
}  

// grab all the form elements from the DOM
const titleInput= document.getElementById('title');
const authorInput= document.getElementById('author');
const pagesInput= document.getElementById('pages');
const readEls = document.querySelectorAll('.read-status');
const submitBtn = document.getElementById('submit');
// create an event listener that is triggered whenever the submit button is clicked
submitBtn.addEventListener('click', (e) =>{
  const inputFields = [...document.querySelectorAll('input')];
  
  // check if all the input fields have been filled
  const allValid = inputFields.every(input => input.reportValidity())
  if (allValid){
    e.preventDefault();

    // create a function that capitalizes the first letter of each word of the user input
  function captitalize(input) {
        return input.split(' ').map(word => word.charAt(0).toUpperCase() + word.substr(1)).join(' ')
    }

    const bookTitle = captitalize(titleInput.value);
    const authorName = captitalize(authorInput.value);
    const pages = pagesInput.value;

    // create a check for the pages input to confirm if its a valid number
    if(isNaN(pages) || pages < 1){
      alert('please enter a valid page number')
      return false
    }

    //this loops the radio buttons and stores its value into a variable and then clears it when the page reloads
    let readInfo = undefined
    readEls.forEach(option => {
      if (option.checked){
        readInfo = option.value
        option.checked = false
      }
    })
    
    // take all user input and call the function that turns it into a book object and adds it to the array
    addBookToLibrary(bookTitle, authorName, pages, readInfo);

    //the new book becomes the last item in the array and this function displays it
    displayNewBook()

    // clear all inputs after submitting
    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''

  } else return
})


