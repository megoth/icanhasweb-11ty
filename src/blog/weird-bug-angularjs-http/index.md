---
title: Weird bug in AngularJS $http?
author: arnehass
date: 2013-08-28
layout: blog.11ty.tsx
tags: $http, AngularJS, checkbox survey, iframe
original: http://icanhasweb.net/blog/2013/08/weird-bug-angularjs-http/
---

At work we’ve been working with AngularJS for a few months, and we are very pleased with its flexibility and solutions to many familiar problems when working with large amount of JavaScript code. There have been problems and bugs, but none we couldn’t solve in due time.

But my latest task have left me somewhat puzzled, and I write this post in the hope that somebody out there know what it was about, and also because I just ain’t able to summarize it into a proper question on a forum or what-have-you. So here goes.

<span class="more"></span>

The task required me to work with a 3rd-party service through an iframe. The service in question is [Checkbox Survey](http://www.checkbox.com/), which we use to, well, make surveys. We embed a given survey within the iframe, and run some code that looks for a specific ID within the embedded page. The gist below shows part of the directive that handles how we “look” for this.

<script src="https://gist.github.com/megoth/6366513.js"></script>

Upon completion (or pausing) an event is emitted. This event is fetched by a parent controller, and the gist below shows how it’s handled.

<script src="https://gist.github.com/megoth/6366615.js"></script>

Ideally, line 2 and 3 wouldn’t be needed. Ideally, $scope.result.$complete would’ve been called (it’s a $http-object), and success would be triggered upon a (hopefully) successful result. But this doesn’t happen. It seems that the browser need the user to interact with the page before it will send the request. To enable this, and to guide the user so she doesn’t navigate away from the page until the request is sent, I’ve included a link that’s shown when showButton is truthy. The link doesn’t actually do anything but link to “#”, as shown in the gist below.

<script src="https://gist.github.com/megoth/6366696.js"></script>


I also realized that scope.$digest was necessary to get the button shown. Another hack I’m puzzled by. This is far from an elegant solution, and I hope that maybe someone out there will stumble upon this post and give me some advice about what is amiss. Or I’ll find it out myself, and update this post later.
