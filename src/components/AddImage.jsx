var React = require("react");
var FileAPI = require("fileapi");
var helpers = require("../utils/helpers");

var AddImage = React.createClass({
    propTypes: {
        onUploadComplete: React.PropTypes.func,
        onFileUploadComplete: React.PropTypes.func,
        onUploadStart: React.PropTypes.func,
        onProgress: React.PropTypes.func,
        onFileProgress: React.PropTypes.func,
        uploadUrl: React.PropTypes.string.isRequired,
        imageSetId: React.PropTypes.number
    },
    handleChange: function (evt) {
        var files = FileAPI.getFiles(evt),
            onlyImagesFilter = function (file, info) { return /^image/.test(file.type); },
            uploadUrl = this.props.uploadUrl,
            onUploadComplete = this.props.onUploadComplete,
            onFileUploadComplete = this.props.onFileUploadComplete,
            onUploadStart = this.props.onUploadStart,
            onProgress = this.props.onProgress,
            onFileProgress = this.props.onFileProgress;

        FileAPI.filterFiles(files, onlyImagesFilter, function (files, rejected) {
            if (files.length) {
                FileAPI.upload({
                    url: uploadUrl,
                    files: {files: files},
                    headers: {
                        "X-CSRFToken": helpers.getCookie("csrftoken")
                    },
                    filecomplete: function (err, xhr, file, options) {
                        if (onFileUploadComplete) {
                            var data = JSON.parse(xhr.responseText);
                            uploadUrl = data.upload_url;
                            onFileUploadComplete(err, xhr, file, options);
                        }
                    },
                    prepare: function (file, options) {
                        options.url = uploadUrl
                    },
                    complete: function (err, xhr) {
                        if (onUploadComplete) {
                            onUploadComplete(err, xhr, files);
                        }
                    },
                    progress: function (evt, file, xhr, options){
                        if (onProgress) {
                            onProgress(evt, file, xhr, options);
                        }
                    },
                    upload: function (xhr, options){
                        if (onUploadStart) {
                            onUploadStart(xhr, options);
                        }
                    },
                    fileprogress: function (evt, file, xhr, options) {
                        if (onFileProgress) {
                            onFileProgress(evt, file, xhr, options);
                        }
                    }
                });
            }
        });
    },
    render: function () {
        return (
            <span className="add-button">
                <h4>Drop an image</h4>
                <span>or</span>
                <a href="#" className="btn btn-success">Browse</a>
                <input type="file" name="files" multiple onChange={this.handleChange} />
            </span>
        );
    }
});

module.exports = AddImage;
