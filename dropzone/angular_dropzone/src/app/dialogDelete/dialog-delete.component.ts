import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/api/api.service';

@Component({
    selector: 'app-dialog-root',
    templateUrl: './dialog-delete.component.html'
})
export class DialogDeleteComponent implements OnInit {
    constructor(private api: ApiService) {}


    ngOnInit() {
        
    }

    async onDeleteDoc() {
      console.log("hi");

    //   doc = this.doc;

    //   await this.api.remove("core\\Image", [doc.id], true);

    //         let index = this.doc.findIndex((f: any) => f.id == file.id);
    //         this.files.splice(index, 1);
    }

}
