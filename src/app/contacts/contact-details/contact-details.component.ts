import { Component, Input } from '@angular/core';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {

  @Input() contact: Contact = {} as Contact;
}
