---
title: "(Over)thinking about custom elements"
description: "or: How I Learned to Stop Worrying and Love the Web Component"
date: 2014-10-12 10:01

---

With the promise of encapsulated new behaviours and styling, the ability to
create new HTML elements, and to have all that power easily share-able within
the community - Web Components hold enough promise to be the
[Next Big Thing](http://www.theonion.com/video/sony-releases-new-stupid-piece-of-shit-that-doesnt,14309/).

If you haven't yet got the full skinny on Web Components and their potential, I
can't recommend reading Peter Gasston's excellent
[introduction to Custom Elements](http://coding.smashingmagazine.com/2014/03/04/introduction-to-custom-elements/)
enough. In fact, even if you consider yourself fairly up-to-date and you
_haven't_ read it, go do yourself a favour. I'll wait. Go on.

It's *cool*, right? We have in our hands the power to add new
features to browsers as technologies and requirements of the web change. We
essentially short-cut the previous routes of going through the labyrinthine
halls of the W3C spec writers, and can quickly prototype an
[MVP](http://beinglimited.com/misconception-about-mvp/), deploy, learn,
 and iterate.

The theory is that once developed, you can decide to publish you shiny new component
[somewhere](http://customelements.io/) so other folk can use it.
In theory, the best will rise to the top of the heap, gain the most visibility,
be adopted by everyone, make the web a better place and
[everything is awesome](https://www.youtube.com/watch?v=rGnH6JPsv7E)[^notSarcasm].

Full disclosure: I had my concerns about web components when I first heard of them.
The examples I read about and had explained to me by enthusiastic
early adopters were setting off my Progressive Enhancement and Accessibility
senses[^spideySenses].

To utterly misquote [Dr. Strangelove](http://www.imdb.com/title/tt0057012/):
<q>The technology of web components is easily within the means of any developer;
it requires only the will to do so.</q>

![Dr. Strangelove (1964)](strangelove.jpg =700x284)

*Anyone*. Like, really? Anyone could develop these? Surely that's a terrible idea!

Have a look at how many jQuery plugins are there that provide some level of JS
functionality without a [PE-style](/articles/2014-03-04/do-we-need-progressive-enhancement-in-our-web-apps/)
fallback. How many plugins, developed with the best of intentions, break on newer
browsers, are ill supported, left to go stale when the author moves on to pastures
new?

It seemed to me that aspects of accessibility and maintainability are important to
spec writers but not to enough developers of plugins and polyfills, and so it
would continue with Web Components. With the web components atomic bomb, I reasoned,
we were going to break the Web.

“People are stupid,” I said, “we'll end up with a hundred different variations
of link elements, one for each social platform, none of which are as good as
the original accessible HTML element.”

![Dr. Strangelove (1964)](war-room.jpg =700x294)

[Accessibility is hard](http://a11yproject.com/about.html). As much as people
reassured each other that fallbacks to standard elements and
[ARIA roles](http://html5doctor.com/using-aria-in-html/) will be the way forward
with regard to making web components future friendly, I remained skeptical, and that
we would end up developing the components we deserve, not the components we need.

But again, I need to remember that the web is an ever-evolving continuum. As much
as I want backwards compatibility for as long as possible, I also want the web to
be forging onwards in bold new directions. And that is
cool and amazing, but also scary and terrifying. I look forward to the introduction
of the `<hologram>` element, but the backward-compatibility concerns are potentially
*staggering*.

If I want that, then I should trust other people do as well, and with these tools we
have the ability to get [coding](http://webcomponents.org/) now.
As [Bruce Lawson](http://www.brucelawson.co.uk/2014/notes-on-accessibility-of-web-components/)
put it: <q>My message to accessibility advocates is 'passion – great. But with pull
requests, please.'</q>

We have a unique opportunity to shape the future of the web at a grass-roots level
*right now*. I'm off to start developing.


[^notSarcasm]: Sidenote: Is there a such a thing as an anti-sarcasm element? `<earnest>`,
  maybe? Because reading that last line back sounds VERY sarcastic. It's not. I
  think this stuff is brilliant. No really. No *really*.

[^spideySenses]: Kind of like [Spider Senses](http://tvtropes.org/pmwiki/pmwiki.php/Main/SpiderSense)
  but with better screen reader support

## Required reading from far smarter folk

* [Customelements.io](http://customelements.io/)
* [Webcomponents.org](http://webcomponents.org/)
* [Bruce Lawson - Notes on accessibility of web components](http://www.brucelawson.co.uk/2014/notes-on-accessibility-of-web-components/)
* [Jeremy Keith - Web components](https://adactio.com/journal/7431)
