import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsucessComponent } from './paymentsucess.component';

describe('PaymentsucessComponent', () => {
  let component: PaymentsucessComponent;
  let fixture: ComponentFixture<PaymentsucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsucessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
