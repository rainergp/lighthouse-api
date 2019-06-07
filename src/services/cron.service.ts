import {CronJob} from 'cron';

export default class CronService {
    public static setCronJob(config, job) {
        new CronJob(config, job, null, true, 'UTC', this);
    }
}
