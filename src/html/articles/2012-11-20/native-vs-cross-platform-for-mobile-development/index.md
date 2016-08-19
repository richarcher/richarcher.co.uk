---
title: "Native vs Cross-platform for mobile development"
date: 2012-11-20 19:01
---

I don't have a problem with native mobile apps. In fact, I love them. But then again, I'm an iPhone owner. We get all the cool stuff.

Apps can be wonderful if you have access to them. But if you are not one of the blessed few that has a device with a matching app, where does that leave you? Forced to use an actual.. \*gulp\* _website_?

In South Africa in May, there are 8 million mobile-web users out there, the top 3 platforms being used on the day of writing being Symbian, Android and the Nokia Series 40, each with approximately 22% of the market.

Not quite so shortly behind them are iOS (iPad, iPhone, iPod Touch), "Unknown", Blackberry, Samsung, the mysterious "Other", and Windows Phone.

Even if we elected to develop only for a small portion of these phones, there would be a costly amount of developer time needed to develop (and maintain) specific apps for each. And how do you choose which one to develop for?

><q>Oh! If only there was some sort of standardised markup language that would be understandable by anyone with web connection</q> <cite>– Sarcastic Greek Chorus</cite>

Does your phone have a browser? Boom! Instant access to your web-app by potentially hundreds of thousands of users.

Developing a web app is faster and easier to develop for, easier to iterate upon with feature releases and is truly the "create once, publish everywhere" environment. In short; less cost across the board.

As a web-app, it is possible to leverage the basic nature of the web; it will instantly be more 'findable' on the web as opposed to being lost amongst hundreds of similar apps in an app store somewhere, as well as being easily linked to and shared in Twitter, Facebook, LinkedIn or any other site.

As a web-app, your service remains unencumbered by the slings and arrows of a 3rd party app store. By developing a web app, you are avoiding having a cut of any revenue made from within the app being taken by the app store, such as the [Financial Times](http://www.guardian.co.uk/media/appsblog/2012/apr/24/financial-times-web-app-2m) chose to do when Apple wanted a cut of their users' subscription fees.

As a web app, if you need to redeploy your app after a minor release, you are not penalising your user's bandwidth caps by forcing them to re-download a 10MB binary for a small tweak.

As a web app, if a new web-enabled device arrived on the market, we know that device will be able to access your app already without any delay. Your app is [Future Friendly](http://futurefriend.ly/).

There are differences between devices. All devices render differently, and on different screen sizes and resolutions. Fortunately, dealing with an uneven playing field is what us front-end developers have been doing for years; by embracing the principles of accessibility, graceful degradation, feature detection and adaptive design, we have been creating web pages that take advantage of newer technologies as they are made available to us, whilst allowing the web experience to fallback to a more basic interface for the older browsers.

You are not preventing any users from accessing your content, and you are not penalising the newer users by catering soley to the lowest common denominator.

## A dash of reality

As much as I would love to hitch up the HTML5 wagon and ride off into the sunset, the simple facts of the matter are that some people EXPECT a native app of some sort. The simple fact is that native apps are in the main faster AND they can _currently_ do more than traditional HTML5 apps. iOS users expect a higher polish to their app experience, [and will freak the hell out if that experience does not match their expectation](http://blog.mobtest.com/2012/05/heres-why-the-facebook-ios-app-is-so-bad-uiwebviews-and-no-nitro/).

Put simply, it's a case of comparing the __richness of native apps__ against the pure magnificent __reach of HTML5__.

Trying to replicate an native app experience in a HTML environment is setting yourself up for a fall. People will inevitably make comparisons and at some point they will notice that there is an [uncanny valley](http://en.wikipedia.org/wiki/Uncanny_valley) effect, in which the web app will come out the loser.

But that doesn't mean that you should go racing ahead and develop a native app straight away. Don't instantly reduce your market by developing for a specific platform.

## Start wide and then focus in

Here is what I would suggest. Develop your web-app first, quickly, publish, get it out there. [Minimum Viable Product](http://en.wikipedia.org/wiki/Minimum_viable_product). Iterate. Learn from your users. Develop your brand. A/B test. If there is a need for a native app after that and you have the resources, you are better positioned to take the lessons from your website and improve them in the app.

## Native development as a form of progressive enhancement

Here's what you gain from this approach:

* You know which segments of your potential market you are missing out on entirely, or which segments of your market you want to capitalise upon.
* You "[pave the cowpaths](http://designingsocialinterfaces.com/patterns/Pave_the_Cowpaths)" – watch the interaction patterns your users navigate the site and enhance them in the app. Not sure which platform to develop for first? You do now.
* Less waste of expensive native development time trying to position your app correctly within the market.
* Less chance of annoying your userbase with an ineffective app.

In summary, there's no reason why native and web apps need be in direct competition; they can exist perfectly well together.

But seriously. Do the web app first.
