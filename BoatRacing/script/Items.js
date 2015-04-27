/*      ****************************************************************      */
/*      *                          BOATRACING                          *      */
/*      ****************************************************************      */
/*      *   Nom                 :   NETUSCHIL                          *      */
/*      *   Prénom              :   Dylan                              *      */
/*      *   Classe              :   I.FA-P3B                           *      */
/*      *   Date de création    :   30 mars 2015                       *      */
/*      *   Version             :   1.0                                *      */
/*      *   Description         :   Class de l'objet Items             *      */
/*      ****************************************************************      */

function Items( vaId )
{
   // Parametre de la classe ItemsSet
   this.sprites = new Array();
   this.localId = vaId;
   this.loadTime = Date.now();
   //this.startTime = 
   // Variables de secours de this
   var self = this;

   /**
    * Envoie les informations concernant l’utilisateur local au serveur et 
    * attend en retour un tableau des nouvelles position de tous les joueurs. 
    * Met a jour les sprites avec le informations reçues
    */
   this.SendData = function()
   {
      // Création de l'objet de requette
      xHtml = window.XMLHttpRequest ? new XMLHttpRequest()
              : new ActiveXObject("Microsoft.XMLHTTP");

      // Création de la lecture automatique des réponse
      xHtml.onreadystatechange = function()
      {
         if (xHtml.readyState == 4 && (xHtml.status == 200 || xHtml.status == 0))
         {
            // Si une réponse en reçu, faire LoadData avec 
            self.LoadData(xHtml.responseText);
         }
      };

      // Envoyer la requette en GET au serveur
      url = "../php/serveur.php?id=" + this.localId + "&x=" + this.sprites[this.localId].x + "&y=" + this.sprites[this.localId].y + "&alpha=" + this.sprites[this.localId].alpha + "&speed=" + this.sprites[this.localId].speed + "&energy=" + this.sprites[this.localId].energy;
      xHtml.open("GET", url, true);
      xHtml.send(null);
   };

   /** 
    * Est appelé quand les données sur l’ensemble des joueurs sont chargées.
    * 
    * @param {json string} vaData
    */
   this.LoadData = function(vaData)
   {
      // Convertion du string json en objet
      vaData = JSON.parse(vaData);

      //alert(vaData);
      for (i = 0; i < vaData.Player.length; i++)
      {
         id = vaData.Player[i].id;
         
         if (this.sprites[id] === undefined)
         {
            this.sprites[id] = vaData.Player[i].imgId;
         }
         else
         {
            if (typeof(this.sprites[id]) != 'string')
            {
               this.sprites[id].x = vaData.Player[i].x;
               this.sprites[id].y = vaData.Player[i].y;
               this.sprites[id].alpha = vaData.Player[i].alpha;
               this.sprites[id].speed = vaData.Player[i].speed;
               this.sprites[id].energy = vaData.Player[i].energy;
            }
         }
      }
      this.loadTime = vaData.Stamp;
   };

   /** 
    * Appelle la fonction vaFct pour chaque sprite dans le tableau 
    * (Move, Show, ...). La fonction vaFct reçoit quand à elle deux 
    * paramètres le sprite ainsi que l’objet Items (pour les collisions).
    * 
    * @param {string} vaFct
    */
   this.ForEachItem = function(vaFct)
   {
      for (i = 0; i < this.Player.length; i++)
      {
         id = this.Player[i].id;
         this.sprites[id].vaFct();
      }
   };
}