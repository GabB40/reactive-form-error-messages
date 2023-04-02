import { TestBed } from '@angular/core/testing';

import { ReactiveFormErrorMessagesService } from './reactive-form-error-messages.service';

describe('ReactiveFormErrorMessagesService', () => {
  let service: ReactiveFormErrorMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveFormErrorMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
