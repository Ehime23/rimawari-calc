function calculateYield() {
  const price = parseFloat(document.getElementById("price").value);
  const rent = parseFloat(document.getElementById("rent").value);

  if (isNaN(price) || isNaN(rent) || price === 0) {
    document.getElementById("result").innerText = "有効な数値を入力してください。";
    return;
  }

  const annualIncome = rent * 12;
  const yield = ((annualIncome / price) * 100).toFixed(2);

  document.getElementById("result").innerText = `表面利回りは ${yield}% です 🌸`;
}
