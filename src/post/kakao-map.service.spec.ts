import { Test, TestingModule } from '@nestjs/testing';
import { KakaoMapService } from './kakao-map.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@/config/config.module';
import { Coordinate } from './coordinate.dto';

describe('KakaoMapService', () => {
  let service: KakaoMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [KakaoMapService],
    }).compile();

    service = module.get<KakaoMapService>(KakaoMapService);
  });

  it('should find address from the coordinate', async () => {
    const p1: Coordinate = [37.51264278891025, 127.10246789395465]; // 롯데월드타워 <-> 서울특별시 송파구 올림픽로 300
    const p2: Coordinate = [35.86919238091584, 128.5924288991289]; // 스타벅스 대구종로고택점 <-> 대구 중구 남일동 129-5
    const p3: Coordinate = [37.63057678520386, 126.79590550302485]; // 메르세데스 벤츠 내곡 서비스센터 <-> 경기 고양시 덕양구 내곡동 488-14

    const r1 = await service.coordinateToAddress(p1);
    expect(r1).toHaveProperty('address1', '서울');
    expect(r1).toHaveProperty('address2', '송파구');

    const r2 = await service.coordinateToAddress(p2);
    expect(r2).toHaveProperty('address1', '대구');
    expect(r2).toHaveProperty('address2', '중구');

    const r3 = await service.coordinateToAddress(p3);
    expect(r3).toHaveProperty('address1', '경기');
    expect(r3).toHaveProperty('address2', '고양시 덕양구'); // NOTE: 지역 단위는 단순히 공백으로 나뉘어지지 않음에 주의!
  });

  it('should not lookup address outside mainland', async () => {
    const p1: Coordinate = [33.97895214870182, 126.83087576928808]; // 남해 바다속 어딘가
    const p2: Coordinate = [31.579813302026533, 130.52791364547292]; // 일본 가고시마현

    expect(await service.coordinateToAddress(p1)).toBeNull();
    expect(await service.coordinateToAddress(p2)).toBeNull();
  });
});
