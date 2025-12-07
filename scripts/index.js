let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (item) {
  console.log(item.name);
  /*console.log(item.link);*/
});
const containerElement = document.querySelector(".card");
console.log(containerElement);

/*Criando Variavel para o Botão Editar Perfil*/
const editButton = document.querySelector(".profile__edit-button");

/*Variavel do Popup de Editar*/
const editModal = document.querySelector("#edit-popup");

/*Criando Variavel para o Botão Fechar Editar Perfil*/
const closeEditButton = editModal.querySelector(".popup__close");

/*Variaveis Titulo e Descrição Existentes*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*Variaveis Titulo e Descrição Atualizadas*/
let nameInput = document.querySelector(".popup__input_type_name");
let aboutInput = document.querySelector(".popup__input_type_description");

/*Variavel do Formulario*/
const editForm = editModal.querySelector(".popup__form");

/*Templete */
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/*Local onde os Cards Serão Criados*/
const cardsContainer = document.querySelector(".cards__list");

/*Variavel do New Popup*/
const newModal = document.querySelector("#new-card-popup");

/*Criando Variavel para o Botão NewCard*/
const newCardButton = document.querySelector(".profile__add-button");

/*Criando Variavel para o Botão Fechar NewCard*/
const closeNewCardButton = newModal.querySelector(".popup__close");

/*Variavel do Formulario*/
const newCardForm = newModal.querySelector(".popup__form");

/*Variaveis Name e Url dos newCards*/
let cardNameInput = document.querySelector(".popup__input_type_card-name");
let urlInput = document.querySelector(".popup__input_type_url");

/* Funçao Abrir PopUp */

function openModal(arg, modal) {
  arg.addEventListener("click", function () {
    modal.classList.add("popup_is-opened");
  });
}

/* Funçao Fechar PopUp */

function closeModal(arg, modal) {
  arg.addEventListener("click", function () {
    modal.classList.remove("popup_is-opened");
  });
}

/* Funçao Para preencher os Campos nome e descrição */
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
}
/* Funçao Para abrir o modo de edição e preencher os Campos nome e descrição */
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editButton, editModal);
}
/* Funçao Para Alterar os Campos nome e descrição e depois salvar*/

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  editModal.classList.remove("popup_is-opened");
}

/* Abrir popup de editar */
editButton.addEventListener("click", handleOpenEditModal);

/*Fechando o Popup de Editar*/

closeModal(closeEditButton, editModal);

/*Salvando as Informacoes*/
openModal(newCardButton, newModal);
closeModal(closeNewCardButton, newModal);

editForm.addEventListener("submit", handleProfileFormSubmit);

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
function removeCard(evt) {
  const cardElement = evt.target.closest(".card");
  if (cardElement) {
    cardElement.remove();
  }
}

/*Criando Função para Gerar Cards*/
function getCardElement(name, link) {
  if (!name) {
    name = "Lugar sem nome";
  }

  if (!link) {
    link = "./images/placeholder.jpg";
  }

  const cardElement = cardTemplate.cloneNode(true);

  const nameElement = cardElement.querySelector(".card__title");
  nameElement.textContent = name;

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.alt = name;

  imageElement.src = link;

  /*1. Seleciona o botão de like dentro do card*/
  const likeButton = cardElement.querySelector(".card__like-button");
  /*2. ao clicar muda a classe do botao curtir*/
  likeButton.addEventListener("click", handleLikeButton);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  /*1. ao clicar remove o cartao da DOM*/
  deleteButton.addEventListener("click", removeCard);

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsContainer);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const url = urlInput.value;
  console.log("test:" + name);
  console.log("url:" + url);
  console.log("cards:" + cardsContainer);
  // Salva no array
  initialCards.unshift({ name: name, link: url });

  // Renderiza o card visivelmente
  renderCard(name, url, cardsContainer);

  newCardForm.reset();

  newModal.classList.remove("popup_is-opened");
}
newCardForm.addEventListener("submit", handleCardFormSubmit);
