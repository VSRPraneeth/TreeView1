import { Component, enableProdMode } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { DataService } from './service/data.service';

/**
 * Tree data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface TreeNode {
  name: string;
  children?: TreeNode[];
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TreeView';

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  chield : any;
  values: string[];
  TREE_DATA: TreeNode[];
  selectdNodeName :String;
  
  constructor(private dataservice: DataService) {
    this.dataservice.getJSON().subscribe(data => {
      console.log(data);
      this.TREE_DATA = data;
      this.dataSource.data = this.TREE_DATA;
    });
    //this.dataSource.data = this.TREE_DATA;
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  logNode(node){
    this.selectdNodeName = node.name;
    this.values=node.children;
    console.log(this.values);
  }
}
enableProdMode();
