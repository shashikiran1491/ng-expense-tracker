export class DateUtils {

    static getMonthDateRange(month: number, year: number) {
        const start = new Date(year, month - 1, 1);
        const today = new Date();

        const end = (year === today.getFullYear() && month === today.getMonth() + 1)
            ? today
            : new Date(year, month, 0);


        const format = (d: Date) => d.toLocaleDateString('en-CA');
        return {
            startDate: format(start),
            endDate: format(end)
        };
    }
}
