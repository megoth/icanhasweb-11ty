---
title: "Aurora – Design decisions"
author: arnehass
date: 2010-11-07
layout: blog.11ty.tsx
tags: aurora, cms, cyb, cybernetisk selskab, descriptive code, django, escape, framework, graceful degradation, ifi, markup, ole johan dahls hus, progressive enhancement, semantic markup, w3c
original: https://icanhasweb.wordpress.com/2010/11/07/aurora-design-decisions/
---

<p>Aside from my studies and part-time job, I’m partaking in the activities of <a href="http://cyb.ifi.uio.no/">Cybernetisk Selskab [no]</a>, a student driven association working to improve the social environment at <a href="http://www.ifi.uio.no/english/">the Department of Informatics</a>. As a member of the board, I’m frequently involved in the different activities arranged, and one of them is the CybWebDev.</p>
<p>Currently we’re focused on Aurora, the codename for a system which aims to be an array of tools supporting the organizational work in CYB. This, we believe, will be especially important when Escape opens, the student driven pub that will open along with the opening of <a href="http://www.ifi.uio.no/ifi2/">Ole Johan Dahls Hus [no]</a>, the newest addition of buildings at the University of Oslo, which will be the base of most of the educational, academic and social activities concerning the students of computer science.</p>
<p>In doing the preparations for this development, we’ve discussed some principles/guidelines that we wish to follow when designing/coding, and I thought I would share them with you here.</p>
<span class="more"></span>
<h3>Don’t reinvent the wheel</h3>
<p>We will use a framework, namely <a href="http://www.djangoproject.com/">Django</a> for our project. Although this will be just another CMS, we hope that Django will speed up our development, powering documentation and a user base that can help us in our hours of need.</p>
<p>Personally, I’ve tried building a system from scratch several times, only to submerge myself in bugs never-ending, unexpected quirks taking hours figuring out and finally just installing a <abbr title="Content Management System">CMS</abbr> that gave me all I needed.</p>
<h3>Follow the W3C-standard</h3>
<p>We wish to adhere the foundation laid out by the <a href="http://www.w3.org/">W3C</a>. This means coding following their guidelines, validating using their tools, and ignoring how its rendered in the different browsers. We believe this system should stand the test of time, and we believe this can be done by following the W3C’s standards.</p>
<p>This means that we will not spend time adjusting our code so that those who use IE6 – or other outdated browsers – will be able to get a topnotch experience using our systems.</p>
<h3>Write good markup</h3>
<p>By good we mean semantically correct, not cluttering it with unnecessary tags. It’s more or less a continuation of the former point.</p>
<h3>Progressive enhancement</h3>
<p>We want to provide an experience that doesn’t require the users to use the latest in browsers, or 3rd party plugins. That said, we wish to experiment with these features, to include cutting-edge functionality where they are a sensible addition. The principles of <a href="http://en.wikipedia.org/wiki/Progressive_enhancement">progressive enhancement</a> allows this behavior, with approaches such as <a href="http://en.wikipedia.org/wiki/Unobtrusive_JavaScript">unobtrusive&nbsp;JavaScript</a>.</p>
<p>By feature detection, we’ll strive to implement this in a way that doesn’t require them, but becomes a delightful addition that increases the users productivity. <a href="http://www.modernizr.com/">Modernizr</a> is a&nbsp;JavaScript&nbsp;library that will easily give us tools to do this when implementing features from CSS3 or HTML 5.</p>
<p>This choice means that we will strive to build functionality from bottom-up, rather than top-down (that is, <a href="http://accessites.org/site/2007/02/graceful-degradation-progressive-enhancement/">graceful degradation</a>). If we cannot build a baseline functionality for a certain problem, than we must either research more into how we can solve the problem, or we’ll drop the functionality.</p>
<h3>Responsive design</h3>
<p>Before anything else, we will design for the traditional computer screen-experience. But we believe HTML to be such a powerful tool, that it can ported to mobile clients quite easily. Writings on Responsive design<sup><a href="#Responsive1">1</a>, <a href="#Responsive2">2</a></sup> has inspired us to give it a try, to apply certain rules for handheld devices sporting smaller screens than the standard computer screen.</p>
<h3>Write descriptive code</h3>
<p>Writing documentation is a drag, period. As students doing this on a&nbsp;voluntarily&nbsp;basis, we don’t wish to spend hours upon hours writing documentation. Rather, we will write descriptive code, that is (hopefully) easily understood by other programmers. We will also strive to follow the guidelines of the framework, which will help us in future decisions-takings.</p>
<h3>No unit-testing</h3>
<p>Although we have good experiences with <a href="http://en.wikipedia.org/wiki/Test-driven_development"><abbr title="Test Driven Development">TDD</abbr></a>, we do feel that writing test hampers the process. We want the process to be flexible and smooth, and we do not feel that writing tests supports this feature. We also feel that the systems we produce won’t be so complex that it will be difficult to debug when bugs arises.</p>
<h3><abbr title="Keep It Simple Stupid">KISS</abbr></h3>
<p>As a side-project in a student driven organization, we realize that our code will not survive the next generation of coders if they can’t understand what we’ve done. In extension of this, we must consider that when code becomes complex, we must stop and rethink our progress.</p>
<h3>Iteration, iteration, iteration!</h3>
<p>We do not know all the answers upfront. The principles/guidelines described here may be wrong at certain times, and we must be flexible to those needs. In fact, I’m quite eager to find out whether or not they will stand the test of our development. Time will tell.</p>
<h3>Have fun</h3>
<p>Not to forget, the project should be able to nurture our curiosity and provide fun in our development for the web. If this fails, all will fail. I believe the group will have lots of fun in this project, and I’m looking forward to contributing to it.</p>
<h3>Writings mentioned</h3>
<ol>
<li><a name="Responsive1" href="http://www.alistapart.com/articles/responsive-web-design/">A List Apart: Articles: Responsive Web Design</a></li>
<li><a name="Responsive2" href="http://adactio.com/journal/1700/">Adactio: Journal—Responsive enhancement</a></li>
</ol>
