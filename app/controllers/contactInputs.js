var args = arguments[0] || {};

var picker = $.contactPicker;

picker.addEventListener('change',setTextFieldType);
picker.setSelectedRow(0,0);


// Event listener for picker onChange
function setTextFieldType(){
	var selectedRow = picker.getSelectedRow(0).title;
	var textField = $.valueText;
	
	// Set hintText and keyboardType accordingly
    if(selectedRow == "Home phone" || selectedRow == "Cell phone") {
    	textField.hintText = "Phone number...";
    	textField.keyboardType = Titanium.UI.KEYBOARD_PHONE_PAD;
    }
    else if(selectedRow == "Email") { 
    	textField.hintText = "Email...";
    	textField.keyboardType = Titanium.UI.KEYBOARD_EMAIL;
    }
}