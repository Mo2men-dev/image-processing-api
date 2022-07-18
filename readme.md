# Description
A simple Image Processing API for The EGFWD Nano Degree

# How to Install

1. clone the repository
2. cd into the directory
3. `npm install`

# Dependencies
- [express](https://expressjs.com/)
- [sharp](https://sharp.pixelplumbing.com/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [nodemon](https://nodemon.io/)
- [jasmine](https://jasmine.github.io/)

# Scripts

- `npm run build` : build the project for production
- `npm run dev` : start the project in development mode
- `npm run test` : run the tests
- `npm run lint` : run the linter
- `npm run start` : start the project in development mode
- `npm run prettier` : run the prettier formatter

# Usage
    $ npm run dev

server listens on port 3000

### Instrunctions will be at : 
(http://localhost:3000/api/images)

### Query Parameters :
- f : file name [required] 
    - Available Images : [encenadaport , fjord , icelandwaterfall , palmtunnel , santamonica]
- w : width of the image (1 < width 2000)
- h : height of the image (1 < height < 2000)

>Both w and h are optional. If both are not provided, the image will be returned in its original size but to resize the Image Both must be provided.

# Examples :
| Query | Response |
|-------|----------|
| `f=palmtunnel&w=100&h=100` | palmtunnel.jpg with a width of 100 and a height of 100 |
| `f=palmtunnel&w=100` | returns an Error Both width and height must be provided to resize |
| `f=palmtunnel&h=100` | returns an Error Both width and height must be provided to resize |
| `f=palmtunnel` | palmtunnel.jpg |