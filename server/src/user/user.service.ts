import { Injectable } from '@nestjs/common';
import { cancelPrevious } from 'utils-decorators';
import { FindUserDto } from './dto/find-user.dto';
import user_list from './user_list'
import { IUser } from './interfaces/user.interface';
import { sleep } from 'src/helpers/utils';

@Injectable()
export class UserService {
  @cancelPrevious()
  async find(findUserDto: FindUserDto): Promise<IUser[]> {
    await sleep(5000)

    const { email, number } = findUserDto

    return user_list.filter(user => {

      const {
        email: userEmail,
        number: userNumber,
      } = user

      if (number) {
        return email === userEmail && number === userNumber
      }

      return email === userEmail
    })
  }
}
