import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDetailsDto } from './dto/update-company-details.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { IValidationPipe } from '@common/utils/pipes/validation/validation.pipe';
import {
  PaginationParameters,
  PaginationPipe,
} from '@common/utils/pipes/query/pagination.pipe';
import { CompanyFilters } from './company.filter';
import { FilterPipe } from '@common/utils/pipes/query/filter.pipe';
import { RequiredPermission } from '@common/utils/authentication/auth.decorator';
import { PERMISSIONS } from '@permissions/types';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Patch('company/kyb')
  @RequiredPermission(PERMISSIONS.UPDATE_COMPANY_KYB_DETAILS)
  @UseInterceptors(AnyFilesInterceptor({}))
  updateCompanyKybDetails(
    @Body(IValidationPipe) data: UpdateCompanyDetailsDto,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    return this.companyService.updateCompanyKybDetails(data, files);
  }

  @Get('company/me')
  getCompanyDetails() {
    return this.companyService.getCompanyDetails();
  }

  @Get('companies')
  @RequiredPermission(PERMISSIONS.LIST_COMPANIES)
  listCompanies(
    @Query(PaginationPipe) pagination: PaginationParameters,
    @Query(new FilterPipe(CompanyFilters.getCompanies))
    filters: any,
  ) {
    return this.companyService.listCompanies(pagination, filters);
  }

  @Get('companies/:id')
  @RequiredPermission(PERMISSIONS.LIST_COMPANIES)
  getCompanyDetailsById(@Param('id') companyId: string) {
    return this.companyService.getCompanyDetails(companyId);
  }
}
