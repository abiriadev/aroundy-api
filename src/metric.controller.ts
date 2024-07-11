import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { PrometheusController } from '@willsoto/nestjs-prometheus';

@Controller()
@ApiExcludeController()
export class MetricController extends PrometheusController {}
