import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Contact } from '../models/contact';

import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ContactsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetch data method should work', () => {
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
    }];

    service.getContacts().subscribe((response: Contact[]) => {
      expect(response).toEqual(testData);
    });

    const req = httpMock.expectOne({ method: 'GET', url: 'assets/contacts.json' });
    req.flush(testData);
  });
});
