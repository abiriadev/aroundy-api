import { Test, TestingModule } from '@nestjs/testing';
import { KakaoMapService } from './kakao-map.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from 'src/config/config.module';
import { Coordinate } from './post.dto';

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
    const p1: Coordinate = [37.51264278891025, 127.10246789395465]; // 롯데월드타워
    const p2: Coordinate = [35.86919238091584, 128.5924288991289]; // 스타벅스 대구종로고택점
    const p3: Coordinate = [37.63057678520386, 126.79590550302485]; // 메르세데스 벤츠 내곡 서비스센터

    expect(await service.coordinateToAddress(p1)).toHaveProperty(
      'address',
      '서울특별시 송파구 올림픽로 300',
    );

    expect(await service.coordinateToAddress(p2)).toHaveProperty(
      'address',
      '대구 중구 남일동 129-5',
    );

    expect(await service.coordinateToAddress(p3)).toHaveProperty(
      'address',
      '경기 고양시 덕양구 내곡동 488-14',
    );
  });

  it('should not lookup address outside mainland', async () => {
    const p1: Coordinate = [33.97895214870182, 126.83087576928808]; // 남해 바다속 어딘가
    const p2: Coordinate = [31.579813302026533, 130.52791364547292]; // 일본 가고시마현

    expect(await service.coordinateToAddress(p1)).toBeNull();
    expect(await service.coordinateToAddress(p2)).toBeNull();
  });
});
