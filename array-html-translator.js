// declare new class

class Translator {
  constructor(array) {
    this.array = array;

    this.branchHtmlElements = [];
  
    this.voidHtmlElements = [
      "area", "base", "br", "col", "embed", "hr", "img", "input", 
      "keygen", "link", "meta", "param", "source", "track", "wbr"
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


// extend class
// do not call this method directly

Translator.prototype._parseArray = function() {
  try {
  
    // loop over each item in the list
      
    for (let index = 0; index < this.array.length; index++) { 
      var item = this.array[index];

    // if the item is of type list, 
    // pass it in to a new instance of Translator,
    // recursively coverting it to html

      if (typeof(item) !== "string") { 
        var translator = new Translator(item);
        var branchHtmlElement = translator.translate();
        this.branchHtmlElements.push(branchHtmlElement);

    // if the item is of type string, then is ready to be parsed

      } else {
        item = item.split(" ")
        
        for (let index = 0; index < item.length; index++) { 
          var component = item[index];

    // first, try to find the name of the html element
    
          if (component.startsWith(this.htmlElementName.delimiter)) {
            var htmlElementName = component.substring(1);
            this.htmlElementName.value = htmlElementName;
            
    // second, try to find its id
    
          } else if (component.startsWith(this.htmlElementId.delimiter)) {
            var htmlElementId = component.substring(1);
            this.htmlElementId.value = htmlElementId;
            
    // third, try to find its class

          } else if (component.startsWith(this.htmlElementClass.delimiter)) {
            var htmlElementClass = component.substring(1);
            this.htmlElementClass.value = htmlElementClass;
            
    // fourth, try to find any other of its attributes

          } else if (component.startsWith(this.htmlElementAttributes.delimiter)) {
            var htmlElementAttribute = component.substring(1);
            this.htmlElementAttributes.pairs.push(htmlElementAttribute);
            
    // last, try to find its text content

          } else if (component.startsWith(this.htmlElementText.delimiter)) {
            var htmlElementText = component.substring(1);
            this.htmlElementText.value = htmlElementText;
          };
        };
      };
    };

  } catch(error) {
    throw new Error("error parsing array!");
        
  };
};


// extend class again
// do not call this method directly

Translator.prototype._getHtmlElementStartTag = function() {
  try {
  
    // create the start tag of the html element
    // first, open the tag
    
    var htmlElementStartTag = "<";
    
    // second, try to add the name of the element
    
    if (this.htmlElementName.value) {
      var htmlElementName = this.htmlElementName.value;
      htmlElementStartTag += htmlElementName + " ";
    };

    // third, try to add its id and enclose it in quotation marks
    
    if (this.htmlElementId.value) {
      var htmlElementId = this.htmlElementId.key + "=" + "\"" + this.htmlElementId.value + "\"";
      htmlElementStartTag += htmlElementId + " ";
    };

    // fourth, try to add its class and enclose it in quotation marks

    if (this.htmlElementClass.value) {
      var htmlElementClass = this.htmlElementClass.key + "=" + "\"" + this.htmlElementClass.value + "\"";
      htmlElementStartTag += htmlElementClass + " ";
    };
    
    // fifth, try to add any other of its attributes, assuming that the
    // user enclosed them in quotation marks
 
    if (this.htmlElementAttributes.pairs) {
      var htmlElementAttributes = "";
    
      for (var index = 0; index < this.htmlElementAttributes.pairs.length; index++) {
        var attribute = this.htmlElementAttributes.pairs[index];
        htmlElementAttributes += attribute + " "
      };
    
      htmlElementStartTag += htmlElementAttributes;
    };
    
    // sixth, remove any trailing space characters
    
    htmlElementStartTag = htmlElementStartTag.trim();
    
    // last, close the tag
        
    htmlElementStartTag += ">";
    
    this.htmlElementStartTag = htmlElementStartTag;
      
  } catch(error) {
    throw new Error("error getting html element's opening tag!");
        
  };
};


// extend class again
// do not call this method directly

Translator.prototype._getHtmlElementEndTag = function() {
  try {
  
    // create the end tag of html element
    
    // first, determine whether it requires an end tag
    // if not, then pass  
    // if yes, then proceed
    
    // second, open the tag
    
    if (this.voidHtmlElements.indexOf(this.htmlElementName.value) == -1) {
      var htmlElementEndTag = "</";
      
    // third, try to add the name of the element
    
      if (this.htmlElementName.value) {
        var htmlElementName = this.htmlElementName.value;
        htmlElementEndTag += htmlElementName;
      };
      
    // fourth, close the tag
    
      htmlElementEndTag += ">";
    
      this.htmlElementEndTag = htmlElementEndTag;
    };
     
  } catch(error) {
    throw new Error("error getting html element's closing tag!");
        
  };
};


// extend class again
// do not call this method directly

Translator.prototype._getHtmlElement = function() {
  try {

    // create the full html element

    var htmlElement = "";
    
    // first, add the start tag
    
    htmlElement += this.htmlElementStartTag;

    // second, try to add its text content

    if (this.htmlElementText.value) {
      var htmlElementText = this.htmlElementText.value;
      htmlElement += htmlElementText
    };
    
    // third, try to add the html of any branches

    if (this.branchHtmlElements) {
      for (var index = 0; index < this.branchHtmlElements.length; index++) {
        var branchHtmlElement = this.branchHtmlElements[index];
        htmlElement += branchHtmlElement;
      };
    };
    
    // last, close the tag

    htmlElement += this.htmlElementEndTag;
   
    this.htmlElement = htmlElement;
      
  } catch(error) {
    throw new Error("error getting full html element!");
        
  };
};


// extend class again
// call this method directly

Translator.prototype.translate = function() {
  this._parseArray();
  this._getHtmlElementStartTag();
  this._getHtmlElementEndTag();
  this._getHtmlElement();
      
  return this.htmlElement;
};


// export class
    
module.exports = Translator;
