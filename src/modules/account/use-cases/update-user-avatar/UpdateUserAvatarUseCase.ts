import { inject, injectable } from "tsyringe";
import { deleteFile } from "@utils/Files";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

interface IRequest {
    userId: string;
    avatarFile: string;
}
@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository") 
        private usersRepository: IUsersRepository
    ){}
    
    async execute({userId, avatarFile}: IRequest): Promise<void>{
        const user = await this.usersRepository.findById(userId);
        if(user.avatarUrl){
            await deleteFile(`./tmp/avatar/${user.avatarUrl}`);
        }

       
        user.avatarUrl = avatarFile;
        await this.usersRepository.create(user);
    }
}

export {UpdateUserAvatarUseCase}