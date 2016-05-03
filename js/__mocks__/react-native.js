const React = require('react');
const ReactNative = React;

ReactNative.StyleSheet = {
    create: function create(styles) {
        return styles;
    }
};

class View extends React.Component {
    render() { return false; }
}



class ListView extends React.Component {
    static DataSource() {
    }
}

class AppRegistry {
    static registerComponent () {
    }
}


class Text extends React.Component {

}

class TouchableHighlight extends React.Component {

}


class TextInput extends React.Component {

}


ReactNative.View = View;
ReactNative.ScrollView = View;
ReactNative.ListView = ListView;
ReactNative.Text = Text;
ReactNative.TouchableOpacity = TouchableHighlight;
ReactNative.TouchableWithoutFeedback = View;
ReactNative.ToolbarAndroid = View;
ReactNative.Image = View;
ReactNative.AppRegistry = AppRegistry;
//ReactNative.StyleSheet = StyleSheet;
ReactNative.TextInput = TextInput;
ReactNative.NativeModules= {};
ReactNative.TouchableHighlight = TouchableHighlight;
ReactNative.Platform = {};

module.exports = ReactNative;
