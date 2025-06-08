
function updateAnnualIncome() {
  const monthly = parseFloat(document.getElementById('monthlyIncome').value);
  const annual = document.getElementById('annualIncome');
  if (monthly) {
    annual.value = (monthly * 12).toFixed(2);
  } else {
    annual.value = '';
  }
}

function calculateYield() {
  const price = parseFloat(document.getElementById('price').value);
  const income = parseFloat(document.getElementById('annualIncome').value);
  const result = document.getElementById('yieldResult');
  if (!price || !income) {
    result.innerText = "物件価格と月額家賃を入力してください。";
    return;
  }
  const yieldValue = (income / price) * 100;
  result.innerText = `表面利回り： ${yieldValue.toFixed(2)}%`;
}

function calculateLoan() {
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
  const rate = parseFloat(document.getElementById('interestRate').value) / 100;
  const years = parseInt(document.getElementById('loanYears').value);
  const method = document.querySelector('input[name="repaymentMethod"]:checked').value;
  const result = document.getElementById('loanResult');

  if (!loanAmount || !rate || !years) {
    result.innerText = "借入金額・金利・年数をすべて入力してください。";
    return;
  }

  const principal = loanAmount - downPayment;
  const months = years * 12;
  const monthlyRate = rate / 12;

  let monthlyPayment, totalPayment;

  if (method === "equalPrincipalInterest") {
    // 元利均等返済
    monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    totalPayment = monthlyPayment * months;
  } else {
    // 元金均等返済
    const principalPerMonth = principal / months;
    let total = 0;
    for (let i = 0; i < months; i++) {
      const interest = (principal - principalPerMonth * i) * monthlyRate;
      total += principalPerMonth + interest;
    }
    monthlyPayment = principalPerMonth + principal * monthlyRate; // 初月返済額
    totalPayment = total;
  }

  const annualPayment = monthlyPayment * 12;

  result.innerHTML = `
    <strong>月額返済額（初月）：</strong> ${monthlyPayment.toFixed(0)} 万円<br>
    <strong>年間返済額（概算）：</strong> ${annualPayment.toFixed(0)} 万円<br>
    <strong>返済総額：</strong> ${totalPayment.toFixed(0)} 万円
  `;
}
