import {
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { AuditLogsService } from './auditLogs.service';
import {
  PaginationParameters,
  PaginationPipe,
} from '@common/utils/pipes/query/pagination.pipe';
import { FilterPipe } from '@common/utils/pipes/query/filter.pipe';
import {
  Ctx,
  RequiredPermission,
} from '@common/utils/authentication/auth.decorator';
import { PERMISSIONS } from '@permissions/types';
import { AuditLogFilters } from '@auditLogs/auditLogs.filter';
import { RequestContext } from '@common/utils/request/request-context';

@Controller('audit-trail')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  @RequiredPermission(PERMISSIONS.LIST_AUDIT_LOGS)
  getLogs(
    @Ctx() ctx: RequestContext,
    @Query(PaginationPipe) pagination: PaginationParameters,
    @Query(new FilterPipe(AuditLogFilters.getLogs))
    filters: any,
  ) {
    return this.auditLogsService.getLogs(ctx, pagination, filters);
  }

  @Get('types')
  @SerializeOptions({
    strategy: 'exposeAll',
  })
  @RequiredPermission(PERMISSIONS.LIST_AUDIT_LOGS)
  getAuditLogTypes(@Ctx() ctx: RequestContext) {
    return this.auditLogsService.getAuditLogTypes(ctx);
  }

  @Get(':id')
  @RequiredPermission(PERMISSIONS.VIEW_AUDIT_LOG)
  getLogById(@Ctx() ctx: RequestContext, @Param('id') logId: string) {
    return this.auditLogsService.getSingleLog(ctx, logId);
  }
}
