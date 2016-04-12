/* global FileAPI */
require('fileapi');

import React from 'react';
import helpers from '../utils/helpers';

class AddImage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        console.log(evt);
        const files = FileAPI.getFiles(evt);
        const onlyImagesFilter = file => { return /^image/.test(file.type); };
        const onUploadComplete = this.props.onUploadComplete;
        const onFileUploadComplete = this.props.onFileUploadComplete;
        const onUploadStart = this.props.onUploadStart;
        const onProgress = this.props.onProgress;
        const onFileProgress = this.props.onFileProgress;
        let uploadUrl = this.props.uploadUrl;

        FileAPI.filterFiles(files, onlyImagesFilter, files => {
            if (files.length) {
                FileAPI.upload({
                    url: uploadUrl,
                    files: {files},
                    headers: {
                        'X-CSRFToken': helpers.getCookie('csrftoken')
                    },
                    filecomplete: (err, xhr, file, options) => {
                        if (onFileUploadComplete) {
                            const data = JSON.parse(xhr.responseText);
                            uploadUrl = data.upload_url;
                            onFileUploadComplete(err, xhr, file, options);
                        }
                    },
                    prepare: (file, options) => {
                        options.url = uploadUrl;
                    },
                    complete: (err, xhr) => {
                        if (onUploadComplete) {
                            onUploadComplete(err, xhr, files);
                        }
                    },
                    progress: (evt, file, xhr, options) => {
                        if (onProgress) {
                            onProgress(evt, file, xhr, options);
                        }
                    },
                    upload: (xhr, options) => {
                        if (onUploadStart) {
                            onUploadStart(xhr, options);
                        }
                    },
                    fileprogress: (evt, file, xhr, options) => {
                        if (onFileProgress) {
                            onFileProgress(evt, file, xhr, options);
                        }
                    }
                });
            }
        });
    }
    render() {
        return (
            <span className="btn-add-image">
                Browse <input type="file" name="files" multiple onChange={this.handleChange}/>
            </span>
        );
    }
}

AddImage.propTypes = {
    onUploadComplete: React.PropTypes.func,
    onFileUploadComplete: React.PropTypes.func,
    onUploadStart: React.PropTypes.func,
    onProgress: React.PropTypes.func,
    onFileProgress: React.PropTypes.func,
    uploadUrl: React.PropTypes.string.isRequired,
    imageSetId: React.PropTypes.number
};

module.exports = AddImage;
