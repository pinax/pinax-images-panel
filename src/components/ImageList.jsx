var React = require("react");
var Thumbnail = require("./Thumbnail");

var ImageList = React.createClass({
    propTypes: {
        images: React.PropTypes.array.isRequired,
        onSelectImage: React.PropTypes.func.isRequired
    },
    handleSelectImage: function (image) {
        this.props.onSelectImage(image);
    },
    render: function () {
        var handleSelectImage = this.handleSelectImage,
            thumbnails = this.props.images.map(function (image, index) {
            return (
                <Thumbnail onSelectImage={handleSelectImage} image={image} key={index} />
            );
        });
        return (
            <div className="col-md-3 image-list">
                {thumbnails}
            </div>
        );
    }
});

module.exports = ImageList;
