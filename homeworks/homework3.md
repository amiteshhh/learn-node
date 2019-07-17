#HOMEWORK 3
>COMMAND LINE. DEBUGGING. ERROR HANDLING / FILE SYSTEM AND STREAMSTasks

1.Create directory ​utils​​. Create util module called ​streams.js​​ inside this directory.
2.This util should be able to work with command line following the next requirements:
    a.Should consist of functions which will be run as actions.
    b.Should receive an action name as a first argument by ​--action​​ option.
    c.Should receive an optional second argument for actions which may require it by--file​​ option.
    d.Should process ​--help​​ key. If this option is passed as a first argument, printusage message and ignore other options. Ignore this option if other options werepassed before.
    e.Should support shortcuts for options as well (​-a​​ for ​--action​​, ​-f​​ for ​--file​​ and-h​​ for ​--help ​​respectively). Please note that util should work correctly with anyoption provided regardless its form (full or shortcuted).
    
## Example:
```javascript
// === streams.js ===
// Main actions to be called
function​​​reverse​​(str) { ​/* ... */​ }
function​​​transform​​(str) { ​/* ... */​ }
function​​​outputFile​​(filePath) { ​/* ... */​ }
function​​​convertFromFile​​(filePath) { ​/* ... */​ }
function​​​convertToFile​​(filePath) { ​/* ... */​ }
/* * * **** CODE WHICH IMPLEMENTS COMMAND LINE INTERACTION **** * */
// === Terminal ===
./streams.js --action=outputFile --file=users.csv
./streams.js --action=transformToFile --file=users.csv
./streams.js --action=transform textToTransform
./streams.js -a outputFile -f users.csv
./streams.js --help./streams.js -h
```
