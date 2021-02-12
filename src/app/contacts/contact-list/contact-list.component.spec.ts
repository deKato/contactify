import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContactsService } from '../../services/contacts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactListComponent } from './contact-list.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  const testData = [{
    id: 1,
    name: 'TestName',
    surname: 'SurnameTest',
    city: 'TestCity',
    email: 'test@gmail.com',
    phone: '+44 20 7946 0964',
    active: true
  },
  {
    id: 2,
    name: 'TestName 2',
    surname: 'SurnameTest 2',
    city: 'TestCity',
    email: 'test2@gmail.com',
    phone: '+44 20 7946 0965',
    active: false
  },
  {
    id: 3,
    name: 'TestName 4',
    surname: 'SurnameTest 3',
    city: 'TestCity2',
    email: 'test3@gmail.com',
    phone: '+44 20 7946 0966',
    active: true
  },
  {
    id: 4,
    name: 'TestName 3',
    surname: 'SurnameTest 3',
    city: 'TestCity2',
    email: 'test3@gmail.com',
    phone: '+44 20 7946 0966',
    active: true
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContactListComponent,
        ContactDetailsComponent],
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        FontAwesomeModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign values on init', () => {
    const contactsService = TestBed.inject(ContactsService);
    spyOn(contactsService, 'getContacts').and.returnValue(of(testData));
    component.ngOnInit();
    expect(component.contactList).toEqual(testData);
    expect(component.contactListCopy).toEqual(testData);
    expect(component.selectedContact).toEqual(testData[0]);
    expect(component.cities).toEqual(['TestCity', 'TestCity2']);
  });

  it('selecting a row should set selected contact', () => {
    const selectedRow = {
      id: 1,
      name: 'TestName',
      surname: 'SurnameTest',
      city: 'TestCity',
      email: 'test@gmail.com',
      phone: '+44 20 7946 0964',
      active: true
    };

    component.selectRow(selectedRow);
    expect(component.selectedContact).toEqual(testData[0]);
  });

  it('should toggle "active" filter', () => {
    component.toggleActiveCheckbox();
    expect(component.showActiveContactsOnly).toBeTruthy();
    component.toggleActiveCheckbox();
    expect(component.showActiveContactsOnly).toBeFalsy();
  });

  it('should filter table data based on filter input', () => {
    const contactsService = TestBed.inject(ContactsService);
    spyOn(contactsService, 'getContacts').and.returnValue(of(testData));
    component.ngOnInit();
    component.filterTable();
    expect(component.contactList).toEqual(testData);

    component.name = 'TestName';
    component.city = 'TestCity';
    component.showActiveContactsOnly = true;
    component.filterTable();
    expect(component.contactList).toEqual([testData[0]]);

    component.name = '';
    component.city = 'TestCity';
    component.showActiveContactsOnly = false;
    component.filterTable();
    expect(component.contactList).toEqual([testData[0], testData[1]]);

    component.name = '';
    component.city = '';
    component.showActiveContactsOnly = true;
    component.filterTable();
    expect(component.contactList).toEqual([testData[0], testData[2], testData[3]]);
  });

  it('should sort data in the table', () => {
    const contactsService = TestBed.inject(ContactsService);
    spyOn(contactsService, 'getContacts').and.returnValue(of(testData));
    component.ngOnInit();
    const sort = new MatSort();
    sort.active = 'name';
    sort.direction = 'desc';
    component.sortData(sort);
    expect(component.contactList).toEqual([testData[2], testData[3], testData[1], testData[0]]);
    sort.direction = 'asc';
    component.sortData(sort);
    expect(component.contactList).toEqual([testData[0], testData[1], testData[3], testData[2]]);
    sort.active = '';
    component.sortData(sort);
    expect(component.contactList).toEqual([testData[0], testData[1], testData[2], testData[3]]);
    sort.active = 'undefined';
    component.sortData(sort);
    expect(component.contactList).toEqual([testData[0], testData[1], testData[2], testData[3]]);
  });
});
