var userName = document.getElementById("user");
var phoneNo = document.getElementById("phoneNo");
var email = document.getElementById("email");
var address = document.getElementById("address");
var form = document.getElementById('contactForm');

var list_Ul = document.getElementById("list");
var contacts = document.getElementsByClassName('contactName');

function AddressBookEntry(name, phoneNo, email, address) {
    this.name = name;
    this.phoneNo = phoneNo;
    this.email = email;
    this.address = address;

}

function go() {

    //Get saved Items from Local Storage on Page Load
    var savedItems = JSON.parse(localStorage.getItem("addressBook"));
    if (savedItems !== null) {
        for (var i = 0; i < savedItems.length; i++) {
            var text = savedItems[i].name;
            var li = document.createElement("li");
            li.setAttribute("id", "list_item");
            li.innerHTML = '<div class="contactName" data-attr-item=" ' + i + '"><h4 class="contact"> ' + text + '</h4>' + '<input class="addressInput" style="width: 100%;  display: none;"  type ="text" value=" ' + savedItems[i].phoneNo + ' || ' + savedItems[i].email + ' ||  ' + savedItems[i].address + ' " >' + '<button class="btns editButton" data-attr-index="' + i + '" id="edited">SAVE</button>' + '<button class="btns deleteButton">Delete</button></div>'
            list_Ul.appendChild(li);

        }
    }

    // create data structure
    var addressBook = { entries: [] };  // this should be JSON array object

    // create onclick function for button
    document.getElementById("submitForm").onclick = function (event) {
        event.preventDefault();
        // get values from each form fields
        name = userName.value;
        phoneNum = phoneNo.value;
        email_ = email.value;
        address_ = address.value;

        if (name === '') {
            alert("You cannot save an empty contact");
        } else {
            // create new object using consturctor that will be added onclick of submit button
            var newAddress = new AddressBookEntry(name, phoneNum, email_, address_);

            var savedAddress = JSON.parse(localStorage.getItem('addressBook'));

            if (savedAddress !== null) {

                savedAddress.push(newAddress);

                localStorage.setItem("addressBook", JSON.stringify(savedAddress));

            } else {
                localStorage.setItem("addressBook", JSON.stringify([newAddress]));

            }
            alert('The Contact has been saved');
            
            // var text = newAddress.name + ' ' + newAddress.phoneNo + ' ' + newAddress.email + ' ' + newAddress.address; 
            var savedItems = JSON.parse(localStorage.getItem("addressBook"));

            var text = newAddress.name

            var li = document.createElement("li");
            li.setAttribute("id", "list_item");
            li.innerHTML = '<div class="contactName" data-attr-item=" ' + i + '"><h4 class="contact"> ' + text + '</h4>' + '<input class="addressInput" style="width: 100%;  display: none;"  type ="text" value=" ' + savedItems[i].phoneNo + ' || ' + savedItems[i].email + ' ||  ' + savedItems[i].address + ' " >' + '<button class="btns editButton" data-attr-index="' + i + '" id="edited">SAVE</button>' + '<button class="btns deleteButton">Delete</button></div>'
            console.log(li);
            list_Ul.appendChild(li);

            var clickContact = document.getElementsByClassName('contact');
            var displayList = document.getElementsByClassName("addressInput");
            var displayEditButtons = document.getElementsByClassName("editButton");
            var displayDeleteButtons = document.getElementsByClassName("deleteButton");
           


            for (let x = 0; x < clickContact.length; x++) {
                var item = clickContact[x];
                item.onclick = function (event) {
                    if (displayList[x].style.display === "none") {

                        displayList[x].style.display = 'block';
                        displayEditButtons[x].style.display = 'inline-block';
                        displayDeleteButtons[x].style.display = 'inline-block';

                    } else {
                        displayList[x].style.display = "none";
                        displayEditButtons[x].style.display = 'none';
                        displayDeleteButtons[x].style.display = 'none';
                    }
                   
                }

            }


        }

        form.reset();

         //Edit contact details on click of edit button
    var saveEdit = document.getElementsByClassName('editButton');
    var editing = document.getElementById('edited');

    console.log(saveEdit);
    for (let y = 0; y < saveEdit.length; y++) {
        var editItem = saveEdit[y];

        editItem.onclick = function (f) {
            var index = f.currentTarget.getAttribute('data-attr-index');
            var updatedAddress = displayList[y].value;
            var info = updatedAddress.split("||");
        
            name = '';
            phoneNum = info[0];
            email_ = info[1];
            address_ = info[2];

            var savedAddress = JSON.parse(localStorage.getItem('addressBook'));

            if (savedAddress !== null) {
                savedAddress[index].phoneNo = phoneNum;
                savedAddress[index].email = email_;
                savedAddress[index].address = address_;

                localStorage.setItem("addressBook", JSON.stringify(savedAddress));

            }
            alert('The Edited Contact has been saved');
        }

    }

    //Delete Contact on click
    var deleting = document.getElementsByClassName('deleteButton');

    console.log(deleting);
    for (let d = 0; d < deleting.length; d++) {
        var deleteItem = contacts[d];
      

        var deleteClick = deleting[d];

        deleteClick.onclick = function (f) {
            var index = this.parentNode.getAttribute('data-attr-item');
            var item = this.parentNode.parentNode;
            var updatedAddress = displayList[d].value;

            var info = updatedAddress.split("||");

            item.remove();

            name = '';
            phoneNum = info[0];
            email_ = info[1];
            address_ = info[2];

            var savedAddress = JSON.parse(localStorage.getItem('addressBook'));
            savedAddress.splice(index, 1);
        
            localStorage.setItem("addressBook", JSON.stringify(savedAddress));
            alert('Contact Successfully Deleted');
            
        }
    }

    }

    //Display contact details on click of contact name 
    var clickContact = document.getElementsByClassName('contact');
    var displayList = document.getElementsByClassName("addressInput");
    var displayEditButtons = document.getElementsByClassName("editButton");
    var displayDeleteButtons = document.getElementsByClassName("deleteButton");

    console.log(clickContact);
    console.log(displayList);


    for (let x = 0; x < clickContact.length; x++) {
        var item = clickContact[x];
        item.onclick = function (event) {
            if(displayList[x].style.display === 'none') {
            displayList[x].style.display = 'block';
            displayEditButtons[x].style.display = 'inline-block';
            displayDeleteButtons[x].style.display = 'inline-block';
            } else {
                displayList[x].style.display = 'none';
                displayEditButtons[x].style.display = 'none';
                displayDeleteButtons[x].style.display = 'none';
            }
        }

    }

    //Edit contact details on click of edit button
    var saveEdit = document.getElementsByClassName('editButton');
    var editing = document.getElementById('edited');

    console.log(saveEdit);
    for (let y = 0; y < saveEdit.length; y++) {
        var editItem = saveEdit[y];

        editItem.onclick = function (f) {
            var index = f.currentTarget.getAttribute('data-attr-index');
            var updatedAddress = displayList[y].value;
            var info = updatedAddress.split("||");
        
            name = '';
            phoneNum = info[0];
            email_ = info[1];
            address_ = info[2];

            var savedAddress = JSON.parse(localStorage.getItem('addressBook'));

            if (savedAddress !== null) {
                savedAddress[index].phoneNo = phoneNum;
                savedAddress[index].email = email_;
                savedAddress[index].address = address_;

                localStorage.setItem("addressBook", JSON.stringify(savedAddress));

            }
            alert('The Edited Contact has been saved');
        }

    }

    //Delete Contact on click
    var deleting = document.getElementsByClassName('deleteButton');

    console.log(deleting);
    for (let d = 0; d < deleting.length; d++) {
        var deleteItem = contacts[d];
      

        var deleteClick = deleting[d];

        deleteClick.onclick = function (f) {
            var index = this.parentNode.getAttribute('data-attr-item');
            var item = this.parentNode.parentNode;
            var updatedAddress = displayList[d].value;

            var info = updatedAddress.split("||");

            item.remove();

            name = '';
            phoneNum = info[0];
            email_ = info[1];
            address_ = info[2];

            var savedAddress = JSON.parse(localStorage.getItem('addressBook'));
            savedAddress.splice(index, 1);
        
            localStorage.setItem("addressBook", JSON.stringify(savedAddress));
            alert('Contact Successfully Deleted');
            
                   }
    }

}










