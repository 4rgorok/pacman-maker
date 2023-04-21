const Sprites = {
    pac_dots:           0,
    power_pellet:       1,
    empty:              2,
    pac_man:            3,
    wall_vertical:      4, 
    wall_horizontal:    5,
    corner_left_up:     6,
    corner_left_down:   7,
    corner_right_up:    8,
    corner_right_down:  9,
    red_ghost:          10,
    pink_ghost:         11,
    blue_ghost:         12,
    orange_ghost:       13
}
const PositionsX = [6,
    0,
    0,
    0,
    1,
    0,
    2,
    4,
    3,
    5,
    0,
    0,
    0,
    0]

const PositionsY = [0,
    1,
    0,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    4,
    6,
    5]
/*const PositionsX = {
    pac_dots:           6,
    power_pellet:       0,
    empty:              0,
    pac_man:            0,
    wall_vertical:      1, 
    wall_horizontal:    0,
    corner_left_up:     2,
    corner_left_down:   4,
    corner_right_up:    3,
    corner_right_down:  5,
    red_ghost:          0,
    pink_ghost:         0,
    blue_ghost:         0,
    orange_ghost:       0
}*/

/*const PositionsY = {
    pac_dots:           0,
    power_pellet:       1,
    empty:              0,
    pac_man:            2,
    wall_vertical:      0, 
    wall_horizontal:    0,
    corner_left_up:     0,
    corner_left_down:   0,
    corner_right_up:    0,
    corner_right_down:  0,
    red_ghost:          3,
    pink_ghost:         4,
    blue_ghost:         6,
    orange_ghost:       5
}*/

class Playfield {
    constructor(image24, image48, size) {
        this.image48 = image48;
        this.image24 = image24;
        this.size = size;
        this.field_size = 32;
        this.sprite_size = 24
        this.obr=new Array(this.field_size)
        for(var i=0;i<this.field_size;i++)this.obr[i]=new Array(16)
        this.game=new Array(this.field_size)
        this.zazX=0
        
        this.ctrl=false
        this.zazY=0
        this.mouse={x:0,y:0}
        this.zapis=[]
        this.zapisLvl=-1
        this.czyDel=false
        this.bufor=false
        this.next=false
        this.hover=false
        this.ifpaste=false
        this.initGame()
        this.initLeft();
        //this.initRight();
        this.initPole();
    };

    initLeft() {
        for (let q = 0; q < 7; q++) {
            for (let w = 0; w < 8; w++) {
                let element = document.createElement("div");
                element.style.width = this.size * 2 + "px";
                element.style.height = this.size * 2 + "px";
                element.style.position="absolute"
                element.style.top=(this.sprite_size * q * 2 + 100 ) + "px"
                element.style.left=(this.sprite_size * w * 2 + 60) + "px"
                element.classList.add("box");
                this.obr[q][w]=element
                element.onmouseover=function()
                {
                    this.style.opacity="100%"
                }
                element.onmouseout=function()
                {
                    this.style.opacity="35%"
                }
                element.onclick = (e) => {
                    var licznik=0
                    var x,y
                    for(let r=0;r<this.field_size;r++)
                    {
                        for(let t=0;t<this.field_size;t++)if(this.game[r][t].style.border=="1px solid yellow"){
                            x=r
                            y=t
                            licznik++
                            this.game[r][t].style.border="1px dotted white"
                            this.game[r][t].style.backgroundImage="url('" + this.image24 + "')"
                            this.game[r][t].style.backgroundPosition = "top "+(-this.sprite_size * q) + "px left " + (-this.sprite_size * w) + "px";
                        }
                    }
                    if(licznik>0)
                    {
                        //console.log(this.next)
                        if(licznik==1&&this.next)this.game[x][y+1].style.border="1px solid yellow"
                        this.dodajZapis()
                    }
                }
                //console.log(this.image48);
                //console.log("top "+(24 * w) + "px, left " + (24 * q) + "px")
                
                element.style.backgroundPosition = "top "+(-this.sprite_size * 2 * q) + "px left " + (-this.sprite_size * 2 * w) + "px";
                element.style.backgroundImage = "url('" + this.image48 + "')";
                //console.log(element.style.backgroundPosition);
                document.body.append(element);
            }
        }
    };

    initRight() {
        for (let q = 0; q < 16; q++) {
            for (let w = 16; w < 32; w++) {
                let element = document.createElement("div");
                element.style.width = this.size + "px";
                element.style.height = this.size + "px";
                element.style.position="absolute"
                element.style.top=(this.sprite_size * q+480) + "px"
                element.style.left=(this.sprite_size * w-384) + "px"
                element.classList.add("box");
                console.log("lol")
                this.obr[q+16][w-16]=element
                element.onmouseover=function()
                {
                    this.style.opacity="100%"
                }
                element.onmouseout=function()
                {
                    this.style.opacity="35%"
                }
                element.onclick = (e) => {
                    var licznik=0
                    var x,y
                    for(let r=0;r<this.field_size;r++)
                    {
                        
                        for(let t=0;t<this.field_size;t++)if(this.game[r][t].style.border=="1px solid yellow"){
                            licznik++
                            x=r
                            y=t
                            this.game[r][t].style.border="1px dotted white"
                            this.game[r][t].style.backgroundImage="url('" + this.image24 + "')"
                            this.game[r][t].style.backgroundPosition = "top "+(-this.sprite_size * q) + "px left " + (-this.sprite_size * w) + "px";
                        }
                    }
                    if(licznik>0)
                    {
                        if(licznik==1&&this.next)this.game[x][y+1].style.border="1px solid yellow"
                        this.dodajZapis()
                    }
                }
                //console.log(this.image48);
                //console.log("top "+(24 * w) + "px, left " + (24 * q) + "px")
                
                element.style.backgroundPosition = "top "+(-this.sprite_size * q) + "px left " + (-this.sprite_size * w) + "px";
                element.style.backgroundImage = "url('" + this.image24 + "')";
                //console.log(element.style.backgroundPosition);
                document.body.append(element);
            }
        }
    };

    initPole()
    {
        var that=this
        for (let q = 0; q < this.field_size; q++) {
            this.game[q]=new Array(this.field_size)
            for (let w = 0; w < this.field_size; w++) {
                let element = document.createElement("div");
                element.style.width = this.size + "px";
                element.style.height = this.size + "px";
                element.style.position="absolute"
                element.style.border="1px dotted white"
                element.style.top=((that.sprite_size + 4) * q) + "px"
                element.style.left=((that.sprite_size + 4) * w+500) + "px"
                element.classList.add("box2");
                element.onmouseenter=function()
                {
                    if(this.style.border=="1px solid yellow")that.hover=true
                    this.style.border="1px solid red"
                }
                element.onmouseleave=function()
                {
                    if(this.style.border!="1px solid yellow")this.style.border="1px dotted white"
                    if(that.hover)this.style.border="1px solid yellow"
                    that.hover=false
                }
                this.game[q][w]=element
                element.onclick = (element) => {
                   
                    if(this.ctrl==false)
                    {
                        for(let r=0;r<this.field_size;r++)
                        {
                            
                            for(let t=0;t<this.field_size;t++)
                            {
                                
                                if(this.game[r][t].style.border=="1px solid yellow")
                                {
                                    //console.log(this.game[r][t])
                                    this.game[r][t].style.border="1px dotted white"
                                }
                            }
                        }
                    }
                    if(this.ctrl&&this.game[q][w].style.border=="1px solid red")
                    {
                        this.game[q][w].style.border="1px dotted white"
                        that.hover=false
                    }

                    else this.game[q][w].style.border="1px solid yellow"
                 };
               
                document.body.append(element);
                
            }
        }
        this.dodajZapis()
    }
    initGame()
    {
        var that=this
        window.onkeydown=function(e)
        {
            if (e.keyCode == 17)
            {
                that.ctrl=true 
            }
            if(e.keyCode == 46)
            {
                //console.log("del")
                that.del()
            }
            if(e.keyCode==88&&e.ctrlKey)
            {
                that.czyDel=true
                that.copy()
                that.czyDel=false
            }
            if(e.keyCode==67&&e.ctrlKey)
            {
                that.copy()
            }
            if(e.keyCode==86&&e.ctrlKey)
            {
                that.ifpaste=true
                that.przesuwajPaste()
            }
            
        }
        window.onkeyup=function(e)
        {
            if(e.keyCode==17)
            {
                that.ctrl=false
            }
            
        }
        window.onkeypress=function(e)
        {
            if (e.keyCode == 26)
            {
                that.cof()
            }
            if(e.keyCode == 25)
            {
                that.przod()
            }
            
            
        }
        document.addEventListener("keydown", function(e) {  
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            that.ZapisDoPliku()
        }
        if (e.keyCode == 76 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            that.OtworzPlik()
        }
        }, false);
        window.onmousedown=function(e)
        {
            
            //console.log(e.which)
            if(e.pageX>=500&&e.pageX<=1620&&e.pageY<=1120&&e.which==1)
            {
                var zaznacz=document.createElement("div")
                zaznacz.className="zaznaczenie"
                //console.log("aaa")
                zaznacz.style.top=(e.pageY)+"px"
                zaznacz.style.left=(e.pageX)+"px"
                that.zazX=e.pageX
                that.zazY=e.pageY
                document.body.appendChild(zaznacz)
            }
            if(e.which==3)
            {
                if(document.getElementById("menu"))document.getElementById("menu").remove()
                var menu=document.createElement("div")
                menu.id="menu"
                menu.style.top=e.pageY+"px"
                menu.style.left=e.pageX+"px"
                var opcja=document.createElement("button")
                opcja.className="opc"
                opcja.innerHTML="Undo&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Ctrl+Z"
                opcja.style.top="0px"
                opcja.onclick=function()
                {
                    //console.log("lol")
                    that.cof()
                    document.getElementById("menu").remove()
                }
                menu.appendChild(opcja)
                var opcja=document.createElement("button")
                opcja.className="opc"
                opcja.innerHTML="Redo&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Ctrl+Y"
                opcja.style.top="30px"
                opcja.onclick=function()
                {
                    that.przod()
                    document.getElementById("menu").remove()
                }
                menu.appendChild(opcja)
                var opcja=document.createElement("button")
                opcja.className="opc"
                opcja.innerHTML="Cut&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Ctrl+X"
                opcja.style.top="60px"
                opcja.onclick=function()
                {
                    that.czyDel=true
                    that.copy()
                    that.czyDel=false
                    document.getElementById("menu").remove()
                }
                menu.appendChild(opcja)
                var opcja=document.createElement("button")
                opcja.className="opc"
                opcja.innerHTML="Copy&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Ctrl+C"
                opcja.style.top="90px"
                opcja.onclick=function()
                {
                    that.copy()
                    document.getElementById("menu").remove()
                }
                menu.appendChild(opcja)
                var opcja=document.createElement("button")
                opcja.className="opc"
                opcja.innerHTML="Paste&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Ctrl+V"
                opcja.style.top="120px"
                opcja.onclick=function()
                {
                    that.ifpaste=true
                    that.przesuwajPaste()
                    document.getElementById("menu").remove()
                }
                menu.appendChild(opcja)
                var opcja=document.createElement("button")
                opcja.className="opc"
                opcja.innerHTML="Delete&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Del"
                opcja.style.top="150px"
                opcja.onclick=function()
                {
                    that.del()
                    document.getElementById("menu").remove()
                }
                menu.appendChild(opcja)
                var opcja=document.createElement("button")
                opcja.className="opc"
                opcja.innerHTML="Save to file&emsp;&emsp;&emsp;&emsp;&emsp;Ctrl+S"
                opcja.style.top="180px"
                opcja.onclick=function()
                {
                    that.ZapisDoPliku()
                    document.getElementById("menu").remove()
                }
                menu.appendChild(opcja)
                var opcja=document.createElement("button")
                opcja.className="opc"
                opcja.innerHTML="Load from file&emsp;&emsp;&emsp;&ensp;Ctrl+L"
                opcja.style.top="210px"
                opcja.onclick=function()
                {
                    that.OtworzPlik()
                    document.getElementById("menu").remove()
                }
                menu.appendChild(opcja)
                document.body.appendChild(menu)
                
            }
            if(e.which==1)
            {
                if(e.pageX>=500&&e.pageX<=1620&&e.pageY<=1120)
                {
                    if(that.ifpaste)
                    {
                        that.ifpaste=false
                        that.paste(true)
                    }
                }
                setTimeout(() => {
                    if(document.getElementById("menu"))document.getElementById("menu").remove()
                }, 100);
                
            }
            
        }
       
        window.onmousemove=function(e)
        {
            that.mouse.x=parseInt((e.pageX-500)/(that.sprite_size + 4))
            that.mouse.y=parseInt((e.pageY)/(that.sprite_size + 4))
            if(that.ifpaste)that.przesuwajPaste()
            var zaznacz=document.getElementsByClassName("zaznaczenie")
            if(zaznacz[0])
            {
                //console.log("xdd")
                if(e.pageX>=500&&e.pageX<=1620&&e.pageY<=1120)
                {
                    if(e.pageX<that.zazX&&e.pageY<that.zazY)
                    {
                        zaznacz[0].style.left=e.pageX+"px"
                        zaznacz[0].style.top=e.pageY+"px"
                        zaznacz[0].style.width=(that.zazX-e.pageX)+"px"
                        zaznacz[0].style.height=(that.zazY-e.pageY)+"px"
                    }
                    else if(e.pageX>that.zazX&&e.pageY<that.zazY)
                    {
                        zaznacz[0].style.left=that.zazX+"px"
                        zaznacz[0].style.top=e.pageY+"px"
                        zaznacz[0].style.width=(e.pageX - that.zazX)+"px"
                        zaznacz[0].style.height=(that.zazY-e.pageY)+"px"
                    }
                    else if(e.pageX<that.zazX&&e.pageY>that.zazY)
                    {
                        zaznacz[0].style.left=e.pageX+"px"
                        zaznacz[0].style.top=that.zazY+"px"
                        zaznacz[0].style.width=(that.zazX-e.pageX)+"px"
                        zaznacz[0].style.height=(e.pageY-that.zazY)+"px"
                    }
                    else
                    {
                        zaznacz[0].style.left=that.zazX+"px"
                        zaznacz[0].style.top=that.zazY+"px"
                        zaznacz[0].style.width=(e.pageX-parseInt(zaznacz[0].style.left))+"px"
                        zaznacz[0].style.height=(e.pageY-parseInt(zaznacz[0].style.top))+"px"
                    }
                }

                if(!that.ctrl)
                {
                    //console.log("NOWAY")
                    for(let r=0;r<that.field_size;r++)
                    {
                        for(let t=0;t<that.field_size;t++)
                        {
                            //console.log(that.game[r][t].style.border)
                            if(that.game[r][t].style.border=="1px solid yellow")
                            {
                                console.log("NOWAY")
                                that.game[r][t].style.border="1px dotted white"
                            }
                        }
                    }
                }
                //console.log(parseInt((parseInt(zaznacz[0].style.left)-500+parseInt(zaznacz[0].style.width))/28))
                for(let r=parseInt((parseInt(zaznacz[0].style.left)-500)/(that.sprite_size + 4));r<=parseInt((parseInt(zaznacz[0].style.left)-500+parseInt(zaznacz[0].style.width))/(that.sprite_size + 4));r++)
                {
                    for(let t=parseInt((parseInt(zaznacz[0].style.top))/(that.sprite_size + 4));t<=parseInt((parseInt(zaznacz[0].style.top)+parseInt(zaznacz[0].style.height))/(that.sprite_size + 4));t++)
                    {
                        that.game[t][r].style.border="1px solid yellow"
                    }
                }
            }  
        }

        window.onmouseup=function(e)
        {
            var zaznacz=document.getElementsByClassName("zaznaczenie")
            if(zaznacz[0])zaznacz[0].remove()
        }
    }

    dodajZapis()
    {
        var tab=new Array(this.field_size)
        for(var i=0;i<this.field_size;i++)
        {
            tab[i]=new Array(this.field_size)
            for(var i2=0;i2<this.field_size;i2++)
            {
                tab[i][i2]=this.game[i][i2].style.backgroundPosition
            }
        }
        this.zapisLvl++
        this.zapis=this.zapis.slice(0,this.zapisLvl)
        this.zapis.push(tab)
        //console.log(this.zapis)
    }

    cof()
    {
        if(this.zapisLvl>0)
            {
                this.zapisLvl--
                //console.log("ctrlZ")
                for(var i=0;i<this.field_size;i++)
                {
                    for(var i2=0;i2<this.field_size;i2++)
                    {
                        if(this.zapis[this.zapisLvl][i][i2]=="")
                        {
                            this.game[i][i2].style.backgroundImage=""
                            this.game[i][i2].style.backgroundPosition=""
                        }
                        else
                        {
                            this.game[i][i2].style.backgroundImage="url('" + this.image24 + "')"
                            this.game[i][i2].style.backgroundPosition=this.zapis[this.zapisLvl][i][i2]
                        }
                    }
                }
                    
            }
    }

    przod()
    {
        if(this.zapisLvl<this.zapis.length-1)
        {
            this.zapisLvl++
            //console.log("ctrlY")
            for(var i=0;i<this.field_size;i++)
            {
                for(var i2=0;i2<this.field_size;i2++)
                {
                    if(this.zapis[this.zapisLvl][i][i2]=="")
                    {
                        this.game[i][i2].style.backgroundImage=""
                        this.game[i][i2].style.backgroundPosition=""
                    }
                    else
                    {
                        this.game[i][i2].style.backgroundImage="url('" + this.image24 + "')"
                        this.game[i][i2].style.backgroundPosition=this.zapis[this.zapisLvl][i][i2]
                    }
                }
            }
                    
        }
    }

    del()
    {
        var licz=0
        for(let r=0;r<this.field_size;r++)
        {
            for(let t=0;t<this.field_size;t++)
            {
                if(this.game[r][t].style.border=="1px solid yellow")
                {
                    licz++
                    this.game[r][t].style.border="1px dotted white"
                    this.game[r][t].style.backgroundImage=""
                    this.game[r][t].style.backgroundPosition=""
                }
            }
        }
        if(licz>0)this.dodajZapis()
    }

    copy()
    {
        var licz=0
        var x1,y1,x2,y2
        for(let r=0;r<this.field_size;r++)
        {
            for(let t=0;t<this.field_size;t++)
            {
                if(this.game[r][t].style.border=="1px solid yellow")
                {
                    if(licz==0)
                    {
                        x1=r
                        x2=r
                        y1=t
                        y2=t
                    }
                    else
                    {
                        if(r<x1)x1=r
                        if(r>x2)x2=r
                        if(t<y1)y1=t
                        if(t>y2)y2=t
                    }
                    licz++
                }
            }
            
        }
        if(licz>0)
        {
            //console.log(x1,y1,x2,y2)
            var tab=new Array(x2-x1+1)
            for(let r=x1;r<=x2;r++)
            {
                tab[r-x1]=new Array(y2-y1+1)
                for(let t=y1;t<=y2;t++)
                {
                    if(this.game[r][t].style.border=="1px solid yellow")
                    {
                        this.game[r][t].style.border="1px dotted white"
                        tab[r-x1][t-y1]=this.game[r][t].style.backgroundPosition
                        if(this.czyDel)
                        {
                            this.game[r][t].style.backgroundImage=""
                            this.game[r][t].style.backgroundPosition=""
                        }
                        
                    }
                    else
                    {
                        tab[r-x1][t-y1]=-1
                    }
                }
                
            }
            this.bufor=tab
            console.log(tab)
            if(this.czyDel)this.dodajZapis()
            //console.log(this.bufor)
        }
    }

    paste(czy)
    {
        if(this.mouse.x>=0&&this.mouse.x<this.field_size&&this.mouse.y>=0&&this.mouse.y<this.field_size&&this.bufor)
        {
            for(var i=0;i<this.bufor[0].length;i++)
            {
                for(var i2=0;i2<this.bufor.length;i2++)
                {
                    
                    if(this.bufor[i2][i]!=-1&&i2+this.mouse.y>=0&&i2+this.mouse.y<this.field_size&&i+this.mouse.x>=0&&i+this.mouse.x<this.field_size)
                    {
                       
                        
                        if(!this.bufor[i2][i]=="")
                        {
                            this.game[i2+this.mouse.y][i+this.mouse.x].style.backgroundPosition=this.bufor[i2][i]
                            this.game[i2+this.mouse.y][i+this.mouse.x].style.backgroundImage="url('" + this.image24 + "')"
                            //console.log("xpp")//this.game[i2+this.mouse.y][i+this.mouse.x].style.backgroundImage=""
                        }
                    }
                }
            }
            if(czy)this.dodajZapis()
        }
    }

    przesuwajPaste()
    {
        for(var i=0;i<this.field_size;i++)
            {
                for(var i2=0;i2<this.field_size;i2++)
                {
                    if(this.zapis[this.zapisLvl][i][i2]=="")
                    {
                        this.game[i][i2].style.backgroundImage=""
                        this.game[i][i2].style.backgroundPosition=""
                    }
                    else
                    {
                        this.game[i][i2].style.backgroundImage="url('" + this.image24 + "')"
                        this.game[i][i2].style.backgroundPosition=this.zapis[this.zapisLvl][i][i2]
                    }
                }
            }
        this.paste(false)
    }

    parseFormat(stp)
    {
        let wynik = new Array(this.field_size)
        for(let i = 0; i < this.field_size; i++)
        {
            let temp = new Array(this.field_size)
            for(let i2 = 0; i2 < this.field_size; i2++)
            {
                if(stp[i][i2]=="")temp[i2] = Sprites.empty
                else{
                    let numer = Sprites.empty
                    let splt = stp[i][i2].split(" ")
                    let x = parseInt(splt[1]) / this.sprite_size
                    let y = parseInt(splt[3]) / this.sprite_size
                    if(x<0)x*=-1
                    if(y<0)y*=-1
                    if(y>0)
                    {
                        switch (y){
                            case 1:
                                numer = Sprites.power_pellet
                                break;
                            case 2:
                                numer = Sprites.pac_man
                                break;
                            case 3:
                                numer = Sprites.red_ghost
                                break;
                            case 4:
                                numer = Sprites.pink_ghost
                                break;
                            case 5:
                                numer = Sprites.orange_ghost
                                break;
                            case 6:
                                numer = Sprites.blue_ghost
                                break;
                        }
                    }
                    else
                    {
                        switch (x){
                            case 0:
                                numer = Sprites.wall_horizontal
                                break;
                            case 1:
                                numer = Sprites.wall_vertical
                                break;
                            case 2:
                                numer = Sprites.corner_left_up
                                break;
                            case 3:
                                numer = Sprites.corner_right_up
                                break;
                            case 4:
                                numer = Sprites.corner_left_down
                                break;
                            case 5:
                                numer = Sprites.corner_right_down
                                break;
                            case 6:
                                numer = Sprites.pac_dots
                                break;
                        }
                    }
                    temp[i2] = numer
                }
            }
            wynik[i] = temp
        }
        console.log(wynik)
        return wynik
    }

    ZapisDoPliku()
    {
        //this.parseFormat(this.zapis[this.zapisLvl])
        var data=JSON.stringify(this.parseFormat(this.zapis[this.zapisLvl]))
        console.log(data)
        var filename="mapa"
        var type="application/json;charset=utf-16"
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }
    calcPosition(number)
    {
        let pos = ""
        pos = "left "+ (-PositionsX[number]*this.sprite_size) + "px top " + (-PositionsY[number]*this.sprite_size) + "px"
        return pos
    }
    OtworzPlik()
    {
        var that=this
        document.getElementById('input').click()
        document.getElementById('input').onchange=function()
        {
            var file = document.getElementById('input').files[0]
            if (file) {
                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function (evt) {
                    var plik=JSON.parse(evt.target.result)
                    //console.log(plik)
                    for(var i=0;i<that.field_size;i++)
                    {
                        for(var i2=0;i2<that.field_size;i2++)
                        {
                            
                            if(plik[i][i2]!=Sprites.empty)
                            {
                                //console.log(plik[i][i2])
                                
                                that.game[i][i2].style.backgroundImage="url('" + that.image24 + "')"

                                that.game[i][i2].style.backgroundPosition=that.calcPosition(plik[i][i2])
                                //console.log(that.game[i][i2].style.backgroundImage)
                            }
                            else
                            {
                                that.game[i][i2].style.backgroundImage=""
                                that.game[i][i2].style.backgroundPosition=""
                            }
                        }    
                    }
                    that.dodajZapis()
                   
                }
                reader.onerror = function (evt) {
                    //console.log("Błąd w czytaniu pliku")
                    window.alert("Błąd w czytaniu pliku")
                    document.getElementById("fileContents").innerHTML = "error reading file";
                }
               
            }   
       } 
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    //console.log(Sprites)

    let image24 = new Image();
    image24.src = "sprites_24.png";
    image24.onload = function () {
        let image48 = new Image();
        image48.src = "sprites_48.png";
        new Playfield(this.src, image48.src, 24);
    }
});
window.oncontextmenu = (e) => {
     e.preventDefault();
}