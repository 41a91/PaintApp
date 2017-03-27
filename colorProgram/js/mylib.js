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