(function() {
  const nameInput = document.querySelector('.header__search-input');
  const table = document.querySelector('table');
  let timeout;

  nameInput.addEventListener('keyup', async function () {
    timeout = setTimeout(callFilter,300);
  });

  async function callFilter() {
    await nameFilter(nameInput);
  }

  async function createApp() {
    const container = document.querySelector('.app__content');
    const appTitle = document.createElement('h1');
    const clientsTable = document.createElement('table');
    const addButton = document.createElement('button');

    appTitle.textContent = 'Клиенты';

    clientsTable.append(createTableHead());

    clientsTable.classList.add('app__table');

    addButton.classList.add('add-btn');

    addButton.textContent = 'Добавить клиента';
    addButton.addEventListener('click', function () {
      createModal('addClient');
    });

    container.append(appTitle);
    container.append(clientsTable);
    await sortingUp('id');

    popupPositioning();

    container.append(addButton);
  }

  function popupPositioning() {
    document.querySelectorAll('.contacts__popup').forEach(function (contactPopup) {
      const popupProperties = contactPopup.getBoundingClientRect();
      const popupWidth = popupProperties.width / 2.28;

      contactPopup.style.left = '-' + `${popupWidth}` + 'px';
    });
  }

  function contactsHide(contactsCell) {
      let buttons = contactsCell.querySelectorAll('.contacts__btn');
      let contactsData = contactsCell.querySelector('.contacts__data')
      if (buttons.length > 4) {
        for (let i = 4; i < buttons.length; i++) {
          buttons[i].style.display = 'none';
        }

        const moreBtn = document.createElement('button');
        moreBtn.classList.add('more-contacts__btn');
        moreBtn.textContent = '+' + `${buttons.length - 4}`;
        contactsData.append(moreBtn);

        moreBtn.addEventListener('click', function () {
          for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].style.display === 'none') {
              buttons[i].style.display = 'block';
            }
          }

          moreBtn.remove();
          popupPositioning();
        });
    }
  }

  function createTableHead() {
    const tableHeader = document.createElement('thead');
    const tableRow = document.createElement('tr');
    const numberHead = document.createElement('td');
    const nameHead = document.createElement('td');
    const timeHead = document.createElement('td');
    const changesHead = document.createElement('td');
    const contactsHead = document.createElement('td');
    const actionsHead = document.createElement('td');

    numberHead.innerHTML = '<span>ID</span>';
    nameHead.innerHTML = '<span>Фамилия Имя Отчество</span><span>А-Я</span>';
    timeHead.innerHTML = '<span>Дата и время создания</span>';
    changesHead.innerHTML = '<span>Последние изменения</span>';
    contactsHead.textContent = 'Контакты';
    actionsHead.textContent = 'Действия';

    numberHead.classList.add('table-head__item', 'table-head__item__sorted');
    nameHead.classList.add('table-head__item');
    timeHead.classList.add('table-head__item');
    changesHead.classList.add('table-head__item');
    contactsHead.classList.add('table-head__item');
    actionsHead.classList.add('table-head__item');

    nameHead.addEventListener('click', async function () {
      tableClear();
      if (nameHead.classList.contains('table-head__item__sorted')) {
        removeSorting();
        await sortingDown(name);
      } else {
        removeSorting();
        nameHead.classList.add('table-head__item__sorted');
        await sortingUp(name);
      }
    });

    numberHead.addEventListener('click', async function () {
      tableClear();
      if (numberHead.classList.contains('table-head__item__sorted')) {
        removeSorting();
        await sortingDown('id');
      } else {
        removeSorting();
        numberHead.classList.add('table-head__item__sorted');
        await sortingUp('id');
      }
    });

    timeHead.addEventListener('click', async function () {
      tableClear();
      if (timeHead.classList.contains('table-head__item__sorted')) {
        removeSorting();
        await sortingDown('createdAt');
      } else {
        removeSorting();
        timeHead.classList.add('table-head__item__sorted');
        await sortingUp('createdAt');
      }
    });

    changesHead.addEventListener('click', async function () {
      tableClear();
      if (changesHead.classList.contains('table-head__item__sorted')) {
        removeSorting();
        await sortingDown('updatedAt');
      } else {
        removeSorting();
        changesHead.classList.add('table-head__item__sorted');
        await sortingUp('updatedAt');
      }
    });

    function removeSorting() {
      document.querySelectorAll('.table-head__item').forEach(function (item) {
        item.classList.remove('table-head__item__sorted');
      });
    }

    tableRow.append(numberHead, nameHead, timeHead, changesHead, contactsHead, actionsHead);
    tableHeader.append(tableRow);

    return tableHeader;
  }

  function createTableBody(data) {
    const tableBody = document.createElement('tbody');

    data.forEach(function(client) {
      let tableRow = document.createElement('tr');
      const numberCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const timeCell = document.createElement('td');
      const createDateString = document.createElement('span');
      const createTimeString = document.createElement('span');
      const changesCell = document.createElement('td');
      const changeDateString = document.createElement('span');
      const changeTimeString = document.createElement('span');
      const contactsCell = document.createElement('td');
      const actionsCell = document.createElement('td');

      let creationDate = new Date(client.createdAt);
      let creationDay = creationDate.getDate();
      let creationMonth = creationDate.getMonth() + 1;
      let creationHours = creationDate.getHours();
      let creationMinutes = creationDate.getMinutes();

      if (creationDay < 10) {
        creationDay = '0' + creationDay;
      }

      if (creationMonth < 10) {
        creationMonth = '0' + creationMonth;
      }

      if (creationHours < 10) {
        creationHours = '0' + creationHours;
      }

      if (creationMinutes < 10) {
        creationMinutes = '0' + creationMinutes;
      }

      let changeDate = new Date(client.updatedAt);
      let changeDay = changeDate.getDate();
      let changeMonth = changeDate.getMonth() + 1;
      let changeHours = changeDate.getHours();
      let changeMinutes = changeDate.getMinutes();

      if (changeDay < 10) {
        changeDay = '0' + changeDay;
      }

      if (changeMonth < 10) {
        changeMonth = '0' + changeMonth;
      }

      if (changeHours < 10) {
        changeHours = '0' + changeHours;
      }

      if (changeMinutes < 10) {
        changeMinutes = '0' + changeMinutes;
      }

      createTimeString.classList.add('time-string');
      changeTimeString.classList.add('time-string');

      numberCell.textContent = client.id;
      nameCell.textContent = client.surname + ' ' + client.name + ' ' + client.lastName;
      createDateString.textContent = creationDay + '.' + creationMonth + '.' + creationDate.getFullYear();
      createTimeString.textContent = creationHours + ':' + creationMinutes;
      timeCell.append(createDateString, createTimeString);

      changeDateString.textContent = changeDay + '.' + changeMonth + '.' + changeDate.getFullYear();
      changeTimeString.textContent = changeHours + ':' + changeMinutes;
      changesCell.append(changeDateString, changeTimeString);

      numberCell.classList.add('id__data');
      const contactsData = document.createElement('div');
      contactsData.classList.add('contacts__data');

      client.contacts.forEach(function(contact) {
        const contactBtn = document.createElement('button');
        const contactPopup = document.createElement('span');

        contactBtn.classList.add('contacts__btn');
        contactPopup.classList.add('contacts__popup');

        if (contact.type === 'Телефон') {
          contactBtn.classList.add('contacts__btn__phone');
        } else if (contact.type === 'Vk') {
          contactBtn.classList.add('contacts__btn__vk');
        } else if (contact.type === 'Facebook') {
          contactBtn.classList.add('contacts__btn__fb');
        } else if (contact.type === 'Email') {
          contactBtn.classList.add('contacts__btn__mail');
        } else {
          contactBtn.classList.add('contacts__btn__other');
        }

        contactPopup.textContent = contact.type + ': ' + contact.value;

        contactBtn.append(contactPopup);
        contactsData.append(contactBtn);
      });

      contactsCell.append(contactsData);

      const editBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

      editBtn.classList.add('actions__edit-btn');
      deleteBtn.classList.add('actions__delete-btn');

      editBtn.textContent = 'Изменить';
      deleteBtn.textContent = 'Удалить';

      actionsCell.append(editBtn, deleteBtn);

      deleteBtn.addEventListener('click',async function () {
        await createDeleteModal(client.id);
      });

      editBtn.addEventListener('click',async function () {
        await createModal('editClient', client.id);
      });

      tableRow.append(numberCell, nameCell, timeCell, changesCell, contactsCell, actionsCell);
      tableBody.append(tableRow);

      contactsHide(contactsCell);
    });

    return tableBody;
  }
  
  async function createModal(method, id) {
    const modalShadow = document.createElement('div');
    const modalWrapper = document.createElement('div');
    const modalWindow = document.createElement('div');
    const closeButton = document.createElement('button');
    const modalTitle = document.createElement('h2');
    const modalForm = document.createElement('form');
    const surnameLabel = document.createElement('label');
    const surnameInput = document.createElement('input');
    const nameLabel = document.createElement('label');
    const nameInput = document.createElement('input');
    const lastNameLabel = document.createElement('label');
    const lastNameInput = document.createElement('input');
    const contactField = document.createElement('div');
    const contactButton = document.createElement('div');
    const errorField = document.createElement('div');
    const submitButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    modalShadow.classList.add('modal__shadow');
    modalWrapper.classList.add('modal__wrapper');
    modalWindow.classList.add('modal');
    closeButton.classList.add('modal__close-btn');
    modalTitle.classList.add('modal__title');
    modalForm.classList.add('modal__form');
    modalForm.querySelectorAll('input').forEach( function (input) {
      input.classList.add('modal__input');
    });
    contactButton.classList.add('modal__add-btn');
    submitButton.classList.add('modal__submit-btn');
    contactField.classList.add('modal__contact-field');
    errorField.classList.add('modal__error-field');
    cancelButton.classList.add('modal__cancel-btn');

    surnameLabel.innerHTML = 'Фамилия<span>*</span>';
    nameLabel.innerHTML = 'Имя<span>*</span>';
    lastNameLabel.textContent = 'Отчество';

    nameInput.required = true;
    surnameInput.required = true;

    contactButton.textContent = 'Добавить контакт';
    cancelButton.textContent = 'Отмена';

    contactButton.addEventListener('click', function () {
      contactField.classList.add('modal__contact-field__active');
      contactField.append(createContactItem());

      contactsCount();
    });

    submitButton.type = 'submit';

    if (method === 'addClient') {
      modalTitle.textContent = 'Новый клиент';
      submitButton.textContent = 'Сохранить';

      modalForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        let result = formChecking();

        if (result !== 'error') {
          let contacts = [];

          if (document.querySelector('.modal__contact-item')) {
            document.querySelectorAll('.modal__contact-item').forEach(function (item) {
              let contact = {
                type: item.querySelector('select').value,
                value: item.querySelector('input').value
              }
              console.log(contact);

              contacts.push(contact);
            });
          }

          const data = { surname: surnameInput.value, name: nameInput.value, lastName: lastNameInput.value, contacts: contacts };

          await addNewClient(modalWindow, data);
        }

      })
    } else if (method === 'editClient') {
      let clientData = await getClientData(id);

      modalTitle.innerHTML = 'Изменить данные';
      cancelButton.textContent = 'Удалить клиента';

      const clientID = document.createElement('span');
      clientID.textContent = `ID: ${id}`;
      modalTitle.append(clientID);

      surnameInput.value = clientData.surname;
      nameInput.value = clientData.name;
      lastNameInput.value = clientData.lastName;

      clientData.contacts.forEach(function (contact) {
        contactField.classList.add('modal__contact-field__active');
        contactField.append(createContactItem(contact));

        // contactsCount();
      });

      submitButton.textContent = 'Сохранить';

      modalForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const result = formChecking();

        if (result !== 'error') {
          let contacts = [];

          if (document.querySelector('.modal__contact-item')) {
            document.querySelectorAll('.modal__contact-item').forEach(function (item) {
              let contact = {
                type: item.querySelector('select').value,
                value: item.querySelector('input').value
              }

              contacts.push(contact);
            });
          }

          const data = {
            surname: surnameInput.value,
            name: nameInput.value,
            lastName: lastNameInput.value,
            contacts: contacts
          };

          await editClient(modalWindow, id, data);
        }
      });

      cancelButton.addEventListener('click', function () {
        deleteClient(modalWindow, id);
      });
    }

    closeButton.addEventListener('click', function () {
      closeModal(modalWindow);
    });
    cancelButton.addEventListener('click', function () {
      closeModal(modalWindow);
    });
    modalShadow.addEventListener('click', function () {
      closeModal(modalWindow);
    });

    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";

    surnameLabel.append(surnameInput);
    nameLabel.append(nameInput);
    lastNameLabel.append(lastNameInput);

    modalForm.append(surnameLabel, nameLabel, lastNameLabel, contactField, contactButton, errorField, submitButton);
    modalWindow.append(closeButton, modalTitle, modalForm, cancelButton);
    modalWrapper.append(modalWindow);

    modalForm.querySelectorAll('label').forEach( function (label) {
      label.classList.add('modal__label');
    });

    modalForm.querySelectorAll('input').forEach( function (input) {
      input.classList.add('modal__input');
    });

    document.body.append(modalShadow);
    document.body.append(modalWrapper);
  }

  async function createDeleteModal(id) {
    const modalShadow = document.createElement('div');
    const modalWrapper = document.createElement('div');
    const modalWindow = document.createElement('div');
    const closeButton = document.createElement('button');
    const modalTitle = document.createElement('h2');
    const modalDescription = document.createElement('p');
    const deleteButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    modalTitle.textContent = 'Удалить клиента';
    modalDescription.textContent = 'Вы действительно хотите удалить данного клиента?';
    deleteButton.textContent = 'Удалить';
    cancelButton.textContent = 'Отмена';

    modalShadow.classList.add('modal__shadow');
    modalWrapper.classList.add('modal__wrapper');
    modalWindow.classList.add('modal');
    closeButton.classList.add('modal__close-btn');
    modalTitle.classList.add('modal__title');
    deleteButton.classList.add('modal__submit-btn');
    cancelButton.classList.add('modal__cancel-btn');
    modalDescription.classList.add('modal__description');

    modalTitle.style.textAlign = 'center';

    deleteButton.addEventListener('click', function () {
      deleteClient(modalWindow, id);
    });
    closeButton.addEventListener('click', function () {
      closeModal(modalWindow);
    })
    cancelButton.addEventListener('click', function () {
      closeModal(modalWindow);
    });
    modalShadow.addEventListener('click', function () {
      closeModal(modalWindow);
    });

    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";

    modalWindow.append(modalTitle, closeButton, modalDescription, deleteButton, cancelButton);
    modalWrapper.append(modalWindow);

    document.body.append(modalShadow);
    document.body.append(modalWrapper);
  }

  function createContactItem(contact) {
    const contactItem = document.createElement('div');
    const contactSelect = document.createElement('select');
    const phone = document.createElement('option');
    const addPhone = document.createElement('option');
    const mail = document.createElement('option');
    const vk = document.createElement('option');
    const fb = document.createElement('option');
    const contactInput = document.createElement('input');
    const deleteContact = document.createElement('button');

    phone.value = 'Телефон';
    addPhone.value = 'Доп. телефон';
    mail.value = 'Email';
    vk.value = 'Vk';
    fb.value = 'Facebook';
    phone.textContent = 'Телефон';
    addPhone.textContent = 'Доп. телефон';
    mail.textContent = 'Email';
    vk.textContent = 'Vk';
    fb.textContent = 'Facebook';

    contactSelect.classList.add('modal__select');
    contactItem.classList.add('modal__contact-item');
    contactInput.classList.add('modal__contact-input');
    deleteContact.classList.add('modal__delete-item');

    contactInput.placeholder = 'Введите данные контакта';

    contactSelect.append(phone, addPhone, mail, vk, fb);

    if (contact !== undefined) {
      contactSelect.value = contact.type;
      contactInput.value = contact.value;
    }

    deleteContact.addEventListener('click', function () {
      contactItem.remove();

      contactsCount();
    });

    contactItem.append(contactSelect, contactInput, deleteContact);

    return contactItem;
  }

  function contactsCount() {
    const contactItems = document.querySelectorAll('.modal__contact-item');
    let contactButton = document.querySelector('.modal__add-btn');

    if (contactItems.length === 0) {
      document.querySelector('.modal__contact-field').classList.remove('modal__contact-field__active');
    } else if (contactItems.length >= 10) {
      contactButton.style.display = 'none';
    } else if (contactButton.style.display === 'none') {
      contactButton.style.display = 'block';
    }
  }

  async function getClientsArray() {
    const response = await fetch(`http://localhost:3000/api/clients`);
    const data = await response.json();

    let clientsArray = [];

    data.forEach(function (client) {
      let object = {
        id: client.id,
        surname: client.surname,
        name: client.name,
        lastName: client.lastName,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
        contacts: client.contacts
      }

      clientsArray.push(object);
    });



    return clientsArray;
  }

  async function getClientData(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`);
    const data = await response.json();

    let object = {
      id: data.id,
      surname: data.surname,
      name: data.name,
      lastName: data.lastName,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      contacts: data.contacts
    }

    return object;
  }

  async function addNewClient(modalWindow, formData) {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surname: formData.surname,
        name: formData.name,
        lastName: formData.lastName,
        contacts: formData.contacts
      })
    });

    if (response.status > 399) {
      const errorField = modalWindow.querySelector('.modal__error-field');
      const errorDescription = document.createElement('p');

      errorDescription.textContent = 'Ошибка: ' + `${response.statusText}`;
      errorField.append(errorDescription);
    } else {
      closeModal(modalWindow);
      tableClear();
      document.querySelector('table').append(createTableBody(await getClientsArray()));
    }
  }

  async function deleteClient(modalWindow, id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE',
    });

    if (response.status > 399) {
      const errorField = modalWindow.querySelector('.modal__error-field');
      const errorDescription = document.createElement('p');

      errorDescription.textContent = 'Ошибка: ' + `${response.statusText}`;
      errorField.append(errorDescription);
    } else {
      closeModal(modalWindow);
      tableClear();
      document.querySelector('table').append(createTableBody(await getClientsArray()));
    }
  }

  async function editClient(modalWindow, id, formData) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        surname: formData.surname,
        name: formData.name,
        lastName: formData.lastName,
        contacts: formData.contacts
      })
    });

    if (response.status > 399) {
      const errorField = modalWindow.querySelector('.modal__error-field');
      const errorDescription = document.createElement('p');

      errorDescription.textContent = 'Ошибка: ' + `${response.statusText}`;
      errorField.append(errorDescription);
    } else {
      closeModal(modalWindow);
      tableClear();
      document.querySelector('table').append(createTableBody(await getClientsArray()));
    }
  }

  function closeModal(modalWindow) {
    modalWindow.remove();
    const modalWrapper = document.querySelector('.modal__wrapper');
    const modalShadow = document.querySelector('.modal__shadow');

    modalWrapper.remove();
    modalShadow.remove();

    document.body.style.height = "auto";
    document.body.style.overflow = "auto";
  }

  function tableClear() {
    const tbody = document.querySelector('tbody');
    tbody.remove();
  }

  async function nameFilter(input) {
    let data = await getClientsArray();

    let filtered = data.filter(client => ((client.surname + ' ' + client.name + ' ' + client.lastName).toLowerCase()).includes((input.value).toLowerCase()));

    tableClear();
    document.querySelector('table').append(createTableBody(filtered));
  }

  async function sortingUp(type) {

    let data = await getClientsArray();

    if (type === name) {
      data.sort(function (a, b) {
        let nameA = (a.surname + a.name + a.lastName).toLowerCase();
        let nameB = (b.surname + b.name + b.lastName).toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else if (type === 'updatedAt') {
      data.sort(function (a, b) {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      });
    } else {
      data.sort(function (a, b) {
        return a.type - b.type;
      });
    }

    document.querySelector('table').append(createTableBody(data));
  }

  async function sortingDown(type) {

    let data = await getClientsArray();

    if (type === name) {
      data.sort(function (a, b) {
        let nameA = (a.surname + a.name + a.lastName).toLowerCase();
        let nameB = (b.surname + b.name + b.lastName).toLowerCase();

        if (nameB < nameA) {
          return -1;
        }
        if (nameB > nameA) {
          return 1;
        }
        return 0;
      });
    } else if (type === 'id') {
      data.sort(function (a, b) {
        return b.id - a.id;
      });
    } else if (type === 'createdAt') {
      data.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (type === 'updatedAt') {
      data.sort(function (a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    }

    document.querySelector('table').append(createTableBody(data));
  }
  
  function formChecking() {
    const modal = document.querySelector('.modal');
    let status;

    modal.querySelectorAll('input').forEach(function (input) {
      if (input.value === '' || input.value === undefined && input.required === true) {
        input.classList.add('modal__input__error');

        status = 'error';
      } else {
        status = 'success';
      }
    });

    return status;
  }

  window.createApp = createApp;
})();