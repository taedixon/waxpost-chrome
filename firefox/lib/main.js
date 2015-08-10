var {ActionButton} = require("sdk/ui/button/action");
var self = require("sdk/self");
var prefs = require("sdk/simple-prefs").prefs;
var tabs = require("sdk/tabs");
var worker = require("sdk/page-worker");

tabs.on("ready", tabLoaded);
tabs.on("activate", tabLoaded);

var tabScriptRegexps = [
    [/^https?:\/\/(?:[^.]+\.)?deviantart\.com\/art\//, 'deviantart.js'],
    [/^https?:\/\/www\.sofurry\.com\/view\//, 'sofurry.js'],
    [/^https?:\/\/(?:[^.]+\.)?furaffinity\.net\/view\//, 'furaffinity.js'],
    [/^https?:\/\/inkbunny\.net\/submissionview\.php/, 'inkbunny.js'],
    [/^https?:\/\/i\.imgur\.com\//, 'imgur.js'],
];
var button = false;

function tabLoaded(tab) {
	var sckript;
	console.log(tab.url);
    var foundNoMatch = tabScriptRegexps.every(function (entry) {
        if (entry[0].test(tab.url)) {
            skript = entry[1];
            return false;
        }
        return true;
    });
    if (foundNoMatch) {
		if (button) {
			button.destroy();
			button = false;
		}
    } else {
        console.log(skript);
		if (!button) addButton();
		tab.waxpostScript = skript;
	}
}

function addButton(tab, script) {
	console.log("ab");
	button = ActionButton({
	  id: "waxpost-link",
	  label: "Cross-post to Weasyl",
	  icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	  },
	  onClick: handleClick
	});
}

function handleClick(state) {
	console.log(tabs.activeTab.waxpostScript);
	var page = worker.Page({
		contentURL: tabs.activeTab.url,
		contentScriptFile: self.data.url(tabs.activeTab.waxpostScript),
		contentScriptWhen: "end",
		
	});
	page.port.on("complete", function(param) {
        var url = prefs['wzlroot'] + 'submit/visual?'
		+ "title=" + encodeURI(param.title)
		+ "&baseURL=" + encodeURI(param.baseURL)
		+ "&imageURL=" + encodeURI(param.imageURL)
		+ "&description=" + encodeURI(param.description);
		for (i in param.tags) {
			url += "&tags=" + encodeURI(param.tags[i]);
		}
		page.destroy();
		tabs.open(url);
	});
	
}