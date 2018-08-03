class Translator {
  constructor(array) {
    this.array = array;

    this.branchHtmlElements = [];
  
    this.voidHtmlElements = [
      "area", 
      "base", 
      "br", 
      "col", 
      "embed", 
      "hr", 
      "img", 
      "input", 
      "keygen", 
      "link", 
      "meta", 
      "param", 
      "source", 
      "track", 
      "wbr"
    ];

    this.htmlElementName = {
      "delimiter": "@", 
      "key": null, 
      "value": ""
    };
  
    this.htmlElementId = {
      "delimiter": "#", 
      "key": "id", 
      "value": ""
    };

    this.htmlElementClass = {
      "delimiter": ".", 
      "key": "class", 
      "value": ""
    };

    this.htmlElementAttributes = {
      "delimiter": "&", 
      "pairs": []
    };

    this.htmlElementText = {
      "delimiter": "$", 
      "key": null, 
      "value": ""
    };

    this.htmlElementStartTag = "";
  
    this.htmlElementEndTag = "";
  
    this.htmlElement = "";
  };
};

Translator.prototype._parseArray = function() {
  try {
  
    for (let index = 0; index < this.array.length; index++) { 
      var item = this.array[index];

      if (Array.isArray(item)) { 
        var translator = new Translator(item);
        var branchHtmlElement = translator.translate();
        this.branchHtmlElements.push(branchHtmlElement);

      } else {
        item = item.split(" ")
        
        for (let index = 0; index < item.length; index++) { 
          var component = item[index];

          if (component.startsWith(this.htmlElementName.delimiter)) {
            var htmlElementName = component.substring(1);
            this.htmlElementName.value = htmlElementName;
          };
            
          if (component.startsWith(this.htmlElementId.delimiter)) {
            var htmlElementId = component.substring(1);
            this.htmlElementId.value = htmlElementId;
          };
            
          if (component.startsWith(this.htmlElementClass.delimiter)) {
            var htmlElementClass = component.substring(1);
            this.htmlElementClass.value = htmlElementClass;
          };
            
          if (component.startsWith(this.htmlElementAttributes.delimiter)) {
            var htmlElementAttribute = component.substring(1);
            this.htmlElementAttributes.pairs.push(htmlElementAttribute);
          };
            
          if (component.startsWith(this.htmlElementText.delimiter)) {
            var htmlElementText = component.substring(1);
            this.htmlElementText.value = htmlElementText;
          };
        };
      };
    };

  } catch(error) {
    throw new Error("Error parsing array.");
        
  };
};

Translator.prototype._getHtmlElementStartTag = function() {
  var htmlElementStartTag = "<";
    
  if (this.htmlElementName.value) {
    var htmlElementName = this.htmlElementName.value;
    htmlElementStartTag += htmlElementName + " ";
  };

  if (this.htmlElementId.value) {
    var htmlElementId = this.htmlElementId.key + "=" + "\"" + this.htmlElementId.value + "\"";
    htmlElementStartTag += htmlElementId + " ";
  };

  if (this.htmlElementClass.value) {
    var htmlElementClass = this.htmlElementClass.key + "=" + "\"" + this.htmlElementClass.value + "\"";
    htmlElementStartTag += htmlElementClass + " ";
  };
    
  if (this.htmlElementAttributes.pairs.length > 0) {
    var htmlElementAttributes = "";
    
    for (var index = 0; index < this.htmlElementAttributes.pairs.length; index++) {
      var attribute = this.htmlElementAttributes.pairs[index];
      htmlElementAttributes += attribute + " "
    };
    
    htmlElementStartTag += htmlElementAttributes;
  };
    
  htmlElementStartTag = htmlElementStartTag.trim();
    
  htmlElementStartTag += ">";
    
  this.htmlElementStartTag = htmlElementStartTag;
};

Translator.prototype._getHtmlElementEndTag = function() {    
  if (this.voidHtmlElements.indexOf(this.htmlElementName.value) == -1) {
    var htmlElementEndTag = "</";
      
    if (this.htmlElementName.value) {
      var htmlElementName = this.htmlElementName.value;
      htmlElementEndTag += htmlElementName;
    };
      
    htmlElementEndTag += ">";
    
    this.htmlElementEndTag = htmlElementEndTag;
  };
};

Translator.prototype._getHtmlElement = function() {
  var htmlElement = "";
    
  htmlElement += this.htmlElementStartTag;

  if (this.htmlElementText.value) {
    var htmlElementText = this.htmlElementText.value;
    htmlElement += htmlElementText
  };
    
  if (this.branchHtmlElements.length > 0) {
    for (var index = 0; index < this.branchHtmlElements.length; index++) {
      var branchHtmlElement = this.branchHtmlElements[index];
      htmlElement += branchHtmlElement;
    };
  };
    
  htmlElement += this.htmlElementEndTag;
   
  this.htmlElement = htmlElement;
};

Translator.prototype.translate = function() {
  this._parseArray();
  this._getHtmlElementStartTag();
  this._getHtmlElementEndTag();
  this._getHtmlElement();
      
  return this.htmlElement;
};

module.exports = Translator;
