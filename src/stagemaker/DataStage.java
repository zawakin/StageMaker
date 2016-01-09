package stagemaker;

import javafx.stage.*;
import javafx.scene.*;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.collections.*;
import javafx.scene.Scene;


public class DataStage extends Stage{
	@SuppressWarnings("unchecked")
    public DataStage(Stage owner,MyStage ms){
        setTitle("obj");
        setWidth(300);
        setHeight(500);
        Group dataroot = new Group();
        TableView<Figure> datatable = new TableView<Figure>();
        ObservableList<Figure> dataobslist = FXCollections.observableArrayList(
            ms.getAllFigure()
            );
        datatable.itemsProperty().setValue(dataobslist);
        TableColumn<Figure,String> nameColumn = new TableColumn<>("name");
        nameColumn.setCellValueFactory(new PropertyValueFactory<Figure,String>("name"));
        datatable.getColumns().addAll(nameColumn);
         TableColumn<Figure, String> xColumn = new TableColumn<>("x");
         TableColumn<Figure, String> yColumn = new TableColumn<>("y");
         TableColumn<Figure, String> wColumn = new TableColumn<>("width");
         TableColumn<Figure, String> hColumn = new TableColumn<>("height");
         TableColumn<Figure, String> a1Column = new TableColumn<>("angle1");
         TableColumn<Figure, String> a2Column = new TableColumn<>("angle2");
         TableColumn<Figure, String> kColumn = new TableColumn<>("kind");
         xColumn.setCellValueFactory(new PropertyValueFactory<Figure, String>("x"));
         datatable.getColumns().addAll(xColumn,yColumn,wColumn,hColumn,a1Column,a2Column,kColumn);

        dataroot.getChildren().addAll(datatable);
        setScene(new Scene(dataroot,0,0));
        show();
    }
}
