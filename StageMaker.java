import javafx.geometry.Point2D;
import javafx.scene.canvas.GraphicsContext;
import java.util.ArrayList;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import javafx.scene.paint.Color;

//green:0 red:1 blue:2 black:3
class MyStage{
    private ArrayList<Figure> figureList;
    private ArrayList<Ball> ballList;
    MyStage(){
        figureList = new ArrayList<Figure>();
        ballList = new ArrayList<Ball>();
        // figureList.add(new Figure(   0, 497, 800, 316, 0, 0, 3));
        // figureList.add(new Figure(-300,-300, 300, 812, 0, 0, 3));
        // figureList.add(new Figure( 800,-300, 300, 812, 0, 0, 3));
    }
    public void addFigure(Figure figure){
        figureList.add(figure);
    }
    public void addBall(Ball ball){
        ballList.add(ball);
    }

    public void printAllFigure(){
        System.out.println();
        for(int i=0;i<figureList.size();i++){
            System.out.println(figureList.get(i));
        }
        System.out.println(getGaneCode());
        try{
            FileWriter fw = new FileWriter(new File("RBP/MyStage.js"));
            String ss = "var MyStage01 = function(ball, object){\n"
        	+"for(var i=0; i<object.length; i++){\n"
        	+"	object[i].alive = false;\n"
        	+"}\n"
        	+"for(var i=1; i<ball.length; i++){\n"
        	+"	ball[i].alive = false;\n"
        	+"	ball[i].collisionC = 0;\n"
        	+"	ball[i].collisionCC = 0;\n"
	        +"}\n";
            fw.write(ss);
            fw.write(getGaneCode());
            ss = 	"nowStage = 100;\n"
                    +"};\n";
            fw.write(ss);
            fw.close();
        }catch(IOException e){
          System.out.println(e);
        }
    }
    public void drawAllFigure(GraphicsContext gc){
        //085green redblue 0.6 gray 0.75
        gc.setGlobalAlpha(0.53);
        for(int i=0;i<figureList.size();i++){
            figureList.get(i).Draw(gc);
        }
        gc.setGlobalAlpha(0.6);
        for(int i=0;i<ballList.size();i++){
            ballList.get(i).Draw(gc);
        }
    }
    public String getGaneCode(){
        String s = "";
        for(int i=0;i<figureList.size();i++){
            s += "object["+i+"].set("+figureList.get(i).getGaneCode()+");\n";
        }
        for(int i=0;i<ballList.size();i++){
            int a = i+1;
            s += "ball["+a+"].set("+ballList.get(i).getGaneCode()+");\n";
        }
        return s;
    }
}
class Ball extends Figure{
    protected double x,y,r,vx,vy;
    Ball(double x,double y, double r,double vx,double vy,int kind){
        super(x,y,r,r,0,0,kind);
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.kind = kind;
    }
    Ball(double x,double y,double r,int kind){
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

class Figure{
    protected Point2D pos;
    protected double width,height,angle,angle2;
    protected int kind;

    Figure(double x,double y, double width, double height, double angle, double angle2,int kind){
        this.pos = new Point2D(x,y);
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.angle2 = angle2;
        this.kind = kind;
    }
    Figure(double x,double y, double width,double height,int kind){
        this(x,y,width,height,0.0,0.0,kind);
    }
    double getX(){return pos.getX();}
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
