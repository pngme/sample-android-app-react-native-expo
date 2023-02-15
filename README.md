<p align="center">
  <img src="https://admin.pngme.com/logo.png" alt="Pngme" width="100" height="100">
  <h3 align="center">Pngme Android (React Native) SDK & Sample App</h3>
</p>

This documentation covers how to use the Pngme SDK with React Native.

You can find similar documentation for [Flutter-Kotlin](https://github.com/pngme/sample-android-app-flutter), [Flutter-Java](https://github.com/pngme/sample-android-app-flutter_java), [Kotlin](https://github.com/pngme/sample-android-app-kotlin) and [React Native](https://github.com/pngme/sample-android-app-react-native).

## Setup

1. The SDK supports Android API version 16+
2. The SDK enables your app to:
   1. Register a mobile phone user with Pngme
   2. Request SMS permissions from the user using a [Permission Dialog Flow](.docs/permission_flow.gif)
   3. Periodically send data to Pngme to analyze financial events
3. Using the SDK requires an **SDK Token**
   - [**Sign up for a free Pngme Dashboard account**](https://admin.pngme.com) then access your SDK token from the [Keys page](https://admin.pngme.com/keys)
   - Use the `test` SDK token during development but replace with the `production` SDK token before deploying your app to the Google Play store

<p align="center">
  <img src="https://raw.githubusercontent.com/pngme/sample-android-app-flutter/main/.docs/webconsole_keys.png" width=450 height=300/>
</p>

After integrating the SDK, financial data will be accessible in the [Pngme Dashboard](https://admin.pngme.com/users) and via the [Pngme REST APIs](https://developers.api.pngme.com/reference/).

## Integrating the SDK

### Step 1

Add the SDK package to your `package.json` file.

#### Using Yarn

`yarn add @pngme/react-native-sms-pngme-android@3.2.0`

#### Using Npm

`npm install @pngme/react-native-sms-pngme-android@3.2.0 --save`

### Step 2

Add your **SDK Token** to `.env`.

```text
PNGME_SDK_TOKEN=XXXXXXXXXX
```

> ⚠️ We recommend that additional measures be taken to protect the **SDK Token** when implementing in a production app. Consider using an encrypted secrets manager (such as [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)) to store the SDK token.

### Step 3

Call the `go()` method in your app where you would like to trigger the [Permission Dialog Flow](.docs/permission_flow.gif).

```ts
import { go } from "@pngme/react-native-sms-pngme-android";
const openSDK = async () => {
  const goParams = {
    clientKey,
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    phoneNumber: userPhone,
    isKycVerified: kycVerified === "true",
    companyName,
    externalId,
  };
  const response = await go(goParams);
};
```

## PngmeSDK API

### `go()`

```ts
type go = (params: PngmeSDKParamType) => Promise<void>;

interface PngmeSDKParamType {
  clientKey: string; // pass the SDK token here
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  externalId: string;
  isKycVerified: boolean;
  companyName: string;
}
```

> The `go()` method can be safely invoked multiple times. The user will only be prompted for permissions when `go()` is called (1) the first time or (2) after `resetPermissionFlow()`.

The `go` method performs three tasks.

1. register a `user` in Pngme's system using an Android Onetime Worker
2. show a [Permission Dialog Flow](.docs/permission_flow.gif) in the current Activity to request SMS permissions from the user --
   by default, this _runs the first time, and only the first time_, that `go` is invoked
3. check for new SMS messages and send them to Pngme's system every 30 minutes using an Android Background Worker

| Field         | Description                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------- |
| clientKey     | the SDK Token from the [Pngme Dashboard Keys page](https://admin.pngme.com/keys)                    |
| firstName     | the mobile phone user's first name                                                                  |
| lastName      | the mobile phone user's last name                                                                   |
| email         | the mobile phone user's email address                                                               |
| phoneNumber   | the mobile phone user's phone number, example `"23411234567"`                                       |
| externalId    | a unique identifier for the user provided by your app; if none available, pass an empty string `""` |
| isKycVerified | a boolean, indicating if your app has verified the user's identity using KYC                        |
| companyName   | your company's name; this is used in the display header of the permissions UI flow                  |

### `resetPermissionFlow()`

```ts
type resetPermissionFlow = () => void;
```

The [Permission Dialog Flow](.docs/permission_flow.gif) will only run the first time that the `go` method is invoked.

If your app needs to implement logic to show the Dialog Flow again, then you can reset the permission flow by calling `resetPermissionFlow`.

### `isPermissionGranted()`

```ts
type isPermissionGranted = () => Promise<boolean>;
```

This indicates if the user has accepted the SMS permissions request:

- Returns a Promise that resolves to `true` if the user has accepted the SMS permission request
- Returns a Promise that resolves to `false` if the user has denied the SMS permission request

## Sample Android App

> Running these next steps assume that you have set up your environment for Android development in React Native.
> See the [React Native Official Docs](https://reactnative.dev/docs/environment-setup) before proceeding if needed.

This repository is a sample Android Expo app, which uses the Pngme SDK.
This app uses the `.env` file to inject the SDK Token.
As noted above, it is highly recommended that additional measures be taken to protect the SDK Token when implementing in a production app.

This app can be compiled and emulated locally, with or without a valid SDK Token.
If a valid SDK Token is used, then data will be sent through to the Pngme system while testing in emulation mode.

> Before launching the app, you might want to have some SMS ready in the phone's inbox for faster testing. Refer to the section [Send SMS data locally](#Send-SMS-data-locally) down below

To run the sample app locally, install dependencies and launch the app.
You can use any of the methods below:

Running with an emulator:

1. It is recommended emulating with a physical device

```bash
yarn install
expo run:android
```

2. Using an EAS Build:

```bash
yarn install
expo start
eas build --profile development --platform android
```

3. Generate test apk:

```bash
yarn install
eas build --profile preview --platform android
```

### Behavior

The sample app demonstrates a basic flow:

1. user creates an account with the app
2. the user goes to apply for a loan, and has the option of selecting to use the Pngme service
3. if the Pngme service is selected, the SDK is invoked, and the [Permission Flow](.docs/permission_flow.gif) is presented
   <sub>- :warning: _Note that if a user chooses to hide the permissions flow, they will need to design their own information and consent screen compliant with Google Whitelisting requirements. Consult with <support@pngme.com> if you would like assistance with this process._</sub>
4. when the permission flow exits, the user is presented with a fake loan application page

The SDK is implemented in the `screens/permissions/index.js`, when the user clicks on the _Continue_ button:

```ts
const handleContinue = async () => {
  if (toggleCheckBox) {
    // if user confirm they want to use Pngme, we store that selection
    setUser({ pngmePermissionWasSelected: true });
    await go({
      clientKey: RNConfig.PNGME_SDK_TOKEN,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: `234${user.phoneNumber}`,
      isKycVerified: false,
      companyName: "Acme Bank",
      externalId: "",
    });
    navigateToLoanScreen();
  } else {
    navigateToLoanScreen();
  }
};
```

The app remembers the selection in step 2.
If the user chooses to enable the Pngme service,
then the checkbox stays selected for all future loan applications.
The [Permission Flow](.docs/permission_flow.gif) is only showed the very first time,
_regardless of if the user accepts or denies the permissions_.

### Show Permissions Flow Multiple Times

Alternative behavior is to continue requesting SMS permissions if they were previously denied.
Adding the following snippet will reset the Permission Flow
if SMS permissions had been previously denied but not [permanently ignored](.docs/permissions.md).

```ts
const handleContinue = async () => {
  if (toggleCheckBox) {
    // if user confirm they want to use Pngme, we store that selection
    setUser({ pngmePermissionWasSelected: true });

    const permissionGranted = await isPermissionGranted();
    const canPermissionBeAsked = await canPermissionBeAskedAgain();
    if (!permissionGranted && canPermissionBeAsked) {
      resetPermissionFlow();
    }

    await go({
      clientKey: RNConfig.PNGME_SDK_TOKEN,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: `234${user.phoneNumber}`,
      isKycVerified: false,
      companyName: "Acme Bank",
      externalId: "",
    });
    navigateToLoanScreen();
  } else {
    navigateToLoanScreen();
  }
};
```

### Sending test data

This can be tested in a sample app running in the local emulator, assuming the emulated app is running with a valid SDK token.

Android Emulator can simulate incoming SMS messages, and we can use this to test the Pngme SDK locally.

The following text message is of a recognized format for the Stanbic bank sender: `Stanbic`.

```text
Acc:XXXXXX1111
CR:NGN4,000.00
Desc:HELLO WORLD! SAMPLE MESSAGE
Bal:NGN50,000.00
```

You can inject this fake SMS into the emulated phone by following these steps.
It is advisable that you pre-populate the emulated phone with the SMS _before_ running the sample app.

> Once the app gets the permissions form the user it will instantly start sending existing SMS messages to the Pngme system. This results in messages being seen way sooner than SMS received after the app was installed.
>
> The background worker processes new messages every 30 minutes, so new sessages will take at least 30 minutes to appear in the webconsole.

![Inject Fake SMS](assets/inject_fake_sms.png)

1. Open the `more` window in the emulator settings
2. Navigate to the `phone` section
3. Set the sender to the string `Stanbic` or one of the senders from our [supported institutions](https://developers.api.pngme.com/reference/supported-institutions).
4. Copy/Paste the above same message into the message box
5. Hit `Send Message`

After following the above steps to send a fake SMS, run the sample app.
The fake SMS will be sent to the Pngme system using the SDK token from your Pngme account.
If the sample app runs successfully, the financial data in the text message will be accessible
via the [Pngme REST APIs](https://developers.api.pngme.com/reference/getting-started-with-your-api) or in the [Pngme webconsole](https://admin.pngme.com).

## Next steps

See [Going Live with the SDK](https://developers.api.pngme.com/docs/going-live-with-the-sdk) to learn more about the whitelisting process with the Google Play store.
