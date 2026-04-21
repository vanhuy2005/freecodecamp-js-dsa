/*
Cash Register
Design a cash register drawer function that accepts a price, cash tendered, and the cash-in-drawer array. 
Return the correct change due and update the cash-in-drawer array.
*/

function checkCashRegister(price, cash, cid) {
  const UNIT_VALUES = {
    "PENNY": 1,
    "NICKEL": 5,
    "DIME": 10,
    "QUARTER": 25,
    "ONE": 100,
    "FIVE": 500,
    "TEN": 1000,
    "TWENTY": 2000,
    "ONE HUNDRED": 10000
  };

  let changeDue = Math.round((cash - price) * 100);
  let totalCid = cid.reduce((sum, curr) => sum + Math.round(curr[1] * 100), 0);

  if (totalCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (totalCid === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  const changeArray = [];
  const reversedCid = [...cid].reverse();

  for (let [name, amount] of reversedCid) {
    let amountInCents = Math.round(amount * 100);
    let unitValue = UNIT_VALUES[name];
    let amountFromUnit = 0;

    while (changeDue >= unitValue && amountInCents > 0) {
      changeDue -= unitValue;
      amountInCents -= unitValue;
      amountFromUnit += unitValue;
    }

    if (amountFromUnit > 0) {
      changeArray.push([name, amountFromUnit / 100]);
    }
  }

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArray };
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);