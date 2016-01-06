# A Url Shortener Microservice

## Overview

A URL Shortener MicroService
User stories:

I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
When I visit that shortened URL, it will redirect me to my original link.
Example creation usage:

https://url-shortener-api-christoph-phillips.c9users.io/https://www.google.com 
https://url-shortener-api-christoph-phillips.c9users.io/http://freecodecamp.com/news
Example creation output:

{ "original": "http://freecodecamp.com/news", "shortened": "https://url-shortener-api-christoph-phillips.c9users.io/4" }
Usage:

https://url-shortener-api-christoph-phillips.c9users.io/4
Will redirect to:

http://freecodecamp.com/news

