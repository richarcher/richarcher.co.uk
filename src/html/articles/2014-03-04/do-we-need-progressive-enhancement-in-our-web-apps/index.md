---
title: "Do we still need Progressive Enhancement in web apps?"
description: "In a world of amazing JS apps providing new interfaces and enhanced experiences, do the old rules of supporting legacy browsers still apply?"
date: 2014-03-04 09:02

---

There has been a heck of a lot said about <abbr title="Progressive Enhancement">PE</abbr> in the last month or so, most notably from my favourite super-smart thought leaders, [Jeremy Keith](http://adactio.com/journal/6692/) and [Ethan Marcotte](http://unstoppablerobotninja.com/entry/platformed/) about the need to remember the lessons of the past, and keep progressive enhancement a key concern in one's daily development cycles.

It's a good thing to keep front of mind, especially when (to my mind, deliberately inflammatory) articles about [PE being dead](http://tomdale.net/2013/09/progressive-enhancement-is-dead/) gain traction and encourage what I would consider a step backwards in that aspect of web development.

It's an important question to ask, however. Why, when we have a proliferation of [amazing](http://angularjs.org/) [JS](http://backbonejs.org/) [web-app](http://www.cappuccino-project.org/) [libraries](http://chaplinjs.org/) [that](http://echo.nextapp.com/site/) [allow](http://emberjs.com/) [us](http://www.bbc.co.uk/glow/) [to](http://www.gwtproject.org/) [do](http://javascriptmvc.com/) [magnificent](http://knockoutjs.com/) [things](http://mootools.net) [in](http://jquery.com) [the](http://dojotoolkit.org/) [browser](http://www.sencha.com/products/extjs/) should we have to develop the same application twice? We live in a world where screen reader JavaScript penetration is [97.6%](http://webaim.org/projects/screenreadersurvey5/#javascript), and one of the Big Four browsers doesn't even allow users to easily [turn off JavaScript](https://bugzilla.mozilla.org/show_bug.cgi?id=873709&resub&utm_source=feedly).

><q>Why should I have to develop (and pay for) an app that renders once in HTML, before being overwritten by the same app written in a different language?</q> <cite>– Recalcitrant Crowd of Developers</cite>[](id:whytwice)

## Does it take a lickin' and keep on tickin'?

Of the 3 main aspects of front-end development, HTML, CSS, and JS, JavaScript is by far the most fragile. HTML ([especially HTML5](http://en.wikipedia.org/wiki/HTML5#Error_handling)) handles malformed structure in a reasonably understandable way. CSS silently chooses to [ignore rules](http://www.w3.org/TR/CSS2/conform.html#errors) it doesn't understand. JS needs feature detection. Drop in an unchecked [`document.getElementsByClassName`](http://www.iwanttouse.com/#getelementsbyclassname) into anything less than IE9 and, well, the results may yeild unexpected results. Heck, forget to add a semi-colon to the right place, a dependancy fails to download, accidentally redefine a variable; JavaScript packs up and goes home at the first sign of trouble.

PE is not just about feature detection. It's about ensuring that when parts of the site is broken, can other aspects still function. In other words, the parts of a site that do not [cut the mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard) in a browser shouldn't cause the entire site to become unusable.

[Christian Heilmann](http://christianheilmann.com/2012/02/16/stumbling-on-the-escalator/) uses the 'escalators and elevators' analogy. When an elevator breaks down, it's broken and useless. When an escalator breaks down, it becomes a staircase; still useable, just without the extra polish it had before. That's how we should develop our sites. Embracing the meaning of PE ensures that we can be confident that when (not if) things go "kaka" it should function to some extent.

### "Not supported" !== "Ignored"

One of the big points I took away from Jeremy's post was that "The web is not a platform. It’s a continuum". From Ethan's it was that in this business "we play the long game". Browsers do not pop out of existence the moment we stop supporting them. They're still out there, used by certain demographics for various reasons, and they still require access to your content.

Development time _costs_. If it didn't we'd probably end up "supporting" all browsers _ad-infinitum_. At some point, however, the project purse-holder will decide that it's not worth the time and effort required to support a particular browser, and you'll not spend as much time ensuring the [HD experience](http://www.paulirish.com/2011/tiered-adaptive-front-end-experiences/) for that section of the audience. They may get the lesser, degraded version without fancy bookmarkable URLs, indeed, they might not even get anything beyond a linear layout and a nod towards typography if that's what the product owner deems acceptable. What matters is that they can always reach your content.

What "support" means to you and your team can be a many varied thing - but as long as you've coded your site using proper web-standards, the risk of your site not working _at all_ is minified.

I like to ensure that the site I work on can be accessed via the lowest featured browser I can find, arguably [Lynx](http://lynx.browser.org/) - a command line based browser that only understands HTML. [It's not perfect](http://blog.paciellogroup.com/2014/02/doesnt-work-lynx/), but it's a good indicator of what is available on your site to the lowest common denominator.

PE provides you with the confidence that the content is at the very least available to every single one of your users, even if the CSS isn't rendering or JS playing nicely.

### SEO

This is the one that usually has the biggest impact in a discusson regarding PE, because it is the one that has the potential to hit the wallet hardest. If you want search engine traffic coming to your site, you need your site to be [readable to search engines](https://support.google.com/customsearch/answer/72366?hl=en).

Much discussion is made in the JS web-app world about how to achieve this. Talk of developing a server side generated equivalent that is [hidden behind a hashbang](http://www.yearofmoo.com/2012/11/angularjs-and-seo.html), or that [renders HTML in PhantomJS](https://prerender.io/how-it-works), using [3rd party services](http://www.angularjsseo.com/) that will make your content avilable to (some) search engines via a proprietary specification.

Whichever way, the user is still required to develop 2 versions of the site, one client and one server, which no-one really likes, and is a practice that does [raise familiar sounding questions](#whytwice).

For my money, if the HTML first layered on JS and CSS approach is not for you, and you absolutely, positively have to have the latest and greatest web-app running on your site - the hard work achieved by the likes of [AirBnB](http://nerds.airbnb.com/isomorphic-JavaScript-future-web-apps/), [Meteor](https://www.meteor.com/) and [Artsy](http://artsy.github.io/blog/2013/11/30/rendering-on-the-server-and-client-in-node-dot-js/) looks the best bet - a single codebase useable on both the server and front end.

Perhaps this is the Holy Grail we've all been looking for?

## Every time you say "it depends", we all take a drink

Ultimately, Progressive Enhancement is an opt-in thing. If you genuinely don't think you'll ever need the benefits of PE, don't utilise it. If the "content" your site provides is transient and shouldn't be indexable, it's goals simply do not have a fallback alternative, or you just don't care, then maybe you can skim through this article with casual indifference.

I feel, however, that the cases when that is justifiable are limited. For the majority of cases, PE is still highly relevant, and necessary.
