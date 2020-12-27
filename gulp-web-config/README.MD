# Gulp Web Config
When I build an app or a website using WordPress or Laravel (PHP), I need some configuration to optimize the CSS files and the JS files for each page. So the app or the website can run faster because a page just load the CSS and the JS files what is needed and also minified.

So I created this one using Gulp for helping me to optimize my code because it easy to use.

------

## How to use
**01. NPM Install**\
Before using this config, you must do ```npm install``` first to download some NPM modules to run the configuration.

**02. Create Configuration**\
It's very simple, really. Just open the "config.json" file and it's just like this:

```
{
    "core": {
        "scss": [
            "scss/config.scss",
            "scss/global.scss"
        ],
        "js": [
            "js/config.js"
        ]
    },
    "pages": {
        "login": {
            "scss": [
                "scss/pages/login.scss"
            ],
            "js": []
        },
        "index": {
            "scss": [
                "scss/pages/index.scss"
            ],
            "js": []
        }
    }
}
```

That's just two main things in the config, "core" and "pages". Core is used to set the global code that can be used on each page. And the Pages is list of the page name do you want to build in your app or website. For example "login" page and "index" page, you can add one if needed or edit the current pages.

**03. Compile The Files**\
After you setup the config, the next step is compile the files. Open your terminal and type ```gulp``` to run the task. After that, the task created two new folder inside your project folder, "_compiler" folder and "dist" folder.

The "dist" folder contains the results of the compiled files, it's minified and organized by page name. So you can embed that files into your web page.
