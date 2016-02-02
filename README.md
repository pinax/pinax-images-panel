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


Contribute
----------------

See our [How to Contribute](http://pinaxproject.com/pinax/how_to_contribute/) section for an overview on how contributing to Pinax works. For concrete contribution ideas, please see our [Ways to Contribute/What We Need Help With](http://pinaxproject.com/pinax/ways_to_contribute/) section.

In case of any questions, we would recommend for you to [join our Pinax Slack team](http://slack.pinaxproject.com) and ping us there instead of creating an issue on GitHub. Creating issues on GitHub is of course also valid but we are usually able to help you faster if you ping us in Slack.

We would also highly recommend for your to read our [Open Source and Self-Care blog post](http://blog.pinaxproject.com/2016/01/19/open-source-and-self-care/).  


Code of Conduct
-----------------

In order to foster a kind, inclusive, and harassment-free community, the Pinax Project has a code of conduct, which can be found here  http://pinaxproject.com/pinax/code_of_conduct/. We'd like to ask you to treat everyone as a smart human programmer that shares an interest in Python, Django, and Pinax with you.


Pinax Project Blog and Twitter
--------------------------------

For updates and news regarding the Pinax Project, please follow us on Twitter at [@pinaxproject](https://twitter.com/pinaxproject) and check out our blog http://blog.pinaxproject.com.
