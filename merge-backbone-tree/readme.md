A simple tree model of Backbone.Model for AMD package(not for CMD)

# Example

```javascript
var root = new NodeModel
var node = new NodeModel
root.addChild(new NodeModel, new NodeModel, node)
node.cut() // cut == remove

```

# Config

```javascript
require.config({
    paths: {
        jquery: 'bower_components/jquery/dist/jquery.min',
        underscore: 'bower_components/underscore/underscore-min',
        backbone: 'bower_components/backbone/backbone',
        'backbone-relational': 'bower_components/backbone-relational/backbone-relational'
    }
})

```