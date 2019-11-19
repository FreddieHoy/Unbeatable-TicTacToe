

# Unbeatable TicTacToe

[Unbeatable-TicTacToe](https://freddiehoy.github.io/Unbeatable-TicTacToe/)

This game was made as part of a code test. It solves the common problem of creating an unbeatable TicTacToe game using the minimax algorithm.

## Brief

- Write an unbeatable TicTacToe program.
- It should allow the user chose the game type. For example:
  - Human v Human
  - Human v Computer
  - Computer v Computer
- The computer should never loose and win whenever possible.
- The user should have a choice of which player goes first.
- Use any language
- It should be made playable using the Browser.
- Include Unit Tests.


## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6)
- Chai


## Approach taken
This section lays out the general approach and key problems solved.

Once an effective front end was set up using HTML and CSS. Basic JavaScript was use to interact using the DOM and enable the user to play human vs human effectively.

#### Choosing which player can go first

In order to incorporate the ability to play against a computer and to decide if player 1 or 2 was to go first, the start() and turn() functions were created.

These functions take the inputs from the radio buttons on the front end using the DOM, creating the variables playerTurn, playerOneType and playerTwoType. These variables which methods are called to make decisions as a human or computer.

#### Minimax Recursive Function & computer logic

The minimax recursive function is an algorithm set up to find the best move for the computer. Meaning that the computer should never loose and win whenever possible.

minimax() is a recursive function. The idea of the function is too look at all the possible routes that end with a 'terminal decision' and choose the route that is most likely to get to a positive outcome.

This is complex algorithm and therefore I looked for online information to help understand it. I used [THIS](https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/) resource / tutorial to learn and help implement the function.

Implementing this logic to work took time. I restarted twice by deleting the entire function. Both times because the function was being called too many times as I tried to implement it on my own.

It worked in the end and I followed the tutorial much closer and tested the existing one from the resource on CodePen.

#### Improving the computation for minimax

Having played the game myself and testing an online version of an unbeatable TicTacToe, it was known that the first best decision was always to go for the centre square. If the centre square was unavailable then the next best would be any corner. Corner 0 was selected.

By noticing that the computers first turn was always the same (centre or corner), it meant that 59705 calls of the minimax function were avoided for the first go. Saving computation cost.

#### Unit testing

Unit Testing was done using Chai.

The test were limited and did not cover the entire logic base. I struggled it test functions that mainly interacted with the DOM, but was very successful with functions that handled the pure logic, taking in arguments and returning arrays or objects.

Those functions that I was able to test, I tired to use Test Driven Development(TDD). The functions that were successfully developed using TDD were:

- checkWin()
- checkDraw()

Although limited. I am VERY keen to learn more about how to implement TDD and  make me a better developer.

## Wins and Blockers

##### BIG WINS

- Getting basic human v human game working.
- Completing the minimax function to work for computer decision making.
- Successful development using TDD if only for a couple of functions.

##### BLOCKERS

- Creating the minimax function without following the tutorial.
- Testing interactions with the DOM.

## Development Log

| Time      | Task         |
| ------------- |:-------------:|
| **Day One**    |  HTML & CSS. Setting up the page with no logic.  |
|  **Day two**    |   Basic logic for Human vs human. Unit testing. Research into minimax algorithm.  |
| **Day Three**  |    Implementing the computers choosing logic with minimax for human v computer and computer vs computer. Using TDD for simpler functions  |


## What have I learned.

- I have learned how to work using more advance algorithms.
- I have improved my ability to plan a project.
- I have improved my ability to test. Including the range of tests and thought behind what to test and why.

## Moving Forward

I would like to look into how to create this app using Object Oriented Programming. Perhaps using a class for a player and then creating a new 'player' ie. playerOne and playerTwo.

I would also like to improve on my TDD to cover a much more significant amount of the codebase.

---
# Contact

Freddie Hoy

Email: freddiehoy0@gmail.com

[Portfolio](https://freddiehoy.github.io/) | [LinkedIn](https://www.linkedin.com/in/freddie-hoy/) |
[GitHub](https://github.com/FreddieHoy?tab=repositories)
