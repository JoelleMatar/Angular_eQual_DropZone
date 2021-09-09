import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Inject, Input, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDeleteComponent } from './dialogDelete/dialog-delete.component';
import { EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    title = 'angular-dropzone';

    columns = ["Image Name", "Type", "viewImg", "action"];
    index = ["name", "type", "viewImg", "action"];

    // @ViewChild(MatPaginator) paginator = MatPaginator;

    // ngAfterViewInit() {
    //   this.dataSource.paginator = this.paginator;
    // }

    // openDialog() {
    //     this.dialog.open(DialogElementsExampleDialog);
    //   }

    currentDoc = 'Television';

    docs: any[] = [];
    files: any[] = this.docs;

    loading = false;
    removeFromDZ = false;
    renameFile = false;
    fileName = true;
    hideFile = false;
    uploadFail = false;

    name: string = '';

    chosenRow: any;
    value: string = '';
    ele: string = '';


    dataSource: any[] = [];

    public array: any;
    public displayedColumns = ['', '', '', '', ''];

    public pageSize = 10;
    public currentPage = 0;
    public totalSize = 0;



    constructor(private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog, public translate: TranslateService) {
        translate.addLangs(['en', 'fr']);
        translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit() {
        this.load();
    }

    public pageSlice = this.files.slice(0, 5);



    public async onSelect(event: { addedFiles: any; }) {
        console.log("event", event.addedFiles);

        let file = event.addedFiles;
        this.loading = true;



        for (var i = 0; i < file.length; i++) {
            const data = await this.readFile(file[i]);
            try {
                const response = await this.api.create("core\\Image", {
                    name: file[i].name,
                    type: file[i].type,
                    data: data
                });

                file.id = response.id;

                console.log("type", file[i].type);

                this.files.push(file[i]);
                this.onRemove(file[i]);
                this.load();

            }
            catch (response: any) {
                console.warn('some changes could not be stored', response);
                let error: string = 'unknonw';
                if (response && response.hasOwnProperty('error') && response['error'].hasOwnProperty('errors')) {
                    let errors = response['error']['errors'];
                    if (errors.hasOwnProperty('INVALID_PARAM')) {
                        error = 'invalid_param';
                    }
                    else if (errors.hasOwnProperty('NOT_ALLOWED')) {
                        error = 'not_allowed';
                    }
                    else if (errors.hasOwnProperty('CONFLICT_OBJECT')) {
                        error = 'conflict_object';
                    }
                }
                switch (error) {
                    case 'not_allowed':
                        this._snackBar.open("Erreur - Vous n'avez pas les autorisations pour cette opération.", "Error", {
                            duration: 6000
                        });
                        break;
                    case 'conflict_object':
                        this._snackBar.open("Erreur - Cette réservation a été modifiée par un autre utilisateur.", "Error", {
                            duration: 6000
                        });
                        break;
                    case 'unknonw':
                    case 'invalid_param':
                    default:
                        this._snackBar.open("Erreur - certains changements n'ont pas pu être enregistrés.", "Error", {
                            duration: 6000
                        });
                }
            }
        }
        this.loading = false;
    }


    onRemove(file: File) {
        this.files.splice(this.files.indexOf(file), 1);
    }

    OnPageChange(event: PageEvent) {
        console.log(event);

        const startIndex = event.pageIndex * event.pageSize;
        let endIndex = startIndex + event.pageSize;
        if (endIndex > this.files.length) {
            endIndex = this.files.length;
        }
        this.pageSlice = this.files.slice(startIndex, endIndex);

        console.log(this.pageSlice);

        this.load(event.pageSize);
    }

    async load(currLength = 5) {
        try {
            this.files = await this.api.fetch("/images", { fields: ['name', 'hash', 'type'] });

            var maxLength = 0;

            if (currLength > this.files.length) {
                maxLength = this.files.length;
            }
            else {
                maxLength = currLength;
            }

            console.log("files dta", this.files);



            for (var i = 0; i < this.files.length; i++) {
                const fileType = this.files[i].type;

                switch (fileType) {
                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        this.files[i].type = "xlsx";
                        break;
                    case "application/octet-stream":
                        this.files[i].type = "xls";
                        break;
                    case "text/plain":
                        this.files[i].type = "txt";
                        break;
                    case "application/postscript":
                        this.files[i].type = "ai";
                        break;
                    case "image/gif":
                        this.files[i].type = "gif";
                        break;
                    case "image/jpeg":
                        this.files[i].type = "jpeg";
                        break;
                    case "text/html":
                        this.files[i].type = "html";
                        break;
                    case "video/mpeg":
                        this.files[i].type = "mpeg";
                        break;
                    case "audio/x-wav":
                        this.files[i].type = "wav";
                        break;
                    case "audio/x-aiff":
                        this.files[i].type = "aif";
                        break;
                    case "mage/tiff ":
                        this.files[i].type = "tiff";
                        break;
                    case "image/png":
                        this.files[i].type = "png";
                        break;
                }

            }
            this.dataSource = this.files.slice(0, maxLength);

            console.log("fetch response", this.files);
        }
        catch (err) {
            console.log("err fetch", err);
        }
    }

    // public async onDelete(file: any) {
    //     try {
    //         // permanent deletion
    //         await this.api.remove("core\\Image", [file.id], true);

    //         let index = this.files.findIndex((f: any) => f.id == file.id);
    //         this.files.splice(index, 1);

    //         // this.dialog.open(DialogDeleteComponent);

    //         this.load();
    //     }
    //     catch (err) {
    //         console.log("err delete", err);
    //     }
    // }

    public async onDelete(file: any) {
        try {
            let index = this.files.findIndex((f: any) => f.id == file.id);

            this.dialog.open(DialogContentExampleDialog, { data: { index: index, files: this.files, fileId: file.id, load: this.load } });
        }
        catch (err) {
            console.log("err delete", err);
        }
    }




    private readFile(file: any) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            let blob = new Blob([file], { type: file.type });
            reader.onload = () => {
                console.log(reader.result)
                resolve(reader.result);
            }
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    async addInput(file: any) {

        console.log("file name", file);

        const response = await this.api.read("core\\Image", [file], ['name']);

        if (response) {
            console.log("okkk", response[0].name);
            this.value = response[0].name;
            console.log("okkks", this.value);
        }

        this.renameFile = true;
        this.fileName = false;
        this.hideFile = true;
        this.chosenRow = file;
    }

    async rename(file: any) {
        this.renameFile = true;
        this.hideFile = true;
        console.log("name", file.name);

        console.log("fileee", file);
        try {
            const response = await this.api.update("core\\Image", [file.id], { name: this.value }, true);

            if (response) {

                this.renameFile = false;
                console.log("update success");
                this.fileName = true;
                this.load();
                this.hideFile = false;
            }
        }
        catch (err) {
            console.log("err update", err);
        }

    }
}



@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: './dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {

    constructor(
        private api: ApiService,
        public translate: TranslateService,
        public dialogRef: MatDialogRef<DialogContentExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: { index: number, files: any[], fileId: number, load: EventEmitter<Number> }) {
        translate.addLangs(['en', 'fr']);
        translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public async onDelete() {
        console.log("data", this.data);
        try {
            // permanent deletion
            await this.api.remove("core\\Image", [this.data.fileId], true).then(result => {
                console.log("file to delete", this.data.index);

                this.data.files.splice(this.data.index, 1);
                this.onNoClick();
                // this.data.load.emit(5);
            });
        }
        catch (err) {
            console.log("err delete", err);
        }
    }


}