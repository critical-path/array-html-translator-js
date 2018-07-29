// declare dependencies

var chai = require("chai");
var Translator = require("../array-html-translator");


// declare test cases

var tests = [
  {
    title: "element name",
    description: "should return <h1></h1>",
    actual: function() { 
      var inArray = ["@h1"];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<h1></h1>",
    message: "success!"
  },
  {
    title: "element id",
    description: "should return <h1 id=\"id\"></h1>",
    actual: function() { 
      var inArray = ["@h1 #id"];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<h1 id=\"id\"></h1>",
    message: "success!"
  },
  {
    title: "element class",
    description: "should return <h1 class=\"class\"></h1>",
    actual: function() { 
      var inArray = ["@h1 .class"];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<h1 class=\"class\"></h1>",
    message: "success!"
  },
  {
    title: "element attribute",
    description: "should return <h1 key=\"value\"></h1>",
    actual: function() { 
      var inArray = ["@h1 &key=\"value\""];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<h1 key=\"value\"></h1>",
    message: "success!"
  },
  {
    title: "element attributes",
    description: "should return <h1 key0=\"value0\" key1=\"value1\"></h1>",
    actual: function() { 
      var inArray = ["@h1 &key0=\"value0\" &key1=\"value1\""];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<h1 key0=\"value0\" key1=\"value1\"></h1>",
    message: "success!"
  },
  {
    title: "element text",
    description: "should return <h1>text</h1>",
    actual: function() { 
      var inArray = ["@h1 $text"];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<h1>text</h1>",
    message: "success!"
  },
  {
    title: "all components",
    description: "should return <h1 id=\"id\" class=\"class\" key0=\"value0\" key1=\"value1\">text</h1>",
    actual: function() { 
      var inArray = ["@h1 #id .class &key0=\"value0\" &key1=\"value1\" $text"];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<h1 id=\"id\" class=\"class\" key0=\"value0\" key1=\"value1\">text</h1>",
    message: "success!"
  },
  {
    title: "void element",
    description: "should return <meta charset=\"utf-8\">",
    actual: function() { 
      var inArray = ["@meta &charset=\"utf-8\""];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<meta charset=\"utf-8\">",
    message: "success!"
  },
  {
    title: "two nested elements",
    description: "should return <div><h1>text</h1></div>",
    actual: function() { 
      var inArray = ["@div", ["@h1 $text"]];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<div><h1>text</h1></div>",
    message: "success!"
  },
  {
    title: "three nested elements",
    description: "should return <body><div><h1>text</h1></div></body>",
    actual: function() { 
      var inArray = ["@body", ["@div", ["@h1 $text"]]];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<body><div><h1>text</h1></div></body>",
    message: "success!"
  },
  {
    title: "four nested elements",
    description: "should return <html><body><div><h1>text</h1></div></body></html>",
    actual: function() { 
      var inArray = ["@html", ["@body", ["@div", ["@h1 $text"]]]];
      var translator = new Translator(inArray);
      var outHtml = translator.translate();
      return outHtml;
    },
    expected: "<html><body><div><h1>text</h1></div></body></html>",
    message: "success!"
  }
];


// loop over test cases

for (var index = 0; index < tests.length; index++) {
  var test = tests[index];
  
  describe(test.title, function() {
    it(test.description, function() {  
      chai.assert.equal(test.actual(), test.expected, test.message);
    });
  });
};
