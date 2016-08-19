---
title: "Taking back control of SASS colour variables"
description: "In SASS, lists of semi-meaningless words that somehow represent colours isn't going to make anyone's life easier. Let's try to find a better approach."
date: 2016-07-01 10:18

---

The following is a honest-to-god chunk of SASS/SCSS code we used in a large-ish project not too long ago. I don't expect you to actually read it - just let your eyes skim over the horror for a moment.

```scss
$black: rgb(0,0,0);
$basecolor: #333;
$grey: lighten(rgb(0,0,0), 46.5%); // #777
$lightgrey: lighten(rgb(0,0,0), 58.6%); // #959595
$lighterlightgrey: #a9a9a9;
$lightergrey: lighten(rgb(0,0,0), 79%); // #c9c9c9
$lighterergrey: lighten(rgb(0,0,0), 90%); // #e6e6e6
$lightestgrey: #f2f2f2;
$white: rgb(255,255,255);
$lightblue: #00a5d8;//hyperlink blue
$storyblue: $lightblue;
$blue: #0085ca; //brand colour
$electric-booga-blue: #07d7d5;
$selected-darkblue: #35596d;
$last-minute-orange: #ff8441;
$discounted-red: #ee3124;
$so-many-deals-red: #c91e1f;
$orange-you-glad: #FF780A;
$orange-cta-light: #fc892b;
$orange-cta-dark: #e8640c;
$main-nav-seperator-color: #3b3b3b;
...*snip* (continues for another 30 lines)
```

A hodge-podge of both over-vague and too-specific variable names, with a scattering of passive aggression in there for good measure. A few trying-to-be-helpful comments, variables assigning other variables, at least 7 different shades of grey[^shades] - in short, a mess.

[^shades]: In which Christian Grey reveals a **shameless** amount of ankle.

## Long lists suck

**Lists** are handy to have, but their effectiveness is inversely proportional to their length. The longer a list becomes, the harder it is for us humans to parse and channel that information into something useful.[^bagel]

[^bagel]: Remember this next time you're wandering around a supermarket with a list in hand, and have to make the long trek back to the bread aisle because you didn't notice 'bagels' further down.

**SASS variables** are fantastic. Reading a variable like `$facebook_brand` in code, rather than a meaningless RGB value is brilliant. But that helpfulness doesn't scale. Not all colours are as memorable or have such a useful single-purpose name.[^seperator]

[^seperator]: I'm looking at you, `$main-nav-seperator-color` - I mean, you're not even spelled correctly!

Therefore, it's easy to see why a combination of 2 useful-but-not-_super_-useful technologies can become problematic after a while.

In practice, long lists of SASS variables are painful to read, parse, and subsequently, care about. So it's very easy to end up with one or several of the following:

1. **Terrible variable naming** : The developer needs a specific colour, searches through the list and can't find a colour close enough, so hastily adds another colour variable, with a suitably specific name: `$reallyLightGreyThisTimeIMeanIt`.
2. **Duplicating colours** : The developer doesn't find the colour needed, even though it does exist, so adds it in a duplicate ([or painfully similar](http://www.slideshare.net/stubbornella/our-best-practices-are-killing-us/4-FACEBOOK_BLUE_261Wednesday_March_30)) colour definition with another hastily thrown together variable name.
3. **Overriding variables** : The developer adds `$calltoaction` not noticing that variable already exists, overriding the original colour with the new and introducing regression errors.
4. **Rage quitting the whole variable nonsense** : The developer hard codes the colour into the CSS rather than using colour variables, because I'm not going to spend five minutes crawling through the variables trying to find the right one.

I wouldn't blame anyone for doing any of those - it's not their fault that this unsorted mess of variables is hard to use.

Like a lot of the very useful features in SASS, they are the tools that, when used improperly, allow users to make their own horrible flavours of code spaghetti.

For example, SCSS [selector nesting](http://sass-lang.com/guide#topic-3) of style definitions are an _incredibly_ powerful function, but nest too deeply and you end up entering a CSS specificity battle with your past self. To the point where sensible SASS guidelines now recommend [avoiding nesting unless absolutely necessary](https://www.sitepoint.com/beware-selector-nesting-sass/).

It's the same with colour variables. A simple concept that is far too prone to causing more hassle than the problem it was initially meant to solve.

> <q>[They] were so preoccupied with whether or not they _could_ that they didn't stop to think if they _should_.</q>
> <cite>[Dr Ian Malcolm](http://jurassicpark.wikia.com/wiki/Ian_Malcolm)</cite>

## Mo' variables, mo' problems

I'm a simple man. All I ask is for an approach that allows me to:

1. **Globally assign colours to variables** The main reason for using SASS variables in the first place. Assigning names to variables and using them throughout the codebase means that it's easier to keep track of the colours in use should we need to globally change them.
2. **Use a memorable naming convention** I know from experience that playing the game '_How do I spell that variable?_' is a long and torturous process. Having to stop working in one document to look up a variable declaration in another, only to realise you'd used a been misspelling the variable is a morale-sapping experience. Tiny little delays like that can really interrupt a development flow.
3. **Enforce a naming convention** You may have come up with a super-simple approach to naming your variables - but no-one _has_ to follow it. Are you going to fastidiously read every pull request, and leave helpful comments about how it should be named? Ain't nobody got time for that.
4. **Increase the readability** Someone very wise once wrote that '[long lists suck](#long-lists-suck)'. You can sort the lists somehow, or add in line-breaks - maybe a comment or two, but again, it's not enforceable, it is painful to maintain, and it's even worse to read.
5. **Gracefully handle errors** SASS's default behaviour of aborting compilation when an unknown variable is used is not very helpful, especially when refactoring SCSS code. Isn't there some way we could have a graceful fallback of some sort should a colour not exist?

Fortunately, with SASS's lovely [map data types](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) and a few SASS functions, it is possible to regain some control of unwieldy lists. Let’s run through it.

Firstly, we created a nested SASS map object, into which we can add all the colour variables:

```scss
$swatches: (
  grey: (
    light: lighten(rgb(0,0,0), 79%),
    base: #a9a9a9,
  ),
  blue: (
    light: #00a5d8,
    base: #0085ca,
    dark: #07d7d5
  ),
  orange: (
    base: #FF780A,
    dark: #e8640c,
  )
  ...
);
```

We've grouped the colours firstly by broad colour definition, and finally defined each colour either `base`, `dark` or `light`. Already we're tackling the readability issue - grouping by broader chunks of code makes lists far easier for humans to scan through.

Once a variable is in a map like this, the only real way to get them out is via a custom SASS function and a couple of [tasty SASS helpers](http://sass-lang.com/documentation/Sass/Script/Functions.html#map-functions). The function will require 2 parameters; a colour name and a 'tone':

```scss
  @function swatch($swatch, $tone) {
    @if map-has-key($swatches, $swatch) {
      @if map-has-key(map-get($swatches, $swatch), $tone) {
        @return map-get(map-get($swatches, $swatch), $tone);
      }
    }
  }
```

So now we have a basic implementation: `swatch(blue, base)` will return `#0085ca`. Nice!

Because we now have programmatic access to our colours, we can build on this wrapper function to start addressing some of the earlier issues.

Let's make a few assumptions about our variable map. For example, let's assume that there must always be a `base` variable for each colour. Working with that, we can then start incorporating some graceful fallbacks for undefined tones, as well as add in some other nice-to-haves.

```scss
@function swatch($swatch, $tone: 'base') {
  $swatch-error: #f00;
  @if map-has-key($swatches, $swatch) {
    @if map-has-key(map-get($swatches, $swatch), $tone) {
      @return map-get(map-get($swatches, $swatch), $tone);
    }
    @warn "Invalid tone: `#{$swatch}` - `#{$tone}`.";
    @return swatch($swatch);
  }
  @warn "Invalid swatch: `#{$swatch}`.";
  @return $swatch-error;
}
```

So given our previous `$swatches` map - the following should be the case:

`swatch(blue)` will return `#0085ca`, `swatch(blue, light)` will give us `#00a5d8`, `swatch(blue, herpderp)` will fall back to the base colour of `#0085ca` again.

Using `swatch(madeup, light)` will return `#f00` as that map doesn't exist at all.

Lastly, error logging is added via the `@warn` method for further bug tracking.

We're done! By leveraging the built-in functions of SASS, we've constructed a far more useful map of colours that can be easily parsed by both computer and coder. We have graceful fallbacks and a sensible naming convention that is simple to understand and extend upon.

## Closing thoughts

* If you take nothing else away from this article, I heartily recommend you make use of a CSS or [SCSS linter](https://github.com/brigade/scss-lint). Yes, it will annoy your team members, yes your CI build steps will fail at first for totally infuriating reasons - but you get to enforce some super-useful steps, such as colour literals only being used in variable definitions. No more hard-coding colours into the CSS rules.

* The swatch names I've chosen here are for demonstration purposes only. Being the old CSS warhorse that I am, I'm still not keen on naming a class (or variable in this case) 'blue', just in case the site is somehow redesigned _with just the CSS being edited_ and 'blue' is defining a bright yellow colour. That's my personal preference. I've always liked to use names that seem indicative of a colour but ultimately doesn't mean anything... basically, [Dulux paint names](https://www.dulux.ca/pro/colour/browse-our-colours)... so 'majestic' for purple, or 'jaffa' for orange.

* Also, remember that the names you use are purely subjective and that these names **only** need to have semantic meaning for your team of developers. If 'badger' speaks to your team as 'green', and 'happiness' is 'orange', then all power to you. Remember, rather than having a list of 40-odd variables, the use of maps mean that we're only going to need to remember 6 or so, and after that, it's combinations of tone keywords. In this case, **'Memorable' > 'technically correct'**.

* Most of the time you're probably going to need more than 3 tones for each colour group, so the illustrated `light`/`base`/`dark` combo is not going to do the job. So far, I've found relative success starting with that, and then padding out the extremities and midpoints with `x-light`/`mid-light`, and so on. The only thing to remember is that the use of these tone-names needs to be consistent across your colour maps.

* **The perfect use case**: Think of your co-developers trying `swatch(ocelot)`, and needing it to be a little lighter, so trying out `swatch(ocelot, light)` and getting the exact colour needed, all without the SASS compilation freaking out, or needing to check a list in a separate file, allowing them to get on with their work seamlessly. Lovely.

* Only occasionally have I found that I've ended up with more than 8 colours in a single map, at which point, I'd suggest taking the opportunity to refactor your code and break those colours out into 2 or more separate objects.
