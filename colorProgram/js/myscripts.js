
var c1;
var rValue;
var gValue;
var bValue;
var paintBrush;
var button;
var colorButton;
var colorWheel;
var toolKit;
var toolButton;
var ctx;
var visibility;
var tools;

window.onload = function()
{
    visibility = [false,false];
    tools = [document.getElementById("pencil"),document.getElementById("eraser")];

    toolKit = document.getElementById("toolKit");
    toolButton = document.getElementById("tools");
    colorWheel = document.getElementById("colorPicker");
    colorButton = document.getElementById("colors");
    button = document.getElementById("clear");
    c1 = document.getElementById("drawCanvas");
    ctx = c1.getContext("2d");
    paintBrush = new drawControl(c1,event);

    tools[0].addEventListener("click",function()
        {
            c1.style.cursor = "url('images/pencil1.png'),auto";
            paintBrush.setToolType(0);
        });
    tools[1].addEventListener("click",function()
    {
        c1.style.cursor = "url('images/eraserTool.png'),auto";
        paintBrush.setToolType(1);
    });

    c1.addEventListener("mousedown",function()
    {
        if(paintBrush.getToolType() == 0)
        {
            paintBrush.setDrawing(true);

            rValue = document.getElementById("r").value;
            gValue = document.getElementById("g").value;
            bValue = document.getElementById("b").value;

            console.log(paintBrush.getDrawing());

            paintBrush.setX(event.clientX);
            paintBrush.setY(event.clientY);
            paintBrush.setColor("rgb(" + rValue + "," + gValue + "," + bValue + ")");

            paintBrush.draw(ctx);
        }
        else if(paintBrush.getToolType() == 1)
        {
         paintBrush.setX(event.clientX);
         paintBrush.setY(event.clientY);

         paintBrush.erase(ctx);
        }
    });
    c1.addEventListener("mouseup",function()
    {
       paintBrush.setDrawing(false);
        console.log(paintBrush.getDrawing());
    });
    button.addEventListener("click",clear);
    colorButton.addEventListener("click",function()
    {
       if(visibility[0])
       {
           colorWheel.style.visibility = "hidden";
           colorButton.style.backgroundColor = "white";
           visibility[0] = false;
       }
       else
       {
           colorWheel.style.visibility = "visible";
           colorButton.style.backgroundColor = "lightgrey";
           visibility[0] = true;
       }
    });
    toolButton.addEventListener("click",function()
    {
        if(visibility[1])
        {
            toolKit.style.visibility = "hidden";
            toolButton.style.backgroundColor = "white";
            visibility[1] = false;
        }
        else
        {
            toolKit.style.visibility = "visible";
            toolButton.style.backgroundColor = "lightgrey";
            visibility[1] = true;
        }
    });
};

var clear = function()
{
    ctx.clearRect(0,0,c1.width,c1.height);
};

