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
  {
    type: "text",
    placeholder: "First name",
    name: "firstName",
    required: true,
  },
  { type: "text", placeholder: "Last name", name: "lastName", required: true },
);
const row2 = createRow(
  {
    type: "text",
    placeholder: "Display Name",
    name: "displayName",
    required: true,
  },
  {
    type: "email",
    placeholder: "Email Address",
    name: "emailAddress",
    required: true,
  },
);
const row3 = createRow(
  { id: 0, type: "password", placeholder: "Password", required: true },
  {
    id: 1,
    type: "password",
    placeholder: "Password Confirmation",
    required: true,
  },
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
    required: true,
  });

  const label = createElement("label", { for: uniqueId });
  label.append(
    createElement("span", { class: "radio-title" }, title),
    createElement("span", { class: "radio-description" }, desc),
  );

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
  createElement("input", { type: "checkbox", id: "terms", required: true }),
  createElement(
    "label",
    { for: "terms" },
    "Allow Squadhelp to send marketing/promotional offers from time to time",
  ),
);

const submitBtn = createElement(
  "button",
  { type: "submit", disabled: "false" },
  "Create account",
);

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

function setDatatoLocalStorage(event) {
  event.preventDefault();
  const inputs = form.querySelectorAll("input[name]");
  const person = new Person(...inputs);
  const storageKey = person.lastName;

  localStorage.setItem(
    storageKey,
    JSON.stringify(person, (name, value) =>
      name === "account" ? undefined : value,
    ),
  );
}

form.addEventListener("submit", setDatatoLocalStorage);

const emailInput = document.querySelector('input[type="email"]');
const invalidEmailBorder = document.createElement("div");
invalidEmailBorder.classList.add("invalidEmailBorder");
row2.appendChild(invalidEmailBorder);

const regExpEmail = /^[^@]+@[^@]+\.[^@]{2,13}$/i;

function setValidEmail() {
  invalidEmailBorder.classList.remove("show");
  invalidEmailBorder.textContent = "";
}

function setInvalidEmail(message) {
  invalidEmailBorder.textContent = message;
  invalidEmailBorder.classList.add("show");
}

function getEmailHint(value) {
  if (/\s/.test(value)) {
    return "Адреса електронної пошти не повинна містити пробілів";
  }

  if (!value.includes("@")) {
    return "Потрібен символ @";
  }

  const [local, domain] = value.split("@");

  if (!local) return "Вкажіть ім'я перед @";
  if (!domain) return "Вкажіть домен після @";
  if (!domain.includes(".")) return "Домен має містити крапку";

  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];

  if (tld.length < 2) return "Розширення домену занадто коротке";
  if (tld.length > 13) return "Розширення домену занадто довге";
  return "Некоректна форма запису електронної пошти";
}

function checkEmail(event) {
  const value = event.target.value;

  if (value.length === 0) {
    setValidEmail();
    return;
  }

  if (!regExpEmail.test(value)) {
    setInvalidEmail(getEmailHint(value));
  } else {
    setValidEmail();
  }
}

emailInput.addEventListener("input", checkEmail);

//=================================VALID PASSWORD========================================
const invalidPasswordBorder = document.createElement("div");
invalidPasswordBorder.classList.add("invalidPasswordBorder");
invalidPasswordBorder.textContent = "Паролі не однакові";
row3.append(invalidPasswordBorder);

document.querySelectorAll('input[type="password"]').forEach((input, index) => {
  input.addEventListener("input", getValidPassword);
});

const passwords = {};

function getValidPassword(event) {
  passwords[event.target.id] = event.target.value;
  
  if (passwords["0"] && passwords["1"] && passwords["0"] !== passwords["1"]) {
    invalidPasswordBorder.classList.add("active");
  } else {
    invalidPasswordBorder.classList.remove("active");
  }
}
