# Mortgage Calculator

A simple **mortgage calculator** built with **HTML, CSS, and JavaScript**. Calculates monthly repayments and total repayment for both **repayment** and **interest-only mortgages**.  

---

## Table of Contents

- [Features](#features)   
- [How It Works](#how-it-works)  

---

## Features

- Input validation for amount, term, and interest rate.  
- Maximum input limits:  
  - Mortgage amount: 16 digits  
  - Term: 3 digits  
  - Interest rate: 200% max  
- Highlight empty or invalid inputs.  
- Choose mortgage type: **Repayment** or **Interest-only**.  
- Clear button to reset form and error states.  
- Formatted results in **Euro currency**.  

---

## How It Works

1. User enters:  
   - Mortgage amount  
   - Term (in years)  
   - Interest rate (%)  
2. User selects a **mortgage type**.  
3. Click **Calculate Repayment** to get:  
   - Monthly repayment  
   - Total repayment over the term  

### Formulas

**Repayment Mortgage:**  

\[
M = P \cdot \frac{r (1+r)^n}{(1+r)^n -1}
\]  

- \(P\) = Principal (mortgage amount)  
- \(r\) = Monthly interest rate (annual rate ÷ 12 ÷ 100)  
- \(n\) = Total months (term × 12)  

**Interest-Only Mortgage:**  

- Monthly = \(P \cdot r\)  
- Total = Monthly × n  
