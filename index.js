const userArr = [];

class NewUser {
  constructor(data) {
    this.firstName = data.results[0].name.first;
    this.lastName = data.results[0].name.last;
    this.dateOfBirth = data.results[0].dob.date;
    this.email = data.results[0].email;
  }
  generateHtml() {
    return `<div class="userCard">
      <div class="userCard__heading">
        <div class="userCard__name">
          <h2>${this.firstName} ${this.lastName}</h2>
        </div>
      </div>
      <div class="userCard__content">
        <div class="userCard__info">
          <div class="userCard__dob">${this.dateOfBirth}</div>
          <div class="userCard__email">${this.email}</div>
        </div>
      </div>
      </div>`;
  }
}

const newCard = (data) => {
  const cardHtml = `<div class="userCard">
  <div class="userCard__heading">
    <div class="userCard__name">
      <h2>${data.results[0].name.first} ${data.results[0].name.last}</h2>
    </div>
  </div>
  <div class="userCard__content">
    <div class="userCard__info">
      <div class="userCard__dob">${data.results[0].dob.date}</div>
      <div class="userCard__email">${data.results[0].email}</div>
    </div>
  </div>
  </div>`;

  userArr.push(cardHtml);
};

const getAsyncData = async () => {
  try {
    const data = await fetch('https://randomuser.me/api/');
    const dataJson = await data.json();
    return dataJson;
  } catch (err) {
    console.error(err);
  }
};

const removeChildren = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

const render = (inputArr) => {
  const parent = document.getElementById('cardContainer');

  removeChildren(parent);

  inputArr.forEach((element) => {
    parent.insertAdjacentHTML('beforeend', element);
  });
};

const newUserCard = async () => {
  try {
    const data = await getAsyncData();
    // newCard(data);
    userArr.push(new NewUser(data).generateHtml());
    console.log(userArr);
    render(userArr);
  } catch (err) {
    console.error(err);
  }
};

// EVENT LISTNER
document.getElementById('btn__newUser').addEventListener('click', newUserCard);
