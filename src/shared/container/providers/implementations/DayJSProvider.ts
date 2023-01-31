import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc"
import { IDateProvider } from "../DateProviders/IDateProviders";

dayjs.extend(utc);

class DayJSProvider implements IDateProvider {
    addDays(days: number) {
       return dayjs().add(days, "day").toDate();
    }
   
    dateNow(): Date {
        return dayjs().toDate();
    }
    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(startDate: Date, endDate: Date): number {
        const startDateUTC = this.convertToUTC(startDate);
        const endDateUTC = this.convertToUTC(endDate);
        return dayjs(endDateUTC).diff(startDateUTC, "hours");
    }

    compareInDays(startDate: Date, endDate: Date): number {
        const startDateUTC = this.convertToUTC(startDate);
        const endDateUTC = this.convertToUTC(endDate);
        return dayjs(endDateUTC).diff(startDateUTC, "days");
    }
    
}

export {DayJSProvider}