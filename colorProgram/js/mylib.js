var mousePosition = Class.create({

   initialize: function(canvas)
   {
       this.canvas = canvas;
        this.x = event.pageX;
        this.y = event.pageY;
   },
    getX: function()
    {
      return this.x;
    },
    getY: function()
    {
        return this.y;
    },
    setX: function(x)
    {
        this.x = x;
    },
    setY: function(y)
    {
      this.y = y;
    },
    toString: function()
    {
        return "(" + this.x + "," + this.y + ")";
    }
});

var drawControl = Class.create(mousePosition,{

    initialize: function($super,canvas)
    {
        $super(canvas);
        this.currentColor = "rgb(40,80,0)";
        this.previousColor = this.currentColor;
        this.drawing = false;
        this.toolType = 0;
    },
    setColor: function(color)
    {
      this.previousColor = this.currentColor;
      this.currentColor = color;
    },
    getDrawing: function()
    {
      return this.drawing;
    },
    setDrawing: function(t)
    {
      this.drawing = t;
    },
    getToolType: function()
    {
      return this.toolType;
    },
    setToolType: function(t)
    {
      this.toolType = t;
    },
    erase: function(graphics)
    {
        graphics.save();

        graphics.clearRect(this.getX()-10,this.getY()-10,50,50);

        graphics.restore();
    },
    draw: function(graphics)
    {
            graphics.save();

            graphics.fillStyle = this.currentColor;
            graphics.fillRect(this.getX()-17,this.getY()-3,10,10);

            graphics.restore();
    }
});
var colorHolder = Class.create({

    initialize: function(color,x,y)
    {
        this.color = color;
        this.x = x;
        this.y = y;
    },
    setColor: function(color)
    {
        this.color = color;
    },
    getColor: function()
    {
        return this.color;
    },
    draw: function(g)
    {
        g.save();

        g.fillStyle = this.color;
        console.log(this.color);
        g.fillRect(this.x,this.y,15,15);
        g.restore();
    }
});

var pixelBoard = Class.create({

    initialize: function(canvas,pixelSize)
    {
      this.canvas = canvas;
      this.pixelSize = pixelSize;
      this.amountW = canvas.width/pixelSize;
      this.amountH = canvas.height/pixelSize;
      this.totalAmount = this.amountW * this.amountH;
      this.pixels = [];
      this.createPixels();
    },
    getPixels: function()
    {
        return this.pixels;
    },
    createPixels: function()
    {
        var x = 0;
        var y = 0;


        for(var i = 0; i < this.totalAmount-(this.amountW*2); i++)
        {
          var temp = document.createElement("Div");
          temp.style.width = this.pixelSize + "px";
          temp.style.height = this.pixelSize + "px";
          temp.style.display = "inline";
          temp.style.position = "absolute";
          temp.style.top = y+38 + "px";
          temp.style.left = x+13 + "px";
          temp.style.border = "1px solid black";
          x += this.pixelSize;
          if(x == this.amountW*this.pixelSize)
          {
              y += this.pixelSize;
              x = 0;
          }

          temp.addEventListener("click",function()
          {
              var r = document.getElementById("r").value;
              var g = document.getElementById("g").value;
              var b = document.getElementById("b").value;

              console.log(r);

             this.style.backgroundColor = "RGB(" + r + "," + g + "," + b + ")";


          });

          this.pixels.push(temp);

        }
    }


});