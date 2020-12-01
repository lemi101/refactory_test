function sorter(numbers) {  
    var counter = 0;

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length+1; j++) {
            if (numbers[j] > numbers[j+1]) {
                counter++;
                var sub = [numbers[j+1], numbers[j]];

                var temp = numbers[j];
                numbers[j] = numbers[j+1];
                numbers[j+1] = temp;

                var numsStr = numbers.map(String).join(' ');
                console.log(`${counter}. [${sub}] -> ${numsStr}`);
            }            
        }
    }

    console.log(`Jumlah swap: ${counter}`);
}

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
  rl.question('Input = ', input => {
    var numbers = input.split(' ').map(Number);
    sorter(numbers);
    rl.close();
  });