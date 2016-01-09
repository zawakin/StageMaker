package stagemaker;

import java.util.*;
import javafx.geometry.Point2D;
import java.io.*;
import javafx.scene.canvas.*;

//green:0 red:1 blue:2 black:3
public class MyStage{
  private ArrayList<Figure> figureList;
  private ArrayList<Ball> ballList;
  private Ball initBall;
  private boolean initposflag;
  MyStage(int width,int height){
      figureList = new ArrayList<Figure>();
      ballList = new ArrayList<Ball>();
      initposflag = false;
      figureList.add(new Figure(   0, height-3, width, 316, 0, 0, 3));
      figureList.add(new Figure(-297,-300, 300, height+300, 0, 0, 3));
      figureList.add(new Figure( width-3,-300, 300, height+300, 0, 0, 3));
  }
  public ArrayList<Figure> getAllFigure(){
      return figureList;
  }
  public void addFigure(Figure figure){
      figureList.add(figure);
  }
  public void addBall(Ball ball){
      ballList.add(ball);
  }
  public void setInitPos(Point2D pos){
      initBall = new Ball(pos.getX(),pos.getY(),15,0);
      initposflag = true;
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
      //085green red blue 0.6 gray 0.75
      gc.setGlobalAlpha(0.53);
      for(int i=0;i<figureList.size();i++){
          figureList.get(i).Draw(gc);
      }
      gc.setGlobalAlpha(0.6);
      for(int i=0;i<ballList.size();i++){
          ballList.get(i).Draw(gc);
      }
      if(initposflag){
          gc.setGlobalAlpha(0.85);
          initBall.Draw(gc);
      }
  }
  public String getGaneCode(){
      String s = "";

      for(int i=0;i<figureList.size();i++){
          s += "object["+i+"].set("+figureList.get(i).getGaneCode()+");\n";
      }
      if(initposflag){
          s += "ball[0].set("+initBall.getGaneCode()+");\n";
      }
      for(int i=0;i<ballList.size();i++){
          int a = i+1;
          s += "ball["+a+"].set("+ballList.get(i).getGaneCode()+");\n";
      }

      return s;
  }
}