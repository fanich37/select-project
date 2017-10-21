# Select Project
Plugin for customisation &lt;select> element in pure JavaScript. It's still in work and hasn't been tested in real projects so you should use it on your own risk :)

## How to use this plugin
It's simple as that:
1. Add the minified file in your html document;
2. Initialize the plugin by this way:
```
var select = new Select({
  selector: '#select'
});
```
3. Also the callBack option is available:
```
var select = new Select({
  selector: '#select',
  callBack: function() {
    console.log('Hello, new Select');
  }
});
```
