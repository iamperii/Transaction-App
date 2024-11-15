// fetch('https://acb-api.algoritmika.org/api/transaction');

const button = document.querySelector('.button-container');
const boxes = document.querySelector('.boxes');
const module = document.querySelector('.module');

const fromName = document.createElement('p');
fromName.classList.add('fromName');
const toName = document.createElement('p');
toName.classList.add('toName');
const amount = document.createElement('p');
amount.classList.add('amount');

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
		fromName.textContent = element.from;
		toName.textContent = element.to;
		amount.textContent = element.amount;
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
