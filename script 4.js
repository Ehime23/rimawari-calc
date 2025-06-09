
function getAnnualRentFromInputs(monthId, yearId) {
  const monthly = parseFloat(document.getElementById(monthId).value);
  const annual = parseFloat(document.getElementById(yearId).value);
  if (!isNaN(annual)) return annual;
  if (!isNaN(monthly)) return monthly * 12;
  return null;
}

function getMonthlyRentFromInputs(monthId, yearId) {
  const monthly = parseFloat(document.getElementById(monthId).value);
  const annual = parseFloat(document.getElementById(yearId).value);
  if (!isNaN(monthly)) return monthly;
  if (!isNaN(annual)) return annual / 12;
  return null;
}

function reverseFromYield() {
  const targetYield = parseFloat(document.getElementById('targetYield').value);
  const annualRent = getAnnualRentFromInputs('monthlyRent1', 'annualRent1');
  if (targetYield && annualRent) {
    const price = (annualRent / targetYield) * 100;
    document.getElementById('reverseResult').innerText = 
      "逆算された売却価格: " + price.toFixed(2) + " 万円\n" +
      "年間家賃収入: " + annualRent.toFixed(2) + " 万円 / 月間: " + (annualRent/12).toFixed(2) + " 万円";
  }
}

function calculateYield() {
  const price = parseFloat(document.getElementById('propertyPrice2').value);
  const annualRent = getAnnualRentFromInputs('monthlyRent2', 'annualRent2');
  if (price && annualRent) {
    const yieldValue = (annualRent / price) * 100;
    document.getElementById('yieldResult2').innerText = 
      "表面利回り: " + yieldValue.toFixed(2) + " %\n" +
      "年間家賃収入: " + annualRent.toFixed(2) + " 万円 / 月間: " + (annualRent/12).toFixed(2) + " 万円";
  }
}

function calculateSellingYield() {
  const annualRent = getAnnualRentFromInputs('monthlyRent3', 'annualRent3');
  const sellingPrice = parseFloat(document.getElementById('sellingPrice3').value);
  if (annualRent && sellingPrice) {
    const yieldValue = (annualRent / sellingPrice) * 100;
    document.getElementById('sellingYieldResult').innerText = 
      "売却価格に対する利回り: " + yieldValue.toFixed(2) + " %\n" +
      "年間家賃収入: " + annualRent.toFixed(2) + " 万円 / 月間: " + (annualRent/12).toFixed(2) + " 万円";
  }
}

function calculateAll() {
  const price = parseFloat(document.getElementById('price').value);
  const annualRent = getAnnualRentFromInputs('monthlyIncome', 'annualIncome');
  const monthlyRent = getMonthlyRentFromInputs('monthlyIncome', 'annualIncome');
  const displayPrice = document.getElementById('displayPrice');
  const displayRent = document.getElementById('displayRent');
  const yieldResult = document.getElementById('yieldResult');
  const feeResult = document.getElementById('feeResult');

  if (!price || !annualRent) {
    alert("物件価格と月額または年額家賃収入のいずれかを入力してください。");
    return;
  }

  displayPrice.innerText = "💰 物件価格: " + price.toLocaleString() + " 万円";
  displayRent.innerText = "🏠 家賃収入: 年間 " + annualRent.toFixed(2) + " 万円 / 月間 " + monthlyRent.toFixed(2) + " 万円";

  const yieldValue = (annualRent / price) * 100;
  yieldResult.innerText = "📉 表面利回り: " + yieldValue.toFixed(2) + " %";

  let fee = 0;
  if (price <= 800) {
    fee = 33;
  } else {
    let remaining = price;
    if (remaining > 400) {
      fee += (remaining - 400) * 0.03;
      remaining = 400;
    }
    if (remaining > 200) {
      fee += (remaining - 200) * 0.04;
      remaining = 200;
    }
    if (remaining > 0) {
      fee += remaining * 0.05;
    }
    fee *= 1.1;
  }

  feeResult.innerText = "📌 仲介手数料: " + fee.toFixed(2) + " 万円（税込）";
}
