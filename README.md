# TURF as a service

Here you find the project [turf as a service](https://red-ridge.hyperdev.space/).

## Param infos

Use a `GET` request with the function name for getting the infos about the function parameter you need to pass:

For example: `GET` **https://red-ridge.hyperdev.space/point**

## Service

Use a `POST` request with the function name and the params in the request body to run the function:

For example: `POST` **https://red-ridge.hyperdev.space/point** {"geometry": [13.4, 52.52]}
