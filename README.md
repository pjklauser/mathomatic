mathomatic
==========

An IonicFramework App for practicing mental arithmetic.

## Appstore Deployment ##

update/increment package.json version attribute to 1.0.1.

make sure to increment the version attribute of config.xml
 
make sure ionic and cordova is uptodate:
 
    npm update -g ionic
    npm update -g cordova
    cordova platform update android

make sure the Android SDK is uptodate. Run P:\android\adt-bundle-windows-x86_64-20140702\sdk\tools\android.bat and update existing and install new tools.

reinstall the android platform added resources to the config.xml

    ionic platform remove android
    ionic platform add android

according to [http://ionicframework.com/docs/guide/publishing.html](http://ionicframework.com/docs/guide/publishing.html "Ionic's Publishing Guide") 


    cordova build --release android

copy the contents of platforms/android/AndroidManifest.xml over the copy_AndroidManifext.xml in the root folder to see any android manifest changes ( like new permissions ).

go to platforms\android\build\outputs\apk and copy the android-release-unsigned.apk to the root folder folder and then do

    $ P:\sandbox\ionic\mathomatic>jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 keystore my-release-key.keystore android-release-unsigned.apk mato


This signs the apk in place. Finally, we need to run the zip align tool to optimize the APK:

    P:\sandbox\ionic\mathomatic>P:\android\adt-bundle-windows-x86_64-20140702\sdk\build-tools\19.1.0\zipalign -v 4 android-release-unsigned.apk mathomatic.apk

go to [https://play.google.com/apps/publish](https://play.google.com/apps/publish "Playstore")