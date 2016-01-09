package stagemaker;

import javafx.scene.paint.*;
import javafx.scene.canvas.*;

public class Ball extends Figure{
    protected double x,y,r,vx,vy;
    public Ball(double x,double y, double r,double vx,double vy,int kind){
        super(x,y,r,r,0,0,kind);
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.kind = kind;
    }
    public Ball(double x,double y,double r,int kind){
        this(x,y,r,0,0,kind);
    }

    @Override
    void Draw(GraphicsContext gc){
        switch(kind){
            case 0:
                gc.setFill(Color.GREEN);
                break;
            case 1:
                gc.setFill(Color.BLUE);
                break;
            case 2:
                gc.setFill(Color.RED);
                break;
            default:
                gc.setFill(Color.GRAY);
                break;
        }
        gc.fillOval(x-r,y-r,2*r,2*r);
        gc.setFill(Color.BLACK);
    }

    @Override
    public String getGaneCode(){
        return "{x:"+x+",y:"+y+"},"+r+",{x:"+vx+",y:"+vy+"},"+kind;
    }
}