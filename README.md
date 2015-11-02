# Pinax Images Panel

[![Join us on Slack](http://slack.pinaxproject.com/badge.svg)](http://slack.pinaxproject.com/)

Pinax
--------

Pinax is a collection of Django project templates that we call starter projects
as well as apps and themes. This collection can be found at http://pinaxproject.com.

pinax-images-panel
-------------------

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

Documentation
---------------

The pinax-images-panel documentation is currently under construction. If you would like to help us write documentation, please join our Pinax Project Slack channel and let us know! The Pinax documentation is available at http://pinaxproject.com/pinax/.

Code of Conduct
-----------------

In order to foster a kind, inclusive, and harassment-free community, the Pinax Project has a code of conduct, which can be found here  http://pinaxproject.com/pinax/code_of_conduct/.


Pinax Project Blog and Twitter
--------------------------------

For updates and news regarding the Pinax Project, please follow us on Twitter at [@pinaxproject](https://twitter.com/pinaxproject) and check out our blog http://blog.pinaxproject.com.
