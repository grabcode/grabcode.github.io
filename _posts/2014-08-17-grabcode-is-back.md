---
layout: post
title:  "Grabcode is back"
date:   2014-08-17 20:00:00
categories: misc
---

This is about time. Earphones on, my 1 year old baby son busy with a new toy, and my wife studying quietly her MBA, I've decided to re-launch my website. This is indeed the second time that my will to write takes over my apprehension... and lack of time. The site remains archaic for now, the priority being to actually write blog posts. This is mid-august 2014, and my objective for now is to publish once per fortnight.

#### Content first

My previous blogging experience taught me that it was all about content. Indeed, I kept holding off pretending that I needed to find the time to make an original design. After all, this is suppose to be my personal mark. Actually, I missed the point. It is, and it has always been about doing things first.

Many things are happening this days. My curent job has never been so... frustrating. Fortunately, my own projects are moving forward. As a sign of some divine entity out there, we, Ameni, Matisse and I, just received the invitation to apply for the skilled VISA 189. And 24 hours later, I was applying and paying the 6300 $AUD fee, arrr (please don't ask me why I still don't have a car). It has to be done - this is the sesame for freedom in OZ.

#### Down under

For the record, I am french. And with my wife and my son, we currently rely on the <strike>sponsored VISA 457</strike> (we are permanent resident since november 2014, thanks to our skill visa 189) to claim our right to work in Australia. Don't get me wrong, this is a good situation in comparison to many others. That said, I came here in a quest for freedom. And by freedom, I mean freedom to work anywhere, and for anyone, including myself.

Before I left Paris, I was already involved in the startup 'industry', in parallel to my permanent position. And arrived in Sydney, I did everything I could to overcome all the learnings I had to do. I am not talking exclusively about technical knowledge. I had to get to know the Sydney siders, their society, and their startups, incubators, groups... After now 25 months, after sweat and tears, I am proud of my achivements, even though I realize this is still the beginning of a great (hopefully) journey.

On Grabcode, you are reading about this journey. I'll blog about the projects I'm involved in, blog about the tools I use to build this projects, and blog about some thought I judge interesting or necessary to share in the wwwild.


Technically, "grabcode.fr":
this website is generated using [Jekyll](http://jekyllrb.com), and it is hosted on my github account.


Oh yeah, I am a javascript addict (a javascrict?)

{% highlight javascript %}
var alex = (function(){
  'use strict';

  var personal = {
    age: 28,
    where: "Sydney, Australia",
    from: "france",
    family: {
      status: "maried",
      children: 2
    }
  };

  return {
    knowMore: function(){return personal;},
    javascriptOfAllTrade: ['raw', 'angularjs', 'nodejs', 'socketio', 'sailsjs', 'meteorjs', 'cordova/phonegap', 'crosswalk', 'famo.us', 'underscore', 'requirejs']
  };
})();
{% endhighlight %}

<script>
  (function(){

    var DateInterval = function(d1, d2){
      this.start = d1
      this.end   = d2;
      this.diff  = d2.getTime() - d1.getTime()
    }

    DateInterval.prototype.toYear = function (){
      return this.diff / (1000*60*60*24*365.242);
    }

    var age    = new DateInterval(new Date('1985-11-18'), new Date());
    var ageDOM = document.querySelector('.mi');
    ageDOM.innerHTML = age.toYear().toFixed(2);

  })();
</script>
