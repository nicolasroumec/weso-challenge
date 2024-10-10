function organizeGifts(gifts) {
  let giftCounts = {};
  let currentQuantity = '';
  let output = '';

  for (let i = 0; i < gifts.length; i++) {
    if (gifts[i] >= '0' && gifts[i] <= '9') {
      currentQuantity += gifts[i];
    } else {
      let count = parseInt(currentQuantity);
      let type = gifts[i];
      if (giftCounts[type]) {
        giftCounts[type] += count;
      } else {
        giftCounts[type] = count;
      }
      currentQuantity = '';
    }
  }

  for (let type in giftCounts) {
    let count = giftCounts[type];
    
    let palets = Math.floor(count / 50);
    for (let i = 0; i < palets; i++) {
      output += '[' + type + ']';
    }
    count = count % 50;

    let boxes = Math.floor(count / 10);
    for (let i = 0; i < boxes; i++) {
      output += '{' + type + '}';
    }
    count = count % 10;

    if (count > 0) {
      output += '(';
      for (let i = 0; i < count; i++) {
        output += type;
      }
      output += ')';
    }
  }

  return output;
}

console.log(organizeGifts('76a11b'));