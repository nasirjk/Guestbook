// Create variable for contact method container
var contactContainer = $.contactMethods;
// Add initial contact method input box
addContactMethod();

// Called on click of "Done" action bar button
function signBook() {
	// Get values from text boxes (excluding contact details)
	var firstName = $.firstName.value;
	var lastName = $.lastName.value;
	var comment = $.comment.value;
	
	// Checks if these fields were left empty and reminds the user to fill them out
	//  before it saves the guest
	if(firstName == "" || lastName == "") {
		alert("Please enter your name before saving");
	}
	else 
	{
		// else : save the guest to the database and return to main screen
		// Get collections
		var guests = Alloy.Collections.Guestbook;
		guests.fetch();
		var contacts = Alloy.Collections.Contact;
		contactInfo.fetch();
		
		// Create new guest entry, populate with info from textfields
		// set sign date to "now"
		var newGuest = Alloy.createModel('guests', {
			firstName : firstName,
			lastName : lastName,
			signDate : new Date(),
			comment : comment
		});
		
		// Add guest entry to collection
		guests.add(newGuest);
		newGuest.save();
		
		// Get array of contact methods
		var contactMethods = contactContainer.children;
		
		for(i=0; i< contactMethods.length; i++) {
			var children = contactMethods[i].children;
			
			// Get data from the picker and textfield
			var type = children[0].getSelectedRow(0).title;
			var value = children[1].value;
			
			// Ignore contact methods that weren't correctly filled out
			//  eg. user clicked "add contact method" and then changed their mind
			if(type != "" && value != "" && type != undefined && value != undefined) {
				// Add contact method to database
				var newContact = Alloy.createModel('Contact', {
					contactType : type,
					contactValue : value,
					guestId : newGuest.get('guestId')
				});
				contactInfo.add(newContact);
				newContact.save();
			}
		}
		$.signGuestbook.close();
	}
}

// Adds another contact method input to the contact methods section
function addContactMethod() {
	var newMethod = Alloy.createController("contactinputs", {}).getView();
	contactContainer.add(newMethod);
}
