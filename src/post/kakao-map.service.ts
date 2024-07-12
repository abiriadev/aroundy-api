import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@/config/config.service';
import { Coordinate } from './coordinate.dto';

// NOTE: https://developers.kakao.com/docs/latest/ko/local/dev-guide#coord-to-address

export interface Address {
  /** 1차 지역명 */
  address1: string;

  /** 2차 지역명 */
  address2: string;
}

export interface KakaoRoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: 'Y' | 'N';
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
}

export interface KakaoAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  mountain_yn: 'Y' | 'N';
  main_address_no: string;
  sub_address_no: string;
  zip_code: string;
}

export interface KakaoMapResponse {
  meta: {
    total_count: number;
  };
  documents: Array<{
    road_address: KakaoRoadAddress | null;
    address: KakaoAddress | null;
  }>;
}

@Injectable()
export class KakaoMapService {
  private static ENDPOINT = `https://dapi.kakao.com/v2/local/geo/coord2address`;

  constructor(
    private readonly httpService: HttpService,
    private readonly kakaoApiConfigService: ConfigService.KakaoApi,
  ) {}

  async coordinateToAddress(coordinate: Coordinate): Promise<Address | null> {
    const [y, x] = coordinate;

    const res = await firstValueFrom(
      this.httpService.get<KakaoMapResponse>(KakaoMapService.ENDPOINT, {
        headers: {
          Authorization: `KakaoAK ${this.kakaoApiConfigService.kakaoApiKey}`,
        },
        params: {
          x,
          y,
        },
      }),
    );

    if (res.data.documents.length === 0) return null;

    const [{ road_address, address }] = res.data.documents;
    if (!(road_address ?? address)) return null;

    const { region_1depth_name, region_2depth_name } = (road_address ??
      address) as KakaoRoadAddress | KakaoAddress;

    return {
      address1: region_1depth_name,
      address2: region_2depth_name,
    };
  }
}
