---
layout: post
title:  "Pure functions in Javascript"
date:   2015-05-18 07:35:00
categories: coding
comments: true
---

<In a nutshell serie>

Read and quote and resources
http://www.sitepoint.com/functional-programming-pure-functions/
http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/
http://eloquentjavascript.net/1st_edition/chapter3.html

Pure and Im

Quote `@dan_abramov`
Depends solely on the value of their arguments (0-all). Pure functions do not have any observable effects, such as network or database call.

Another important property of any Pure Function: it must return the same
That's why Math.random() is not a pure function.

Concretely in Javascript, Pure Functions don't change any outer scope variables, and don't mutate the value of the given arguments. A Pure Functions always return a value.

Why would you use?
Easy to test since they are pretty much self sufficient.
//Another interesting property of Pure Functions is the transitivity: a pure function

Optimising Pure Functions
Since a pure function returns consistently the same result at any point in time given the same set of arguments, we can memoize it.
Example:....

Notes
Some libraries require you to supply Pure Function, Redux being one of them.
