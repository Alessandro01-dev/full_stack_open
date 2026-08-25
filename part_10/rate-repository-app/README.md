# Full Stack Open - Part 10: React Native

This repository contains my solutions for **Part 10** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to build a complete cross-platform mobile application from scratch using React Native and Expo, covering everything from component architecture and testing to GraphQL data fetching, authentication, and cloud deployment.

### 📚 Learning Objectives:

- **Introduction to React Native (Part 10a)**: Setting up an Expo project, understanding core components (`View`, `Text`, `FlatList`, `Pressable`), and structuring styles with `StyleSheet`.
- **React Native basics (Part 10b)**: Implementing navigation with `react-router-native`, environment variables, and theming.
- **Communicating with server (Part 10c)**: Integrating Apollo Client to fetch data from a GraphQL API, implementing authentication with JWT and `AsyncStorage`, and managing forms with Formik and Yup.
- **Testing and extending our application (Part 10d)**: Writing component tests with Jest and React Native Testing Library, implementing sorting, filtering, and cursor-based pagination (infinite scrolling), and publishing the application via EAS Update.

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
Scan the QR code below with the Expo Go app to try the published version of the application (connected to the course's pre-deployed backend):

![QR Code](./qr-code.png)

> **Note:** As of SDK 55, Expo Go is temporarily unavailable on the Apple App Store (still pending approval as of this submission). If scanning the QR code with the App Store version of Expo Go on iOS returns a "Project is incompatible" error, this is a known Expo limitation, not an issue with this application — see [Expo's announcement](https://expo.dev/changelog/expo-go-and-app-store-may-2026) for details. The application was verified working through the iOS Simulator using a compatible SDK 55 build of Expo Go, opened via the update's deep link (`exp://u.expo.dev/ea2cf079-5b80-48f0-b53f-797a0e6b5c28/group/6dddb3c1-6034-4771-9704-8ce495bed9d6`).