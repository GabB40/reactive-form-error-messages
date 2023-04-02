import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormErrorMessagesComponent } from './reactive-form-error-messages.component';

describe('ReactiveFormErrorMessagesComponent', () => {
  let component: ReactiveFormErrorMessagesComponent;
  let fixture: ComponentFixture<ReactiveFormErrorMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormErrorMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
