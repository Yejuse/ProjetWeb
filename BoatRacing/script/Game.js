/******************************************
 * Projet : Boat Racing
 * Description : Class qui gère le jeu
 * Date : 23.03.2015
 * Version : 1.0
 * Auteur : Jeremy Delécraz
 * *****************************************/

var vgGame = null;


/** Constructeur pour l'objet Game
 * @param    canvas = Le canvas de sortie
 */
function Game(canvas)
{
    var self = this;

    this.cars = {};
    this.input = {};
    this.map = {};
    this.images = {};
    this.pseudo = "";

    this.can = canvas;
    this.ctx = canvas.getContext("2d");

    this.state = "";
    setInterval(function() {
        self.TimerFct();
    }, 1000);

}

Game.prototype.TimerFct = function()
{

    switch (this.state) {
        case "LoadMap" :
            this.StateLoadMap();
            break;
        case "LoadImage" :
            this.StateLoadImage();
            break;
        case "WaitStart" :
            this.StateWaitStart();
            break;
        case "Play" :
            this.StatePlay();
            break;
        case "Finished" :
            this.StateFinished();
            break;
        default :
            this.StateLoadMap();
    }

    console.log(this.state);
};

/**
 * 
 * @returns {undefined}
 */
Game.prototype.StateLoadMap = function()
{
    //this.map.Load;
    //if (this.map.LoadedMap)
    this.state = "LoadImage";

};
/**
 * 
 * @returns {undefined}
 */
Game.prototype.StateLoadImage = function()
{
    //if (this.images.LoadedImage)
    this.state = "WaitStart";
};

/**
 * 
 * @returns {undefined}
 */
Game.prototype.StateWaitStart = function()
{
    //if (this.cars.sprites.Length() >= 4)
    this.state = "Play";
};

/**
 * 
 * @returns {undefined}
 */
Game.prototype.StatePlay = function()
{
    this.ctx.clearRect(0, 0, this.can.width, this.can.height);
    // this.cars.ForEachItem(function() {
    //    this.move();
    //});
    //this.map.draw(,);
    // this.cars.ForEachItem(function() {
    //    this.Show(self.map.px,self.map.py);
    //});
    this.state = "Finished";
};

/**
 * 
 * @returns {undefined}
 */
Game.prototype.StateFinished = function()
{
    this.state = "";
};