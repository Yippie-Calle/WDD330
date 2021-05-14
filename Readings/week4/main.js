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