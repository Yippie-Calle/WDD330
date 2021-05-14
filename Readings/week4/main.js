const form = document.forms['hero'];
form.addEventListener('submit', makeHero, false);

function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    const hero = {}; // create an empty object
    hero.name = form.heroName.value; // create a name property based on the input field's value
    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}
hero.realName = form.realName.value; // Enhance for passwords. 
// This will go trhough the check box and check to see if something was checked and make sure its stored and recorded. 
hero.powers = [];
for (let i=0; i < form.powers.length; i++) {
    if (form.powers[i].checked) {
        hero.powers.push(form.powers[i].value);
    }
}
// hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value); <--- this will produce the same result as the one above. 
hero.category = form.category.value; // this checks what was chosen in the Radio Category
hero.age = form.age.value; // This grabs age of hero. 
hero.city = form.city.value; // Selects from Drop down
hero.origin = form.origin.value;// Origin Story
form.addEventListener('submit',validate,false); // Validator making an appropriate name to be written
function validate(event) {
    const firstLetter = form.heroName.value[0];
    if (firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with X!');
    }
}
//This provides instant feed back. Even before the user clicks submit. 
const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);
function validateInline() {
    const heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')){
    error.style.display = 'block';
    } else {
    error.style.display = 'none';
    }
}
//The following function will disable the button if an input field is empty:
function disableSubmit(event) {
    if(event.target.value === ''){
        document.getElementById('submit').disabled = true;
    } else {
        document.getElementById('submit').disabled = false;
    }
}