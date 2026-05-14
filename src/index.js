"use strict";

const tree = {
  tag: "main",
  children: [
    {
      tag: "form",
      attrs: { id: "app" },
      children: [
        {
          tag: "h1",
          attrs: { class: "main-title" },
          text: "CREATE AN ACCOUNT",
        },

        {
          tag: "p",
          attrs: { class: "sub-title" },
          text: "We always keep your name and email address private.",
        },

        // first row
        {
          tag: "div",
          attrs: { class: "inputs-container" },
          children: [
            {
              tag: "input",
              attrs: {
                type: "text",
                placeholder: "First name",
              },
            },
            {
              tag: "input",
              attrs: {
                type: "text",
                placeholder: "Last name",
              },
            },
          ],
        },

        // second row
        {
          tag: "div",
          attrs: { class: "inputs-container" },
          children: [
            {
              tag: "input",
              attrs: {
                type: "text",
                placeholder: "Display Name",
              },
            },
            {
              tag: "input",
              attrs: {
                type: "email",
                placeholder: "Email Address",
              },
            },
          ],
        },

        // third row
        {
          tag: "div",
          attrs: { class: "inputs-container" },
          children: [
            {
              tag: "input",
              attrs: {
                type: "password",
                placeholder: "Password",
              },
            },
            {
              tag: "input",
              attrs: {
                type: "password",
                placeholder: "Password Confirmation",
              },
            },
          ],
        },

        {
          tag: "div",
          attrs: { class: "radio-container" },
          children: [
            {
              tag: "div",
              attrs: { class: "radio-item" },
              children: [
                {
                  tag: "input",
                  attrs: {
                    type: "radio",
                    name: "account",
                    value: "buyer",
                    id: "buyer",
                  },
                },
                {
                  tag: "label",
                  attrs: { for: "buyer" },
                  children: [
                    {
                      tag: "span",
                      attrs: { class: "radio-title"},
                      text: "Join As a Buyer",
                    },
                    {
                      tag: "span",
                      attrs: { class: "radio-description" },
                      text: "I am looking for a Name, Logo or Tagline for my business, brand or product.",
                    },
                  ],
                },
              ],
            },

            {
              tag: "div",
              attrs: { class: "radio-item" },
              children: [
                {
                  tag: "input",
                  attrs: {
                    type: "radio",
                    name: "account",
                    value: "seller",
                    id: "seller",
                  },
                },
                {
                  tag: "label",
                  attrs: { for: "seller" },
                  children: [
                    {
                      tag: "span",
                      attrs: { class: "radio-title", id: "seller" },
                      text: "Join As a Creative or Marketplace Seller",
                    },
                    {
                      tag: "span",
                      attrs: { class: "radio-description", id: "seller" },
                      text: "I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.",
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          tag: "div",
          attrs: { class: "checkbox-container" },
          children: [
            {
              tag: "input",
              attrs: {
                type: "checkbox",
                id: "offers",
              },
            },
            {
              tag: "label",
              attrs: { for: "offers" },
              text: "Allow Squadhelp to send marketing/promotional offers from time to time",
            },
          ],
        },

        {
          tag: "button",
          attrs: { type: "submit" },
          text: "Create account",
        },
      ],
    },
  ],
};

function createElement(node) {
  const element = document.createElement(node.tag);
  element.textContent = node.text ?? "";

  if (node.attrs) {
    for (const [key, value] of Object.entries(node.attrs)) {
      element.setAttribute(key, value);
    }
  }

  if (node.children) {
    node.children.forEach((child) => {
      element.appendChild(createElement(child));
    });
  }

  return element;
}

document.body.appendChild(createElement(tree));
