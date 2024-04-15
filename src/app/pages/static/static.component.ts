import {Component, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'app-tables',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
  standalone:true,
})
export class StaticComponent{

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogsComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
