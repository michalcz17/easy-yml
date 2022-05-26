# easy-yml
The easy way to make, edit and read yaml files with node.js
### Description
It can be used very simple, by a few functions you can make, edit or read any yaml file in data folder in your project.
## Documentation
```javascript
// Import easy-yml
const file = require("easy-yml");


// Store value into file
file.setData("filename", "variable", "value");

// File filename.yml:
// ----------------
// file: true
// variable: value


// Get value from file
var output = file.getData("filename", "variable");
console.log(output); // value

```
