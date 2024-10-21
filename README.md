# Comprehensive README for Deploying on Netlify

## Project Overview

<iframe src="https://gamma.app/embed/2o2f73j2t34kcew" style="width: 700px; max-width: 100%; height: 450px" allow="fullscreen" title="Land Ownership Transparency in Africa"></iframe>

This is a **Next.js** project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It leverages the power of React and server-side rendering for building web applications.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/I-Macharia/ArdhiOnChainProd.git
   cd ArdhiOnChainProd

2. **Install Dependencies**

Depending on your package manager of choice, run one of the following commands:

npm install
#### or
yarn install
#### or
pnpm install
#### or
bun install

3. **Run the Development Server**

Start the development server with:

npm run dev
#### or
yarn dev
#### or
pnpm dev
#### or
bun dev

4. View in Browser 

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Editing the Application 
You can start editing the application by modifying the file located at `app/page.js`. The page will auto-update as you make changes.

## Font Optimization 
This project utilizes `next/font` to automatically optimize and load the **Inter** font, which is a custom Google Font.

## Learn More
To deepen your understanding of Next.js, consider the following resources:

- **[Next.js Documentation](https://nextjs.org/docs)** - Explore features and API details.
- **[Learn Next.js](https://nextjs.org/learn)** - Engage with an interactive Next.js tutorial.
- **[Next.js GitHub Repository](https://github.com/vercel/next.js)** - Your feedback and contributions are welcome!

## Deploying on Netlify 
To deploy your Next.js app on Netlify, follow these steps:

### 1. Create a Netlify Account
Sign up at [Netlify](https://www.netlify.com/) if you don’t have an account.

### 2. Connect Your Repository
After logging in, click on **New site from Git**.
- Choose your Git provider (e.g., GitHub) and authorize Netlify to access your repositories.
- Select the repository you cloned earlier.

### 3. Set Build Settings
In the build settings, set the following:
- **Branch to deploy**: `main` (or the branch you want to deploy)
- **Build command**: `npm run build`
- **Publish directory**: `out` (if using static export) or `.next` (for server-side rendering)

### 4. Deploy the Site 
Click on **Deploy site**. Netlify will build your site and deploy it.

### 5. Configure Domain (Optional)
You can set a custom domain or use the default Netlify domain provided.

## Conclusion 
Congratulations! You have successfully set up and deployed your Next.js application on Netlify. For further customization and features, refer to the Next.js and Netlify documentation.

