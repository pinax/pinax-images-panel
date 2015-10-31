# Pinax Images Panel

The `ImagePanel` component is a front end ReactJS component that pairs with
[pinax-images](http://github.com/pinax/pinax-images/).

With this component you can:

* Upload images
* As images are uploaded they appear in the thumbnail list
* See a large preview with a scrollable list of small thumbnails
* Click on a small thumbnail to change the preview
* On the large preview you have the option to delete or set the image as
  primary for the set.

The intention of this front end and of `pinax-images` is that you can attach
images as a set to an object in your site.


## Installation

```
npm install pinax-images-panel
```


## Usage

```js
var ImagePanel = require('pinax-images-panel'),
    imagePanelElement = document.getElementById('image-panel'),

if (imagePanelElement) {
  var imagesUrl = imagePanelElement.getAttribute('data-images-url'),
      imageSetId = parseInt(imagePanelElement.getAttribute('data-image-set-id')),
      uploadUrl = imagePanelElement.getAttribute('data-upload-url');
  React.render(<ImagePanel imagesUrl={imagesUrl} initialUploadUrl={uploadUrl} initialImageSetId={imageSetId} />, imagePanelElement);
}
```
