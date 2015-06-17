var args = arguments[0] || {};

// Get guest collection
var guests = Alloy.Collections.Guestbook;
guests.fetch();

// Get guest by id
var guest = guests.where({guestId : args.guestId});
guest = guest[0];

// Fill in name, comment, date
$.name.text = guest.get("firstName") + " " + guest.get("lastName");
$.comment.text = "\"" + guest.get("comment") + "\"";

// Convert date from DB (stored as string) to a date object
var dateDate = new Date(guest.get("signDate"));
// Use date object to create human readable string
var dateString = "Signed on " + dateDate.getDate() + "/" + dateDate.getMonth() + "/" + dateDate.getFullYear(); 
$.date.text = dateString;

var contactContainer = $.contactContainer;

// get guest details from database
var contactinfo = Alloy.Collections.contactinfo;
var guestContactInfo = contactinfo.where({guestId : args.guestId});

// Add labels to display each contact method
for(i=0; i<guestContactInfo.length; i++) {
	var newMethod = Alloy.createController("contactdisplay", {
		contactType : guestContactInfo[i].get("contactType"),
		contactValue : guestContactInfo[i].get("contactValue")
	}).getView();
	
	contactContainer.add(newMethod);
}

function removeSignature() {
	// Create dialog asking user to confirm deletion
	var confirm = Titanium.UI.createAlertDialog({
        title: 'Remove guest',
        message: 'Are you sure you want delete this guest signature?',
        buttonNames: ['Yes', 'No'],
        cancel: 1
	});
	
	confirm.addEventListener('click', function(e){
        if (e.cancel === e.index || e.cancel === true) {
        	// do nothing, close dialog
        	return false;
        }
        if (e.index === 0){
            // destroy the model from persistence, which will in turn remove
			// it from the collection, and model-view binding will automatically
			// reflect this in the tableview
			for(i=0; i<guestContactInfo.length; i++) {
				guestContactInfo[i].destroy();
			}
			guest.destroy();
			// Close the guestdetails window
			$.window.close();
        }
	});
	// Show dialog
	confirm.show();
}
