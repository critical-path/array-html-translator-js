/* Declare class. */

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


/* Parse an input array.  
   Do not call this method directly. */

Translator.prototype._parseArray = function() {
  try {
  
    /* Loop over each item in the array. */
      
    for (let index = 0; index < this.array.length; index++) { 
      var item = this.array[index];

    /* If the item is of type array, then pass it in to a 
       new instance of Translator, recursively coverting 
       it to HTML. */

      if (Array.isArray(item)) { 
        var translator = new Translator(item);
        var branchHtmlElement = translator.translate();
        this.branchHtmlElements.push(branchHtmlElement);

    /* If the item is of type string, then begin to parse it. */

      } else {
        item = item.split(" ")
        
        for (let index = 0; index < item.length; index++) { 
          var component = item[index];

    /* First, try to find the name of the HTML element. */
    
          if (component.startsWith(this.htmlElementName.delimiter)) {
            var htmlElementName = component.substring(1);
            this.htmlElementName.value = htmlElementName;
          };
            
    /* Second, try to find its id. */
    
          if (component.startsWith(this.htmlElementId.delimiter)) {
            var htmlElementId = component.substring(1);
            this.htmlElementId.value = htmlElementId;
          };
            
    /* Third, try to find its class. */

          if (component.startsWith(this.htmlElementClass.delimiter)) {
            var htmlElementClass = component.substring(1);
            this.htmlElementClass.value = htmlElementClass;
          };
            
    /* Fourth, try to find any other of its attributes. */

          if (component.startsWith(this.htmlElementAttributes.delimiter)) {
            var htmlElementAttribute = component.substring(1);
            this.htmlElementAttributes.pairs.push(htmlElementAttribute);
          };
            
    /* Last, try to find its text content. */

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


/* Get an HTML element's start tag.
   Do not call this method directly. */

Translator.prototype._getHtmlElementStartTag = function() {
  /* First, open the HTML element's tag. */
    
  var htmlElementStartTag = "<";
    
  /* Second, try to add the name of the element. */
    
  if (this.htmlElementName.value) {
    var htmlElementName = this.htmlElementName.value;
    htmlElementStartTag += htmlElementName + " ";
  };

  /* Third, try to add its id and enclose it in quotation marks. */
    
  if (this.htmlElementId.value) {
    var htmlElementId = this.htmlElementId.key + "=" + "\"" + this.htmlElementId.value + "\"";
    htmlElementStartTag += htmlElementId + " ";
  };

  /* Fourth, try to add its class and enclose it in quotation marks. */

  if (this.htmlElementClass.value) {
    var htmlElementClass = this.htmlElementClass.key + "=" + "\"" + this.htmlElementClass.value + "\"";
    htmlElementStartTag += htmlElementClass + " ";
  };
    
  /* Fifth, try to add any other of its attributes, assuming that the
     user enclosed them in quotation marks. */
 
  if (this.htmlElementAttributes.pairs.length > 0) {
    var htmlElementAttributes = "";
    
    for (var index = 0; index < this.htmlElementAttributes.pairs.length; index++) {
      var attribute = this.htmlElementAttributes.pairs[index];
      htmlElementAttributes += attribute + " "
    };
    
    htmlElementStartTag += htmlElementAttributes;
  };
    
  /* Sixth, remove any trailing space characters. */
    
  htmlElementStartTag = htmlElementStartTag.trim();
    
  /* Last, close the tag. */
        
  htmlElementStartTag += ">";
    
  this.htmlElementStartTag = htmlElementStartTag;
};


/* Get an HTML element's end tag.
   Do not call this method directly. */

Translator.prototype._getHtmlElementEndTag = function() {    
  /* First, determine whether the HTML element requires an end tag.    
  /* Second, open the tag. */
    
  if (this.voidHtmlElements.indexOf(this.htmlElementName.value) == -1) {
    var htmlElementEndTag = "</";
      
  /* Third, try to add the name of the element. */
    
    if (this.htmlElementName.value) {
      var htmlElementName = this.htmlElementName.value;
      htmlElementEndTag += htmlElementName;
    };
      
  /* Fourth, close the tag. */
    
    htmlElementEndTag += ">";
    
    this.htmlElementEndTag = htmlElementEndTag;
  };
};


/* Get a full HTML element, including start and end tags.
   Do not call this method directly. */

Translator.prototype._getHtmlElement = function() {
  var htmlElement = "";
    
  /* First, add the HTML element's start tag. */
    
  htmlElement += this.htmlElementStartTag;

  /* Second, try to add its text content. */

  if (this.htmlElementText.value) {
    var htmlElementText = this.htmlElementText.value;
    htmlElement += htmlElementText
  };
    
  /* Third, try to add the HTML of any branches. */

  if (this.branchHtmlElements.length > 0) {
    for (var index = 0; index < this.branchHtmlElements.length; index++) {
      var branchHtmlElement = this.branchHtmlElements[index];
      htmlElement += branchHtmlElement;
    };
  };
    
  /* Last, close the tag. */

  htmlElement += this.htmlElementEndTag;
   
  this.htmlElement = htmlElement;
};


/* Convert an input array to HTML.
   Call this method directly. */

Translator.prototype.translate = function() {
  this._parseArray();
  this._getHtmlElementStartTag();
  this._getHtmlElementEndTag();
  this._getHtmlElement();
      
  return this.htmlElement;
};


/* Export class. */
    
module.exports = Translator;
