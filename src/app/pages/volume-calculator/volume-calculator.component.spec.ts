import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeCalculatorComponent } from './volume-calculator.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonListService } from 'src/app/services/person-list.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VolumeCalculatorComponent', () => {
  let component: VolumeCalculatorComponent;
  let fixture: ComponentFixture<VolumeCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [VolumeCalculatorComponent],
      providers: [PersonListService],
    });
    fixture = TestBed.createComponent(VolumeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should calculate the volume', () => {
    const radius = 5;
    const expectedVolume: number = Math.floor(
      (4 / 3) * Math.PI * Math.pow(radius, 3)
    );
    const calculatedVolume: number = Math.floor(component.getVolume(radius));
    expect(calculatedVolume).toBe(expectedVolume);
  });
});
