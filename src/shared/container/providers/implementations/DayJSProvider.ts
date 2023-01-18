import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import { IDateProvider } from "../DateProviders/IDateProviders";

dayjs.extend(utc);

class DayJSProvider implements IDateProvider {
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
    
}

export {DayJSProvider}