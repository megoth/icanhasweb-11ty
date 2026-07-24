---
title: "Rewriting I Can Has Web with Wintersmith"
author: arnehass
date: 2015-12-30
layout: blog.11ty.tsx
tags: rewrite, wintersmith, wordpress, architecture, design choices
---

I recently rewrote this website using [Wintersmith](http://wintersmith.io/), and in this post I'll detail the process; the ideas I had initially, the choices I faced, the decisions I took, and how the final result turned out to be. (The latest code can be seen at [megoth/icanhasweb](https://github.com/megoth/icanhasweb).)

The post will not be going through how to set up a new wintersmith blog, there are other good resources on that (like [here](https://github.com/jnordberg/wintersmith#quick-start), [here](http://davidtucker.net/articles/introduction-to-wintersmith/), and [here](http://www.sitepoint.com/getting-started-wintersmith-nodejs-static-site-generator/)).<span class="more"></span>

**TL;DR: I've rewritten this website using Wintersmith. The content types are blog posts, projects, talks, and my cv. The three former supports tagging, which is made possible with a monkey patched version of wintersmith-tag. I also wrote a bit of scripts, using webpack to organize and bundle it, and included a couple of services (Disqus and Google Analytics).**

The website was powered by two wordpress installations. Just to be clear, I wasn't dissapointed with Wordpress per se, but I disliked the fact that it is written in PHP (which is not my language of choice), and I wasn't going to invest time in utilizing its powers and flexibility (for example, I know of its [Custom Content Types](https://wordpress.org/about/features/), which probably would have been sufficient for a lot of my needs).

On the other hand, I have been exploring Wintersmith a lot in a couple of other projects, and although the documentation leaves much to be wanted, I'm very satisfied with the experience. It's easy to set up, easy to change, and has some community that is building some nifty tools. Not so much going for it that I would choose it in a more serious endeavor (read: making something where a lot of money is involved), but for my personal use it's good enough.

## Initial setup

My outset was to move all of my blog posts to a unified blog and reuse my minimalist theme (with some changes, to explore some CSS features). As the blog functionality was the biggest unknown for me, I decided to start with that by using the default blog template (which is the default template, so if you want to try it out, just check out [Wintersmiths quick-start](https://github.com/jnordberg/wintersmith#quick-start)). That gave me a simple frontpage with pagination of posts, a RSS feed, and articles, which is an overview of all posts by year and month.

Next I cloned the [minimalist repo](https://github.com/megoth/minimalist) into the project, and created a simple grunt setup using [load-grunt-config](https://github.com/firstandthird/load-grunt-config) and [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks). With that in place, I created the following tasks: 

* [clean](https://github.com/gruntjs/grunt-contrib-clean): to delete files between builds
* <strike>[copy](https://github.com/gruntjs/grunt-contrib-copy): to copy resources that aren't moved with Wintersmith</strike> (I later realized Wintersmith handles all copying I need ^\_^)
* [sass](https://github.com/gruntjs/grunt-contrib-sass): to handle sass-to-css from the minimalist project
* [watch](https://github.com/gruntjs/grunt-contrib-watch): because developing without it is pain
* [wintersmith](https://github.com/davidtucker/grunt-wintersmith): to trigger wintersmith builds

## Design

Paired with [live-server](https://www.npmjs.com/package/live-server) which I run in the build-folder (which refreshes the website after each build), I had my development-setup in place. It made the refitting of minimalist a pleasure to do, and in the process I learned a little about [CSS grid](http://www.w3.org/TR/css-grid-1/) and [CSS flex](http://www.w3.org/TR/css-flexbox-1/) (I learned a lot from [a post by Rachel Andreas on 24 ways](https://24ways.org/2015/grid-flexbox-box-alignment-our-new-system-for-layout/) and [this guide by Chris Coyier on CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)).

As part of the refitting I also fixed the aside-parts on the frontpage; a small about-section, a photo of myself, a list of public profiles, a list of selected projects, and a list content on this site. That was done by simply copying the content from the old site, modifying it to the jade syntax in index.pug.

## Importing old posts and tags

While working I realized I wanted to append tags to articles, as I had done that for most of previous blog posts. [wintersmith-tag](https://www.npmjs.com/package/wintersmith-tag) was suitable for this, and it proved to be a simple plug-n-play. It was really fun to see everything click into place.

It was not so fun moving all the old blog posts. I figured I could move one post every two minutes, and didn't think I had that many. It turned out to be 115 posts. Some time into it I was kind of pissed that I didn't just write a program to do it. And I got even more pissed at myself afterwards when I realized there is actually written [a tool for it](https://github.com/davidbanham/wp-to-wintersmith)... Well, no point in crying over spilt milk.

## Comments and projects

Moving the posts, tedious as it was, other ideas formed in my head; To enable comments for the new blog posts, and to showcase my projects.

For the former I started looking at [Disqus](https://disqus.com/), and while searching for them, was deviously lured by [Spot.IM](https://www.spot.im/) who had bought an ad-spot when searching for disqus. Although I'm not fan of such devious tactics, I am a fan of trying new things, so I gave them a shot. Realizing they was way to invasive for my taste, I went back to Disqus.

Disqus is simple to set up, simply insert a script, and make sure that you generate some proper strings for it to use, and your set. I didn't want to enable commenting on all of my old posts, so I made a rule to only enable Disqus on articles that didn't link to an original URL. That worked out well.

To showcase my projects I was thinking I could just put some pages into another folder (blog posts are located in articles by default) and started wondering if I could plug tags into those pages as well. wintersmith-tag doesn't support that out of the box, but I figured I could simply [monkey patch](https://en.wikipedia.org/wiki/Monkey_patch) it.

## Monkey patching wintersmith-tag

It turned out that copying src/index.coffee from wintersmith-tag to plugins/tags.coffee and modifying the necessary bits was really easy. The original author took care in reusing functionality, so I simply had to extend the code one place, namely the getArticles-function; I extended it so that it could take an array of strings, instead of just a simple string, and run a map-function over the array that returned a list of directories (which was what it was suppose to return, albeit only sub-directories from one given directory).

I realized the monkey patch fucked up the pagination in the tag-template, as it was difficult to mix two types of contents. So I turned off pagination altogether by increasing the number of posts per page to 100. I also split the listing of pages into projects and blog posts explicitly, so that projects are listed at the top and blog posts below (I'm more keen to show off my code than my blog posts).

Having support for tags from multiple directories, I wrote a page for each of the public repositories that I thought interesting to share. I added a status to each, setting them to either active (still being maintained at various pace), inactive (uncomplete, not being maintained for various reasons), and complete.

## Setting up my CV

When nearing the end of the projects, I also realized I wanted to rewrite my CV-page, so that it was somewhat updated (still not done with that though) and reflected the new design. That meant introducing a bit of JavaScript, including the use of 3rd party services (namely [Zepto](http://zeptojs.com/)). I've fallen a bit in love with [webpack](https://webpack.github.io/) lately, so I plugged that into the system, introducing [a new task as well](https://github.com/webpack/grunt-webpack). A bit overkill perhaps, but I was figuring that if I wanted to expand JavaScript later on, it would be much easier to do it "properly" at once. It didn't hurt that I then also had bundling and optimization in place.

I tried to take care in making the functionality accesible (although I probably need to add some more ARIA roles). I'm thinking of revisiting the script later, after researching a bit more on accessibility.

## Setting up analytics and introducing a cookie-warning

Next I wanted to introduce Google Analytics to the page. That was also very easy to set up (simply following the steps set out by Google), but I realized that Analytics, as well as Disqus, probably uses cookies, and that I should probably adhere the [cookie law](https://www.cookielaw.org/the-cookie-law/) (and respect that some people really don't like having unauthorized cookies on their computer without notification). So I added a bit of text in the footer, and created a small script that handled the "Click this button to never again show this boring warning about cookies"-functionality.

Lo and behold - the decision to use webpack paid off. I created a new entry for the global script, and set up webpack to create a common file for common scripts - namely Zepto. I also made use of [js-cookie](https://github.com/js-cookie/js-cookie) to get simple cookie-handling.

## Talks

Having the project-texts in mind, I realized that some of them would be better presented as simply talks. They shared a lot of the same data (a repository and optionally a URL), but could also have a date attached to it. So I created a new folder named talks, moved the content that beloged there, and set up some new templates and linked to the new section from the main navigation.

As I had already monkey patched the tags functionality, it was a small step to include the new folder into the array of content to list tags from.

## Conclusion

I'm quite satisfied with the new website, and hope to be able to add more content to it in the time to come. I'm very happy with how easy it is to modify, but will try to [keep my URIs cool](http://www.w3.org/Provider/Style/URI.html).

For now there are a severe lack of images, which has a very good reason - I'm trying to keep my webpages small. But I'll probably experiment with some [responsive images](https://responsiveimages.org/) in the near future.

I want to focus on writing more, and have a couple of projects in mind. Some of it will probably show up here, at least I'll write about it here at some point.

The only negative with the new setup is the fact that every time I want to update the site I have to upload a bunch of files. But as I don't update my site that often anyway, it's a small price to pay.
