import javafx.geometry.Point2D;
import javafx.scene.canvas.GraphicsContext;
import java.util.ArrayList;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;


class MyStage{
    private ArrayList<Figure> figureList;
    MyStage(){
        figureList = new ArrayList<Figure>();
        figureList.add(new Figure(   0, 497, 800, 316, 0, 0, 3));
        figureList.add(new Figure(-300,-300, 300, 812, 0, 0, 3));
        figureList.add(new Figure( 800,-300, 300, 812, 0, 0, 3));
    }
    public void addFigure(Figure figure){
        figureList.add(figure);
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
        for(int i=0;i<figureList.size();i++){
            figureList.get(i).Draw(gc);
        }
    }
    public String getGaneCode(){
        String s = "";
        for(int i=0;i<figureList.size();i++){
            s += "object["+i+"].set("+figureList.get(i).getGaneCode()+");\n";
        }
        return s;
    }
}

class Figure{
    private Point2D pos;
    private double width,height,angle,angle2;
    private int kind;

    Figure(double x,double y, double width, double height, double angle, double angle2,int kind){
        this.pos = new Point2D(x,y);
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.angle2 = angle2;
        this.kind = kind;
    }
    Figure(double x,double y, double width,double height){
        this(x,y,width,height,0.1,0,3);
    }
    double getX(){return pos.getX();}
    double getY(){return pos.getX();}
    double getWidth(){return width;}
    double getHeight(){return height;}
    double getAngle(){return angle;}
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
