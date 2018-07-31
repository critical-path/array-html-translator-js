var chai = require("chai");
var Translator = require("../array-html-translator");


describe("element name", function() {
  it("should return <h1></h1>", function() {  
    chai.assert.equal(
      new Translator(["@h1"]).translate(),
      "<h1></h1>", 
      "success!"
    );
  });
});


describe("element id", function() {
  it("should return <h1 id=\"id\"></h1>", function() {  
    chai.assert.equal(
      new Translator(["@h1 #id"]).translate(),
      "<h1 id=\"id\"></h1>", 
      "success!"
    );
  });
});


describe("element class", function() {
  it("should return <h1 class=\"class\"></h1>", function() {  
    chai.assert.equal(
      new Translator(["@h1 .class"]).translate(),
      "<h1 class=\"class\"></h1>", 
      "success!"
    );
  });
});


describe("element attribute", function() {
  it("should return <h1 key=\"value\"></h1>", function() {  
    chai.assert.equal(
      new Translator(["@h1 &key=\"value\""]).translate(),
      "<h1 key=\"value\"></h1>", 
      "success!"
    );
  });
});


describe("element attributes", function() {
  it("should return <h1 key0=\"value0\" key1=\"value1\"></h1>", function() {  
    chai.assert.equal(
      new Translator(["@h1 &key0=\"value0\" &key1=\"value1\""]).translate(),
      "<h1 key0=\"value0\" key1=\"value1\"></h1>", 
      "success!"
    );
  });
});


describe("element text", function() {
  it("should return <h1>text</h1>", function() {  
    chai.assert.equal(
      new Translator(["@h1 $text"]).translate(),
      "<h1>text</h1>", 
      "success!"
    );
  });
});


describe("all components", function() {
  it("should return <h1 id=\"id\" class=\"class\" key0=\"value0\" key1=\"value1\">text</h1>", function() {  
    chai.assert.equal(
      new Translator(["@h1 #id .class &key0=\"value0\" &key1=\"value1\" $text"]).translate(),
      "<h1 id=\"id\" class=\"class\" key0=\"value0\" key1=\"value1\">text</h1>", 
      "success!"
    );
  });
});


describe("void element", function() {
  it("should return <meta charset=\"utf-8\">", function() {  
    chai.assert.equal(
      new Translator(["@meta &charset=\"utf-8\""]).translate(),
      "<meta charset=\"utf-8\">", 
      "success!"
    );
  });
});


describe("two nested elements", function() {
  it("should return <div><h1>text</h1></div>", function() {  
    chai.assert.equal(
      new Translator(["@div", ["@h1 $text"]]).translate(),
      "<div><h1>text</h1></div>", 
      "success!"
    );
  });
});


describe("three nested elements", function() {
  it("should return <body><div><h1>text</h1></div></body>", function() {  
    chai.assert.equal(
      new Translator(["@body", ["@div", ["@h1 $text"]]]).translate(),
      "<body><div><h1>text</h1></div></body>", 
      "success!"
    );
  });
});


describe("four nested elements", function() {
  it("should return <html><body><div><h1>text</h1></div></body></html>", function() {  
    chai.assert.equal(
      new Translator(["@html", ["@body", ["@div", ["@h1 $text"]]]]).translate(),
      "<html><body><div><h1>text</h1></div></body></html>", 
      "success!"
    );
  });
});


describe("null", function() {
  it("should throw error", function() {
    chai.assert.throws(
      function() {
        new Translator(null).translate()
      },
      Error,
      "Error parsing array."
    );
  });
});
