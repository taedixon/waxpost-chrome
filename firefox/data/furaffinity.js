
var title, tags, description, imageURL;
if (document.getElementById('submission-details') == null) {
	//using classic theme
	title = document.querySelectorAll('table.maintable table.maintable td.cat b');
	title = title[title.length-1].textContent;
	tags = Array.prototype.map.call(document.querySelectorAll('#keywords a'),
				 function (x) { return x.textContent.replace(/ /g, '_'); });
	description = document.querySelector('table.maintable td.alt1[width="70%"]').textContent;
	var links = document.querySelectorAll("div.actions a")
	for (a in links) {
		if (links[a].textContent.contains("Download")) {
			imageURL = links[a].getAttribute("href");
			break;
		}
	}
} else {
	//using beta theme
	title = document.querySelector('#submission-details div.desc-col span.fontsize20 b').textContent;
	description = document.querySelector('#submission-details div.desc').textContent;
	tags = Array.prototype.map.call(document.getElementsByClassName('tags'), 
		function(tag) {
			return tag.getElementsByTagName('a')[0].textContent;
		});
	var links = document.querySelectorAll("center.bg4 a.p20")
	for (a in links) {
		if (links[a].textContent.contains("Download")) {
			imageURL = links[a].getAttribute("href");
			break;
		}
	}
}

var params = {
	title: title,
	tags: tags,
	description: description,
	baseURL: document.location.href,
	imageURL: imageURL,
};
self.port.emit("complete", params);