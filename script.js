// fetch('https://acb-api.algoritmika.org/api/transaction');

const button = document.querySelector('.button-container');
const boxes = document.querySelector('.boxes');
const box = document.createElement('div');
box.classList.add('transaction-box');
const module = document.querySelector('.module');

let newTransaction = {
	from: 'Periiii',
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
		box.classList.add('transaction-box');

		box.innerHTML = `
			<div class="address-container">
				<div class="label">From</div>
				<div class="address">${element.from}</div>
			</div>
			<svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 5l7 7-7 7M5 12h14"></path>
			</svg>
			<div class="address-container">
				<div class="label">To</div>
				<div class="address">${element.to}</div>
			</div>
			<div class="amount" style="grid-column: 1 / -1; text-align: center; margin-top: 0.5rem;">
				${element.amount}$
			</div>
		`;
		if (element.from !== '' && element.to !== '') {
			boxes.appendChild(box);
		}
		//! trash
		const trash = document.createElement('section');
		trash.innerHTML = `
			<span class="trash">
				<span></span>
				<i></i>
			</span>
			`;

		//! edit
		const editPen = document.createElement('div');
		editPen.classList.add('section2');
		editPen.innerHTML = `
		<div class="edit-container">
    <svg class="edit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        class="pencil-body"
        d="M14.8 4.8L19.2 9.2L7.2 21.2H2.8V16.8L14.8 4.8Z" 
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path 
        class="pencil-top"
        d="M14.8 4.8L17 2.6L21.4 7L19.2 9.2" 
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  </div>
		`;

		// box.appendChild(fromName);
		// box.appendChild(toName);
		// box.appendChild(amount);

		box.appendChild(editPen);
		box.appendChild(trash);

		// boxes.appendChild(box);
	});
}
async function deleteTransaction() {
	let response = await fetch(
		'https://acb-api.algoritmika.org/api/transaction',
		{
			method: 'DELETE',
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
