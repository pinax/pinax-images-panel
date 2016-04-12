import React from 'react';

class PreviewImage extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleMarkPrimaryClick = this.handleMarkPrimaryClick.bind(this);
        this.render = this.render.bind(this);
    }
    handleDeleteClick() {
        this.props.deleteImage(this.props.image);
    }
    handleMarkPrimaryClick() {
        this.props.markPrimaryImage(this.props.image);
    }
    render() {
        let previewImage = {};
        let selectedImageClassName = 'selected-image';
        if (this.props.image.is_primary) {
            selectedImageClassName += ' primary';
        }
        if (this.props.image.medium_thumbnail) {
            const thumb = this.props.image.medium_thumbnail;
            const background = `url(${thumb})`;
            previewImage = {
               backgroundImage: background
            };
        } else {
            selectedImageClassName += ' empty';
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
}

PreviewImage.propTypes = {
    image: React.PropTypes.object.isRequired,
    deleteImage: React.PropTypes.func.isRequired,
    markPrimaryImage: React.PropTypes.func.isRequired
};

module.exports = PreviewImage;
