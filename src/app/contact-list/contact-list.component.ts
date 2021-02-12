import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Contact } from '../models/contact';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  constructor(private readonly contactsService: ContactsService) { }
  contactList: Contact[] = [];
  contactListCopy: Contact[] = [];
  selectedContact: Contact = {} as Contact;
  displayedColumns = ['active', 'name', 'surname', 'city', 'email', 'phone', 'actions'];
  cities: string[] = [];
  checked = true;
  name = '';
  city = '';
  active: boolean | undefined;

  ngOnInit(): void {
    this.getContactsFromService();
  }

  private getContactsFromService(): void {
    this.contactsService.getContacts().subscribe((contactListResponse: Contact[]) => {
      this.contactList = contactListResponse;
      this.contactListCopy = Object.assign(contactListResponse);
      this.selectedContact = contactListResponse[0];
      this.cities = [...new Set(contactListResponse.map(item => item.city))];
    });
  }

  selectRow(row: Contact): void {
    this.selectedContact = row;
  }

  filterTable(): void {
    this.contactList = this.contactListCopy.filter((entry: Contact) => {
      return (this.name ? entry.name.toLowerCase() === this.name.toLowerCase() : true) &&
      (this.city ? entry.city.toLowerCase() === this.city.toLowerCase() : true) &&
      (this.active ? entry.active === true : true);
    });
  }

  toggleActiveCheckbox(): void {
    this.active = !this.active;
  }

  sortData(sort: Sort): void {
    const data = this.contactListCopy.slice();
    if (!sort.active || sort.direction === '') {
      this.contactList = data;
      return;
    }

    this.contactList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
