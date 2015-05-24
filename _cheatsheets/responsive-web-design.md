---
layout: cheatsheet
title: "Responsive Web Design"
comments: true
---

### Goal

We want to cover multiple devices and factorize the work as much as possible. Hence we want to create and maintain one and unique website that adapts itself to many device's screen sizes.

Concretely, we have the same HTML(s) sent over every devices, regardless of their screen's sizes, and our website's layout is automatically changed, while the contents remain more or less the same.

### Responsive layout

Responsive web design is design first. We need to come up with a layout for each device screen's size ranges.

Designing for touch screens involves a lot of new consideration, such the sizes of the button. It is indeed recommended to have a minimum of 40px width and height (finger tip approx. sizes).

#### Fluid layout

Back in the old days, websites were wrapped into a centered container with a fixed width. Then, people started to care about readability on multiple screens.

So basically it was time to ditch the fixed widths and go for percentages, with some max-width still defined in pixels. This ways you can stretch and squeeze the website and keep a relatively consistent layout.

<div style="float:right;max-width:400px;margin-left: 10px;margin-top:10px;">
<img style="max-width:100%;height:auto;" alt="Fluid layout" src="/img/fluid-layout.png">
</div>

{% highlight css %}
.container{
  max-width: 960px;
  margin: 0 auto;
}

article{
  float: left;
  width: 33%;
}

article:not(:last-of-type){
  margin-right: .5%;
}

/* ensures that images remain in their parent box without falling out */
img{
   max-width: 100%;
   height: auto;
}

{% endhighlight %}



#### Raise of the smartphones

A fluid grid layout has some limitation. Under a certain threshold, the website would "break". Breaking here means that it looks ugly and even worst, isn't readable for a normal person.

<div style="float:right;max-width:420px;margin-top:0px; margin-left: 10px;">
<img style="max-width:100%;height:auto;" alt="Responsive Web Design Targets" src="/img/responsive-web-design.png">
<p style="text-align:right;">Credit to <a href="http://www.webdevsnippets.com/tag/responsive-design/" target="_blank">webdevsnippets.com</a></p>
</div>

Starting 2007~, web developers had to cover a large set of screens. It started with smartphones, followed closely by tablets, and more recently phablets (large screened smartphones).

And a new and amazing feature arrived to cover that new challenge. With CSS3, we had the possibility to conditionally apply CSS rules. The great thing is that you wouldn't have to use any Javascript or have any programing knowledge.


### Media Queries

We can declaratively state that only under certain circumstances we want some CSS to apply. Thanks to "Media queries".

Following the 3 layouts described in the previous image, we come up with the following CSS:

{% highlight css %}
/*
  Here we write CSS rules for Desktop
  And the rules common to every devices
*/


@media screen and (max-width:1023px) and (min-width:768px){
  /*
  Apply CSS for tablets
  Anything here aims to overwrite the rules written before (desktop)
  */
}

@media screen and (max-width:767px){
  /*
  Apply CSS for mobiles
  Anything here aims to overwrite the rules written before (desktop and tablets)
  */
}
{% endhighlight %}

##### DESIGN STRATEGY

In the above instance, the strategy we've opt in is "Desktop to Mobile". We first work out the Desktop, and then head downward, to reach tablets and mobiles. Some would opt for the "Mobile first" strategy, bottom-up if you will. I have no opinion in this regards. It all comes down to your project, and audience I think.

### Viewport

Any website that haven't been optimized yet to mobile is  by default scaled down to fit the device screen size. This is a great way to respect the ratio of our "non mobile friendly" websites. The user would then zoom-in and zoom-out to read the content. Not great, but ok.

But now we have a mobile friendly layout. We need to inform the browser that we want our website to use the actual mobile device width. To do that, we simply need to add the following HTML into the head of your pages.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1">
{% endhighlight %}

There's few other thing you can do through this meta tag, such as preventing the user to be able to zoom in/out.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
{% endhighlight %}


##### A PIXEL IS NOT A PIXEL

For a long time, desktop's screens have been using the same pixels density. Consequently, the physical size of the screen, in centimeter, was tightly coupled to the number of pixel it contained. But with the arrival of Retina screen, this statement is not true anymore. It is particularly true on tablets and mobiles.

Two devices might have the screen size in centimeter, but one could actually more pixels. We are talking about DPI.

More to come about that soon. Until then, please refer to [that page](http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html).


### Tools

<img style="max-width:220px;height:auto;float:right;margin-left:10px;" alt="Chrome Dev Tools" src="/img/chrome-dev-tool.png">

Chrome Dev Tools contains a convenient, and powerful way to develop and work for many device's screen sizes.

Assuming the CDT is opened, you can click on the smartphone icon, right to the magnifier.

<img style="max-width:350px;height:auto;float:left;margin-right:10px;" alt="Chrome Dev Tools" src="/img/chrome-device-simulator.png">

It triggers the device simulator toolbar.

From there you have access to a list of predefined smartphone and tablet screen's sizes, and much more.

Note: I personally heavily use this tools to develop cross-devices apps.
