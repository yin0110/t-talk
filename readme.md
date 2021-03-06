# T-Talk

<p align="center">
<img src="https://raw.githubusercontent.com/yin0110/t-talk/main/static/img/logo.png" alt="drawing" width="95px"/>
</p>
T-Talk is an instant messenger website that provides a live transmission of text messages
to friends.

## Demo

Here's the website : https://www.t-talk.site/
</br>Test account:

- User : test@test.com
- Password : 123456

## Catalog

- [Main Features](#main-features)
- [System Architecture](#system-architecture)
- [Backend Technique](#backend-technique)
- [Front-End Technique](#front-end-technique)
- [Contact](#contact)

## Main Features

#### Login

- Authenticate user with JSON Web Token & implemented by flask middleware

#### Use Socket.IO to achieve real-time chat

- User can chat with friends and detect friends' typing event.

<p align="center">
<img src="https://raw.githubusercontent.com/yin0110/t-talk/main/static/img/chat.gif" alt="drawing"/>
</p>

#### Use Canvas & Socket.IO to do online drawing board

- Provide drawing & changing colors & eraser & downloading functions.

<p align="center">
<img src="https://raw.githubusercontent.com/yin0110/t-talk/main/static/img/paint.gif" alt="drawing"/>
</p>

#### Search efficiently by Elasticsearch

- Support keywords & full-text searching to find history message.

<p align="center">
<img src="https://raw.githubusercontent.com/yin0110/t-talk/main/static/img/search.gif" alt="drawing"/>
</p>

#### Store friend list cache by ElasticCache

- Load faster to improve user experience

## System Architecture

<img src="https://raw.githubusercontent.com/yin0110/t-talk/main/static/img/structure.png" alt="drawing"/>

## Backend Technique

#### Deployment

- Docker

#### Environment

- Python Flask

#### Database

- MySQL
- Firestore
- Elasticsearch
- Redis(cache)

#### Cloud Service (AWS)

- EC2
- S3, CloudFront
- RDS
- ElastiCache

#### Networking

- HTTP & HTTPS
- Domain Name System
- NGINX
- SSL (Zero SSL)

#### Version Control

- Git/GitHub

#### Design Pattern

- Server code in MVC

## Front-End Technique

- HTML
- CSS
- Canvas
- JavaScript
- AJAX

## Contact

???? Yin Chun Chuang

???? Email: blackbest_0110@hotmail.com

<!-- #### Key Points

- Use Socket IO to achieve real-time chat and use room & private room concept to create chatroom & detect the typing event.

- Use Canvas to combine with Socket IO to achieve online drawing board.
- To decrease data access latency, store friend list cache in redis.
- Do paging in history message and load 20 messages per time
- Accelerate history message searching speed by using elastic search. Also search related message.
- Use index in MySQL to accelerate the searching speed. -->
