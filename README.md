[![Build Status](https://travis-ci.com/critical-path/array-html-translator-js.svg?branch=master)](https://travis-ci.com/critical-path/array-html-translator-js) [![Coverage Status](https://coveralls.io/repos/github/critical-path/array-html-translator-js/badge.svg)](https://coveralls.io/github/critical-path/array-html-translator-js)

## array-html-translator-js v1.0.0

array-html-translator-js is a Node module that translates arrays to HTML.


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

To use array-html-translator-js, we will need Node and npm.  To test it, we will need chai, eslint, istanbul, and mocha.


## Installing array-html-translator-js

1. Clone or download this repository.
2. Run `npm` with the `install` command.

```
npm install
```


## Using array-html-translator-js

1. Require the `array-html-translator` module.
2. Create an array.
3. Instantiate `Translator`, passing in the array.
4. Call the `translate` method.
5. Do something fun with the HTML!

```
var Translator = require("array-html-translator")
var array = ["@html"]
var translator = new Translator(array)
var html = translator.translate()
console.log(html)
```


## Testing array-html-translator-js

Run `npm` with the `test` command.

```
npm test
```

