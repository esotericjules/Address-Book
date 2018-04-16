var userName = document.getElementById("user");
var phoneNo = document.getElementById("phoneNo");
var email = document.getElementById("email");
var address = document.getElementById("address");
var form = document.getElementById('contactForm');

var list_Ul = document.getElementById("list");
var contacts = document.getElementsByClassName('contactName');

var saveEdit = document.getElementsByClassName('editButton');
var editing = document.getElementById('edited');
var displayList = document.getElementsByClassName("addressInput");

function AddressBookStorage(name, phoneNo, email, address) {
    this.name = name;
    this.phoneNo = phoneNo;
    this.email = email;
    this.address = address;

}

function go() {

    //Get saved Items from Local Storage on Page Load
    let savedItems = JSON.parse(localStorage.getItem("addressBook"));
    if (savedItems !== null) {
        for (var i = 0; i < savedItems.length; i++) {
            let text = savedItems[i].name;
            let li = document.createElement("li");
            li.setAttribute("id", "list_item");
            li.innerHTML = '<div class="contactName" data-attr-item=" ' + i + '"><input class="contact" value="' + text + '">' + '<input class="addressInput" style="width: 100%;  display: none;"  type ="text" value="' + savedItems[i].phoneNo + '  |  ' + savedItems[i].email + '  |  ' + savedItems[i].address + '" >' + '<button class="btns editButton" data-attr-index="' + i + '" id="edited">SAVE</button>' + '<button class="btns deleteButton">Delete</button></div>'            
            
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
            var newAddress = new AddressBookStorage(name, phoneNum, email_, address_);

            let savedAddress = JSON.parse(localStorage.getItem('addressBook'));

            if (savedAddress !== null) {

                savedAddress.push(newAddress);

                localStorage.setItem("addressBook", JSON.stringify(savedAddress));

            } else {
                localStorage.setItem("addressBook", JSON.stringify([newAddress]));

            }

            var savedItems = JSON.parse(localStorage.getItem("addressBook"));

            let text = newAddress.name

            let li = document.createElement("li");
            li.setAttribute("id", "list_item");
            li.innerHTML = '<div class="contactName" data-attr-item=" ' + i + '"><input class="contact" value="' + text + '">' + '<input class="addressInput" style="width: 100%;  display: none;"  type ="text" value="' + savedItems[i].phoneNo + '  |  ' + savedItems[i].email + '  |  ' + savedItems[i].address + '" >' + '<button class="btns editButton" data-attr-index="' + i + '" id="edited">SAVE</button>' + '<button class="btns deleteButton">Delete</button></div>'            
            
            list_Ul.appendChild(li);

            displayContacts();// Display Contact Details after submit
            
            alert('The Contact has been saved');
            
        }

        form.reset();

        editContact();// Edit Contact Details after submit
        deleteContact();// Delete Contact Details after submit

    } //End of On Submit click

    //Display contact details on click of contact name 
    function displayContacts() {
        let clickContact = document.getElementsByClassName('contact');
        let displayList = document.getElementsByClassName("addressInput");
        let displayEditButtons = document.getElementsByClassName("editButton");
        let displayDeleteButtons = document.getElementsByClassName("deleteButton");
        let contact_div = document.getElementsByClassName("contactName");

        for (let x = 0; x < clickContact.length; x++) {
            let item = clickContact[x];
            item.onclick = function (event) {
                if (displayList[x].style.display === 'none') {
                    displayList[x].style.display = 'block';
                    displayEditButtons[x].style.display = 'inline-block';
                    displayDeleteButtons[x].style.display = 'inline-block';
                    contact_div[x].style.padding = "16px 5px";

                } else {
                    displayList[x].style.display = 'none';
                    displayEditButtons[x].style.display = 'none';
                    displayDeleteButtons[x].style.display = 'none';
                    contact_div[x].style.padding = "0";

                }
            }

        }
    }

    displayContacts();
    //Edit contact details on click of edit button
    function editContact() {

        for (let y = 0; y < saveEdit.length; y++) {
            let editItem = saveEdit[y];

            editItem.onclick = function (f) {
                let index = f.currentTarget.getAttribute('data-attr-index');
                let updatedAddress = displayList[y].value;
                let info = updatedAddress.split("|");
                let contact = document.getElementsByClassName('contact');
                let contactValue = contact[y].value;
            

                name = contactValue;
                phoneNum = info[0];
                email_ = info[1];
                address_ = info[2];

                let savedAddress = JSON.parse(localStorage.getItem('addressBook'));

                if (savedAddress !== null) {
                    savedAddress[index].name = name;
                    savedAddress[index].phoneNo = phoneNum;
                    savedAddress[index].email = email_;
                    savedAddress[index].address = address_;

                    localStorage.setItem("addressBook", JSON.stringify(savedAddress));

                }
                alert('The Edited Contact has been saved');
            }

        }
    }

    //Delete Contact on click
    function deleteContact() {
        let deleting = document.getElementsByClassName('deleteButton');
        for (let d = 0; d < deleting.length; d++) {
            let deleteItem = contacts[d];


            let deleteClick = deleting[d];

            deleteClick.onclick = function (f) {
                let index = this.parentNode.getAttribute('data-attr-item');
                let item = this.parentNode.parentNode;
                let updatedAddress = displayList[d].value;
                let contact = document.getElementsByClassName('contact');
                let contactValue = contact[d].value;

                let info = updatedAddress.split("|");

                item.remove();

                name = contactValue;
                phoneNum = info[0];
                email_ = info[1];
                address_ = info[2];

                let savedAddress = JSON.parse(localStorage.getItem('addressBook'));
                savedAddress.splice(index, 1);

                localStorage.setItem("addressBook", JSON.stringify(savedAddress));
                alert('Contact Successfully Deleted');

            }
        }
    }

    editContact();// Edit Contact Details on page load
    deleteContact();// Delete Contact Details on page load
}










