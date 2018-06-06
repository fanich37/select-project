# Select Project
Plugin for customisation ```<select>``` element in pure JavaScript.

## How to use this plugin
It's simple as that:
1. Add the minified file in your html document;
2. Initialize the plugin by this way:
```js
new Select({
  selector: '#select'
});
```
3. Also the callBack option is available:
```js
new Select({
  selector: '#select',
  callBack: function() {
    console.log('Hello, new Select');
  }
});
```
4. If you need to use value of selected item - it's easy:
```js
new Select({
  selector: '#select',
  callBack: function(item) {
    console.log('You pick item with a value: ' + item.value;
  }
});
```
5. During the initialisation the plugin gets all attributes of &lt;option> tag so you can easily get it's value by native js method:
```js
new Select({
  selector: '#select',
  callBack: function(item) {
    console.log('You pick item with a value: ' + item.el.getAttribute('data-value');
  }
});
```
