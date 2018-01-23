function bgset() {
	var elements = getAllElements(),
		element,
		firstMatch;

	for (var i = 0, len = elements.length; i < len; i++) {
		element = elements[i];
		firstMatch = getMatch(element["rules"]);

		if (firstMatch) {
			applyBg(firstMatch, element["dom"]);
		} else {
			applyBg(element["default"], element["dom"]);
		}
	}
}

function matchesMedia(media) {
	return w.matchMedia && w.matchMedia(media).matches;
}

function getMatch(rules) {
	var ruls = rules.match(/\[.*?\]/g),
		rule,
		bg,
		mq,
		match = undefined;

	for (var i = 0, len = ruls.length; i < len; i++) {
		rule = ruls[i].slice(1, -1).split(', ');
		bg = rule.slice(0, -1).join('');
		mq = rule[rule.length - 1];

		if (matchesMedia(mq)) {
			match = bg;
			break;
		}
	}

	return match;
}

function applyBg(bg, element) {
	var bgPath = "url(\"" + bg + "\")";
	if (element.style.backgroundImage !== bgPath) {
		element.style.backgroundImage = bgPath;
	}
}

function getAllElements() {
	var elems = [],
		bgs = doc.querySelectorAll("[data-bgset]");

	for (var i = 0, len = bgs.length; i < len; i++) {
		var currBg = bgs[i],
			elem = {};

		elem["rules"] = currBg.getAttribute("data-bgset");
		elem["dom"] = currBg.nextElementSibling;
		elem["default"] = currBg.getAttribute("data-src");

		elems.push(elem);
	}

	return elems;
}

function runBgSet() {
	bgset();
	var intervalId = setInterval(function () {
		bgset();
		if (/^loaded|^i|^c/.test(doc.readyState)) {
			clearInterval(intervalId);
			return;
		}
	}, 250);

	var resizeTimer;
	var handleResize = function () {
		bgset();
	};

	function checkResize() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(handleResize, 60);
	}

	if (w.addEventListener) {
		w.addEventListener("resize", checkResize, false);
	} else if (w.attachEvent) {
		w.attachEvent("onresize", checkResize);
	}
}

runBgSet();

window.bgset = bgset;

export default bgset;
