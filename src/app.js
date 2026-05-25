"use strict";

import { form, row2, row3, submitBtn } from './dom-builder.js';

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
  const storageKey = person.lastName || "default_user";

  localStorage.setItem(
    storageKey,
    JSON.stringify(person, (name, value) =>
      name === "account" ? undefined : value
    )
  );
}

form.addEventListener("submit", setDatatoLocalStorage, { once: true });

function validateForm() {
  const isHtmlValid = form.checkValidity();
  const isEmailValid = regExpEmail.test(emailInput.value);

  const pass1 = document.getElementById("0")?.value || "";
  const pass2 = document.getElementById("1")?.value || "";
  const isPasswordsMatch = pass1 === pass2 && pass1 !== "";

  if (isHtmlValid && isEmailValid && isPasswordsMatch) {
    submitBtn.disabled = false;
    submitBtn.style.background = "#28D2D1";
  } else {
    submitBtn.disabled = true;
    submitBtn.style.background = ""; 
  }
}

form.addEventListener("input", validateForm);
form.addEventListener("change", validateForm);

//=================================VALID EMAIL========================================
const emailInput = form.querySelector('input[type="email"]');
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
  if (/\s/.test(value)) return "Адреса електронної пошти не повинна містити пробілів";
  if (!value.includes("@")) return "Потрібен символ @";

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
  validateForm();
}

emailInput.addEventListener("input", checkEmail);

//=================================VALID PASSWORD========================================
const invalidPasswordBorder = document.createElement("div");
invalidPasswordBorder.classList.add("invalidPasswordBorder");
invalidPasswordBorder.textContent = "Паролі не однакові";
row3.append(invalidPasswordBorder);

form.querySelectorAll('input[type="password"]').forEach((input) => {
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
  validateForm();
}