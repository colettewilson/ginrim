<?php

return [
    // All environments.
    '*' => [
        // A prefix to apply to your asset filenames when they are output. You would
        // likely want to set this if the paths in your manifest file are going to
        // be different to the final intended asset URL.
        'assetUrlPrefix' => '/',
    ],

    // Production environment.
    'production' => [
        // The path to your asset manifest; most likely generated by a task runner
        // such as Gulp or Grunt. The path will be relative to your Craft base
        // directory, unless you supply an absolute path.
        'manifestPath' => 'public/dist/rev-manifest.json',

        // A prefix to apply to your asset filenames when they are output. You would
        // likely want to set this if the paths in your manifest file are going to
        // be different to the final intended asset URL.
        'assetUrlPrefix' => '/dist/',
    ],
];
