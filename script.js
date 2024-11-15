// fetch('https://acb-api.algoritmika.org/api/transaction');

const button = document.querySelector('.button-container');
const boxes = document.querySelector('.boxes');
const module = document.querySelector('.module');

let newTransaction = {
	from: 'Peri',
	to: 'Minure',
	amount: 200,
};
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
