import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-share-dialog',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareDialogComponent {
  searchTerm = '';
  recentlySharedEntities = [{ name: 'Entity1' }, { name: 'Entity2' }];
  constructor(public dialogRef: MatDialogRef<ShareDialogComponent>) { }


  closeDialog() {
    this.dialogRef.close();
  }

  submit(term: string) {
    console.log('Submitted term:', term);
  }
  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }


}
