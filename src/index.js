import "./index.css";
import { renderCard } from "./components/card";
import { initialCards } from "./components/cards";
import { closeModal, openModal, closeModalOnOverlay } from "./components/modal";

// Селекторы
const placesList = document.querySelector(".places__list");
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms["new-place"];
const popupImageElement = document.querySelector(".popup_type_image");
const popupImage = popupImageElement.querySelector(".popup__image");
const popupCaption = popupImageElement.querySelector(".popup__caption");

// Функции карточек
const openImagePopup = (imageURL, imageAlt, title) => {
  popupImage.src = imageURL;
  popupImage.alt = imageAlt;
  popupCaption.textContent = title;
  openModal(popupImageElement);
};

const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const deleteCard = (evt) => {
  const parent = evt.target.closest(".card");
  parent.remove();
};

// Профиль
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileForm.name.value;
  profileDescription.textContent = popupProfileForm.description.value;
  closeModal(popupProfile);
};

const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

// Попапы фото
popupImageElement.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

//Попапы профиля
profileEditButton.addEventListener("click", () => {
  fillProfilePopup(
    popupProfileForm,
    profileTitle.textContent,
    profileDescription.textContent,
  );
  openModal(popupProfile);
});

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

popupProfile.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

// Попап создания кард
newCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

popupNewCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = popupNewCardForm.elements["place-name"].value;
  const link = popupNewCardForm.elements.link.value;
  const description = name;
  const newCard = {
    name,
    link,
    description,
  };
  renderCard(
    newCard,
    placesList,
    likeCard,
    deleteCard,
    openImagePopup,
    "start",
  );
  closeModal(popupNewCard);
  popupNewCardForm.reset();
});

popupNewCard.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

// Попап закрывания 
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(evt.target.parentNode.parentNode);
  }
});

// Инцилизация
initialCards.forEach((card) =>
  renderCard(card, placesList, likeCard, deleteCard, openImagePopup),
);