var React = require("react");

var PreviewImage = React.createClass({
    propTypes: {
        image: React.PropTypes.object.isRequired,
        deleteImage: React.PropTypes.func.isRequired,
        markPrimaryImage: React.PropTypes.func.isRequired
    },
    handleDeleteClick: function () {
        this.props.deleteImage(this.props.image);
    },
    handleMarkPrimaryClick: function () {
        this.props.markPrimaryImage(this.props.image);
    },
    render: function () {
        var previewImage = {},
            selectedImageClassName = "selected-image";
        if (this.props.image.is_primary) {
            selectedImageClassName += " primary";
        }
        if (this.props.image.medium_thumbnail) {
            var background = "url(" + this.props.image.medium_thumbnail + ")";
            previewImage = {
               backgroundImage: background
            };
        } else {
            selectedImageClassName += " empty";
        }
        return (
            <div className="col-md-9">
                <div className={selectedImageClassName} style={previewImage}>
                    <div id="overlay">
                        <a href="#" className="delete-image" onClick={this.handleDeleteClick}>
                            <i className="fa fa-trash fa-3x"></i>
                        </a>
                        <a href="#" className="make-primary-image" onClick={this.handleMarkPrimaryClick}>
                            <i className="fa fa-check fa-3x"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = PreviewImage;
