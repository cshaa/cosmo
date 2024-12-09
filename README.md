# Cosmo
⚠️ Work In Progress ⚠️

A graphical programming language.


## Goals
The language is designed to be accessible for users who have mastered Scratch. It retains core concepts from Scratch, including its data types _Truth_ (boolean), _Number_, _Text_, and _List_, while adding dictionaries, structures and first-class functions. It is intended to be a practical scripting language, enabling users to easily perform tasks such as filtering JSON, scraping websites, or manipulating spreadsheets with math, all in an intuitive and ergonomic manner. The vision is to be as hands on and visual as Scratch is, but with data instead of sprites on a canvas. This language is intended to be an ideal "in-between" language for learners transitioning from Scratch to more complex programming languages, as well as a powerful scripting tool for those who do not aim to become expert programmers.

## Core features
### Data types & standard library
* _None_ type
  * exactly one value
  * _none_ == _none_
* _Truth_
  * values _true_ and _false_
  * logic functions (not, and, or)
* _Number_ type
  * represented by `f64`
    * weird, but most widely used
    * `NaN` & infinities are automatically converted to _none_ and emit a warning
  * arithmetic functions (+, −, ×, ÷, mod), rounding; any operation with _none_ input returns _none_
  * exact and approximate equality & inequality checks
* _Text_
  * valid unicode string of text; parsing invalid strings is an error
  * operations:
    * interpolation, concatenation
    * contains, starts with, ends with
    * list of characters, length, substring; indexing is done to respect glyph boundaries as much as possible
    * into & from unicode code points

### Interpreter
* Step-by-step execution with rewinding, data inspection and modification
* Warnings and errors are recoverable by rewinding & manual data modification

### Non-features
* No OOP – it's a bad mental model for abstracting the real world
* No async/await, traits, threads, parallelization, data ownership/borrow checker – these are good and useful, but too complex for a beginner language
