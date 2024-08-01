## Author: Adil Rasheed
### **Pantry Tracker Application**

#### **Overview**
The Pantry Tracker is a web-based application designed to help users manage their pantry items efficiently. It allows users to add, update, and delete pantry items, search for specific items, and view detailed information about each item. Additionally, the application suggests recipes based on the pantry items and provides an option to view item details with image classifications.

#### **Core Features**

1. **Add New Item**:
   - Users can add new items to their pantry by providing a name and optionally uploading an image.
   - If an image is uploaded, it is classified using image classification APIs.

2. **Delete Item**:
   - Users can delete items from their pantry, which updates the list and any associated recipe suggestions.

3. **Search Items**:
   - A search functionality is provided to filter pantry items based on their names.

4. **View Details**:
   - Users can view detailed information about an item, including its image (if available) and classifications.

5. **Recipe Suggestions**:
   - Based on the items in the pantry, the application fetches and displays suggested recipes.

#### **Technologies Used**

1. **Frontend**:
   - **React**: Used for building the user interface components and managing state.
   - **Material UI**: Provides pre-designed UI components for a consistent and responsive design.
   - **Next.js**: Serves as the React framework for server-side rendering and static site generation.

2. **Backend**:
   - **Firebase**: Provides backend services such as authentication, Firestore for database, and Firebase Storage for image uploads.

3. **Image Classification and Recipe APIs**:
   - **Clarifai API**: Used for classifying images uploaded by users.
   - **GCP Vertex AI**: Can be integrated for advanced image classification and AutoML functionalities.
   - **OpenAI API or OpenRouter API**: Used for generating recipe suggestions based on the items in the pantry.

4. **Deployment**:
   - **Vercel**: Used for deploying the Next.js application for production.

#### **Advanced Features**

1. **Image Classification**:
   - Images uploaded with pantry items are analyzed and classified using the Clarifai API or GCP Vertex AI.
   - Classifications are displayed as part of the item's details.

2. **Recipe Suggestions**:
   - The application queries a recipe service (e.g., OpenAI API) to fetch recipes that use the ingredients available in the pantry.
   - Recipes are displayed with images, titles, descriptions, and links to view the full recipe.

3. **Responsive Design**:
   - The application uses Material UI for a responsive design that adapts to different screen sizes.

4. **Modal Dialogs**:
   - A modal dialog is used to display detailed information about selected pantry items, including image classifications and other relevant details.

5. **File Handling**:
   - Users can upload images, which are handled and processed with Firebase Storage and image classification APIs.

#### **API Integration**

1. **Clarifai API**:
   - **Purpose**: To classify images uploaded by users.
   - **Usage**: Used to provide classifications of the uploaded images, which are then displayed in the item's details.

2. **GCP Vertex AI** (optional):
   - **Purpose**: To leverage advanced image classification and AutoML features.
   - **Usage**: Provides additional functionality for image analysis if integrated.

3. **Recipe API (OpenAI API or OpenRouter API)**:
   - **Purpose**: To fetch recipe suggestions based on pantry items.
   - **Usage**: Queries the recipe service to get recipes that use the ingredients available in the user's pantry.

4. **Firebase**:
   - **Purpose**: To handle backend services including authentication, database (Firestore), and file storage.
   - **Usage**: Stores user data, pantry items, and uploaded images.

#### **Future Enhancements**

1. **User Authentication**:
   - Implement authentication to manage user-specific data and allow multiple users to manage their own pantries.

2. **Advanced Analytics**:
   - Integrate analytics tools to track user engagement and pantry management statistics.

3. **Enhanced Recipe Features**:
   - Add features such as recipe rating, ingredient substitution suggestions, and meal planning.

4. **Integration with Shopping Lists**:
   - Allow users to generate shopping lists based on missing items or recipe requirements.

---


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
