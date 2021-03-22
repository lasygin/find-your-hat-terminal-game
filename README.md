# find-your-hat-terminal-game

Small terminal game where you make your way to your hat, avoiding holes!

---

## Prepare for game

1) Fork this repo
2) Clone it locally and do 'npm install' in terminal
3) To start playing do 'npm main.js'

## Choose how to play

You can play with random generated field or you own:

![fieldType](./screenshots/fieldType.png?raw=true)

Just comment out what you don't need!

Also, you can give options for random field:\
`const myField = new Field(Field.generateField(10,10, 30));`

.generateField method takes 3 parameters:\
first - for height\
second - for width\
third - for how much holes you want (in % of the whole field)

## Gameplay

![fieldType](./screenshots/field-1.png?raw=true)

About the icons:\
'^' - it's a hat\
'0' - it's a hole\
'░' - it's a plain field (you can step on it)\
'*' - this is you (actually it's a path of your moves)

So, you will be promted to input your next move:\
u (up) / r (right) / d (down) / l (left)\
Just type u/r/d/l and push enter, the field will be updated with you move

![fieldType](./screenshots/field-2.png?raw=true)

Go on and you can finally reach your hat!

![fieldType](./screenshots/field-3.png?raw=true)



WATCH FOR THE HOLES AND BORDERS OF THE FIELD!

![fieldType](./screenshots/field-4.png?raw=true)

![fieldType](./screenshots/field-5.png?raw=true)
