import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInfo } from './file-info';

describe('FileInfo', () => {
  let component: FileInfo;
  let fixture: ComponentFixture<FileInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
