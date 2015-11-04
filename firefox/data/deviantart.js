
    var title = document.querySelector('div.dev-title-container h1 a').textContent;
    var tags = Array.prototype.map.call(document.querySelectorAll('a.discoverytag'),
                     function (x) { return x.getAttribute('data-canonical-tag'); });
    var description = document.querySelector('div.dev-description').textContent;
    var imageURL = document.querySelector('img.dev-content-full').getAttribute('src');    
	
	var params = {
		title: title,
		tags: tags,
		description: description,
		baseURL: document.location.href,
		imageURL: imageURL,
	};
	self.port.emit("complete", params);

