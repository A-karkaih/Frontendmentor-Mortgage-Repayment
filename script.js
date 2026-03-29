// js-clear-btn is the class name of the clear button
// js-amount-input is the class name of the input field for the mortgage amount
// js-term-input is the class name of the input field for the mortgage term
// js-rate-input is the class name of the input field for the interest rate
// mortgage-radio is the class name of the radio buttons for the mortgage type
// *********************************************************************************
// empty-input is the class name to be added to the input fields when they are empty and the form is submitted
// js-amount-empty-input is the class name of the div containing the amount input field, to which the empty-input class will be added when the amount input field is empty and the form is submitted
// js-term-empty-input is the class name of the div containing the term input field, to which the empty-input class will be added when the term input field is empty and the form is submitted
// js-rate-empty-input is the class name of the div containing the rate input field, to which the empty-input class will be added when the rate input field is empty and the form is submitted
// *********************************************************************************

// ******************************** DOM ELEMENTS **************************
const form = document.querySelector(".mortgage-form");
//   classes
const amountEmpty = document.querySelector(".js-amount-empty-input");
const termEmpty = document.querySelector(".js-term-empty-input");
const rateEmpty = document.querySelector(".js-rate-empty-input");
const firstEmptyInput = document.querySelector(".js-first-empty-input");
const secondEmptyInput = document.querySelector(".js-second-empty-input");
const resultContainer = document.querySelector(".js-result-container");
// inputs
const amountInput = document.querySelector(".js-amount-input");
const termInput = document.querySelector(".js-term-input");
const rateInput = document.querySelector(".js-rate-input");
const mortgageRadios = document.querySelectorAll('input[name="type"]');
const clearBtn = document.querySelector(".js-clear-btn");
// clear button event listener
clearBtn.addEventListener("click", () => {
  form.reset();
  amountEmpty.classList.remove("first-empty-input");
  termEmpty.classList.remove("second-empty-input");
  rateEmpty.classList.remove("second-empty-input");
  firstEmptyInput.classList.remove("empty-radio");
  secondEmptyInput.classList.remove("empty-radio");
});
// when the user changes the radio button selection, remove the empty style from both radio button divs
mortgageRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    // ila wa7d selected, remove empty style
    firstEmptyInput.classList.remove("empty-radio");
    secondEmptyInput.classList.remove("empty-radio");
  });
});

// when the user types in the input fields, remove the empty style from the corresponding divs
// Amount
amountInput.addEventListener("input", () => {
  if (amountInput.value.length > 16) {
    amountInput.value = amountInput.value.slice(0, 16);
  }
  if (amountInput.value.trim()) {
    amountEmpty.classList.remove("first-empty-input");
  } else {
    amountEmpty.classList.add("first-empty-input");
  }
});

// Term
termInput.addEventListener("input", () => {
  if (termInput.value.length > 3) {
    termInput.value = termInput.value.slice(0, 3);
  }
  if (termInput.value.trim()) {
    termEmpty.classList.remove("second-empty-input");
  } else {
    termEmpty.classList.add("second-empty-input");
  }
});

// Rate
rateInput.addEventListener("input", () => {
  if (rateInput.value.length > 3) rateInput.value = rateInput.value.slice(0, 3);

  if (rateInput.value > 200) rateInput.value = 200;

  if (rateInput.value.trim()) {
    rateEmpty.classList.remove("second-empty-input");
  } else {
    rateEmpty.classList.add("second-empty-input");
  }
});
// **********************************************************************************

form.addEventListener("submit", function (event) {
  const mortgageType = document.querySelector('input[name="type"]:checked');
  event.preventDefault();
  console.log("hello");
  let mortage = {
    amount: 0,
    term: 0,
    rate: 0,
    type: "",
  };

  if (!amountInput.value) {
    amountEmpty.classList.add("first-empty-input");
  } else {
    amountEmpty.classList.remove("first-empty-input");
    mortage.amount = parseFloat(amountInput.value);
  }
  if (!termInput.value) {
    termEmpty.classList.add("second-empty-input");
  } else {
    termEmpty.classList.remove("second-empty-input");
    mortage.term = parseFloat(termInput.value);
  }
  if (!rateInput.value) {
    rateEmpty.classList.add("second-empty-input");
  } else {
    rateEmpty.classList.remove("second-empty-input");
    mortage.rate = parseFloat(rateInput.value);
  }

  if (!mortgageType) {
    firstEmptyInput.classList.add("empty-radio");
    secondEmptyInput.classList.add("empty-radio");
  } else {
    firstEmptyInput.classList.remove("empty-radio");
    secondEmptyInput.classList.remove("empty-radio");
    mortage.type = mortgageType.value;
  }
  const mortgageRepayment = calculateMortgage(mortage);

  if (
    Number(mortgageRepayment.monthly) > 0 &&
    Number(mortgageRepayment.total) > 0
  ) {
    const eurFormattedMonthly = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(Number(mortgageRepayment.monthly));
    const eurFormattedTotal = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(Number(mortgageRepayment.total));

    const html = `
            <div class="second-content">
                <h2> Your Results</h2>
                <p> Your results are shown below based on the information you provided.
                    To adjust the results, edit the form and click “calculate repayments” again.</p>
                <div class="result-container">
                    <p>Your monthly repayments</p>
                    <h2>${eurFormattedMonthly}</h2>
                    <div class="line"></div>

                    <p>Total you'll repay over the term</p>
                    <h4> ${eurFormattedTotal} </h4>

                </div>
            </div>`;
    resultContainer.innerHTML = html;
  } else {
    alert("Please fill in all the fields correctly.");
  }
});

// ----- CALCULATION FUNCTION -----
function calculateMortgage(mortgage) {
  const P = mortgage.amount;
  const r = mortgage.rate / 100 / 12; // monthly interest
  const n = mortgage.term * 12; // total months

  let monthly = 0;
  let total = 0;

  if (mortgage.type === "repayment") {
    monthly = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    total = monthly * n;
  } else if (mortgage.type === "interest") {
    monthly = P * r;
    total = monthly * n; // total interest paid
  }

  return {
    monthly: monthly.toFixed(2),
    total: total.toFixed(2),
  };
}
