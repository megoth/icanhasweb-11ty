---
title: "Less CSS"
author: arnehass
date: 2010-10-30
layout: blog.11ty.tsx
tags: .net, clearfix, css, css3, feature detection, less, mixins, modernizr, nested rules, operations, php, variables
original: https://icanhasweb.wordpress.com/2010/10/30/less-css/
---

<p><a href="http://no.wikipedia.org/wiki/Cascading_Style_Sheets"><abbr title="Cascading Style Sheets">CSS</abbr></a> is powerful in its own rights, but when it comes to large, complex websites filled with elements that doesn’t necessarily share styles easily, the styling quickly becomes messy and hard to navigate. Conventions, frameworks and guidelines help structure the code, and tools such as <a href="http://getfirebug.com/">Firebug</a> helps the process. But my eyes still get soar when scanning through code-snippets such as:</p>

```
#header { ... }
#header .menu { ... }
#header .menu ul { ... }
#header .menu ul li { ... }
#header .login { ... }
#header .login ul { ... }
```

<p>I like my html to be semantically good structured (or as good as it can get when keeping certain obstacles in mind *cough*IE6*snirk*). That means not overloading it with classes that doesn’t add meaning (such as clearfix, which I use in all of my projects). CSS doesn’t have a good way of reusing this code within the stylesheet, and this is a shame.</p>
<p>And then there’s the classic need for variables. When trying out different color-schemes in a design, it’s a pain if you have to update a color-code multiple places in the stylesheet. Even more fun if they’re scattered throughout the document. And what if you the color-scheme to front different colors, each related to a base-color?</p>
<span class="more"></span>
<h3>LESS to the rescue!</h3>
<p><a href="http://lesscss.org/">LESS</a> provides a solution to all of these problems. Mixins, Nested Rules, Variables and Operations are the features fronted by the developers, Alexis Sellier and Dmitry Fadeyev. I’m especially fond of the two former, which allow me to write code such as:</p>

```
.clearfix { /* rules for clearfix-hack */ }
.horizontal { .clearfix; width: 100%; }
.horizontal_items { display: inline; float: left; }
.horizontal_links { display: block; }
.vertical { .horizontal; }
.vertical_items { display: block; float: none; }
.vertical_links { .horizontal_links; }

#header {
  ul {
    .horizontal;
    li {
      .horizontal_items;
      a {
        .horizontal_links;
      }
      ul {
        .vertical;
        display: none;
        position: absolute;
        li {
          .vertical_items;
          a {
            .vertical_links;
          }
        }
      }
    }
    li:hover,
    li.hover {
      ul {
        display: block;
      }
    }
  }
}
```

<p>When matched with markup such as:</p>

```
<div id="header">
  <ul>
    <li>
      <a>item 1</a>
      <ul>
        <li>
          <a>subitem 1a</a>
        </li>
        <li>
          <a>subitem 1b</a>
        </li>
      </ul>
    <li>
    <li>
      <a> item 2</a>
    </li>
  </ul>
</div>
```

<p>It’s displayed as a horizontal menu, with vertical submenus. And it works in IE6 too (only need some minor JavaScript to mimic :hover, since IE6 only supports :hover for a-elements).</p>
<p>When reusing style in this matter, it’s much more simpler when it comes to refactoring (which I’m considering for clearfix after reading this <a href="http://blogs.sitepoint.com/2005/02/26/simple-clearing-of-floats/">blog-entry</a> (via <a href="http://cjohansen.no/css/clearfix_ikke_lengre_noedvendig">cjohansen [norwegian]</a>)). This is especially important when dealing with CSS that aren’t standardized in all browsers yet, which are <a href="http://www.alistapart.com/articles/prefix-or-posthack/">implemented with browser prefixes</a>. Come the day when a browser vendor changes its implementation of a property, you can easily change your usage of it.</p>
<h3>My usage of LESS</h3>
<p>Currently I’ve tried the ported versions of LESS for <a href="http://github.com/dotless/dotless">.NET</a> and <a href="http://leafo.net/lessphp">PHP</a> (as a <a href="http://wordpress.org/extend/plugins/wp-less/">plugin for WordPress</a>). I can vouche for both these, altough they have slightly different implementation (<abbr title="Read The Fucking Manual">RTFM</abbr>).</p>
<p>If you wish to learn and use LESS, I can recommend <a href="http://net.tutsplus.com/tutorials/php/how-to-squeeze-the-most-out-of-less/">this article on Nettuts</a>. Otherwise, I would recommend you to read the documentation provided with the different projects.</p>
<h3>Shortcomings</h3>
<p>Although LESS is a joy to use, I do have some problems. For example, consider the code written when using <a href="http://www.modernizr.com/">modernizr</a> (a JavaScript-library that enables feature detection of CSS3):</p>

```
.rounded_corners (@radius: 5px) {
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
  border-radius: @radius;
}

#header {
  .button {
    /* CSS that all browsers supports */
  }
}
.borderradius #header .button {
  rounded_corners;
}
```

<p>This may seem but a slight irritation, but consider this example if #header parented style for 20+&nbsp;sub-elements. Add the possibility that I wanted to use other CSS3-properties. I have no answer to how this should be solved, but my 2 cents would be the possibility to write code such as:</p>

```
#header {
  .button {
    /* CSS that all browsers supports */
    [.borderradius] {
      rounded_corners;
    }
  }
}
```

<p>This would equal the meaning in the former snippet, but its superior in elegance (at least in my view).</p>
<p>I find that mixins and nested rules are great concepts by themselves, but I miss that they can’t be combined (at least not in the versions I’ve tried). Take the example below:</p>

```
.horizontal { .clearfix; width: 100%; }
.horizontal_items { display: inline; float: left; }
.horizontal_links { display: block; }
```

<p>This would have been so much better if it could’ve been written</p>

```
.horizontal {
  .clearfix;
  width: 100%;
  li {
    display: inline;
    float: left;
    a {
      display: block;
    }
  }
}
```

<p>(Even better, I would’ve used the E > F-selector, but alas, that isn’t supported by IE6)</p>
<p>That was my intention, after all. Now the code for a horizontal menu would be:</p>

```
#a_horizontal_menu {
  .horizontal;
}
```

<p>Instead of:</p>

```
#a_horizontal_menu {
  .horizontal;
  li {
    .horizontal_items;
    a {
      .horizontal_links;
    }
  }
}
```

<p>It would be nice to not be required to construct the latter code.</p>
<p>Finally, it would be nice to drop the curly brackets, so that the syntax is similar to <a href="http://en.wikipedia.org/wiki/Python_(programming_language)">Python</a> or <a href="http://sass-lang.com/">Sass</a>.</p>
