const button = document.querySelector('.button-container');
const boxes = document.querySelector('.boxes');

// for testing
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
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	let data = await response.json();
	data.forEach((element) => {
		const box = document.createElement('div');
		const transactionBox = document.createElement('div');

		transactionBox.classList.add('transaction-box');
		box.classList.add('box');
		transactionBox.innerHTML = `
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

		//! trash
		const iconContainer = document.createElement('div');
		iconContainer.classList.add('iconContainer');
		const trash = document.createElement('section');
		trash.innerHTML = `
		 <div class="trash-container">
    <svg class="trash-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        class="trash-lid"
        d="M5 5h14M15 5V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path 
        class="trash-body"
        d="M6 5h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5z"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path 
        class="trash-body"
        d="M10 9v8M14 9v8"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  </div>
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

		if (element.from !== '' && element.to !== '') {
			iconContainer.appendChild(editPen);
			iconContainer.appendChild(trash);
			box.appendChild(iconContainer);
			box.appendChild(transactionBox);
			box.appendChild(iconContainer);
			boxes.appendChild(box);
		}
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

// button.addEventListener('click', addnewTransaction);

const module = document.querySelector('.module-none');
function showModule() {
	// event.preventDefault();
	module.classList.add('module-block');
	module.innerHTML = `
	<form class="form">
<label class="lb" for="nome">From:</label>
      <input name="nome" id="nome" type="text" class="infos"  required>

      <label for="email" class="lb">To:</label>
      <input name="email" id="lb" type="text" class="infos" required>

      <label for="data" class="lb">Amount:</label>
      <input name="data" id="data" type="number" class="infos" required>

      <button class="send" type="submit">Submit</button>
      <button class="limpar" type="reset">Cancel </button>
    </form>`;
}
button.addEventListener('click', showModule);

document.addEventListener('DOMContentLoaded', apiData);
