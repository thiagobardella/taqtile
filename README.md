# My Awesome Project

This is a simple project for onboarding tasks. Right now, it has a simple interactive "Hello World!" app for Android OS. Express your level of excitement by pressing `+` or `-` buttons. Pure fun! 
 
## Environment and tools 

This React Native app with Typescript was designed with the following stacks:

* Development OS: macOS
* Target OS: Android
----
* Android Studio 3.1.1
* node 12.8.0
* npm 6.10.2
* OpenJDK 8
* React Native Cli 2.0.1
* React Native 0.60.5
* Watchman 4.9.0
* Yarn 1.17.3

An Android device will be necessary to run this app. For simplicity and onboarding purposes, an Android Virtual Device allowed emulating this device. From Android Studio usa a virtual "Pie API Level 28" device.  

## Steps to run and debug 

Open Android Studio and access the list of available Android Virtual Devices (AVDs) by opening "AVD Manager". 

Once chosen the device desired, click on the green triangle button next to your AVD to launch it.

Now access this project folder through terminal and run

```
react-native run-android
```

And now the app is on!  

If you want to check tests just run

```
yarn test
```
