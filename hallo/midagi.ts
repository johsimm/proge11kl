abstract class AbstractResistor{
   constructor(public name: string){}
   abstract draw(g, startx: number, y: number):void; 
   abstract getWidth(): number;
   abstract getHeight(): number;
}

class Resistor extends AbstractResistor{
   constructor(name: string){
    super(name);
   }
   draw(g, startx: number, y: number): void{
    g.beginPath();
    g.moveTo(startx, y);
    g.lineTo(startx+this.getWidth()/4, y);
    g.rect(startx+this.getWidth()/4, y-10, this.getWidth()/2, 20);
    g.fillText(this.name, startx+this.getWidth()/4+1, y+2);
    g.moveTo(startx+this.getWidth()*3/4, y);
    g.lineTo(startx+this.getWidth(), y);
    g.stroke();

   }
   getWidth():number{return 50;}
   getHeight():number{return 30;}
}

class SeriesConnection extends AbstractResistor{
    protected resistors:AbstractResistor[]=[];
    constructor(name: string){
        super(name);
    }
    addResistor(r: AbstractResistor): void{
       this.resistors.push(r);
    }
    getWidth(): number {
        let sum=0;
        for(let r of this.resistors){
            sum+=r.getWidth();
        }
        return sum+10;
    }
    getHeight(): number{
        return Math.max(...this.resistors.map(r => r.getHeight()))+20;
    }
    draw(g, startx: number, y: number){
        let x=startx;
        g.beginPath();
        g.moveTo(x, y);
        x+=5;
        g.lineTo(x, y);
        g.stroke()
        let areaStartX=x;
        for(let i=0; i<this.resistors.length; i++){
          this.resistors[i].draw(g, x, y);
          x+=this.resistors[i].getWidth();
        }
        g.strokeStyle="lightgray";
        g.beginPath();
        g.rect(areaStartX, y-this.getHeight()/2, x-areaStartX, this.getHeight());
        g.stroke();
        g.strokeStyle="black";
        g.beginPath();
        g.moveTo(x, y);
        x+=5;
        g.lineTo(x, y);
        g.stroke()
        g.fillText(this.name, startx+this.getWidth()/2-10, y+this.getHeight()/2);
     }
}