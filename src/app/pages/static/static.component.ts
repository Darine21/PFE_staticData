import {Component, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'app-tables',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
  standalone:true,
})
export class StaticComponent{

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
