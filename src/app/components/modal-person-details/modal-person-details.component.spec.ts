import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPersonDetailsComponent } from './modal-person-details.component';

describe('ModalPersonDetailsComponent', () => {
  let component: ModalPersonDetailsComponent;
  let fixture: ComponentFixture<ModalPersonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPersonDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPersonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
