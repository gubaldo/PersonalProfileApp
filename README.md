# PersonalProfileApp

A bare-workflow React Native app (Expo SDK 58) built for the React Native Bare Workflow training.
`ios/` and `android/` are committed to Git.

## Prerequisites

- macOS with Xcode <version> and an iOS simulator runtime
- Android Studio with an API 36 AVD named `pfa_api36`
- Node.js <version> (24 LTS) via nvm
- Watchman, CocoaPods, Ruby/Bundler
- JDK <version> (Android Studio bundled)

Tested with React Native 0.88, Expo SDK 58, React 19.3.0.

## Environment

Add these to `~/.zshrc` (macOS paths; Intel uses `/usr/local` for Homebrew):

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools"
```

## Clone and install

```bash
git clone <repo-url>
cd PersonalProfileApp
npm ci
cd ios && pod install && cd ..
```

## Run

```bash
npx expo start          # Expo Go / JS-only preview
npx expo run:ios        # iOS simulator
npx expo run:android    # Android emulator (start the AVD first)
```

Start the emulator first:

```bash
"$ANDROID_HOME/emulator/emulator" -avd pfa_api36
```

## Checks

```bash
npx expo-doctor
```

## Troubleshooting

- Android build cannot find the SDK → check `ANDROID_HOME`.
- iOS build cannot find Pods → `cd ios && pod install`.
- Unsupported Node version → `nvm use 24`.

