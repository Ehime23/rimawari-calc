
function reverseFromYield() {
  const targetYield = parseFloat(document.getElementById('targetYield').value);
  const annualRent = parseFloat(document.getElementById('annualRent1').value);
  if (targetYield && annualRent) {
    const price = (annualRent / targetYield) * 100;
    document.getElementById('reverseResult').innerText = "逆算された売却価格: " + price.toFixed(2) + " 万円";
  }
}

function calculateYield() {
  const price = parseFloat(document.getElementById('propertyPrice2').value);
  const rent = parseFloat(document.getElementById('annualRent2').value);
  if (price && rent) {
    const yieldValue = (rent / price) * 100;
    document.getElementById('yieldResult2').innerText = "表面利回り: " + yieldValue.toFixed(2) + " %";
  }
}

function calculateSellingYield() {
  const rent = parseFloat(document.getElementById('annualRent3').value);
  const sellingPrice = parseFloat(document.getElementById('sellingPrice3').value);
  if (rent && sellingPrice) {
    const yieldValue = (rent / sellingPrice) * 100;
    document.getElementById('sellingYieldResult').innerText = "売却価格に対する利回り: " + yieldValue.toFixed(2) + " %";
  }
}

function calculateAll() {
  const price = parseFloat(document.getElementById('price').value);
  const income = parseFloat(document.getElementById('monthlyIncome').value);
  const displayPrice = document.getElementById('displayPrice');
  const displayRent = document.getElementById('displayRent');
  const yieldResult = document.getElementById('yieldResult');
  const feeResult = document.getElementById('feeResult');

  if (!price || !income) {
    alert("物件価格と月額家賃を入力してください。");
    return;
  }

  displayPrice.innerText = "💰 物件価格: " + price.toLocaleString() + " 万円";
  displayRent.innerText = "🏠 月額家賃収入: " + income.toFixed(2) + " 万円";

  const yieldValue = ((income * 12) / price) * 100;
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
