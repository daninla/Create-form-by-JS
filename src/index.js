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
          text: "ALREADY HAVE AN ACCOUNT? LOG IN",
        },
        {
          tag: "div",
          attrs: { class: "inputs-container" },
          children: [
            {
              tag: "input",
              attrs: { type: "text", placeholder: "FIRST NAME" },
            },
            { tag: "input", attrs: { type: "text", placeholder: "LAST NAME" } },
          ],
        },
        {
          tag: "div",
          attrs: { class: "inputs-container" },
          children: [
            {
              tag: "input",
              attrs: { type: "email", placeholder: "EMAIL ADDRESS" },
            },
            {
              tag: "input",
              attrs: { type: "password", placeholder: "PASSWORD" },
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
                  attrs: { type: "radio", name: "account", value: "personal" },
                },
                {
                  tag: "label",
                  children: [
                    {
                      tag: "span",
                      attrs: { class: "radio-title" },
                      text: "PERSONAL ACCOUNT",
                    },
                    {
                      tag: "span",
                      attrs: { class: "radio-description" },
                      text: "Lorem ipsum dolor sit amet",
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
                  attrs: { type: "radio", name: "account", value: "business" },
                },
                {
                  tag: "label",
                  children: [
                    {
                      tag: "span",
                      attrs: { class: "radio-title" },
                      text: "BUSINESS ACCOUNT",
                    },
                    {
                      tag: "span",
                      attrs: { class: "radio-description" },
                      text: "Lorem ipsum dolor sit amet",
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
            { tag: "input", attrs: { type: "checkbox", id: "terms" } },
            {
              tag: "label",
              attrs: { for: "terms" },
              text: "I AGREE TO THE TERMS AND CONDITIONS",
            },
          ],
        },
        { tag: "button", attrs: { type: "submit" }, text: "CREATE ACCOUNT" },
      ],
    },
  ],
};



function createElement(node) {
  const element = document.createElement(node.tag);
  element.textContent = node.text || "";

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
