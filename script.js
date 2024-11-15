// fetch('https://acb-api.algoritmika.org/api/transaction');

const button = document.querySelector('.button-container');
const boxes = document.querySelector('.boxes');
const box = document.createElement('div');
box.classList.add('box');
const module = document.querySelector('.module');

let newTransaction = {
	from: 'Peri',
	to: 'Minure',
	amount: 200,
};
async function apiData() {
	let response = await fetch(
		'https://acb-api.algoritmika.org/api/transaction',
		{
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
			// body: JSON.stringify(newTransaction),
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	let data = await response.json();
	data.forEach((element) => {
		const box = document.createElement('div');
		box.classList.add('box');

		const fromName = document.createElement('p');
		fromName.classList.add('fromName');
		fromName.textContent = `From: ${element.from}`;

		const toName = document.createElement('p');
		toName.classList.add('toName');
		toName.textContent = `To: ${element.to}`;

		const amount = document.createElement('p');
		amount.classList.add('amount');
		amount.textContent = `Amount: ${element.amount}`;

		box.appendChild(fromName);
		box.appendChild(toName);
		box.appendChild(amount);
		boxes.appendChild(box);
	});
}
async function deleteTransaction() {}
async function editTrsansaction() {}
async function addnewTransaction() {
	let response = await fetch(
		'https://acb-api.algoritmika.org/api/transaction',
		{
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(newTransaction),
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	let data = await response.json();
	console.log(data);
}

button.addEventListener('click', addnewTransaction);

document.addEventListener('DOMContentLoaded', apiData);
