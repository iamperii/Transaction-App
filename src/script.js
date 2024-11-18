const button = document.querySelector('.button-container');
const boxes = document.querySelector('.boxes');

async function apiData() {
	// ! GET
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
		createTransactionBox(element, false);
		// false -- append
	});

	//! EDIT
	async function editTransaction(box) {
		const transactionID = box.id.split('-')[1];
		const fromValue = box.querySelector('.address-first').textContent;
		const toValue = box.querySelector('.address-second').textContent;
		const amountValue = box.querySelector('.amount').textContent;

		showModal();

		document.querySelector('#name').value = fromValue;
		document.querySelector('#email').value = toValue;
		document.querySelector('#data').value = amountValue.replace('$', '');

		setTransactionMode('edit', transactionID, box);
	}

	let isEditing = false;
	function setTransactionMode(mode, transactionID, box = null) {
		const saveButton = document.querySelector('.send');
		saveButton.onclick = null;

		if (mode === 'add') {
			isEditing = false;
			clearInputs();
			saveButton.onclick = addnewTransaction;
		} else if (mode === 'edit') {
			isEditing = true;
			saveButton.onclick = (e) => saveEditedTransaction(e, transactionID, box);
		}
	}

	function clearInputs() {
		document.querySelector('#name').value = '';
		document.querySelector('#email').value = '';
		document.querySelector('#data').value = '';
	}

	async function saveEditedTransaction(e, transactionID, box) {
		e.preventDefault();

		const senderName = document.querySelector('#name').value;
		const toName = document.querySelector('#email').value;
		const amount = document.querySelector('#data').value;

		// if (!senderName || !toName || !amount || amount <= 0) {
		// 	alert('Məlumatları düzgün daxil edin!');
		// 	return;
		// }

		const response = await fetch(
			`https://acb-api.algoritmika.org/api/transaction/${transactionID}`,
			{
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					from: senderName,
					to: toName,
					amount: amount,
				}),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const updatedTransaction = await response.json();

		box.querySelector('.amount').textContent = `${updatedTransaction.amount}$`;
		box.querySelector(' .address-first').textContent = updatedTransaction.from;
		box.querySelector(' .address-second').textContent = updatedTransaction.to;

		closeModal();
		setTransactionMode('add');
	}

	// ! DELETE
	async function deleteTransaction(transactionID) {
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
		if (!deleteTransaction.ok) {
			throw new Error(`HTTP error! Status: ${deleteTransaction.status}`);
		}
		const boxToRemove = document.querySelector(`#transaction-${transactionID}`);
		if (boxToRemove) {
			boxToRemove.remove();
		} else {
			console.error('Element to remove not found');
		}
	}

	// ! CREATE box
	async function createTransactionBox(transaction, isPrependMode = true) {
		const box = document.createElement('div');
		box.id = `transaction-${transaction.id}`;
		box.classList.add('box');

		const transactionBox = document.createElement('div');
		transactionBox.classList.add('transaction-box');

		transactionBox.innerHTML = `
		 <div class="address-container">
        <div class="label">From</div>
        <div class="address-first">${transaction.from}</div>
    </div>
    	<svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 5l7 7-7 7M5 12h14"></path>
			</svg>
    <div class="address-container">
        <div class="label">To</div>
        <div class="address-second">${transaction.to}</div>
    </div>
    <div class="amount">${transaction.amount}$</div>
				`;

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
	</div>`;

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
</div>`;

		iconContainer.appendChild(editPen);
		iconContainer.appendChild(trash);
		box.appendChild(transactionBox);
		box.appendChild(iconContainer);
		boxes.prepend(box);

		if (isPrependMode) {
			boxes.prepend(box);
		} else {
			boxes.append(box);
		}

		trash.addEventListener('click', () => openPopUp(box.id.split('-')[1]));
		editPen.addEventListener('click', (e) => editTransaction(box));
	}

	//! ADD
	async function addnewTransaction(e) {
		e.preventDefault();
		const senderName = document.querySelector('#name').value;
		const toName = document.querySelector('#email').value;
		const amount = document.querySelector('#data').value;

		if (!senderName || !toName || !amount || amount <= 0) {
			alert('Məlumatları düzgün daxil edin!');
			return;
		}
		const response = await fetch(
			'https://acb-api.algoritmika.org/api/transaction',
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					from: senderName,
					to: toName,
					amount: amount,
				}),
			}
		);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const newTransaction = await response.json();

		// true=prepend
		createTransactionBox(newTransaction, true);
		closeModal();
		clearInputs();
	}

	//! MODAL

	const modal = document.querySelector('.modal-none');
	const closeButton = document.querySelector('.close');

	function showModal() {
		modal.style.display = 'block';
	}
	function closeModal() {
		modal.style.display = 'none';
		setTransactionMode('add');
	}
	closeButton.addEventListener('click', (e) => {
		e.preventDefault;
		closeModal();
	});
	button.addEventListener('click', () => {
		showModal();
		setTransactionMode('add');
	});

	setTransactionMode('add');

	function openPopUp(transactionID) {
		const popup = document.querySelector('.popup-overlay');
		popup.style.display = 'block';

		const yesButton = document.querySelector(
			'.popup-buttons .popup-button:first-child'
		);
		yesButton.onclick = () => {
			deleteTransaction(transactionID);
			popup.style.display = 'none';
		};

		const noButton = document.querySelector(
			'.popup-buttons .popup-button:last-child'
		);
		noButton.onclick = () => {
			popup.style.display = 'none';
		};
	}
}

document.addEventListener('DOMContentLoaded', apiData);
