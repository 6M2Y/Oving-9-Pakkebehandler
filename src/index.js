import coreJsCompat from '@babel/preset-env/data/core-js-compat';
import fs, { read } from 'fs';

let students = [ { name: 'kari', email: 'kari@yahoo.com' }, { name: 'Miny', email: 'Miny@yahoo.com' } ];

const ul = document.getElementById('studentList'); //ul from html
const addBtn = document.getElementById('addstudent'); // addstudent btn

//event listene for addstudent btn
addBtn.addEventListener('click', () => {
	let newName = document.getElementById('name');
	let newEmail = document.getElementById('email');
	//make sure it is not empty, if so...alert feil melding
	if (newName.value === '' || newEmail.value === '') return alert('Name or email is empty');
	else {
		//if correct data, create a new student and push it to the students array
		let newstudent = { name: newName.value, email: newEmail.value };
		students.push(newstudent);
		//we write to the file
		writeToFile();
		//read it again
		readFile();
		newName.value = '';
		newEmail.value = '';
	}
});

function writeToFile() {
	fs.writeFile('src/data.json', JSON.stringify(students), () => {});
}

function readFile() {
	//clear the list
	while (ul.firstChild) ul.removeChild(ul.firstChild);
	//read from the file data.json
	fs.readFile('src/data.json', (error, data) => {
		if (error) return console.log(error.message);
		else {
			data = JSON.parse(data);
			data.forEach((element, index) => {
				//passing the data [a student] and the index
				displayData(element, index);
			});
		}
	});
}

writeToFile(); //write the students array to the file
readFile(); //to display at start

//this function create the list elements and populates them with the data
function displayData(element, index) {
	let li = document.createElement('li'); //list element
	let btn = document.createElement('button'); //for cancel btn
	btn.innerText = 'X';
	btn.style.margin = '5px';
	btn.style.color = 'white';
	btn.style.background = 'red';

	//eventlistener for the cancel button,
	btn.addEventListener('click', () => {
		li.style.display = 'none';
		students.splice(index, 1);
		writeToFile();
		readFile();
	});
	li.appendChild(document.createTextNode(`${element.name}, ${element.email}`));
	li.appendChild(btn);
	ul.appendChild(li);
}
