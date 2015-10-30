var React = require("react");
var PreviewImage = require("./PreviewImage");
var AddImage = require("./AddImage");
var ImageList = require("./ImageList");
var ProgressBar = require("./ProgressBar");
var helpers = require("../utils/helpers");

var ImagePanel = React.createClass({
    propTypes: {
        initialImageSetId: React.PropTypes.number,
        imagesUrl: React.PropTypes.string,
        initialUploadUrl: React.PropTypes.string.isRequired,
    },
    getInitialState: function () {
        return {
            selectedImage: {},
            images: [],
            percentageComplete: 0,
            totalToUpload: 0,
            totalUploaded: 0,
            imageSetId: this.props.initialImageSetId,
            uploadUrl: this.props.initialUploadUrl
        };
    },
    componentDidMount: function () {
        if (this.props.imagesUrl) {
            helpers
              .getUrl(this.props.imagesUrl)
              .then(this.refreshWithResponse);
        }
    },
    refreshWithResponse: function (dataObj) {
        var selectedImage = dataObj.data.primaryImage;
        if (!selectedImage.hasOwnProperty("medium_thumbnail") && dataObj.data.images.length > 0) {
            selectedImage = dataObj.data.images[0];
        }
        this.setState({
            selectedImage: selectedImage,
            images: dataObj.data.images,
            imageSetId: dataObj.data.pk,
            uploadUrl: dataObj.data.upload_url
        });
    },
    postAndRefresh: function (url) {
        helpers.postUrl(url).then(this.refreshWithResponse);
    },
    deleteImage: function (image) {
        this.postAndRefresh(image.delete_url);
        return false;
    },
    markPrimary: function (image) {
        this.postAndRefresh(image.make_primary_url);
        return false;
    },
    onUploadComplete: function (err, xhr, files) {
        this.setState({
            totalToUpload: 0,
            totalUploaded: 0,
            percentageComplete: 0
        });
    },
    onFileUploadComplete: function (err, xhr, file, options) {
        var totalUploaded = this.state.totalUploaded + file.size,
            responseData = JSON.parse(xhr.responseText);
        this.setState({
            totalUploaded: totalUploaded,
            percentageComplete: Math.round(totalUploaded / this.state.totalToUpload * 100),
        });
        this.refreshWithResponse({
            data: responseData
        });
    },
    onFileProgress: function (evt, file, xhr, options) {
        this.setState({
            percentageComplete: Math.round((this.state.totalUploaded + evt.loaded) / this.state.totalToUpload * 100)
        });
    },
    onSelectImage: function (image) {
        this.setState({
            selectedImage: image
        });
    },
    onUploadStart: function (xhr, options) {
        var totalToUpload = 0;
        options.files.files.forEach(function (file) {
            totalToUpload += file.size;
        });
        this.setState({
            totalToUpload: totalToUpload
        });
    },
    render: function () {
        var progressBar, imageSet;
        if (this.state.percentageComplete > 0) {
            progressBar = <ProgressBar percentageComplete={this.state.percentageComplete} />;
        }
        if (this.state.imageSetId) {
            imageSet = <input type="hidden" name="imageset" value={this.state.imageSetId} />
        }
        return (
            <div className="media-panel">
                <div className="panel-heading">
                    <AddImage uploadUrl={this.state.uploadUrl}
                              onUploadComplete={this.onUploadComplete}
                              onFileUploadComplete={this.onFileUploadComplete}
                              onFileProgress={this.onFileProgress}
                              onUploadStart={this.onUploadStart} />
                    <h2>Images</h2>
                </div>
                <div className="panel-body">
                    {progressBar}
                    <div className="row">
                        <PreviewImage image={this.state.selectedImage}
                                      deleteImage={this.deleteImage}
                                      markPrimaryImage={this.markPrimary} />
                        <ImageList images={this.state.images}
                                   onSelectImage={this.onSelectImage} />
                    </div>
                </div>
                {imageSet}
            </div>
        );
    }
});

module.exports = ImagePanel;
