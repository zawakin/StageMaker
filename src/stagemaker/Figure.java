package stagemaker;

import javafx.geometry.*;
import javafx.scene.canvas.GraphicsContext;


public class Figure {
    protected Point2D pos;
    protected double width,height,angle,angle2;
    protected int kind;

    public Figure(double x,double y, double width, double height, double angle, double angle2,int kind){
        this.pos = new Point2D(x,y);
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.angle2 = angle2;
        this.kind = kind;
    }
    public Figure(double x,double y, double width,double height,int kind){
        this(x,y,width,height,0.0,0.0,kind);
    }
    String getX(){return pos.getX()+"";}
    double getY(){return pos.getX();}
    double getWidth(){return width;}
    double getHeight(){return height;}
    double getAngle(){return angle;}
    double getAngle2(){return angle2;}
    void Draw(GraphicsContext gc){
    gc.fillRect(pos.getX(),pos.getY(),width,height);
    }
    @Override
    public String toString(){
        return pos.getX()+","+pos.getY()+","+width+","+height+","+angle+","+angle2+","+kind;
    }
    public String getGaneCode(){
        return pos.getX()+","+pos.getY()+","+width+","+height+","+angle+","+angle2+","+kind;
    }
}
