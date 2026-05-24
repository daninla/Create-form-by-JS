"use strict";

const createElement = (tag, attrs = {}, text = "") => {
  const el = document.createElement(tag);
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  el.textContent = text ?? "";
  return el;
};

//=================HEADERS================
const mainTitle = createElement(
  "h1",
  { class: "main-title" },
  "CREATE AN ACCOUNT",
);
const subTitle = createElement(
  "p",
  { class: "sub-title" },
  "We always keep your name and email address private.",
);

//=================Inputs================
const createRow = (in1, in2) => {
  const row = createElement("div", { class: "inputs-container" });
  row.append(createElement("input", in1), createElement("input", in2));
  return row;
};

const row1 = createRow(
  { type: "text", placeholder: "First name", name: "firstName" },
  { type: "text", placeholder: "Last name", name: "lastName" },
);
const row2 = createRow(
  { type: "text", placeholder: "Display Name", name: "displayName" },
  { type: "email", placeholder: "Email Address", name: "emailAddress" },
);
const row3 = createRow(
  { type: "password", placeholder: "Password" },
  { type: "password", placeholder: "Password Confirmation" },
);

// =================RadioButtons==================
const createRadio = (title, desc, value) => {
  const item = createElement("div", { class: "radio-item" });

  const uniqueId = `account-${value}`;

  const input = createElement("input", {
    type: "radio",
    name: "account",
    value: value,
    id: uniqueId,
  });

  const label = createElement("label", { for: uniqueId });
  label.append(
    createElement("span", { class: "radio-title" }, title),
    createElement("span", { class: "radio-description" }, desc),
  );

  // Кладем их рядом, как того требует твой CSS
  item.append(input, label);
  return item;
};

const radioCont = createElement("div", { class: "radio-container" });
radioCont.append(
  createRadio(
    "Join As a Buyer",
    "I am looking for a Name, Logo or Tagline for my business, brand or product.",
    "buyer",
  ),
  createRadio(
    "Join As a Creative or Marketplace Seller",
    "I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.",
    "seller",
  ),
);

// ================Checkbox================
const checkCont = createElement("div", { class: "checkbox-container" });
checkCont.append(
  createElement("input", { type: "checkbox", id: "terms" }),
  createElement(
    "label",
    { for: "terms" },
    "Allow Squadhelp to send marketing/promotional offers from time to time",
  ),
);

const submitBtn = createElement("button", { type: "submit" }, "Create account");

// ================== FINAL==================
const form = createElement("form", { id: "app" });
form.append(
  mainTitle,
  subTitle,
  row1,
  row2,
  row3,
  radioCont,
  checkCont,
  submitBtn,
);

const main = createElement("main");
main.append(form);

document.body.append(main);

//==================================LocalStorage======================

class Person {
  constructor(...args) {
    args.forEach(({ name, value }) => (this[name] = value));
  }
}

submitBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = form.querySelectorAll("input[name]");
  const person = new Person(inputs);
  const storageKey = person.lastName;
  
  localStorage.setItem(storageKey, JSON.stringify(person));
});
//=========================================Email validation============================================

const emailInput = document.querySelector('input[type="email"]');
const invalidEmailBorder = document.createElement('div');
invalidEmailBorder.classList.add('invalidEmailBorder');
invalidEmailBorder.textContent = 'Некоректна форма запису електроної пошти';
row2.appendChild(invalidEmailBorder)

const regExpEmail = /^[\w.-]+@[\w.-]+\.\w{2,13}$/i;

function setValid() {
  invalidEmailBorder.classList.remove('show');
}

function setInvalid() {
  invalidEmailBorder.classList.add('show');
}

function checkEmail(event) {
  const value = event.target.value;

  if (value === '') {
    setValid();
    return;
  }
  regExpEmail.test(value) ? setValid() : setInvalid();
}

emailInput.addEventListener('input', checkEmail);