var React = require("react");

var Thumbnail = React.createClass({
    propTypes: {
        image: React.PropTypes.object.isRequired,
        onSelectImage: React.PropTypes.func.isRequired
    },
    handleSelectImage: function () {
        this.props.onSelectImage(this.props.image);
    },
    render: function () {
        var className = "";
        if (this.props.image.is_primary) {
            className = "primary";
        }
        return (
            <img className={className} src={this.props.image.small_thumbnail} onClick={this.handleSelectImage} />
        );
    }
});

module.exports = Thumbnail;
