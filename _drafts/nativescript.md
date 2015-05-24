---
layout: post
title:  "Native Apps with Javascipt"
date:   2015-05-15 13:00:00
categories: dev
comments: true
---

PARTS::
INTRO: context
https://www.youtube.com/watch?v=Rw7oAu3yiik
HANDS ON: let's code

Nativescript is a runtime that let you connect JS to natives API.
It covers already Ios, android, windows phone.
Note; react barely cover IOS

Ionic: berk :<

NO DOM !!! Wtf, really ?
No compilation !!! Wtf, really ? (NS is not Xamarin, or Appcelerator -> cross-compile)


Can use NPM packages !!
Cheat sheet: http://browsenpm.org/help
http://blog.npmjs.org/?__hstc=72727564.d0e307d71ec9b9124e0d70a227338db8.1432356212216.1432356212216.1432428836928.2&__hssc=72727564.1.1432428836928&__hsfp=9048336


Warning: don't forget "./xxx" otherwise it consider you look inside tns_modules/xxx


Great benefit of this solution: hot code push. Javascript is the ONLY programming language you can push to a IOS device. Technically, it is not, I suppose. But the Apple store make it clear that you cannot update an app codebase, EXCEPT for "text/data file", and javascript. that's a big AHAH moment (Simpson), especially if you sit next to a objective C purist ;)

Quid the Nativescript with JS containing Native call...

Nativescript interesting integration/plugin:
  Hotcode plugin: without relaunching the app
  View inspector, and hot css push
  Meteor integration
  Cordova plugin to Nativescript plugin generator


### Use android SDK
If aar, unzip it, and rename classes.jar.
Run:
tns library add android /Users/alex/workspace/nativescript/estimote/Android-SDK/EstimoteSDK
tns build android //build metadata
// check "importandroid/platforms/android/assets/metadata/treeStringsStream.dat" for relevant string
Edit AndroidManifest.xml: permission to XML and stuff

//extend command "tns library add ..." (http://tools.android.com/tech-docs/new-build-system/aar-format)
//using XSL to merge the AManifest.xml ?

#######
AIM::
articles (with partnership sitepoint?)
+ presentation: sydney mobile + Sydjs
+ promote appmaker service
