import cron from 'node-cron';
import moment from 'moment';
import BookingModel from './models/BookingModel.js';
import { sendNotificationEmail } from './utils.js';

export const startBookingScheduler = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const notificationTime = moment().add(30, 'minutes');
      const upcomingBookings = await BookingModel.find({
        status: 'booked',
        date: {
          $lte: notificationTime.toDate(), // Convert moment object to Date
        },
      }).populate('userId providerId');

      for (const booking of upcomingBookings) {
        const bookingDateTime = moment(`${booking.date} ${booking.time}`, 'YYYY-MM-DD HH:mm:ss');
        const timeDifference = bookingDateTime.diff(notificationTime, 'minutes');

        if (timeDifference === 0) {
          await sendNotificationEmail(booking.userInfo.email, booking.providerInfo.email, booking);
        }
      }
    } catch (error) {
      console.error('Error occurred in booking scheduler:', error);
    }
  });
};
