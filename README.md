# Select Project
Plugin for customisation &lt;select> element in pure JavaScript. It's still in work and hasn't been tested in real projects so you should use it on your own risk :)

## How to use this plugin
It's simple as that:
1. Add the minified file in your html document;
2. Initialize the plugin by this way:
```
new Select({
  selector: '#select'
});
```
3. Also the callBack option is available:
```
new Select({
  selector: '#select',
  callBack: function() {
    console.log('Hello, new Select');
  }
});
```
4. If you need to use value of selected item - it's easy:
```
new Select({
  selector: '#select',
  callBack: function(item) {
    console.log('You pick item with a value: ' + item.value;
  }
});
```
5. During the initialisation the plugin gets all attributes of &lt;option> tag so you can easily get it's value by native js method:
```
new Select({
  selector: '#select',
  callBack: function(item) {
    console.log('You pick item with a value: ' + item.el.getAttribute('data-value');
  }
});
```