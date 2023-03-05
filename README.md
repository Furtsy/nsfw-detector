# NSFW Image Detector API

This is an API for detecting NSFW (Not Safe for Work) images. It can be accessed by sending a GET request to the following endpoint:
```
/detector?url=<image_url>
```
Where <image_url> is the URL of the image to be analyzed.

### Usage
To use this API, simply send a GET request to the above endpoint with the image URL as a query parameter. The API will analyze the image and return one of the following responses:

    nsfw content detected: This response indicates that the image contains NSFW content and should not be displayed.
    Image content: This response indicates that the image does not contain NSFW content and can be safely displayed on a webpage or in an application.

### Example
Here is an example of how to use this API:
```
GET /detector?url=https://example.com/image.jpg
```
This request will analyze the image located at https://example.com/image.jpg and return a response indicating whether or not the image contains NSFW content.

### Notes
Please note that this API is not 100% accurate and may produce false positives or false negatives. Additionally, this API should not be used as the sole means of determining whether or not an image is safe for work.
