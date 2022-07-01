// College Library Website 

// add(localStorage.data);
add();
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

// Make the add function outside the class to solve the reloading problem
function add(){
        // console.log("Adding to UI");
        //let tableBody = document.getElementById('tableBody');
        // let uiString = `<tr>
        //                     <td>${book.name}</td>
        //                     <td>${book.author}</td>
        //                     <td>${book.type}</td>
        //                 </tr>`;
        // tableBody.innerHTML += uiString;
        let data=localStorage.getItem('data');
        let dataObj=[];
        if(data==null){
            dataObj=[];
        }
        else{
            dataObj=JSON.parse(data);
        }
        let html="";
        dataObj.forEach(function(element,index){
            html+=`<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button type="button" id="${index}" onclick="deleteBook(this.id)" class="btn btn-danger">Remove</button></td>
                 </tr>`;
        });
        let tableBody = document.getElementById('tableBody');
        if(dataObj.length!=0){
            tableBody.innerHTML=html;
        }
        else{
            tableBody.innerHTML="";
        }
    }
class Display {
    /*add() {
        console.log("Adding to UI");
        //let tableBody = document.getElementById('tableBody');
        // let uiString = `<tr>
        //                     <td>${book.name}</td>
        //                     <td>${book.author}</td>
        //                     <td>${book.type}</td>
        //                 </tr>`;
        // tableBody.innerHTML += uiString;
        let data=localStorage.getItem('data');
        let dataObj=[];
        if(data==null){
            dataObj=[];
        }
        else{
            dataObj=JSON.parse(data);
        }
        let html="";
        dataObj.forEach(function(element){
            html+=`<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                 </tr>`;
        });
        let tableBody = document.getElementById('tableBody');
        if(dataObj.length!=0){
            tableBody.innerHTML=html;
        }
        else{
            tableBody.innerHTML="";
        }
    }*/

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMsg) {
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type}" role="alert">
                                <strong>Message:</strong>${displayMsg}
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 4000);
    
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    let data=localStorage.getItem('data');
    let dataObj;
    if(data==null){
        dataObj=[];
    }
    else{
        dataObj=JSON.parse(data);
    }
    let myObj={
        name:name,
        author:author,
        type:type
    }
    dataObj.push(myObj);
    localStorage.setItem('data',JSON.stringify(dataObj));
    name.value="";
    author.value="";
    type.value="";

    if (display.validate(book)) {

        // display.add();
        add();
        display.clear();
        display.show('success', 'Your book has been successfully added');
        localStorage.setItem("Entries",JSON.stringify(book));
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}



// Removing the book

function deleteBook(index){
    let data=localStorage.getItem('data');
    let dataObj;
    if(data==null){
        dataObj=[];
    }
    else{
        dataObj=JSON.parse(data);
    }
    dataObj.splice(index,1);
    localStorage.setItem('data',JSON.stringify(dataObj));
    add();
}
