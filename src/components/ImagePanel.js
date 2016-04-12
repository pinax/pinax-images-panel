import React from 'react';
import PreviewImage from './PreviewImage';
import AddImage from './AddImage';
import ImageList from './ImageList';
import ProgressBar from './ProgressBar';
import helpers from '../utils/helpers';

class ImagePanel extends React.Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.refreshWithResponse = this.refreshWithResponse.bind(this);
        this.postAndRefresh = this.postAndRefresh.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.markPrimary = this.markPrimary.bind(this);
        this.handleOnUploadComplete = this.handleOnUploadComplete.bind(this);
        this.handleOnFileUploadComplete = this.handleOnFileUploadComplete.bind(this);
        this.handleOnFileProgress = this.handleOnFileProgress.bind(this);
        this.handleOnSelectImage = this.handleOnSelectImage.bind(this);
        this.handleOnUploadStart = this.handleOnUploadStart.bind(this);
        this.state = {
            selectedImage: {},
            images: [],
            percentageComplete: 0,
            totalToUpload: 0,
            totalUploaded: 0,
            imageSetId: this.props.initialImageSetId,
            uploadUrl: this.props.initialUploadUrl
        };
    }
    componentDidMount() {
        console.log('mount', this.props);
        if (this.props.imagesUrl) {
            helpers
              .getImages(this.props.imagesUrl)
              .then(this.refreshWithResponse);
        }
    }
    refreshWithResponse(dataObj) {
        let selectedImage = dataObj.data.primaryImage;
        if (!selectedImage.hasOwnProperty('medium_thumbnail') && dataObj.data.images.length > 0) {
            selectedImage = dataObj.data.images[0];
        }
        this.setState({
            selectedImage,
            images: dataObj.data.images,
            imageSetId: dataObj.data.pk,
            uploadUrl: dataObj.data.upload_url
        });
    }
    postAndRefresh(url)  {
        helpers.postUrl(url).then(this.refreshWithResponse);
    }
    deleteImage(image) {
        this.postAndRefresh(image.delete_url);
        return false;
    }
    markPrimary(image) {
        this.postAndRefresh(image.make_primary_url);
        return false;
    }
    handleOnUploadComplete() {
        this.setState({
            totalToUpload: 0,
            totalUploaded: 0,
            percentageComplete: 0
        });
    }
    handleOnFileUploadComplete(err, xhr, file) {
        const totalUploaded = this.state.totalUploaded + file.size;
        const responseData = JSON.parse(xhr.responseText);
        this.setState({
            totalUploaded,
            percentageComplete: Math.round(totalUploaded / this.state.totalToUpload * 100)
        });
        this.refreshWithResponse({
            data: responseData
        });
    }
    handleOnFileProgress(evt) {
        this.setState({
            percentageComplete: Math.round((this.state.totalUploaded + evt.loaded) / this.state.totalToUpload * 100)
        });
    }
    handleOnSelectImage(image) {
        this.setState({
            selectedImage: image
        });
    }
    handleOnUploadStart(xhr, options) {
        let totalToUpload = 0;
        options.files.files.forEach(function (file) {
            totalToUpload += file.size;
        });
        this.setState({
            totalToUpload
        });
    }
    render() {
        let progressBar = null;
        let imageSet = null;
        if (this.state.percentageComplete > 0) {
            progressBar = <ProgressBar percentageComplete={this.state.percentageComplete}/>;
        }
        if (this.state.imageSetId) {
            imageSet = <input type="hidden" name="imageset" value={this.state.imageSetId}/>;
        }
        return (
            <div className="media-panel">
                <div className="panel-body">
                    {progressBar}
                    <div className="row">
                        <PreviewImage image={this.state.selectedImage}
                                      deleteImage={this.deleteImage}
                                      markPrimaryImage={this.markPrimary}/>
                        <ImageList images={this.state.images}
                                   onSelectImage={this.handleOnSelectImage}/>
                    </div>
                </div>
                {imageSet}
                <div className="panel-footer">
                    <AddImage uploadUrl={this.state.uploadUrl}
                              onUploadComplete={this.handleOnUploadComplete}
                              onFileUploadComplete={this.handleOnFileUploadComplete}
                              onFileProgress={this.handleOnFileProgress}
                              onUploadStart={this.handleOnUploadStart}/>
                </div>
            </div>
        );
    }
}

ImagePanel.propTypes = {
    initialImageSetId: React.PropTypes.number,
    imagesUrl: React.PropTypes.string,
    initialUploadUrl: React.PropTypes.string.isRequired
};

module.exports = ImagePanel;
