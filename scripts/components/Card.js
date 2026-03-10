export class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
    userId,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;

    this._likes = data.likes || [];
    this._isLiked = data.isLiked || false;
    //this._isLiked = false;

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLike() {
    console.log("LIKE CLICKED");
    console.log("Card id:", this._id);
    console.log("Current isLiked:", this._isLiked);

    this._handleLikeClick(this._id, this._isLiked);
  }
  setLikes(isLiked) {
    this._isLiked = isLiked;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }
  setIsLiked(isLiked) {
    this._isLiked = isLiked;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }
  _handleDelete() {
    this._handleDeleteClick(this._id, this._element);
  }
  hideDeleteButton() {
    this._deleteButton.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());

    this._deleteButton.addEventListener("click", () => this._handleDelete());

    this._image.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link),
    );
  }

  getCardElement() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    this.setLikes(this._isLiked);

    return this._element;
  }
}
