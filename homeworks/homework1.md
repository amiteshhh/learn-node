#HOMEWORK 

1.Create ​config​​ directory inside your project.
2.Create ​json ​​module in ​config​​ directory to store configs of application. For now add justone field ​name ​​that stores the name of the app: ​“Node.js Homework Application”​.
3.Create ​models​​ directory.
4.Create ​User.js ​​module in ​models​​ directory. It should implement and export class ​User(​use​​ECMAScript2015​​) with a ​constructor ​​that logs ​“User module”​ to console.
5.Create ​Product.js ​​module in ​models​​ directory which exports ​Product​​ class with aconstructor​​ that logs ​“Product module”​ to console.
6.In the main application file import ​json ​​module defined in ​config ​​directory (​useECMAScript2015​​as well instead of ​require​​) and log the name of application toconsole.
7.In the main application file import modules defined in ​models ​​directory. There should beone ​import​​ command that brings all our models to the app.
8.Create instances of ​User​​ and ​Product​​ classes. Appropriate messages should be loggedto console.

##Evaluation Criteria
1.Nothing has been done except the project’s structure.
2.package.json​​ has been created and contains the list of required packages.
3.All three modules have been created and the classes have been implemented.
4.The modules are imported to the main module as described in task 7 and 8.5.package.json “start”​​ script uses babel and nodemon to run the app.
