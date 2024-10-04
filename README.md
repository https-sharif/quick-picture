# Quick Picture ⚡️ 🎨

## Description

Welcome to the **Quick Picture**, an image browser! This web application lets you dive into a sea of stunning images from Unsplash using various prompts. It's like a treasure hunt for visuals (but without the pirates... unless you want them! 🏴‍☠️).

<br><div align="center">
    <img src="./src/assets/very%20confidential%20folder%20(do%20not%20open)/meme1.png" style="border: 2px solid white;" width="400px" alt="Meme 1">
</div><br>

## Why and How I Created It

I built this app to mix coding with beautiful images. It has an easy-to-use interface that lets you explore and find great pictures while I improve my skills in React, API integration, and user experience. As I built the app over the course of a week, I got more and more ideas, which led me to create this final version. Just a heads up: this app took away my sanity, but I’m relieved to say it’s finally done!

<br><div align="center">
    <img src="./src/assets/very%20confidential%20folder%20(do%20not%20open)/meme2.png" style="border: 2px solid white;" width="400px" alt="Meme 2">
</div><br>

### How It Works

The app uses the Unsplash API to fetch images based on user input. You can search by keyword, get random images, or even stalk a photographer’s portfolio (just kidding... kind of!). It preloads images for a smoother experience, because who likes waiting? Yeah, not me either! 🚀

<br><div align="center">
    <img src="./src/assets/very%20confidential%20folder%20(do%20not%20open)/meme3.png" style="border: 2px solid white;" width="400px" alt="Meme 3">
</div><br>

I’ve also added small UI/UX enhancements for an even smoother user experience. Plus, I've made it accessible for keyboard navigation! You can explore the app using only your keyboard, although some features will still require mouse events. Overall, you’ll find it to be a seamless experience! 👌🏻

## Technologies/Languages/Libraries Used

- **React**: Perfect for building reusable UI components without losing my mind.
- **TypeScript**: Adds type safety, so my code behaves itself.
- **Tailwind CSS**: Makes styling super easy—no more boring custom CSS!
- **Vite**: Fast development that keeps me in the zone.

<br><div align="center">
    <img src="./src/assets/very%20confidential%20folder%20(do%20not%20open)/meme4.png" style="border: 2px solid white;" width="400px" alt="Meme 4">
</div><br>

## File Structure

Here's a quick look at the project structure:

```
src
 ├── assets
 │   ├── download.png
 │   └── favicon.png
 ├── App.tsx
 ├── Button.tsx
 ├── Form.tsx
 ├── Images.tsx
 ├── index.css
 ├── index.tsx
 └── Users.tsx
.gitignore
index.html
package.json
tailwind.config.js
vite.config.ts
```

Notice I didn’t include the .env file? That's intentional! 😏 You’ll need to create your own to get things up and running. 😉

## Demo

Check out the live demo of the app here: [Quick Picture](https://sharif-islam96403.github.io/quick-picture/).

<br><div align="center">
    <img src="./src/assets/very%20confidential%20folder%20(do%20not%20open)/meme5.gif" style="border: 2px solid white;" width="400px" alt="Meme 5">
</div><br>

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/sharif-islam96403/quick-picture.git
   ```
2. Navigate to the project directory:
   ```bash
   cd quick-picture/
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your Unsplash API url and keys:
   ```
   VITE_UNSPLASH_API_URL=https://api.unsplash.com
   VITE_UNSPLASH_ACCESS_KEY=your_access_key
   VITE_UNSPLASH_SECRET_KEY=your_secret_key
   ```
   - To get these keys, sign up at [Unsplash Developers](https://unsplash.com/developers), create a new app, and grab the **Access Key** and **Secret Key** from your dashboard.
5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and go to `http://localhost:3000` (or whatever port your terminal says). Time to see my hard work in action!

7. **Start exploring the images!** 🎉

<br><div align="center">
    <img src="./src/assets/very%20confidential%20folder%20(do%20not%20open)/meme7.png" style="border: 2px solid white;" width="400px" alt="Meme 7">
</div><br>

## License

This project is licensed under the MIT [License](./LICENSE). Use it, modify it, share it—whatever floats your boat!

## Contributions

I’m all ears for contributions! If you have cool ideas, suggestions, or improvements, feel free to create a pull request or open an issue. Let’s make this app even more epic together! 🚀

<br><div align="center">
    <img src="./src/assets/very%20confidential%20folder%20(do%20not%20open)/meme6.png" style="border: 2px solid white;" width="400px" alt="Meme 6">
</div><br>

---

### P.S. Sorry if I went a bit overboard with the memes — couldn't resist throwing in a bit of fun! 