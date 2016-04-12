import React from 'react';
import Thumbnail from './Thumbnail';

class ImageList extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.render = this.render.bind(this);
    }
    handleSelectImage(image) {
        this.props.onSelectImage(image);
    }
    render() {
        const handleSelectImage = this.handleSelectImage;
        const thumbnails = this.props.images.map((image, index) => {
            return (
                <Thumbnail onSelectImage={handleSelectImage} image={image} key={index}/>
            );
        });
        return (
            <div className="col-md-3 image-list">
                {thumbnails}
            </div>
        );
    }
}

ImageList.propTypes = {
    images: React.PropTypes.array.isRequired,
    onSelectImage: React.PropTypes.func.isRequired
};

module.exports = ImageList;
