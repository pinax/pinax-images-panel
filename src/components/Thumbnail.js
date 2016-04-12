import React from 'react';

class Thumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.render = this.render.bind(this);
    }
    handleSelectImage() {
        this.props.onSelectImage(this.props.image);
    }
    render() {
        let className = '';
        if (this.props.image.is_primary) {
            className = 'primary';
        }
        return (
            <img className={className} src={this.props.image.small_thumbnail} onClick={this.handleSelectImage}/>
        );
    }
}

Thumbnail.propTypes = {
    image: React.PropTypes.object.isRequired,
    onSelectImage: React.PropTypes.func.isRequired
};

module.exports = Thumbnail;
