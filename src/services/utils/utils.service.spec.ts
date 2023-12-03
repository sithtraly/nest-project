import { Test, TestingModule } from '@nestjs/testing';
import { Utils } from './utils.service';

describe('UtilsService', () => {
  let service: Utils;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Utils],
    }).compile();

    service = module.get<Utils>(Utils);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
