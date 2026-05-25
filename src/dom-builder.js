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
const mainTitle = createElement("h1", { class: "main-title" }, "CREATE AN ACCOUNT");
const subTitle = createElement("p", { class: "sub-title" }, "We always keep your name and email address private.");

//=================Inputs================
const createRow = (in1, in2) => {
  const row = createElement("div", { class: "inputs-container" });
  row.append(createElement("input", in1), createElement("input", in2));
  return row;
};

export const row1 = createRow(
  { type: "text", placeholder: "First name", name: "firstName", required: true },
  { type: "text", placeholder: "Last name", name: "lastName", required: true }
);

export const row2 = createRow(
  { type: "text", placeholder: "Display Name", name: "displayName", required: true },
  { type: "email", placeholder: "Email Address", name: "emailAddress", required: true }
);

export const row3 = createRow(
  { id: 0, type: "password", placeholder: "Password", required: true },
  { id: 1, type: "password", placeholder: "Password Confirmation", required: true }
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
    createElement("span", { class: "radio-description" }, desc)
  );

  item.append(input, label);
  return item;
};

const radioCont = createElement("div", { class: "radio-container" });
radioCont.append(
  createRadio("Join As a Buyer", "I am looking for a Name, Logo or Tagline for my business, brand or product.", "buyer"),
  createRadio("Join As a Creative or Marketplace Seller", "I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.", "seller")
);

// ================Checkbox================
const checkCont = createElement("div", { class: "checkbox-container" });
checkCont.append(
  createElement("input", { type: "checkbox", id: "terms", required: true }),
  createElement("label", { for: "terms" }, "Allow Squadhelp to send marketing/promotional offers from time to time")
);

export const submitBtn = createElement("button", { type: "submit", disabled: true }, "Create account");


export const form = createElement("form", { id: "app" });
form.append(mainTitle, subTitle, row1, row2, row3, radioCont, checkCont, submitBtn);

const main = createElement("main");
main.append(form);

document.body.append(main);