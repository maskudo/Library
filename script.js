const form = document.querySelector("form")
const tableBody = document.querySelector("#tableBody")
const submit = document.querySelector("#submit-button")
let removeButtons = tableBody.querySelectorAll(".remove")
let readButtons = tableBody.querySelectorAll(".status")
let myLibrary = []

function Book(title,pages,author,status){
    this.title = title
    this.pages = pages
    this.author = author
    if(status){
        this.read = 'Read'
    }
    else{
        this.read = 'Unread'
    }
}

function addToLibrary(book){
    myLibrary.push(book)
}
//check for duplicate books
function isDuplicate(book){
    for(let i=0;i<myLibrary.length;i++){
        if(book.title == myLibrary[i].title &&
            book.author== myLibrary[i].author &&
            book.pages== myLibrary[i].pages){
                return true
            }
    }
    return false
}
//extract book details from the form and push to library
function processForm(){
    let title = form.elements[0].value
    let pages = form.elements[1].value
    let author = form.elements[2].value
    let status = form.elements[3].checked
    if(title!='' && pages!='' && author!=''){
        let newBook = new Book(title,pages,author,status)
        if(!isDuplicate(newBook)){
            addToLibrary(newBook)
        }
    } 
}
//gives function to remove button
function activateRemoval(){
    removeButtons.forEach(removeButton =>{
        removeButton.addEventListener('click',()=>{
            rowId = removeButton.classList[1]
            for(let j=0; j<myLibrary.length;j++){
                if(`${myLibrary[j].title}${myLibrary[j].author}`==rowId){
                    for(let i=0;i<myLibrary.length;i++){
                        if(myLibrary[i]==myLibrary[j]){
                            myLibrary.splice(i,1)
                            displayTable()
                        }
                    }
                }
            }
        })
    })
}
//gives function to read button
function toggleRead(){
    readButtons.forEach(readButton =>{
        readButton.addEventListener('click',()=>{
            rowId = readButton.classList[1]
            for(let i=0;i<myLibrary.length;i++){
                if(`${myLibrary[i].title}${myLibrary[i].author}`==rowId){
                    for(let j=0;j<myLibrary.length;j++){
                        if(myLibrary[i]==myLibrary[j]){
                            if(myLibrary[i].read=='Unread'){
                                myLibrary[i].read='Read'
                            }
                            else{
                                myLibrary[i].read='Unread'
                            }
                            displayTable()
                        }
                    }
                }
            }
        })
    })
}

function displayTable(){
    tableBody.innerHTML = ''
    myLibrary.forEach((book)=>{
        let content = `
        <tr>
            <td>${book.title}</td>
            <td>${book.pages}</td>
            <td>${book.author}</td>
            <td><button type='button' class='status ${book.title}${book.author}'>${book.read}</button></td>
            <td><button type='button' class='remove ${book.title}${book.author}'>Remove</button></td>
        </tr>
        `
        tableBody.innerHTML += content
    })
    removeButtons = tableBody.querySelectorAll(".remove")
    readButtons = tableBody.querySelectorAll(".status")
    activateRemoval()
    toggleRead()
}

submit.addEventListener("click",()=>{
    processForm()
    displayTable()
    form.reset()
})
//initial table display
displayTable()
