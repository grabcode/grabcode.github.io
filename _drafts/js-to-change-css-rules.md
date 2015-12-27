
.insertRule

//http://stackoverflow.com/questions/13528512/modify-a-css-rule-object-with-javascript
var sheet = document.styleSheets[0];
var rules = sheet.cssRules || sheet.rules;

rules[0].style.color = 'red';
