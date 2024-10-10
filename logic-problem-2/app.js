function distributeGifts(input) {
  let output = [];
  
  for (let i = 0; i < input.length; i++) {
    output[i] = [];
    
    for (let j = 0; j < input[i].length; j++) {
      let values = [];
      
      if (i > 0 && input[i-1][j] !== null) {
        values.push(input[i-1][j]);
      }
      
      if (i < input.length - 1 && input[i+1][j] !== null) {
        values.push(input[i+1][j]);
      }
      
      if (j > 0 && input[i][j-1] !== null) {
        values.push(input[i][j-1]);
      }
      
      if (j < input[i].length - 1 && input[i][j+1] !== null) {
        values.push(input[i][j+1]);
      }
      
      if (input[i][j] !== null) {
        values.push(input[i][j]);
      }
      
      let sum = 0;
      for (let k = 0; k < values.length; k++) {
        sum += values[k];
      }
      let average = sum / values.length;
      
      output[i][j] = Math.round(average);
    }
  }
  
  return output;
}

console.log(distributeGifts([
  [4, 5, 1],
  [6, null, 3],
  [8, null, 4]
]))