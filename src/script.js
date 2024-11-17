const button = document.querySelector('.button-container');
const boxes = document.querySelector('.boxes');

// for testing
let newTransaction = {
	from: 'Periiii',
	to: 'Minure',
	amount: 200,
};

//! PARENT FUNCTION.
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
		box.id = `transaction-${element.id}`;

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

		//! DELETE
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

		async function deleteTransaction(element) {
			const transactionID = await element.id;

			const deleteTransaction = await fetch(
				`https://acb-api.algoritmika.org/api/transaction/${transactionID}`,
				{
					method: 'DELETE',
					headers: {
						'Content-type': 'application/json',
					},
				}
			);

			const deleteResponse = await deleteTransaction.json();
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const boxToRemove = document.querySelector(
				`#transaction-${transactionID}`
			);
			boxToRemove.remove();
		}
		trash.addEventListener('click', () => deleteTransaction(element));

		//! EDIT
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

		async function editTrsansaction(element) {
			console.log(1);
		}

		editPen.addEventListener('click', () => editTrsansaction(element));

		if (element.from !== '' && element.to !== '' && element.amount > 0) {
			iconContainer.appendChild(editPen);
			iconContainer.appendChild(trash);
			box.appendChild(iconContainer);
			box.appendChild(transactionBox);
			box.appendChild(iconContainer);
			boxes.appendChild(box);
		}
	});

	// ADD
	async function addnewTransaction() {
		console.log(1);
	}
	const sendButton = document.querySelector('.send');
	sendButton.addEventListener('click', (e) => {
		// e.preventDefault();
		addnewTransaction;
	});
	//! MODAL
	const modal = document.querySelector('.modal-none');
	const closeButton = document.querySelector('.close');
	function showModal() {
		modal.style.display = 'block';
	}
	function closeModal() {
		modal.style.display = 'none';
	}
	closeButton.addEventListener('click', closeModal);
	button.addEventListener('click', showModal);
}

document.addEventListener('DOMContentLoaded', apiData);