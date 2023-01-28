interface IRentalDTO {
    userId: string;
    carId: string;
    expectedReturnDate: Date;
    id?: string;
    endDate?: Date;
    total?: number;
}

export {IRentalDTO}