const dropDownTrigger = document.getElementById('dropDownTrigger');
const dropDown = document.getElementById('dropDown');

let overDropDown = false;


dropDownTrigger.addEventListener('mouseover', function() {

	dropDown.style.display="inline-block";


}, false);

dropDown.addEventListener('mouseover', function() {

	dropDown.style.display="inline-block";
	overDropDown = true;

}, false);


dropDown.addEventListener('mouseleave', function() {

	dropDown.style.display="none";
	overDropDown = false;

}, false);

dropDownTrigger.addEventListener('mouseout', function() {

	setTimeout(() => {
		if(overDropDown === false) {
			dropDown.style.display="none";
		} else return
	}, 100)


}, false);
