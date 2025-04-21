import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }

  editContact(id: number) {
    this.router.navigate(['/edit', id]);
  }

  addContact() {
    this.router.navigate(['/add']);
  }
}
