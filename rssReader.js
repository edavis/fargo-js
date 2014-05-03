function RssReader(headline) {
	this.headline = headline || op.getCursor();
}
RssReader.prototype = {
    getFeedUrl: function() {
	var url = this.headline.attributes.getOne("xmlUrl");
	if (!url) {
	    console.log("getFeedUrl: No xmlUrl attribute found. Using headline as URL.");
	    url = this.headline.getLineText();
	}
	console.log("getFeedUrl: " + url);
	return url;
    },
    getFeedItems: function(doc) {
	var parsed = $.parseXML(doc);
	var feedItems = $(parsed).find("rss channel item");
	if (!feedItems.length) {
	    feedItems = $(parsed).find("feed entry");
	}
	return feedItems;
    },
    setLink: function(headline, url) {
	headline.attributes.setOne("url", url);
	headline.attributes.setOne("icon", "bookmark-empty");
    },
    insertDescription: function(headline, description) {
	headline.insert(description, right);
	headline.go(left);
	headline.collapse();
    },
    sanitize: function(html) {
	var s = $("<div>" + html + "</div>").text();
	s = $.trim(s);
	s = s.replace(/\s\s+/g, " ");
	s = s.replace("&quot;", '"');
	s = s.replace("&amp;", "&");
	return s;
    },
    insertFeedItems: function(doc) {
	var headline = this.headline,
            direction = right,
            reader = this,
            feedItems = this.getFeedItems(doc);
	feedItems.slice(0, 15).each(function(idx) {
	    var info = {
		title: reader.sanitize ($(this).find("title").text() || $(this).find("description").text()),
		url: $(this).find("link").text() || $(this).find("link").attr("href"),
		description: reader.sanitize ($(this).find("description").text() || $(this).find("content").text())
	    }
	    headline.insert(info.title, direction);
	    // Once the first entry has been inserted to the right of
	    // the starting headline, we change the headline to point
	    // to *that one* and insert down from then on. Otherwise
	    // we get one entry inserted to the right of the starting
	    // headline and the rest become siblings of the starting
	    // headline.
	    direction = down;
	    headline = op.getCursor();
	    reader.setLink(headline, info.url);
	    reader.insertDescription(headline, info.description);
	});
	headline.go(left);
    },
    main: function() {
	var reader = this,
            currentHeadline = this.headline;
	currentHeadline.attributes.setOne("icon", "refresh");
	http.readUrl(this.getFeedUrl(), function(rss) {
	    currentHeadline.deleteSubs();
	    reader.insertFeedItems(rss);
	    currentHeadline.attributes.setOne("icon", "rss");
	});
    }
};
