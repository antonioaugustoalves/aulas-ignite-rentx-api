interface ICreateUserTokenDTO {
    userId: string;
    
    refreshToken: string;
    
    expirationDate: Date;

}

export { ICreateUserTokenDTO }