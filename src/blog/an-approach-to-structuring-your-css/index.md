---
title: An approach to structuring your CSS
author: arnehass
date: 2012-11-08
layout: blog.11ty.tsx
tags: smacss, 1140px, 960.gs, a list apart, blueprint, bootstrap, compass, css rules, css specificity, design shack, don't repeat others, don't repeat yourself, dro, dry, foundation, frameworks, grid, guidelines, inuit.css, less, less framework 4, media-query, oocss, principles, responsive web design, sass, separation of concerns, skeleton, soc, three-letter acronym, tla, yui css
original: http://icanhasweb.net/blog/2012/11/an-approach-to-structuring-your-css/
---

<p>Structuring <abbr title="Cascading Style Sheets">CSS</abbr>&nbsp;is not a trivial task, especially in large projects. Even smaller systems may become complex and hard to maintain when introduced to <a href="http://www.alistapart.com/articles/responsive-web-design/"><abbr title="Responsive web design">RWD</abbr></a>. In this post I’ll describe how I approach implementing larger sets of CSS rules.</p>
<span class="more"></span>
<p>I’ve worked with web technologies professionally for about five years. Until this fall I also studied, which culminated with <a href="http://icanhasweb.net/graphitethesis">my thesis</a> where I created <a href="https://github.com/megoth/graphitejs">a JavaScript framework</a> that aimed at giving JS-developers tools to make applications using the Semantic Web. For myself I aim to work with the web professionally, and hope to do so for many, many years to come.</p>
<p>An aspect of my career is my work with CSS, which has proven to be a tool somewhat harder to master than first anticipated. One dimension is the building blocks described by the <a href="http://www.w3.org/standards/techs/css#w3c_all">standards</a>. Another dimension is how these standards are interpreted and implemented by the various browsers (and how their differences create headaches long after their release). Yet another dimension is how these rules are combined, giving leeway to several techniques that become de facto standards for how to solve certain problems that arise again and again.</p>
<p>Finally, there is the dimension of magnitude. As web projects grow, there is high probability that their CSS rules will grow too. As such, some ideas for how to keep your rules structured in an intuitive and clean way are nice to have. To help guide us, we can probably learn from knowledge amassed in our community. As web developers, we like to bundle that knowledge into acronyms&nbsp;that describe certain <a href="http://en.wikipedia.org/wiki/Category:Programming_principles">principles</a>.</p>
<ul>
<li><strong><abbr title="Don't Repeat Yourself">DRY</abbr>:</strong> If you’ve solved a problem once, re-use that solution.</li>
<li><strong><abbr title="Don't Repeat Others">DRO</abbr>:</strong> If others have solved a well-known, defined problem once, why don’t re-use their solution?</li>
<li><strong><abbr title="Separation of concerns">SoC</abbr>:</strong> Rules that grouped into sensible expressions are more easily reused.</li>
</ul>
<p>I’ve focused these <abbr title="Three-letter acronyms">TLAs</abbr> on the need of&nbsp;re-usability. The level of re-usability is, in my opinion, the number one driving force in helping us to keep our CSS rules maintainable. It may also help us in our design, as it may hint that certain design choices introduce unnecessary amount of CSS rules, and that we should try to reuse our existing first. This may lead to a more consistent design, keep us away from unnecessary clutter, and allow us to follow another principle that’s been abbreviated, namely <abbr title="You ain't gonna need it">YAGNI</abbr>.</p>
<h2>The structure</h2>
<p>So, with all this in mind, how should the structure look like? My best tip is to draw upon the features of CSS, starting with selectors. The essence are ids, classes, tags, pseudo-selectors and the universal selector (&#42;). Using this as base also corresponds better with <a href="http://coding.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/">CSS&nbsp;specificity</a>&nbsp;which can be a real pain in the ass when not considered.</p>
<p>Another tip is to use a dynamic stylesheet language, like <a href="http://lesscss.org/">LESS</a> or <a href="http://sass-lang.com/">Sass</a>, as they drastically ease the work of writing CSS by introducing variables, nesting, mixing, operators, and functions. Related to the latter is&nbsp;CSS framework that are aimed at authoring CSS, focusing more on introducing mixins for explicit use by the implementer. I can recommend&nbsp;<a href="http://compass-style.org/">Compass</a>, but&nbsp;<a href="http://inuitcss.com/">inuit.css</a>&nbsp;may also be interesting to take a look at. Both of these are based on Sass, and currently I’m inclined to use Sass over LESS, but it really depends on your personal taste.</p>
<p>In addition to dynamic stylesheet languages and authoring CSS frameworks, there are several other kinds of frameworks that have a greater impact at guiding our design. On my workplace we’ve introduced <a href="http://twitter.github.com/bootstrap/">Bootstrap</a> with success, and it has increased the rate of prototyping tremendously. Other frameworks are <a href="http://yuilibrary.com/yui/css/">YUI CSS</a>,&nbsp;<a href="http://foundation.zurb.com/">Foundation</a>,&nbsp;<a href="http://www.blueprintcss.org/">Blueprint</a>, and&nbsp;<a href="http://www.getskeleton.com/">Skeleton</a>.&nbsp;They also guide some decisions, which may be good or bad depending on how you look at it. Common for all are that they introduce specific design elements, such as typography, form styles, navigation elements, buttons, icons, etc, enabling you to get something&nbsp;good-looking&nbsp;quite fast. As such, I wouldn’t recommend combining them, as their use of semantics may differ.</p>
<p>A last slew of CSS frameworks are those targeting specific features. Perhaps the most popular these days, with RWD being such a trend, is the one focusing on grids. Popular amongst these are <a href="http://960.gs/">960.gs</a>, <a href="http://cssgrid.net/">1140px</a>, and <a href="http://lessframework.com/">Less Framework 4</a>. These are good starting points, and may be a easy template for people not good with design (myself included), but if you truly want something that is yours, then you need to look at how designers create grids. If you need more convincing, read <a href="http://www.alistapart.com/articles/the-infinite-grid/">The Infinite Grid at A List Apart</a>, and/or if you want to learn a little bit more about the basics of grids, check out <a href="http://designshack.net/articles/css/rolling-your-own-grid-layouts-on-the-fly-without-a-framework/">Rolling Your Own Grid Layouts on the Fly Without a Framework at Design Shack</a>.</p>
<p>Now, lastly, there are guides such as <a href="http://oocss.org/"><abbr title="Object-Oriented CSS">OOCSS</abbr></a> and <a href="http://smacss.com/"><abbr title="Scalable and Modular Architecture for CSS">SMACSS</abbr></a>. These are extensive guides that may teach you one or two things about structuring CSS, and I recommend them both.</p>
<h2>An example</h2>
<p>Now, finally, lets look at an example, namely the structure used for the theme used by this blog (unless I’ve gone tired of it and changed it, of course), <a href="https://github.com/megoth/minimalist">minimalist</a>. It’s written in Sass, and makes use of Compass and a customized version of Bootstrap (thanks to their very nice <a href="http://twitter.github.com/bootstrap/customize.html">customize-tool</a>). One final note is that I use ems as the measure unit for my design.</p>
<p>The structure is as follows:</p>
<pre>| lib
|- bootstrap.min.scss
|- bootstrap.scss
| mixins
|- grid.large.scss
|- grid.medium.scss
|- typography.scss
| patterns
|- block.large.scss
|- block.medium.scss
|- block.scss
|- bootstrap.scss
|- tags.medium.scss
|- tags.scss
| unique
|- master.large.scss
|- master.medium.scss
|- master.scss
|- rss.large.scss
|- rss.scss
| variables
|- color.scss
|- dimension.large.scss
|- dimension.medium.scss
|- dimension.scss
| style.large.scss
| style.medium.scss
| style.scss</pre>
<p>The five directories are lib, mixins, patterns, unique, and variables. These are included by the various style files, which themselves are linked to by using mediaquries in the tags, e.g. <code>&lt;link rel="stylesheet" type="text/css" media="all and (min-width: 30em)" href="minimalist/style.medium.css" /&gt;</code>. The only responsibility the style-files has, is to include the necessary files for the different modes, in the correct order. First of all the order ensures that dependencies are handled, secondly it reflects the CSS specificity, e.g.:</p>
<pre>@import "compass/reset";
@import "lib/&#42;";
@import "variables/&#42;";
@import "mixins/&#42;";
@import "patterns/&#42;";
@import "unique/&#42;";</pre>
<p>The different style files represents the different steps, and somewhat mimics the width of a mobile, pad, and desktop&nbsp;viewport. &nbsp;But this is a truth with modifications, as I use em&nbsp;as the basic unit of the design, which means it really depends on whatever default font-size the user has.</p>
<p>This structure also allows me to reuse components between size-dimensions, as exemplified by <code>mixins/grid.large.scss</code> that imports from <code>mixins/grid.medium.scss</code>. This is done so that the &#42;.large files uses the variables defined in <code>variables/dimension.large.scss</code>, but reuses the components defined in grid.medium.</p>
<p>As minimalist is quite, well, minimal, it doesn’t contain that many rules (19,15KB altogether, with comments and not minimized), but I have pretty much the same setup at work, and there it works splendidly, with lots of lots of rules.</p>
<h2>The process</h2>
<p>The last note will be on the process of writing rules. Another aspect my approach is that it guides the naming of components, with (mostly) all of the rules in pattern prefixed with the name of the file in which it is located, e.g. <code>.block-container</code> is in <code>patterns/block</code> and <code>#MasterAside</code> is located in <code>unique/master</code>. This guideline allows for quick debugging, and speeds the process of discovering (which is an issue I probably will write more on later).</p>
<p>An exception to the naming conventions are the files <code>patterns/bootstrap</code> and <code>patterns/tags</code>. The former gives “overrides” to the rules implemented in the <code>lib/bootstrap</code> (e.g. if I want my own style at buttons), while the latter is default rules for tags. As a general rule I try not to write to many rules concerning tags, as they quickly become excessive (remember SoC), but e.g. links are in general a certain color, and that should be expressed.</p>
<p>Hope you have enjoyed reading about my tips on structuring and writing CSS rules, and if you have some of your own, I would love to hear them.</p>
