# Canvas Balls

Useless bouncing balls on a canvas

## Getting Started

First you have to include the js script
```html
<script src="Balls.js"></script>    
```
Then your html file you need to create a div

```html
<div id="balls"></div>      
```
To initiate the canvas
```javascript
 var balls = new Balls(
     {
        selector:"#balls",
        nbBalls:20,
        speed:null,
        backgroundBalls:null,
        addOnClick:true
});
```
This code will create a canvas with 20 balls with a random speed and a random color on a black background.

## Parameters
| Parameter name |                Description                | Default value |
|----------------|:-----------------------------------------:|--------------:|
| selector       | The selector of the div to add the canvas |               |
| width          |          The width of the canvas          |          null |
| height         |          The height of the canvas         |          null |
| nbBalls        |        The number of balls to generate         |          5 |
| speed         |          The speed of the balls in the canvas. If it's null the speed will be random for each ball.       |          null |
| addOnClick         |          If it's true when you click on the canvas it will add a ball        |          false |
| background         |        It's the background of the canvas     |          black |
| backgroundBalls         |      It's the background of the balls. If it's null then the background of the balls will be a random color.      |          white |
| backgroundImageBalls         |          It's the background image of the balls. You just have to pass the url of the image in a string. You can pass an array with multiple strings, it will pick randomly in it.         |          null |
| borderSize         |         It's the size of the border around the picture(if there is one).         |          2 |


## Authors

* **Grégory Boutte** - *Initial work* - [gboutte](https://gitlab.com/gboutte)
