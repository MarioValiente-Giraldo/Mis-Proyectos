import createBooking from "./helpers/booking";

export default async function createApp() {
    const app = document.getElementById("app"); 
    const booking =  await createBooking();
    app.appendChild(booking);
}
