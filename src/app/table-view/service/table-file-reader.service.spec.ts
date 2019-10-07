import { TestBed } from '@angular/core/testing';

import { TableFileReaderService } from './table-file-reader.service';

describe('TableFileReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableFileReaderService = TestBed.get(TableFileReaderService);
    expect(service).toBeTruthy();
  });
});
