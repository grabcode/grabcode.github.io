---
layout: cheatsheet
title: "ES6, the Javascript since 2015"
comments: true
---

Javascript is a fantastic and popular language. As such, it evolves rather quickly and new functionalities are brought to Javascript programmers very often, thanks to ECMA International, institution driving this upgrades. Actually, ECMA script is now releasing a new version of ECMA Script yearly.

You might not know, but the Javascript you are writing nowadays follows the 5th version of ECMA, hence named ES5, shorthand standing for ECMA Script 5. In 2015, the new ECMA Script specifications have been [signed off](http://www.ecma-international.org/ecma-262/6.0/index.html), and consequently what was named the 6th version (code name ES6) became officially `ECMA Script 2015` (ES2015). Any further development of ECMA would fall under the code name ES7.

We are going to concentrate onto ES6 features first, and eventually stretch to ES7. Note that I'll refer to ES6 instead of ES2015 just because it saves me to tape 3 characters (lazy taping methodology).

Note: this document assumes you are familiar with the basics of Javascript (ES5).

## Introduction to ES6 (ES2015)

ES6 has been strongly influenced by some existing [Javascript Superset](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS), and one in particular, as far as I know, CoffeeScript. I can mention `class`, destructuring, arrow function, template string though the syntax differs.

In a nutshell, any CoffeeScript developers (many from the Rails community) will feel comfortable with 20% of ES6 (need to check that approximation).

Some ES6 features are widely supported and others aren't. To check this out, you can use this [Compatibility Table](https://kangax.github.io/compat-table/es6/). In most of the example below, I'll be running our Javascript ES6 code via Babel. Babel allows us to, and I quote, "use tomorrow's javascript today". Babel is indeed going to convert "tomorrow's javascript" into "today's javascript", so we can run it in today's nodejs/browsers.

### Setting up our ES6 environment

Prior digging into ES6, we have to set up our environment. Instead of running the following snippets of code in the browser, we are going to use the terminal, with the command line `babel-node`.


### Climbing Babel Tower

TODO: FALSE - edit that
I would recommend to install it globally typing `npm i -g babel-cli` into your terminal (this assumes you have `npm` installed). Please refer to this page for deeper knowledge about [Babel CLI](https://babeljs.io/docs/usage/cli/).

#todo: insert image, and terminal command, and expected result
#mention 2 words about what's happening

## Contents

* [x] [Destructuring assignment](#es6-destructuring-assignment)
  * [ ]
* [ ] Default
* [ ] Template string
* [ ] var, let, const
* [ ] Array comprehension
* [ ] rest operator, argument spreading, (Diarhea annotation)
* [ ] Module loader, `import` and `export`
* [ ] `class`
* [ ] arrow function `=>`
* [ ] Generators
* [ ] Promises,
* [ ] Maps, Sets
* [ ] Symbols
* [ ] Misc: `Object.assign`, `fetch`

### Destructuring assignment {#es6-destructuring-assignment}

ES6 allows to extract easily properties out of objects and arrays. This ability is called "destructuring". Also, it is possible to do somewhat the opposite process, and compose object with a shorthand syntax.

Note: Destructuring has been inspired by CoffeeScript, as per this [blog post](http://blog.carbonfive.com/2011/09/28/destructuring-assignment-in-coffeescript/). Actually, it is now CoffeeScript who follows ES6 syntax, since version 1.10.0.

#### Destructuring objects {#es6-destructuring-objects}

My goal is to destructuring an plain and simple JSON and extract critical variable from it.

{% highlight javascript %}
var {document, chapter} = {document: "Learning ES6", chapter: "Destructuring Assignment", section: "Destructuring objects"};

document == "Learning ES6"; //true
chapter == "Destructuring Assignment"; //true

// Note: section doesn't interest me in this part of the program, so I ignore it and any other keys.

{% endhighlight %}

Very often I ask an object containing a list of run my function.

{% highlight javascript %}

function buildStateLabel(state) {
  var {document, chapter} = state; // 'document' refers directly to the key I'm interested into
  return "Currently reading '"+ document + "', chapter '" + chapter + "'";
}

var currentState = {document: "Learning ES6", chapter: "Destructuring Assignment", section: "Destructuring objects"};
var readingState = buildStateLabel(currentState);

// readingState == "Currently reading 'Leaning ES6', chapter 'Destructuring Assignment'";
console.log(readingState);

{% endhighlight %}

In case the key "document" wouldn't fit, you can change it. After all it could be too long or the name irrelevant for the function.

{% highlight javascript %}

var {document: book} = {document: "Learning ES6", chapter: "Destructuring Assignment"};
book == "Learning ES6"
document == undefined

{% endhighlight %}

I could rewrite my function above to actually define my variables directly:

{% highlight javascript %}

function buildStateLabel({document, chapter}) {
  return "Currently reading '"+ document + "', chapter '" + chapter + "'";
}

{% endhighlight %}

The benefits are multiple. Besides writing less code, it makes clearer what is "necessary" for my function.

You can the code executing `babel-node desctructuring/objects.js`.

#### Destructuring arrays {#es6-destructuring-arrays}



#### Reverse Destructuring {#es6-reverse-desctructuring}

To compose new objects from existing ones, you would often use `extend` (from [underscore.js](http://underscorejs.org/#extend)) or an equivalent from another library.

ES6 comes with a shorthand to achieve simple object composition.

Combine with spread
[...yeah, yo]
{...whatever}
Shorthand
