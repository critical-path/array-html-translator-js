## array-html-translator-js v1.0.0

## Introduction

Writing HTML is tedious.  array-html-translator-js makes it fun!

With array-html-translator-js, we use strings to define HTML elements and nested arrays to describe the hierarchical relationships between them.

## Defining HTML Elements

To define an HTML element, we use a string containing one or more special characters.

- "@" for name 
- "#" for id 
- "." for class
- "&" for other attributes in the form of key-value pairs
- "$" for text

```
["@h1"]
<h1></h1>

["@h1 #id"]
<h1 id="id"></h1>

["@h1 .class"]
<h1 class="class"></h1>

["@h1 &key=\"value\""]
<h1 key="value"></h1>

["@h1 $text"]
<h1>text</h1>
```

array-html-translator-js supports void elements, which have no closing tags.

```
[“@col”]
<col>

["@meta &charset=\"utf-8\""]
<meta charset="utf-8">

["@link &rel=\"stylesheet\" &href=\"./css/app.css\""] 
<link rel="stylesheet" href="./css/app.css">
```

Notes:

It is good practice to enclose attribute values in quotation marks and to escape the quotation marks.

__Good__:

```
[“@h1 &arbitrary-key=\"arbitrary-value\””] 
<h1 arbitrary-key="arbitrary-value"></h1>
```

__Bad__:

```
[“@h1 &arbitrary-key=arbitrary-value"]
<h1 arbitrary-key=arbitrary-value></h1>
```

Please remember to separate text values with non-space characters.  (Sorry!  This is a shortcoming in the code.) 

__Good__:

```
["@h1 $this-is-text"]
<h1>this-is-text</h1>
```

__Bad__:

```
["@h1 $this is text"]
<h1>this</h1>
```

## Describing the Hierarchical Relationships between HTML Elements

To describe the hierarchical relationships between HTML elements, we use nested arrays.

```
["@html &lang=\"en\""]
<html lang="en"></html>

["@html &lang=\"en\"", ["@head"]]
<html lang="en"><head></head></html>

["@html &lang=\"en\"", ["@head", ["@meta charset=\"utf-8\""]]]
<html lang="en"><head><meta charset="utf-8"></head></html>

["@html &lang=\"en\"", ["@head", ["@meta charset=\"utf-8\""], ["@title $app"]]]
<html lang="en"><head><meta charset="utf-8"><title>app</title></head></html>

["@html &lang=\"en\"", ["@head", ["@meta charset=\"utf-8\""], ["@title $app"]], ["@body"]]
<html lang="en"><head><meta charset="utf-8"><title>app</title></head><body></body></html>
```

## Dependencies:

To use array-html-translator-js, we will need Node and npm (https://www.nodejs.org).  To test it, we will need chai (https://chaijs.com) and Mocha (https://mochajs.org).


## Installing array-html-translator-js

1. Download this repository.
2. Extract its contents.
3. Run npm pack.

```
npm pack
```

4. Copy array-html-translator-js-1.0.0.tgz to the desired directory, presumably the location of your application.

```
cp array-html-translator-js-1.0.0.tgz /path/to/application
```

5. Run npm install array-html-translator-js-1.0.0.tgz.

```
npm install array-html-translator-js-1.0.0.tgz
```

If we encounter any errors during installation, then we will try again, this time prefacing our commands with "sudo."

```
sudo npm pack
cp array-html-translator-js-1.0.0.tgz /path/to/application
sudo npm install array-html-translator-js-1.0.0.tgz
```

## Installing dependencies

1. Locate the directory in which the array-html-module is located.
2. Change to that directory.

```
cd /path/to/application/node_modules/array-html-translator
```

3. Run npm install.

```
npm install
```

If we encounter any errors during installation, then we will try again, this time prefacing our commands with "sudo."

```
sudo npm install
```


## Using array-html-translator-js

1. Require the array-html-translator module.
2. Create an array.
3. Instantiate Translator, passing in the array.
4. Call the translate method.
5. Do something fun with the HTML!

```
var Translator = require("array-html-translator");
var inArray = ["@html"];
var translator = new Translator(inArray);
var outHtml = translator.translate()
console.log(outHtml);
```

## Testing array-html-translator-js

1. Locate the directory in which the array-html-translator module is located.
2. Change to that directory.

```
cd /path/to/application/node_modules/array-html-translator
```

3. Run npm test.

```
npm test
```

These test cases are not exhaustive.  They are meant to provide a basic level of confidence in array-html-translator-js.

