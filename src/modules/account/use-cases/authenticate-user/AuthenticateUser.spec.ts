
import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/in-memory/UserRepositoryInMemory";

import { CreateUserUseCase } from "../create-user/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUser: AuthenticateUserUseCase;
let createuser: CreateUserUseCase;
let usersRepository: UsersRepositoryInMemory;

describe("Authenticate user", () => {

    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        createuser = new CreateUserUseCase(usersRepository);
        authenticateUser = new AuthenticateUserUseCase(usersRepository);
    });

    it("Should be able to create a token", async () => {
        const user: ICreateUserDTO = {
            name: "Jonnhy Dig Dug",
            email: "jonnhy@rentx.com",
            password: "1234",
            driverLicense: "1234.1234-000"
        }

        await createuser.execute(user);

        const result = await authenticateUser.execute({
            email: user.email,
            password: user.password
        });
        expect(result).toHaveProperty("token");
    });


    it("Should not be able to authenticate a nonexistent user", async () => {
        expect(async () =>{
            await authenticateUser.execute({
                email: "hacker@google.com",
                password: "batman"
            });
        }).rejects.toBeInstanceOf(AppError);
    });


    it("Should be able to authenticate an user with incorrect password", async()=>{
        expect(async () =>{
            const user: ICreateUserDTO = {
                name: "Jonnhy Dig Dug",
                email: "user@rentx.com",
                password: "1234",
                driverLicense: "1234.1234-000"
            }
    
            await createuser.execute(user);
            await authenticateUser.execute({
                email: user.email,
                password: "Iam_Batman"
            });
        }).rejects.toBeInstanceOf(AppError)
    });
})