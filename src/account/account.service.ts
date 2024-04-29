import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Category } from 'src/database/models/category.model';
import { Company } from 'src/database/models/company.model';
import { Post } from 'src/database/models/post.model';
import { Tag } from 'src/database/models/tag.model';
import { User } from 'src/database/models/user.model';
import createToken from 'src/common/utils/createToken';
import passwordHash from 'src/common/utils/passwordHash';

import {
  AdminLoginRequestDTO,
  LoginRequestDTO,
} from './dtos/account.request.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
    @InjectModel(Company)
    private readonly companyModel: typeof Company,
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async login(body: LoginRequestDTO) {
    const { userId, loginType } = body;

    const username = `${loginType}_${userId}`;
    const existUser = await this.userModel.findOne({
      where: { username },
    });
    if (!existUser) {
      // 회원가입
      await this.userModel.create({ username, loginType });
    }

    const tokens = createToken({ username });
    return tokens;
  }

  async adminLogin(body: AdminLoginRequestDTO) {
    const { username, password } = body;
    const hashPassword = passwordHash(password);
    const existUser = await this.userModel.findOne({
      where: { username, password: hashPassword },
    });
    if (!existUser) {
      // 회원가입
      throw new Error('계정 or 비밀번호가 일치하지 않습니다.');
    }
    const tokens = createToken({ username });
    return tokens;
  }
}
