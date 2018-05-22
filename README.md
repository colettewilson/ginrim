# Frontend boilerplate

## Table of Contents
  * [Frontend setup](#frontend-setup)
  * [Gulp Tasks](#gulp-tasks)
  * [Updating live/staging](#updating-livestaging)
  * [SVG](#svg)
    * [Generating SVG sprites](#generating-svg-sprites)
    * [Using SVG Sprites](#using-svg-sprites)
  * [Class naming conventions](#class-naming-conventions)
    * [Components](#components)
    * [States](#states)
    * [JavaScript selectors](#javascript-selectors)
    * [Utility Classes](#utility-classes)
    * [Class name order in html](#class-name-order-in-html)
  * [Plugins & Features](#plugins-features)
    * [CSS](#css)
    * [Plugins running in background](#plugins-running-in-background)


## Frontend setup

1. Install Node if not installed
2. Ensure `./node_modules` is in your PATH
3. Run `yarn install`
4. Run `gulp`


Run `gulp watch` to watch out for changes in your files

## Gulp tasks

**List available tasks:** `gulp help`

## LiveReload (optional)

LiveReload is enabled while `gulp watch` is active. To use, install the [the LiveReload extension for your browser](http://livereload.com/extensions/) and activate it for the relevant page(s) (in Chrome, click the extension icon when viewing a page).

SVG
======

## Updating live/staging

Run `./update && gulp dist` - this does the following:
1. Stashes changes (if stashable changes exist)
2. Rebases origin/current branch onto current branch
3. Applies stashed changes (if changes were stashed)
4. Runs default gulp task
5. Versions and minifies CSS/JS

## Generating SVG sprites
For each sprite, create the following directory pattern (replacing _{spritename}_ with a URL-friendly ID, e.g. _ui_ or _logos_):

_./src/sprites/{spritename}/svg/_

Inside this nested _svg_ directory, add an _.svg_ file for each icon (with URL-friendly file names)

Add the following `@import` rule to your Sass: `@import '{spritename}/sprite';` (Replacing _{spritename}_ as above)

Run `gulp sprites && gulp sass`. This generates the SVG sprite + creates a reference HTML file: _./src/sprites/{spritename}/svg/sprite.html_ (may be useful as an overview of the available icons)

If you add additional _.svg_ files in future, re-run `gulp sprites && gulp sass`

## Using SVG sprites
Use markup similar to:

```html
<i class="icon icon--{spritename}__{iconname}">
	<svg focusable="false"><use xlink:href="/media/images/sprites/{spritename}.svg#{iconname}"></use></svg>
</i>
```

e.g. If a sprite exists named _ui_ which contains an icon file named  _logo.svg_, the markup to use the logo portion of the sprite would be:

```html
<i class="icon icon--ui__logo">
	<svg focusable="false"><use xlink:href="/media/images/sprites/ui.svg#logo"></use></svg>
</i>
```

Class naming conventions
======


## Components
```scss
/* Component */
.componentName {}

/* Component modifier */
.componentName--modifierName {}

/* Component descendant */
.componentName__descendant {}

/* Component descendant modifier */
.componentName__descendant--modifierName {}
```

## States

Used to indicate the state of a component, scoped to component

**Pattern**

```scss
.is-stateType
```

**Examples**

```scss
.modal {
	&.is-active {}
}

.field {
	&.is-hidden {}
}

/* or */

.field.is-hidden {}

```
## JavaScript selectors

Used to provide JS-only hooks for a component. Can be used to provide a JS-enhanced UI or to abstract other JS behaviours.

**Pattern**

```scss
.js-action-name
```

**Examples**

```scss
.js-submit
.js-action-save
.js-collapsible
.js-dropdown
.js-dropdown-menu
.js-carousel
```

## Utility Classes
These are one purpose classes

**Pattern**

```scss
.ut-utilityName
```

**Examples**

```scss
.ut-alignCenter
.ut-inlineBlock
```

## Class name order in html

**Grid Classes**
```html
<div class="column small-12 medium-12 large-12">
```

**Component**
```html
<div class="js-class component component--modifier grid__item small-12 medium-12 large-12">
```

**If component & also descendant**
```html
<div class="js-class parent__component component component--modifier grid__item small-12 medium-12 large-12">
```

Plugins & Features
======


## CSS

### Post-CSS Easing

[PostCSS plugin](https://github.com/postcss/postcss-easings) to replace easing name from [easings.net](http://easings.net/) to `cubic-bezier()`.

Use markup similar to:
```scss
.dash {
  transition: all 600ms ease-in-sine;
}
.camel {
  transition: all 600ms easeInSine;
}
```
Compiles to:
```scss
.dash {
  transition: all 600ms cubic-bezier(0.47, 0, 0.745, 0.715);
}
.camel {
  transition: all 600ms cubic-bezier(0.47, 0, 0.745, 0.715);
}
```


## Plugins running in background

### Post-CSS Autoprefixer

[PostCSS plugin](https://github.com/postcss/autoprefixer) to parse CSS and add vendor prefixes to CSS rules using values from [Can I Use](http://caniuse.com/).

Use markup similar to:
```scss
:fullscreen a {
  display: flex
}
```

Compiles to:
```css
:-webkit-full-screen a {
  display: -webkit-box;
  display: flex
}
  :-moz-full-screen a {
  display: flex
}
  :-ms-fullscreen a {
  display: -ms-flexbox;
  display: flex
}
  :fullscreen a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex
}
```


### Post-Css Initial Fallback

[PostCSS plugin](https://github.com/maximkoretskiy/postcss-initial) to fallback initial keyword.

Use markup similar to:
```scss
a {
  animation: initial;
  background: initial;
  white-space: initial;
}
```

Compiles to:
```scss
a {
  animation: none 0s ease 0s 1 normal none running;
  animation: initial;
  background: transparent none repeat 0 0 / auto auto padding-box border-box scroll;
  background: initial;
  white-space: normal;
  white-space: initial;
}
```

### Post-Css Pxtorem

[PostCSS plugin](https://github.com/cuth/postcss-pxtorem) that generates rem units from pixel units.

```scss
h1 {
  margin: 0 0 20px;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: 1px;
}
```

Compiles to:
```css
h1 {
  margin: 0 0 20px;
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: 0.0625rem;
}
```
