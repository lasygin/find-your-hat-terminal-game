const prompt = require('prompt-sync')({sigint: true});

// Global vars
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
  constructor(field) {
    this.field = field;
    // Initial 'cursor' position
    this.posX = 0;
    this.posY = 0;
  }
  
  print() {
    console.log(this.field.map(e => e.join('')).join('\n'));
  }


  static generateField(height, width, holePercent) {
    const randomField = [];
    const holeAmount = Math.floor((height * width) / 100 * holePercent);
    
    // Generate plain field
    for (let i = 0; i < height; i++) {
      randomField.push([]);
      for (let j = 0; j < width; j++) {
        randomField[i].push(fieldCharacter);
      }
    }
    
    // Add holes
    for (let h = 0; h < holeAmount; h++) {
      let holeDone = false;
      
      while (!holeDone) {
        const randomY = Math.floor(Math.random() * height);
        const randomX = Math.floor(Math.random() * width);

        if (randomField[randomY][randomX] === fieldCharacter) {
          randomField[randomY][randomX] = hole;
          holeDone = true;
        }
      }
    }

    // Add hat
    let hatDone = false;
      
    while (!hatDone) {
      const randomY = Math.floor(Math.random() * height);
      const randomX = Math.floor(Math.random() * width);

      if (randomField[randomY][randomX] === fieldCharacter) {
        randomField[randomY][randomX] = hat;
        hatDone = true;
      }
    }
    
    return randomField;
  }

  play() {
    let win = false;
    let lose = false;
  
    // Initial user position + change 'cursor' position:

    // If there IS NO user position - make random
    if (!this.field.flat().includes(pathCharacter)) {
      let userDone = false;
      while(!userDone) {
        const randomY = Math.floor(Math.random() * this.field.length);
        const randomX = Math.floor(Math.random() * this.field[0].length);
        if (this.field[randomY][randomX] === fieldCharacter) {
          this.field[randomY][randomX] = pathCharacter;
          this.posX = randomX;
          this.posY = randomY;
          userDone = true;
        }
      }
    // If there IS user position - search it & change 'cursor' position
    } else {
      this.field.forEach((row, index) => {
        const search = row.indexOf(pathCharacter);
        if(search !== -1) {
          this.posX = search;
          this.posY = index;
        }
      })
    }
    
    
    while(!win || !lose) {
      
      console.clear();
      myField.print();
      console.log('\nYou can go:\n u (up) / r (right) / d (down) / l (left)\n');
      // Get user input
      const userMove = prompt('Your move:   ');
      // Change the 'cursor' position from input
      switch(userMove) {
        case 'u':
          this.posY--;
          break;
        case 'r':
          this.posX++;
          break;
        case 'd':
          this.posY++;
          break;
        case 'l':
          this.posX--;
          break;
      }
      // Check 'cursor' position for lose/win
      if(!this.field[this.posY]  || !this.field[this.posY][this.posX]) {
        console.log('\nYou are out of field!\n'.toUpperCase());
        return lose = true;
      } else if(this.field[this.posY][this.posX] === hole) {
        console.log('\nYou fell in the hole!\n'.toUpperCase());
        return lose = true;
      } else if(this.field[this.posY][this.posX] === hat) {
        console.log('\nYou found your Hat!\n'.toUpperCase());
        return win = true;
      }
      // If no lose/win - draw userPath(*) on position and repeat process
      this.field[this.posY][this.posX] = pathCharacter;
    }
  }
}

// Play with random field:

const myField = new Field(Field.generateField(10,10, 30));

// Play with your own field:

// const myField = new Field([
//   ['░', '░', 'O'],
//   ['*', 'O', '░'],
//   ['░', '^', '░'],
// ]);

myField.play();
