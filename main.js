const API_URL = 'http://localhost:3000/contacts';

async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        const contacts = await response.json();
        renderContacts(contacts);
    } catch (error) {
        console.error(error.message);
    }
}

function renderContacts(contacts) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact-item');

        contactItem.innerHTML = `
            <div class="contact-info">
                <img src="${contact.avatar}" alt="Avatar" class="avatar">
                <div class="contact-details">
                    <span class="contact-name">${contact.name}</span>
                    <span class="contact-number">${contact.number}</span>
                </div>
            </div>
            <div class="actions">
                <button class="edit-btn" onclick="editContact(${contact.id})">✎</button>
                <button class="delete-btn" onclick="deleteContact(${contact.id})">🗑</button>
            </div>
        `;
        contactList.appendChild(contactItem);
    });
}

async function addContact() {
    const nameInput = document.getElementById('nameInput').value;
    const numberInput = document.getElementById('numberInput').value;

    if (nameInput && numberInput) {
        const newContact = {
            name: nameInput,
            number: numberInput,
            avatar: "https://via.placeholder.com/40"
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContact)
            });
            if (!response.ok) {
                throw new Error('Failed to add contact');
            }
            fetchContacts();
        } catch (error) {
            console.error(error.message);
        }

        document.getElementById('nameInput').value = '';
        document.getElementById('numberInput').value = '';
    } else {
        alert('Please fill in both fields!');
    }
}

async function editContact(id) {
    const contactName = prompt("Enter new name:");
    const contactNumber = prompt("Enter new number:");

    if (contactName && contactNumber) {
        const updatedContact = {
            name: contactName,
            number: contactNumber
        };

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedContact)
            });
            if (!response.ok) {
                throw new Error('Failed to update contact');
            }
            fetchContacts();
        } catch (error) {
            console.error(error.message);
        }
    } else {
        alert('Both name and number are required!');
    }
}

async function deleteContact(id) {
    console.log('Attempting to delete contact with id:', id);
    console.log('API URL:', `${API_URL}/${id}`);
    
    try {

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to delete contact: ${response.status} ${response.statusText} - ${errorDetails}`);
        }

        console.log('Contact deleted successfully');
        await fetchContacts();
    } catch (error) {
        console.log('Error deleting contact:', error.message);
    }
}

deleteContact()


document.getElementById('addContactBtn').addEventListener('click', addContact);

fetchContacts();
