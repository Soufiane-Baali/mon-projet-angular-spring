import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  contactId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    this.contactId = this.route.snapshot.params['id'];
    if (this.contactId) {
      this.isEditMode = true;
      this.contactService.getContact(this.contactId).subscribe((contact) => {
        this.contactForm.patchValue(contact);
      });
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    const contactData: Contact = this.contactForm.value;

    if (this.isEditMode && this.contactId) {
      contactData.id = this.contactId;
      this.contactService.updateContact(contactData).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    } else {
      this.contactService.addContact(contactData).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    }
  }
}
