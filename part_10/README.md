# Full Stack Open - Part 10: React Native

This repository contains my solutions for **Part 10** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to build a complete cross-platform mobile application from scratch using React Native and Expo, covering everything from component architecture and testing to GraphQL data fetching, authentication, and cloud deployment.

### 📚 Learning Objectives:

- **Getting started (Chapter 1)**: Setting up the development environment and tools for React Native development with Expo.
- **Introduction to React Native (Chapter 2)**: Understanding core components (`View`, `Text`, `FlatList`, `Pressable`), structuring styles with `StyleSheet`, and configuring ESLint for the project.
- **React Native basics (Chapter 3)**: Implementing navigation with `react-router-native`, environment variables, and consistent theming across the application.
- **Communicating with server (Chapter 4)**: Integrating Apollo Client to fetch data from a GraphQL API, implementing authentication with JWT and `AsyncStorage`, and managing forms with Formik and Yup.
- **Testing and extending our application (Chapter 5)**: Writing component tests with Jest and React Native Testing Library, implementing sorting, filtering, and cursor-based pagination (infinite scrolling), and publishing the application via EAS Update.

### 🛠️ Projects & Exercises:

- **[Rate Repository App](./rate-repository-app)**  
  _A complete mobile application for browsing and reviewing GitHub repositories, built with Expo and React Native._
  - **GraphQL Data Layer**: _Integrated Apollo Client with a custom `authLink` to attach JWT tokens to every request, and configured `relayStylePagination` for cursor-based infinite scrolling on both the repository list and review list._
  - **Authentication**: _Implemented sign in and sign up flows with Formik/Yup validation, persisting the access token via `AsyncStorage` and exposing it through a React Context (`AuthStorageContext`)._
  - **Reviewing Repositories**: _Built a review creation form, a single repository view with GitHub linking (`Linking.openURL`), and a paginated reviews list with pull-to-refresh._
  - **My Reviews**: _Implemented a personal reviews view with repository navigation and review deletion, guarded by a confirmation `Alert`._
  - **Sorting & Filtering**: _Added repository ordering (latest / highest / lowest rated) via a `Picker` component and debounced keyword search using `use-debounce`._
  - **Testing**: _Covered form submission and list rendering with Jest and React Native Testing Library, using `testID` queries and the `within` helper for scoped assertions._
  - **Deployment**: _Published the application via EAS Update, making it accessible on physical devices and simulators through Expo Go via a QR code._

---

_Built with React Native, Expo, Apollo Client, GraphQL, Formik, Yup, React Router Native, Jest, and React Native Testing Library._

---

### ⚠️ Note on Environment Variables:

To connect to the GraphQL backend, create a `.env` file inside the `rate-repository-app` directory:  
`EXPO_PUBLIC_APOLLO_URI=http://your_local_ip:4000/graphql`

### 📱 Try the app:

You can run the published version of the application (connected to the course's pre-deployed backend) using an SDK 55 compatible version of Expo Go.

**Direct Expo Link:** [exp://u.expo.dev/ea2cf079-5b80-48f0-b53f-797a0e6b5c28/group/6dddb3c1-6034-4771-9704-8ce495bed9d6](https://expo.dev)

Scan the QR code below with the Expo Go app to launch the project:

![QR Code](./qr-code.png)
