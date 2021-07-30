<a href="https://www.patreon.com/framework7"><img src="https://framework7.io/i/support-badge.png" height="20"></a>

# Framework7 Icons

The premium and free iOS-icons font for [Framework7](https://framework7.io/).

The font is developed to be used with [Framework7](https://framework7.io/), but you can use it wherever you see it fits, personal or commercial. It is free to use and licensed under [MIT](http://opensource.org/licenses/MIT).

## Getting Started

1. Download and extract the font pack
2. Copy the `framework7-icons.css` to your project or add this CSS to your own CSS file:

   ```css
   @font-face {
     font-family: 'Framework7 Icons';
     font-style: normal;
     font-weight: 400;
     src: local('Framework7 Icons'), local('Framework7Icons-Regular'),
       url('../fonts/Framework7Icons-Regular.woff2') format('woff2'), url('../fonts/Framework7Icons-Regular.woff')
         format('woff'), url('../fonts/Framework7Icons-Regular.ttf') format('truetype');
   }

   .f7-icons,
   .framework7-icons {
     font-family: 'Framework7 Icons';
     font-weight: normal;
     font-style: normal;
     font-size: 28px;
     line-height: 1;
     letter-spacing: normal;
     text-transform: none;
     display: inline-block;
     white-space: nowrap;
     word-wrap: normal;
     direction: ltr;
     -webkit-font-smoothing: antialiased;
     text-rendering: optimizeLegibility;
     -moz-osx-font-smoothing: grayscale;
     -webkit-font-feature-settings: 'liga';
     -moz-font-feature-settings: 'liga=1';
     -moz-font-feature-settings: 'liga';
     font-feature-settings: 'liga';
   }
   ```

3. Copy the `fonts` folder to your project
4. Ensure the font urls within `framework7-icons.css` properly reference the `fonts` path within your project.
5. Include a reference to the `framework7-icons.css` file from every webpage you need to use it:

   ```html
   <link rel="stylesheet" href="path/to/framework7-icons.css" />
   ```

Or with [component](https://github.com/componentjs/component):

    $ component install framework7io/framework7-icons

Or with [bower](http://bower.io/):

    $ bower install framework7-icons

Or with [npm](http://npmjs.com/):

    $ npm install framework7-icons

## Webpack

When using webpack, you must add loaders for css and fonts.

```js
{ test: /\.css/, loader: 'style-loader!css-loader' },
{ test: /\.(woff|woff2|ttf)$/, loader: 'url-loader?limit=100000' },
```

Then you can import the module like so:

```js
import 'framework7-icons';
```

## HTML Example

You can use [framework7.io](https://framework7.io) or included `cheatsheet.html` file to easily find the icon you want to use. It’s easy to incorporate icons into your web page. Here’s a small example:

```html
<i class="f7-icons">house</i>
```

This example uses a typographic feature called [ligatures](http://alistapart.com/article/the-era-of-symbol-fonts), which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.

## Styling Icons

### Sizing

Framework7 Icons look best at 28px, but if an icon needs to be displayed in an alternative size, just use CSS `font-size` rule:

```css
.size-14 {
  font-size: 14px;
}
.size-28 {
  font-size: 28px;
}
.size-32 {
  font-size: 32px;
}
.size-56 {
  font-size: 56px;
}
```

```html
<i class="f7-icons size-14">house</i>
<i class="f7-icons size-28">house</i>
<i class="f7-icons size-32">house</i>
<i class="f7-icons size-56">house</i>
```

### Coloring

Using the icon font allows for easy styling of an icon in any color.

```css
.color-black {
  color: #000;
}
.color-white {
  color: #fff;
}
```

```html
<i class="icon f7-icons color-black">house</i> <i class="icon f7-icons color-white">house</i>
```

## Using in `data-` attributes

Add the following CSS rule:

```css
.f7-icons[data-icon]:before {
  content: attr(data-icon);
  color: inherit;
}
```

And now you can use it with `data-` attributes:

```html
<i class="f7-icons" data-icon="house"></i>
```

## SVG Components

Since v 4.0.0 there are pure SVG components available for React, Svelte and Vue.

In React:

```jsx
import { House, HeartCircle } from 'framework7-icons/react';

export default () {
  // ...
  return (
    <div>
      <House />
      ...
      <HeartCircle />
    </div>
  )
}
```

In Svelte:

```html
<div>
  ...
  <House />
  ...
  <HeartCircle />
  ...
</div>
<script>
  import { House, HeartCircle } from 'framework7-icons/svelte';
  // ...
</script>
```

In Vue:

```html
<template>
  <div>
    ...
    <f7-house />
    ...
    <f7-heart-circle />
    ...
  </div>
</template>

<script>
  import { House, HeartCircle } from 'framework7-icons/vue';

  export default {
    components: {
      f7House: House,
      f7HeartCircle: HeartCircle,
    },
    ...
  }
</script>
```

## Build Instructions

This repo already comes with all the files built and ready to go, but can also build the fonts from the source. Requires Python, FontForge and woff2:

1. Install FontForge, which is the program that creates the font files from the SVG files:

   $ brew install fontforge ttfautohint

2. Install woff2

   $ git clone --recursive https://github.com/google/woff2.git
   $ cd woff2
   $ make clean all

3. Add or subtract files from the `src/` folder you'd like to be apart of the font files.

4. Run the build command:

   python ./build/generate.py

## License

Framework7 Icons font is licensed under the [MIT license](http://opensource.org/licenses/MIT).
