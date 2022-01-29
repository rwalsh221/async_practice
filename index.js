const userArr = [];

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

const render = () => {
  const parent = document.getElementById('cardContainer');

  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
  userArr.forEach((element) => {
    parent.insertAdjacentHTML('beforeend', element);
  });
};

const newUser = async () => {
  try {
    const data = await getAsyncData();
    newCard(data);
    render();
  } catch (err) {
    console.error(err);
  }
};

// EVENT LISTNER
document.getElementById('btn__newUser').addEventListener('click', newUser);
