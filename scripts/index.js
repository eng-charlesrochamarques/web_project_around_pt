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
/*Criando Variavel para o Botão Fechar Editar Perfil*/
const closeEditButton = document.querySelector(".popup__close");
/*Variavel do Popup de Editar*/
const editModal = document.querySelector("#edit-popup");

/*Variaveis Titulo e Descrição Existentes*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*Variaveis Titulo e Descrição Atualizadas*/
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_description");

/*Variavel do Formulario*/
const editForm = editModal.querySelector(".popup__form");

/* Funçao Abrir PopUp */

function openModal(arg) {
  arg.addEventListener("click", function () {
    editModal.classList.add("popup_is-opened");
  });
}

/* Funçao Fechar PopUp */

function closeModal(arg) {
  arg.addEventListener("click", function () {
    editModal.classList.remove("popup_is-opened");
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
  openModal(editButton);
}
/* Funçao Para Alterar os Campos nome e descrição e depois salvar*/

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  editModal.classList.remove("popup_is-opened");
}

/*Abrindo o Popup de Editar*/

handleOpenEditModal();

/*Fechando o Popup de Editar*/

closeModal(closeEditButton);

/*Salvando as Informacoes*/

editForm.addEventListener("submit", handleProfileFormSubmit);
