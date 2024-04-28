
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface Message {
  content: string; // Contenu du message
  sender: string; // Nom de l'expéditeur du message
}
@Component({
  selector: 'app-message-dialog',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageDialogComponent {
  

  messageContent: string = ''; // Contenu du message saisi par l'utilisateur
  chatMessages: Message[] = []; // Tableau pour stocker les messages de chat
  showDialog: boolean = true;

  constructor() {
    // Message par défaut affiché dès le chargement de la page
    const defaultMessage: Message = {
      content: 'Bonjour ! ',
      sender: 'AM', // Nom de l'expéditeur par défaut
      //isDefault: true // Indicateur pour le message par défaut
    };
    this.chatMessages.push(defaultMessage);
  }

  sendMessage(): void {
    if (this.messageContent.trim() !== '') { // Vérifie si le message n'est pas vide
      const newMessage: Message = {
        content: this.messageContent,
        sender: 'Moi' // Vous pouvez définir le nom de l'expéditeur comme vous le souhaitez
      };
      this.chatMessages.push(newMessage); // Ajoute le nouveau message à la liste des messages de chat
      this.messageContent = ''; // Réinitialise le contenu de la zone de texte après envoi
    }
  }
  onClose(): void {
    this.showDialog = false; // Masquer le dialogue en affectant false à la variable showDialog
  }
}
